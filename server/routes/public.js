const express = require('express');
const {
  TIME_SLOTS, PARTICIPATION_STYLES, DEFAULT_TIME_SLOT, DEFAULT_PARTICIPATION_STYLE,
  DEFAULT_PRIMARY_GOAL, findGroup,
} = require('../lib/programs');
const {
  DuplicateRegistrationError, createRegistration, groupsWithAvailability,
} = require('../lib/registrations');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isTrue(value) {
  return value === true || value === 'true';
}

// Validates and normalizes the public registration payload.
function parseRegistration(body = {}) {
  const errors = [];

  const fullName = str(body.fullName, 120);
  if (fullName.length < 2) errors.push('Full name is required (at least 2 characters).');

  const email = str(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) errors.push('A valid email address is required.');

  const phone = str(body.phone, 32);
  if (phone && !/^\+?[0-9\s()-]{6,32}$/.test(phone)) errors.push('Phone number contains invalid characters.');

  const group = findGroup(body.groupId);
  if (!group) errors.push('Please select a valid learning group (Group 1, 2, 3, or 4).');

  if (!isTrue(body.is18OrOver)) {
    errors.push('You must confirm you are 18 years of age or older to join this adult program.');
  }
  if (!isTrue(body.agreedToGuidelines)) {
    errors.push('You must agree to the peer community guidelines and crisis non-service boundaries.');
  }

  return {
    errors,
    value: {
      fullName,
      email,
      phone,
      whatsAppOptIn: Boolean(phone) && isTrue(body.whatsAppOptIn),
      groupId: group ? group.id : null,
      timeSlot: TIME_SLOTS[body.timeSlot] ? body.timeSlot : DEFAULT_TIME_SLOT,
      participationStyle: PARTICIPATION_STYLES[body.participationStyle]
        ? body.participationStyle
        : DEFAULT_PARTICIPATION_STYLE,
      primaryGoal: str(body.primaryGoal, 200) || DEFAULT_PRIMARY_GOAL,
      notes: str(body.notes, 2000),
    },
  };
}

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Everyday Mental Wellness Express API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Groups with seat availability — aggregate counts only, no personal data.
router.get('/groups', (req, res) => {
  res.json({ success: true, ...groupsWithAvailability() });
});

router.post('/register', (req, res) => {
  const { errors, value } = parseRegistration(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors[0], details: errors });
  }

  try {
    const registration = createRegistration(value);
    console.log(`[REGISTRATION] ${registration.registrationNumber} -> ${registration.groupId} / ${registration.cohortCode}`);
    res.status(201).json({
      success: true,
      message: `Welcome ${registration.fullName}! You have been assigned to ${registration.groupName} (${registration.cohortCode}, Seat ${registration.seatNumber} of 6).`,
      registration,
    });
  } catch (err) {
    if (err instanceof DuplicateRegistrationError) {
      // Don't echo the stored record back: anyone could look up a person's details by email.
      return res.status(409).json({
        success: false,
        error: `This email is already registered for ${findGroup(value.groupId).name}. Check your inbox for your confirmation details.`,
      });
    }
    throw err;
  }
});

module.exports = router;
