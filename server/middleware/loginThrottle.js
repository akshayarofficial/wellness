const { LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MINUTES } = require('../config');

// In-memory failed-login counter per client IP. Resets on server restart,
// which is acceptable for a single-instance deployment.
const attempts = new Map();
const WINDOW_MS = LOGIN_WINDOW_MINUTES * 60 * 1000;

function entryFor(ip) {
  const now = Date.now();
  let entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    attempts.set(ip, entry);
  }
  return entry;
}

function loginThrottle(req, res, next) {
  const entry = entryFor(req.ip);
  if (entry.count >= LOGIN_MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.resetAt - Date.now()) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      success: false,
      error: `Too many failed login attempts. Try again in ${Math.ceil(retryAfter / 60)} minute(s).`,
    });
  }
  next();
}

function recordFailedLogin(ip) {
  entryFor(ip).count += 1;
}

function clearFailedLogins(ip) {
  attempts.delete(ip);
}

// Drop stale entries so the map cannot grow without bound.
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(ip);
  }
}, WINDOW_MS).unref();

module.exports = { loginThrottle, recordFailedLogin, clearFailedLogins };
