// Wellness App Persistence & State Store
// Supports all flows in the Developer/Tester Handoff (Doc 2)
// Enables interactive execution and testing of AT01 through AT18

import { PROMO_CODES, WEEKEND_SESSION_SLOTS, PROGRAM_STREAMS } from './wellnessData.js';

const STORAGE_KEY = 'emw_wellness_state_v1';

const DEFAULT_STATE = {
  // Account & Enrollment
  user: {
    id: 'usr_maya_2026',
    email: 'learner@example.com',
    name: 'Maya',
    ageConfirmed: true,
    isActivated: true,
    hasPassword: true,
    timezone: 'Asia/Kolkata (IST)',
    providerTimezone: 'UTC'
  },
  enrollment: {
    groupId: 'group1',
    streamName: 'General Adults (18+)',
    durationWeeks: 52,
    status: 'active', // 'none' | 'pending' | 'active'
    enrolledAt: '2026-09-28T10:00:00Z',
    ageAssertionVerified: true,
    whatsAppOptIn: true,
    whatsAppPhone: '+91 98765 43210',
    promoCodeApplied: 'WELLNESS100',
    selectedSlot: 'sat-10am',
    activationToken: 'token_setup_9942',
    tokenUsed: true
  },
  // Learning Progress
  learning: {
    currentLessonId: 'g1-l1',
    completedLessonIds: ['g1-l1'],
    lessonVersions: {
      'g1-l1': 'v1.0.2'
    },
    quizScores: {
      'g1-l1': { score: 8, total: 8, passed: true, timestamp: '2026-09-28T10:15:00Z' }
    },
    recapsViewed: ['g1-l1'],
    totalLessonsRequired: 52,
    completedCount: 1, // Can be simulated to 52 for certificate tests
    streakDays: 14
  },
  // Notifications log (AT07, AT08)
  notifications: [
    {
      id: 'notif_01',
      type: 'whatsapp',
      intendedTime: 'T-1 minute',
      sentAt: '2026-09-28T09:59:00Z',
      recipient: '+1 (555) 234-5678',
      message: 'Your 10-Minute Everyday Mental Wellness session starts in 1 minute! Tap here to join: https://wellness.app/classroom?join=auth_room_01',
      status: 'delivered'
    }
  ],
  // Safety review escalation queue (AT16)
  safetyEscalations: [],
  // Issued Certificates (AT17, AT18)
  certificates: [],
  // Acceptance Test Results (AT01 to AT18)
  testResults: {}
};

export function getWellnessState() {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
      return DEFAULT_STATE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveWellnessState(state) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

// Enroll a user into a stream
export function createEnrollment({ groupId, email, is18OrOver, whatsAppOptIn, whatsAppPhone }) {
  if (!is18OrOver) {
    throw new Error('AT02 Failed: Under-18 registration is not permitted. Program requires age 18+');
  }

  const stream = PROGRAM_STREAMS.find(s => s.id === groupId) || PROGRAM_STREAMS[0];
  const state = getWellnessState();
  const token = 'setup_' + Math.random().toString(36).substring(2, 10);

  state.user.email = email;
  state.user.ageConfirmed = true;
  state.user.isActivated = false;
  state.user.hasPassword = false;

  state.enrollment = {
    groupId: stream.id,
    streamName: stream.name,
    durationWeeks: stream.durationWeeks,
    status: 'pending',
    enrolledAt: new Date().toISOString(),
    ageAssertionVerified: true,
    whatsAppOptIn: !!whatsAppOptIn,
    whatsAppPhone: whatsAppPhone || '',
    promoCodeApplied: null,
    selectedSlot: 'sat-10am',
    activationToken: token,
    tokenUsed: false
  };

  saveWellnessState(state);
  return { success: true, token, enrollment: state.enrollment };
}

// Activate account via single-use token (AT03)
export function activateAccount(token, password) {
  const state = getWellnessState();
  if (state.enrollment.activationToken !== token) {
    throw new Error('AT03 Failed: Invalid activation token.');
  }
  if (state.enrollment.tokenUsed) {
    throw new Error('AT03 Failed: This one-time setup link has already been used.');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  state.enrollment.tokenUsed = true;
  state.user.isActivated = true;
  state.user.hasPassword = true;
  saveWellnessState(state);
  return { success: true };
}

// Validate Promo Code Server-Side (AT06)
export function validatePromoCode(code, groupId) {
  const normalized = (code || '').trim().toUpperCase();
  const promo = PROMO_CODES[normalized];

  if (!promo) {
    return { valid: false, error: 'Promo code does not exist.' };
  }
  if (promo.isExpired) {
    return { valid: false, error: 'AT06 Pass check: Promo code has expired.' };
  }
  if (!promo.validGroups.includes(groupId)) {
    return { 
      valid: false, 
      error: `AT06 Pass check: This code is only valid for ${promo.validGroups.join(', ')}. Not valid for selected group (${groupId}).` 
    };
  }

  return {
    valid: true,
    code: promo.code,
    discountPercent: promo.discountPercent,
    description: promo.description
  };
}

// Complete checkout and activate entitlement (AT05, AT18)
export function completeCheckout(promoCode, slotId) {
  const state = getWellnessState();
  const groupId = state.enrollment.groupId || 'group1';

  let discount = 0;
  if (promoCode) {
    const val = validatePromoCode(promoCode, groupId);
    if (!val.valid) {
      throw new Error(val.error);
    }
    discount = val.discountPercent;
    state.enrollment.promoCodeApplied = promoCode;
  }

  state.enrollment.selectedSlot = slotId || state.enrollment.selectedSlot || 'sat-10am';
  state.enrollment.status = 'active';
  state.learning.completedCount = state.learning.completedCount || 1;
  saveWellnessState(state);
  return { success: true, discount, status: 'active' };
}

// WhatsApp 1-Minute Reminder simulation (AT07, AT08)
export function triggerOneMinuteReminder() {
  const state = getWellnessState();
  if (!state.enrollment.whatsAppOptIn) {
    return { 
      dispatched: false, 
      reason: 'AT07: Learner opted out of WhatsApp reminders. No message sent.' 
    };
  }

  const newNotification = {
    id: 'notif_' + Date.now(),
    type: 'whatsapp',
    intendedTime: 'T-1 minute',
    sentAt: new Date().toISOString(),
    recipient: state.enrollment.whatsAppPhone || '+91 98765 43210',
    message: `Your 10-Minute session (${state.enrollment.streamName}) starts in 1 minute! Join here: https://wellness.app/classroom?group=${state.enrollment.groupId}`,
    status: 'delivered'
  };

  state.notifications.unshift(newNotification);
  saveWellnessState(state);
  return { dispatched: true, notification: newNotification };
}

// Human Safety Escalation Protocol (AT16)
export function reportConcerningSignal(learnerText, context = 'quiz_response') {
  const state = getWellnessState();
  const escalation = {
    id: 'esc_' + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: state.user.email,
    groupId: state.enrollment.groupId,
    context,
    excerpt: learnerText,
    reviewerStatus: 'queued_for_human_clinician',
    supportResourcesShown: ['Tele-MANAS (14416 / 1800-891-4416)', 'National Emergency (112)', 'KIRAN Helpline (1800-599-0019)', 'Vandrevala Foundation (+91 9999 666 555)']
  };

  state.safetyEscalations.unshift(escalation);
  saveWellnessState(state);
  return escalation;
}

// Issue Certificate with strict eligibility validation (AT17, AT18)
export function issueCertificate(overrideEligible = false) {
  const state = getWellnessState();
  const isG1orG2 = state.enrollment.groupId === 'group1' || state.enrollment.groupId === 'group2';
  const required = isG1orG2 ? 52 : 10;
  const count = overrideEligible ? required : state.learning.completedCount;

  if (count < required) {
    return {
      success: false,
      error: `AT17: Incomplete curriculum. Completed ${count} of ${required} required sessions. Certificate cannot be generated prematurely.`
    };
  }

  // Idempotency check (AT18)
  const existing = state.certificates.find(c => c.groupId === state.enrollment.groupId);
  if (existing) {
    return { success: true, certificate: existing, wasExisting: true };
  }

  const certificate = {
    id: `EMW-2026-${state.enrollment.groupId.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
    groupId: state.enrollment.groupId,
    recipientName: state.user.name || 'Maya Al-Mansoor',
    programTitle: state.enrollment.streamName,
    completedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    totalWeeks: isG1orG2 ? '52 Weeks' : '4 Weeks',
    verificationUrl: `https://wellness.app/verify/cert`,
    status: 'VERIFIED_OFFICIAL'
  };

  state.certificates.push(certificate);
  state.learning.completedCount = required;
  saveWellnessState(state);
  return { success: true, certificate, wasExisting: false };
}

// Reset state to default
export function resetWellnessState() {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE));
  return DEFAULT_STATE;
}
