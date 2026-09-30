const fs = require('fs');
const path = require('path');

// Load server/.env if present (Node 22+ built-in, no dotenv dependency)
const ENV_FILE = path.join(__dirname, '.env');
if (fs.existsSync(ENV_FILE)) {
  process.loadEnvFile(ENV_FILE);
}

const DATA_DIR = path.join(__dirname, 'data');

function list(value, fallback) {
  return (value || fallback)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

module.exports = {
  PORT: Number(process.env.PORT) || 5000,
  // Bind to loopback by default: the Next.js app proxies /api/* to this server,
  // so it does not need to be reachable from other machines.
  HOST: process.env.HOST || '127.0.0.1',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  DATA_DIR,
  DB_FILE: process.env.DB_FILE || path.join(DATA_DIR, 'wellness.db'),
  // Old flat-file store; imported into SQLite once on first start
  LEGACY_JSON_FILE: path.join(DATA_DIR, 'registrations.json'),

  CORS_ORIGINS: list(process.env.CORS_ORIGINS, 'http://localhost:3000,http://127.0.0.1:3000'),

  SESSION_COOKIE: 'emw_admin_session',
  SESSION_TTL_HOURS: Number(process.env.ADMIN_SESSION_TTL_HOURS) || 12,

  // Login throttling: max failed attempts per IP within the window
  LOGIN_MAX_ATTEMPTS: Number(process.env.ADMIN_LOGIN_MAX_ATTEMPTS) || 5,
  LOGIN_WINDOW_MINUTES: Number(process.env.ADMIN_LOGIN_WINDOW_MINUTES) || 15,
};
