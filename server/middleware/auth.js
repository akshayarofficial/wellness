const { SESSION_COOKIE, IS_PRODUCTION } = require('../config');
const { getSession } = require('../lib/auth');

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

function sessionCookieOptions(expiresAt) {
  return {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: 'strict',
    path: '/',
    ...(expiresAt ? { expires: expiresAt } : {}),
  };
}

// Rejects the request with 401 unless it carries a valid admin session cookie.
function requireAdmin(req, res, next) {
  const token = readCookie(req, SESSION_COOKIE);
  const session = getSession(token);
  if (!session) {
    if (token) res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }
  req.admin = { id: session.adminId, username: session.username };
  req.sessionToken = token;
  next();
}

module.exports = { readCookie, sessionCookieOptions, requireAdmin };
