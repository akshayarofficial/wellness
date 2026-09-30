const crypto = require('crypto');
const { db } = require('../db');
const { SESSION_TTL_HOURS } = require('../config');

// ---------- Password hashing (scrypt) ----------
// Stored format: scrypt$N$r$p$saltB64$hashB64

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return ['scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString('base64'), hash.toString('base64')].join('$');
}

function verifyPassword(password, stored) {
  const [scheme, N, r, p, saltB64, hashB64] = String(stored).split('$');
  if (scheme !== 'scrypt') return false;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = crypto.scryptSync(password, Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(N), r: Number(r), p: Number(p),
  });
  return crypto.timingSafeEqual(actual, expected);
}

// Used to keep login timing constant when the username does not exist.
const DUMMY_HASH = hashPassword(crypto.randomBytes(16).toString('hex'));

// ---------- Admin users ----------

const stmts = {
  findUser: db.prepare('SELECT * FROM admin_users WHERE username = ?'),
  insertUser: db.prepare('INSERT INTO admin_users (username, password_hash, created_at) VALUES (?, ?, ?)'),
  updatePassword: db.prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?'),
  touchLogin: db.prepare('UPDATE admin_users SET last_login_at = ? WHERE id = ?'),
  countUsers: db.prepare('SELECT COUNT(*) AS n FROM admin_users'),

  insertSession: db.prepare(`INSERT INTO admin_sessions (token_hash, admin_id, created_at, expires_at, ip, user_agent)
    VALUES (?, ?, ?, ?, ?, ?)`),
  findSession: db.prepare(`SELECT s.admin_id, s.expires_at, u.username
    FROM admin_sessions s JOIN admin_users u ON u.id = s.admin_id
    WHERE s.token_hash = ?`),
  deleteSession: db.prepare('DELETE FROM admin_sessions WHERE token_hash = ?'),
  deleteUserSessions: db.prepare('DELETE FROM admin_sessions WHERE admin_id = ?'),
  deleteExpired: db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?'),
};

function validateCredentialsInput(username, password) {
  if (!/^[a-zA-Z0-9_.-]{3,32}$/.test(username || '')) {
    return 'Username must be 3-32 characters (letters, numbers, dot, dash, underscore).';
  }
  if (!password || password.length < 10) {
    return 'Password must be at least 10 characters.';
  }
  return null;
}

// Creates the admin, or resets the password (and signs out all sessions) if it already exists.
function upsertAdmin(username, password) {
  const passwordHash = hashPassword(password);
  const existing = stmts.findUser.get(username);
  if (existing) {
    stmts.updatePassword.run(passwordHash, existing.id);
    stmts.deleteUserSessions.run(existing.id);
    return { created: false, id: existing.id };
  }
  const result = stmts.insertUser.run(username, passwordHash, new Date().toISOString());
  return { created: true, id: Number(result.lastInsertRowid) };
}

function authenticate(username, password) {
  const user = username ? stmts.findUser.get(username) : undefined;
  const ok = verifyPassword(password || '', user ? user.password_hash : DUMMY_HASH);
  if (!user || !ok) return null;
  stmts.touchLogin.run(new Date().toISOString(), user.id);
  return { id: user.id, username: user.username };
}

function adminCount() {
  return stmts.countUsers.get().n;
}

// ---------- Sessions ----------
// The cookie holds a random token; only its SHA-256 is stored, so a DB leak cannot be replayed.

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function createSession(adminId, { ip, userAgent } = {}) {
  const token = crypto.randomBytes(32).toString('base64url');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_TTL_HOURS * 60 * 60 * 1000);
  stmts.insertSession.run(sha256(token), adminId, now.toISOString(), expiresAt.toISOString(), ip || null, (userAgent || '').slice(0, 300));
  return { token, expiresAt };
}

function getSession(token) {
  if (!token) return null;
  const session = stmts.findSession.get(sha256(token));
  if (!session) return null;
  if (session.expires_at < new Date().toISOString()) {
    stmts.deleteSession.run(sha256(token));
    return null;
  }
  return { adminId: session.admin_id, username: session.username, expiresAt: session.expires_at };
}

function destroySession(token) {
  if (token) stmts.deleteSession.run(sha256(token));
}

function purgeExpiredSessions() {
  stmts.deleteExpired.run(new Date().toISOString());
}

module.exports = {
  validateCredentialsInput,
  upsertAdmin,
  authenticate,
  adminCount,
  createSession,
  getSession,
  destroySession,
  purgeExpiredSessions,
};
