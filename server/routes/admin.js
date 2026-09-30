const express = require('express');
const { SESSION_COOKIE } = require('../config');
const { PROGRAM_GROUPS, TIME_SLOTS } = require('../lib/programs');
const { authenticate, createSession, destroySession } = require('../lib/auth');
const {
  listRegistrations, allRegistrations, getRegistration, registrationStats,
} = require('../lib/registrations');
const { requireAdmin, readCookie, sessionCookieOptions } = require('../middleware/auth');
const { loginThrottle, recordFailedLogin, clearFailedLogins } = require('../middleware/loginThrottle');

const router = express.Router();

// Admin data must never be cached by browsers or proxies.
router.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// ---------- Auth ----------

router.post('/login', loginThrottle, (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  const admin = authenticate(username, password);
  if (!admin) {
    recordFailedLogin(req.ip);
    console.warn(`[ADMIN] Failed login for ${JSON.stringify(username.slice(0, 64))} from ${req.ip}`);
    return res.status(401).json({ success: false, error: 'Invalid username or password.' });
  }

  clearFailedLogins(req.ip);
  const { token, expiresAt } = createSession(admin.id, { ip: req.ip, userAgent: req.get('user-agent') });
  res.cookie(SESSION_COOKIE, token, sessionCookieOptions(expiresAt));
  console.log(`[ADMIN] ${admin.username} signed in from ${req.ip}`);
  res.json({ success: true, admin: { username: admin.username }, expiresAt: expiresAt.toISOString() });
});

router.post('/logout', (req, res) => {
  destroySession(readCookie(req, SESSION_COOKIE));
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions());
  res.json({ success: true });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ success: true, admin: { username: req.admin.username } });
});

// ---------- Registrations ----------

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseListQuery(query) {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(query.pageSize, 10) || 25));
  const text = (v, max = 100) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

  return {
    page,
    pageSize,
    q: text(query.q),
    groupId: PROGRAM_GROUPS.some((g) => g.id === query.groupId) ? query.groupId : '',
    timeSlot: TIME_SLOTS[query.timeSlot] ? query.timeSlot : '',
    status: text(query.status, 20),
    from: DATE_RE.test(query.from || '') ? query.from : '',
    to: DATE_RE.test(query.to || '') ? query.to : '',
    sort: text(query.sort, 20),
    order: query.order === 'asc' ? 'asc' : 'desc',
  };
}

// Filter options for the admin UI
router.get('/meta', requireAdmin, (req, res) => {
  res.json({
    success: true,
    groups: PROGRAM_GROUPS.map((g) => ({ id: g.id, number: g.number, name: g.name })),
    timeSlots: Object.entries(TIME_SLOTS).map(([id, label]) => ({ id, label })),
  });
});

router.get('/registrations', requireAdmin, (req, res) => {
  res.json({ success: true, ...listRegistrations(parseListQuery(req.query)) });
});

router.get('/registrations/stats', requireAdmin, (req, res) => {
  res.json({ success: true, stats: registrationStats() });
});

// Neutralizes spreadsheet formula injection from user-submitted text.
function csvCell(value) {
  let s = value === null || value === undefined ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const CSV_COLUMNS = [
  ['Registration No.', 'registrationNumber'],
  ['Registered At (UTC)', 'registeredAt'],
  ['Full Name', 'fullName'],
  ['Email', 'email'],
  ['Phone', 'phone'],
  ['WhatsApp Opt-in', (r) => (r.whatsAppOptIn ? 'Yes' : 'No')],
  ['Group', 'groupName'],
  ['Time Slot', 'timeSlotLabel'],
  ['Cohort', 'cohortCode'],
  ['Seat', 'seatNumber'],
  ['Participation Style', 'participationStyleLabel'],
  ['Primary Goal', 'primaryGoal'],
  ['Notes', 'notes'],
  ['Status', 'status'],
];

router.get('/registrations/export', requireAdmin, (req, res) => {
  const { page, pageSize, sort, order, ...filters } = parseListQuery(req.query);
  const rows = allRegistrations(filters);

  const lines = [CSV_COLUMNS.map(([header]) => csvCell(header)).join(',')];
  for (const r of rows) {
    lines.push(CSV_COLUMNS.map(([, key]) => csvCell(typeof key === 'function' ? key(r) : r[key])).join(','));
  }

  const date = new Date().toISOString().slice(0, 10);
  console.log(`[ADMIN] ${req.admin.username} exported ${rows.length} registration(s)`);
  res.set('Content-Type', 'text/csv; charset=utf-8');
  res.set('Content-Disposition', `attachment; filename="registrations-${date}.csv"`);
  res.send(`﻿${lines.join('\r\n')}\r\n`);
});

router.get('/registrations/:id', requireAdmin, (req, res) => {
  const registration = getRegistration(req.params.id);
  if (!registration) {
    return res.status(404).json({ success: false, error: 'Registration not found.' });
  }
  res.json({ success: true, registration });
});

module.exports = router;
