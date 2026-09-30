const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');
const { DB_FILE, LEGACY_JSON_FILE } = require('./config');

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

const db = new DatabaseSync(DB_FILE);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA busy_timeout = 5000;');

// Ordered schema migrations; PRAGMA user_version records how many have run.
const MIGRATIONS = [
  `
  CREATE TABLE registrations (
    id                  TEXT PRIMARY KEY,
    registration_number TEXT NOT NULL UNIQUE,
    full_name           TEXT NOT NULL,
    email               TEXT NOT NULL,
    phone               TEXT NOT NULL DEFAULT '',
    whatsapp_opt_in     INTEGER NOT NULL DEFAULT 0,
    group_id            TEXT NOT NULL,
    time_slot           TEXT NOT NULL,
    cohort_number       INTEGER NOT NULL,
    cohort_code         TEXT NOT NULL,
    seat_number         INTEGER NOT NULL,
    participation_style TEXT NOT NULL,
    primary_goal        TEXT NOT NULL,
    notes               TEXT NOT NULL DEFAULT '',
    status              TEXT NOT NULL DEFAULT 'confirmed',
    registered_at       TEXT NOT NULL,
    UNIQUE (email, group_id)
  );
  CREATE INDEX idx_registrations_registered_at ON registrations (registered_at);
  CREATE INDEX idx_registrations_group_slot ON registrations (group_id, time_slot);

  CREATE TABLE admin_users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL,
    last_login_at TEXT
  );

  CREATE TABLE admin_sessions (
    token_hash TEXT PRIMARY KEY,
    admin_id   INTEGER NOT NULL REFERENCES admin_users (id) ON DELETE CASCADE,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL,
    ip         TEXT,
    user_agent TEXT
  );
  CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions (expires_at);
  `,
];

function migrate() {
  const { user_version: current } = db.prepare('PRAGMA user_version').get();
  for (let v = current; v < MIGRATIONS.length; v++) {
    db.exec('BEGIN');
    try {
      db.exec(MIGRATIONS[v]);
      db.exec(`PRAGMA user_version = ${v + 1}`);
      db.exec('COMMIT');
      console.log(`[DB] Applied migration ${v + 1}`);
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  }
}

// One-time import of registrations collected by the old JSON-file store.
function importLegacyJson() {
  if (!fs.existsSync(LEGACY_JSON_FILE)) return;

  let records;
  try {
    records = JSON.parse(fs.readFileSync(LEGACY_JSON_FILE, 'utf8'));
  } catch (err) {
    console.error('[DB] Could not parse legacy registrations.json, skipping import:', err.message);
    return;
  }

  const insert = db.prepare(`
    INSERT OR IGNORE INTO registrations (
      id, registration_number, full_name, email, phone, whatsapp_opt_in, group_id,
      time_slot, cohort_number, cohort_code, seat_number, participation_style,
      primary_goal, notes, status, registered_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let imported = 0;
  db.exec('BEGIN');
  try {
    for (const r of Array.isArray(records) ? records : []) {
      const result = insert.run(
        r.id, r.registrationNumber, r.fullName, (r.email || '').toLowerCase(), r.phone || '',
        r.whatsAppOptIn ? 1 : 0, r.groupId, r.timeSlot, r.cohortNumber, r.cohortCode,
        r.seatNumber, r.participationStyle, r.primaryGoal || '', r.notes || '',
        r.status || 'confirmed', r.registeredAt
      );
      imported += Number(result.changes);
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    console.error('[DB] Legacy import failed, leaving registrations.json in place:', err.message);
    return;
  }

  const archived = `${LEGACY_JSON_FILE}.imported-${Date.now()}`;
  fs.renameSync(LEGACY_JSON_FILE, archived);
  console.log(`[DB] Imported ${imported} legacy registration(s); original archived at ${path.basename(archived)}`);
}

// Runs a function inside a transaction and returns its result.
function transaction(fn) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const result = fn();
    db.exec('COMMIT');
    return result;
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

migrate();
importLegacyJson();

module.exports = { db, transaction };
