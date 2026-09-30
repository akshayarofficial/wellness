const crypto = require('crypto');
const { db, transaction } = require('../db');
const {
  ROOM_CAPACITY, PROGRAM_GROUPS, TIME_SLOTS, PARTICIPATION_STYLES, findGroup, cohortCode,
} = require('./programs');

// Maps a DB row to the API shape (camelCase + derived labels).
function toDto(row) {
  const group = findGroup(row.group_id);
  return {
    id: row.id,
    registrationNumber: row.registration_number,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    whatsAppOptIn: Boolean(row.whatsapp_opt_in),
    groupId: row.group_id,
    groupNumber: group ? group.number : null,
    groupName: group ? group.name : row.group_id,
    groupTitle: group ? group.title : '',
    timeSlot: row.time_slot,
    timeSlotLabel: TIME_SLOTS[row.time_slot] || row.time_slot,
    cohortNumber: row.cohort_number,
    cohortCode: row.cohort_code,
    seatNumber: row.seat_number,
    maxRoomCapacity: ROOM_CAPACITY,
    participationStyle: row.participation_style,
    participationStyleLabel: PARTICIPATION_STYLES[row.participation_style] || row.participation_style,
    primaryGoal: row.primary_goal,
    notes: row.notes,
    is18OrOver: true,
    status: row.status,
    registeredAt: row.registered_at,
    orientationLink: '/classroom',
    nextSessionDate: row.time_slot.startsWith('sat') ? 'Upcoming Saturday' : 'Upcoming Sunday',
  };
}

const stmts = {
  findByEmailAndGroup: db.prepare('SELECT id FROM registrations WHERE email = ? AND group_id = ?'),
  countInGroupSlot: db.prepare('SELECT COUNT(*) AS n FROM registrations WHERE group_id = ? AND time_slot = ?'),
  countByGroup: db.prepare('SELECT group_id, COUNT(*) AS n FROM registrations GROUP BY group_id'),
  numberExists: db.prepare('SELECT 1 FROM registrations WHERE registration_number = ?'),
  getById: db.prepare('SELECT * FROM registrations WHERE id = ? OR registration_number = ?'),
  insert: db.prepare(`
    INSERT INTO registrations (
      id, registration_number, full_name, email, phone, whatsapp_opt_in, group_id,
      time_slot, cohort_number, cohort_code, seat_number, participation_style,
      primary_goal, notes, status, registered_at
    ) VALUES (
      :id, :registration_number, :full_name, :email, :phone, :whatsapp_opt_in, :group_id,
      :time_slot, :cohort_number, :cohort_code, :seat_number, :participation_style,
      :primary_goal, :notes, 'confirmed', :registered_at
    )
  `),
};

function newRegistrationNumber() {
  for (;;) {
    const candidate = `EMW-REG-${crypto.randomInt(100000, 1000000)}`;
    if (!stmts.numberExists.get(candidate)) return candidate;
  }
}

class DuplicateRegistrationError extends Error {}

// Creates a registration and allocates the next seat (rooms of ROOM_CAPACITY per group + slot).
function createRegistration(input) {
  return transaction(() => {
    if (stmts.findByEmailAndGroup.get(input.email, input.groupId)) {
      throw new DuplicateRegistrationError();
    }

    const { n: taken } = stmts.countInGroupSlot.get(input.groupId, input.timeSlot);
    const cohortNumber = Math.floor(taken / ROOM_CAPACITY) + 1;
    const id = `reg_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    stmts.insert.run({
      id,
      registration_number: newRegistrationNumber(),
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      whatsapp_opt_in: input.whatsAppOptIn ? 1 : 0,
      group_id: input.groupId,
      time_slot: input.timeSlot,
      cohort_number: cohortNumber,
      cohort_code: cohortCode(input.groupId, cohortNumber),
      seat_number: (taken % ROOM_CAPACITY) + 1,
      participation_style: input.participationStyle,
      primary_goal: input.primaryGoal,
      notes: input.notes,
      registered_at: new Date().toISOString(),
    });

    return toDto(stmts.getById.get(id, id));
  });
}

function getRegistration(idOrNumber) {
  const row = stmts.getById.get(idOrNumber, idOrNumber);
  return row ? toDto(row) : null;
}

// Public seat availability per group (no personal data).
function groupsWithAvailability() {
  const counts = Object.fromEntries(stmts.countByGroup.all().map((r) => [r.group_id, r.n]));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const groups = PROGRAM_GROUPS.map((grp) => {
    const count = counts[grp.id] || 0;
    const occupancy = count % ROOM_CAPACITY;
    return {
      ...grp,
      totalEnrolled: count,
      activeCohortCode: cohortCode(grp.id, Math.floor(count / ROOM_CAPACITY) + 1),
      activeCohortOccupancy: occupancy,
      availableSeats: ROOM_CAPACITY - occupancy,
      maxRoomCapacity: ROOM_CAPACITY,
      nextSessionDate: 'Upcoming Weekend',
    };
  });

  return { groups, totalRegistrations: total };
}

// ---------- Admin listing ----------

const SORT_COLUMNS = {
  registeredAt: 'registered_at',
  fullName: 'full_name COLLATE NOCASE',
  email: 'email',
  groupId: 'group_id',
  cohortCode: 'cohort_code',
};

function buildFilter({ q, groupId, timeSlot, status, from, to }) {
  const where = [];
  const params = {};

  if (q) {
    const like = `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
    where.push(`(full_name LIKE :q ESCAPE '\\' OR email LIKE :q ESCAPE '\\'
      OR phone LIKE :q ESCAPE '\\' OR registration_number LIKE :q ESCAPE '\\'
      OR cohort_code LIKE :q ESCAPE '\\')`);
    params.q = like;
  }
  if (groupId) { where.push('group_id = :groupId'); params.groupId = groupId; }
  if (timeSlot) { where.push('time_slot = :timeSlot'); params.timeSlot = timeSlot; }
  if (status) { where.push('status = :status'); params.status = status; }
  // from/to are YYYY-MM-DD dates (inclusive), compared against ISO timestamps
  if (from) { where.push('registered_at >= :from'); params.from = `${from}T00:00:00.000Z`; }
  if (to) { where.push('registered_at <= :to'); params.to = `${to}T23:59:59.999Z`; }

  return { clause: where.length ? `WHERE ${where.join(' AND ')}` : '', params };
}

function listRegistrations({ page = 1, pageSize = 25, sort = 'registeredAt', order = 'desc', ...filters }) {
  const { clause, params } = buildFilter(filters);
  const sortColumn = SORT_COLUMNS[sort] || SORT_COLUMNS.registeredAt;
  const direction = order === 'asc' ? 'ASC' : 'DESC';

  const { n: total } = db.prepare(`SELECT COUNT(*) AS n FROM registrations ${clause}`).get(params);
  const rows = db
    .prepare(`SELECT * FROM registrations ${clause}
      ORDER BY ${sortColumn} ${direction}, registered_at DESC
      LIMIT :limit OFFSET :offset`)
    .all({ ...params, limit: pageSize, offset: (page - 1) * pageSize });

  return {
    registrations: rows.map(toDto),
    pagination: { page, pageSize, total, totalPages: Math.max(1, Math.ceil(total / pageSize)) },
  };
}

function allRegistrations(filters) {
  const { clause, params } = buildFilter(filters);
  return db
    .prepare(`SELECT * FROM registrations ${clause} ORDER BY registered_at DESC`)
    .all(params)
    .map(toDto);
}

function registrationStats() {
  const counts = Object.fromEntries(stmts.countByGroup.all().map((r) => [r.group_id, r.n]));
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { n: last7Days } = db
    .prepare('SELECT COUNT(*) AS n FROM registrations WHERE registered_at >= ?')
    .get(since);
  const { n: whatsAppOptIns } = db
    .prepare('SELECT COUNT(*) AS n FROM registrations WHERE whatsapp_opt_in = 1')
    .get();

  return {
    total: Object.values(counts).reduce((a, b) => a + b, 0),
    last7Days,
    whatsAppOptIns,
    byGroup: PROGRAM_GROUPS.map((g) => ({ groupId: g.id, name: g.name, count: counts[g.id] || 0 })),
  };
}

module.exports = {
  DuplicateRegistrationError,
  createRegistration,
  getRegistration,
  groupsWithAvailability,
  listRegistrations,
  allRegistrations,
  registrationStats,
};
