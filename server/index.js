const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Next.js frontend (default port 3000 and dynamic origins)
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[EXPRESS ${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Path to JSON data store
const DATA_FILE = path.join(__dirname, 'data', 'registrations.json');

// Helper to ensure data directory and file exist
function getRegistrations() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading registrations file:', err);
    return [];
  }
}

function saveRegistrations(registrations) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving registrations file:', err);
    return false;
  }
}

// 4 Program Groups Metadata
const PROGRAM_GROUPS = [
  {
    id: 'group1',
    number: 1,
    name: 'General Adults (18+)',
    title: 'The Resilience Continuum: Foundational Self-Care',
    audience: 'General Adults (18+)',
    duration: '52 Weeks • 10 Mins / Weekend',
    cadence: '1 Weekend Lesson per Week',
    cohortSize: 'Max 6 Adults / Room',
    badge: '52 Weeks',
    focus: 'Emotional regulation, cognitive defusion, and healthy boundaries for lifelong mental wellness.',
    eligibilityNotice: 'Available to any adult aged 18 and above.'
  },
  {
    id: 'group2',
    number: 2,
    name: 'Parents & Caregivers',
    title: 'The Regulated Parent: Co-Regulation & Family Climate',
    audience: 'Parents & Caregivers',
    duration: '52 Weeks • 10 Mins / Weekend',
    cadence: '1 Weekend Lesson per Week',
    cohortSize: 'Max 6 Parents / Room',
    badge: '52 Weeks',
    focus: 'Parental self-regulation, emotion coaching for children, and calm family communication without child diagnosis.',
    eligibilityNotice: 'Exclusively for parents/guardians. Teaches caregiver skills only; never diagnoses minors.'
  },
  {
    id: 'group3',
    number: 3,
    name: 'University & College Students (18+)',
    title: 'Academic Stress, Imposter Syndrome & Social Courage',
    audience: 'University & College Students (18+)',
    duration: '4 Weeks • 10 Lessons Total',
    cadence: 'Week 1: 7 daily lessons • Weeks 2–4: 1 weekend lesson/week',
    cohortSize: 'Max 6 Students / Room',
    badge: '4 Weeks',
    focus: 'Study panic de-escalation, imposter syndrome defusion, roommate communication, and campus isolation relief.',
    eligibilityNotice: 'Exclusively for college and graduate students aged 18+.'
  },
  {
    id: 'group4',
    number: 4,
    name: 'Workplace Professionals',
    title: 'Corporate Burnout Recovery & Work-Life Boundaries',
    audience: 'Workplace Professionals',
    duration: '4 Weeks • 10 Lessons Total',
    cadence: 'Week 1: 7 daily lessons • Weeks 2–4: 1 weekend lesson/week',
    cohortSize: 'Max 6 Professionals / Room',
    badge: '4 Weeks',
    focus: 'Corporate burnout recovery, asynchronous Slack/email firewalls, and guilt-free boundary formulas.',
    eligibilityNotice: 'For working professionals aged 18+. 100% confidential from employers.'
  }
];

const TIME_SLOT_LABELS = {
  sat_morning: 'Saturday Morning (10:00 AM - 10:10 AM)',
  sat_afternoon: 'Saturday Afternoon (3:00 PM - 3:10 PM)',
  sun_morning: 'Sunday Morning (10:00 AM - 10:10 AM)',
  sun_evening: 'Sunday Evening (6:00 PM - 6:10 PM)'
};

// ==========================================
// ROUTES
// ==========================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Everyday Mental Wellness Express API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// 2. Groups list with capacity stats
app.get('/api/groups', (req, res) => {
  const registrations = getRegistrations();

  const groupsWithStats = PROGRAM_GROUPS.map((grp) => {
    const enrolledInGroup = registrations.filter(r => r.groupId === grp.id);
    const count = enrolledInGroup.length;
    const currentCohortNumber = Math.floor(count / 6) + 1;
    const cohortCurrentOccupancy = count % 6;
    const availableSeatsInActiveRoom = 6 - cohortCurrentOccupancy;

    return {
      ...grp,
      totalEnrolled: count,
      activeCohortCode: `${grp.id.toUpperCase()}-ROOM-${String(currentCohortNumber).padStart(2, '0')}`,
      activeCohortOccupancy: cohortCurrentOccupancy,
      availableSeats: availableSeatsInActiveRoom,
      maxRoomCapacity: 6,
      nextSessionDate: 'Upcoming Weekend'
    };
  });

  res.json({
    success: true,
    groups: groupsWithStats,
    totalRegistrations: registrations.length
  });
});

// 3. Get all registrations (with optional ?groupId= filter)
app.get('/api/registrations', (req, res) => {
  const { groupId, limit } = req.query;
  let list = getRegistrations();

  if (groupId) {
    list = list.filter(r => r.groupId === groupId);
  }

  // Sort descending by registration date
  list.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));

  if (limit) {
    list = list.slice(0, parseInt(limit, 10));
  }

  res.json({
    success: true,
    count: list.length,
    registrations: list
  });
});

// 4. Get registration by ID
app.get('/api/registrations/:id', (req, res) => {
  const { id } = req.params;
  const list = getRegistrations();
  const match = list.find(r => r.id === id || r.registrationNumber === id);

  if (!match) {
    return res.status(404).json({
      success: false,
      error: 'Registration not found'
    });
  }

  res.json({
    success: true,
    registration: match
  });
});

// 5. POST /api/register - Main group registration handler
app.post('/api/register', (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      whatsAppOptIn,
      groupId,
      is18OrOver,
      timeSlot,
      participationStyle,
      primaryGoal,
      notes,
      agreedToGuidelines
    } = req.body;

    const errors = [];

    // Validation checks
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.push('Full name is required (at least 2 characters).');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.push('A valid email address is required.');
    }

    const targetGroup = PROGRAM_GROUPS.find(g => g.id === groupId);
    if (!targetGroup) {
      errors.push('Please select a valid learning group (Group 1, 2, 3, or 4).');
    }

    if (is18OrOver !== true && is18OrOver !== 'true') {
      errors.push('You must confirm you are 18 years of age or older to join this adult program.');
    }

    if (agreedToGuidelines !== true && agreedToGuidelines !== 'true') {
      errors.push('You must agree to the peer community guidelines and crisis non-service boundaries.');
    }

    const validTimeSlots = ['sat_morning', 'sat_afternoon', 'sun_morning', 'sun_evening'];
    const chosenTimeSlot = validTimeSlots.includes(timeSlot) ? timeSlot : 'sat_morning';

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors[0],
        details: errors
      });
    }

    // Read current database
    const registrations = getRegistrations();

    // Check for duplicate active registration for the same email in the same group
    const existingRegistration = registrations.find(
      r => r.email.toLowerCase() === email.trim().toLowerCase() && r.groupId === groupId
    );

    if (existingRegistration) {
      return res.status(200).json({
        success: true,
        isExisting: true,
        message: `You are already registered for ${targetGroup.name}!`,
        registration: existingRegistration
      });
    }

    // Allocate cohort room & seat (max 6 per room)
    const existingInGroupAndSlot = registrations.filter(
      r => r.groupId === groupId && r.timeSlot === chosenTimeSlot
    );

    const cohortNumber = Math.floor(existingInGroupAndSlot.length / 6) + 1;
    const seatNumber = (existingInGroupAndSlot.length % 6) + 1;
    const cohortCode = `${groupId.toUpperCase()}-ROOM-${String(cohortNumber).padStart(2, '0')}`;

    // Create unique identifiers
    const timestamp = new Date().toISOString();
    const id = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    const registrationNumber = `EMW-REG-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRecord = {
      id,
      registrationNumber,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      whatsAppOptIn: Boolean(whatsAppOptIn),
      groupId,
      groupName: targetGroup.name,
      groupTitle: targetGroup.title,
      groupNumber: targetGroup.number,
      cohortCode,
      cohortNumber,
      seatNumber,
      maxRoomCapacity: 6,
      timeSlot: chosenTimeSlot,
      timeSlotLabel: TIME_SLOT_LABELS[chosenTimeSlot] || 'Saturday Morning',
      participationStyle: participationStyle === 'listener_first' ? 'listener_first' : 'active_voice',
      participationStyleLabel: participationStyle === 'listener_first' 
        ? 'Listener First (Observe & reflect, speak when ready)' 
        : 'Active Voice (Interactive 6-person peer discussion)',
      primaryGoal: primaryGoal ? primaryGoal.trim() : 'Personal Mental Wellness & Habit Building',
      notes: notes ? notes.trim() : '',
      is18OrOver: true,
      status: 'confirmed',
      registeredAt: timestamp,
      orientationLink: '/classroom',
      nextSessionDate: chosenTimeSlot.startsWith('sat') ? 'Upcoming Saturday' : 'Upcoming Sunday'
    };

    registrations.push(newRecord);
    saveRegistrations(registrations);

    console.log(`[REGISTRATION SUCCESS] ${newRecord.registrationNumber} -> ${newRecord.fullName} (${newRecord.groupName} / ${newRecord.cohortCode})`);

    res.status(201).json({
      success: true,
      message: `Welcome ${newRecord.fullName}! You have been assigned to ${newRecord.groupName} (${newRecord.cohortCode}, Seat ${newRecord.seatNumber} of 6).`,
      registration: newRecord
    });
  } catch (err) {
    console.error('Registration processing error:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your registration. Please try again.'
    });
  }
});

// Start Express Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(` Everyday Mental Wellness Express API running!  `);
  console.log(` Port:    http://localhost:${PORT}               `);
  console.log(` Health:  http://localhost:${PORT}/api/health     `);
  console.log(` Groups:  http://localhost:${PORT}/api/groups     `);
  console.log(` Register: POST http://localhost:${PORT}/api/register`);
  console.log(`=================================================`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = app;
