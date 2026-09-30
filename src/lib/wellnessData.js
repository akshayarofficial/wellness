// Everyday Mental Wellness Program Data & Curated Curriculum
// Based on:
// - Cinematic Landing Page and Hero Video Production Plan (Doc 1)
// - Everyday Mental Wellness Program Developer Tester Handoff (Doc 2)
// - Updated Program Plan & 4 Track Packs

export const PROGRAM_STREAMS = [
  {
    id: 'group1',
    number: 1,
    name: 'General Adults (18+)',
    tag: 'Adult Wellness',
    title: 'The Resilience Continuum: Foundational Self-Care',
    audience: 'General Adults (18+)',
    durationWeeks: 52,
    durationText: '52 Weeks • 10 Mins / Weekend',
    cadenceText: 'One distinct weekend lesson per week',
    focus: 'Foundational personal mental wellness: emotional regulation, cognitive defusion, and healthy boundaries.',
    heroColor: '#31D5D5',
    image: '/images/comic_adult_track.jpg',
    eligibilityNotice: 'Available to any adult aged 18 and above who is not currently seeking child-support skills.',
    badge: '52 Weeks',
    features: [
      '52 distinct weekly 6-tile comic lessons',
      '4-minute moderated AI voice room with up to 6 peers',
      '1 practical weekly behavioral experiment',
      'Comprehensive completion certificate upon week 52'
    ]
  },
  {
    id: 'group2',
    number: 2,
    name: 'Parents & Caregivers',
    tag: 'Parent Support',
    title: 'The Regulated Parent: Co-Regulation & Family Climate',
    audience: 'Parents & Caregivers',
    durationWeeks: 52,
    durationText: '52 Weeks • 10 Mins / Weekend',
    cadenceText: 'One distinct weekend lesson per week',
    focus: 'Support a child without diagnosing the child. Active listening, emotional coaching, and calm family communication.',
    heroColor: '#F4B84B',
    image: '/images/comic_parent_track.jpg',
    eligibilityNotice: 'For parents/guardians supporting minors. Teaches caregiver skills only; never diagnoses or creates accounts for children.',
    badge: '52 Weeks',
    features: [
      'Strictly non-diagnostic child-focused support skills',
      'Co-regulation, post-conflict repair & school collaboration',
      'Zero child accounts or child mood evaluation scores',
      'Parent completion certificate upon week 52'
    ]
  },
  {
    id: 'group3',
    number: 3,
    name: 'University & College Students',
    tag: 'Students (18+)',
    title: 'Academic Stress, Imposter Syndrome & Social Courage',
    audience: 'University & College Students (18+)',
    durationWeeks: 4,
    durationText: '4 Weeks • 10 Lessons Total',
    cadenceText: 'Week 1: 7 daily lessons • Weeks 2–4: 1 weekend lesson/week',
    focus: 'Study habits, exam panic de-escalation, peer comparison, and campus life resilience.',
    heroColor: '#A980F5',
    image: '/images/comic_student_track.jpg',
    eligibilityNotice: 'Exclusively for adult college/grad students aged 18+. Visibly adult curriculum.',
    badge: '4 Weeks',
    features: [
      'Week 1: 7 daily self-paced micro-lessons',
      'Weeks 2–4: 1 scheduled weekend cohort micro-class each week',
      'Daily private "How are you feeling today?" check-in',
      'Optional 30-day non-punitive follow-up and student certificate'
    ]
  },
  {
    id: 'group4',
    number: 4,
    name: 'Workplace Professionals',
    tag: 'Employees (18+)',
    title: 'Corporate Burnout Recovery & Work-Life Boundaries',
    audience: 'Workplace Professionals',
    durationWeeks: 4,
    durationText: '4 Weeks • 10 Lessons Total',
    cadenceText: 'Week 1: 7 daily lessons • Weeks 2–4: 1 weekend lesson/week',
    focus: 'Workload management, team dynamics, asynchronous boundary setting, and burnout recovery.',
    heroColor: '#38bdf8',
    image: '/images/comic_employee_track.jpg',
    eligibilityNotice: 'For working professionals aged 18+. Confidential from employers.',
    badge: '4 Weeks',
    features: [
      'Week 1: 7 daily self-paced micro-lessons',
      'Weeks 2–4: 1 scheduled weekend cohort micro-class each week',
      'Daily private feeling check-in with employer firewall',
      'Workplace mental health literacy certificate'
    ]
  }
];

// The 8-Scene Hero Video Storyboard (Doc 1: S01 to S08)
export const HERO_VIDEO_SCENES = [
  {
    id: 'S01',
    sceneNumber: 1,
    timeRange: '00:00 - 00:08',
    durationSec: 8,
    title: 'Opening • The Quiet Pause',
    image: '/images/emw_s01_opening.jpg',
    narration: 'A small lesson can change how we notice a day. Welcome to Everyday Mental Wellness, a practical learning program for adults.',
    overlayText: 'Everyday Mental Wellness • Practical Adult Learning',
    motionDescription: 'Gentle 8% push-in toward the notebook and warm lamplight shimmer against indigo city window.',
    safeGroup: 'All Adults 18+'
  },
  {
    id: 'S02',
    sceneNumber: 2,
    timeRange: '00:08 - 00:18',
    durationSec: 10,
    title: 'Group 1 • Adult Wellbeing',
    image: '/images/comic_adult_track.jpg',
    narration: 'Adults starting from first principles can build language for feelings, stress and support across fifty-two weekends.',
    overlayText: 'Group 1: Adults 18+ • 52-Week Foundational Path',
    motionDescription: 'Slow lateral pan across the desk to a thoughtful reflection in the twilight.',
    safeGroup: 'Group 1: 52 Weeks'
  },
  {
    id: 'S03',
    sceneNumber: 3,
    timeRange: '00:18 - 00:28',
    durationSec: 10,
    title: 'Group 2 • Supporting a Child',
    image: '/images/comic_parent_track.jpg',
    narration: 'Parents learn ways to listen, respond and support a minor child without trying to diagnose that child.',
    overlayText: 'Group 2: Parents of Minors • Support Without Diagnosing',
    motionDescription: 'Slow sideways dolly from shared kitchen table toward the parent’s calm listening face.',
    safeGroup: 'Group 2: 52 Weeks'
  },
  {
    id: 'S04',
    sceneNumber: 4,
    timeRange: '00:28 - 00:38',
    durationSec: 10,
    title: 'Group 3 • Students 18+',
    image: '/images/comic_student_track.jpg',
    narration: 'Students aged eighteen and above explore exam pressure, peers and campus life in a focused four-week path.',
    overlayText: 'Group 3: Students 18+ • 4-Week Exam & Campus Resiliency',
    motionDescription: 'Smooth tracking shot alongside the adult student crossing modern campus courtyard.',
    safeGroup: 'Group 3: 4 Weeks'
  },
  {
    id: 'S05',
    sceneNumber: 5,
    timeRange: '00:38 - 00:48',
    durationSec: 10,
    title: 'Group 4 • Employees 18+',
    image: '/images/comic_employee_track.jpg',
    narration: 'Employees practise useful skills through familiar workload and team situations, also across four weeks.',
    overlayText: 'Group 4: Workplace 18+ • 4-Week Burnout Recovery',
    motionDescription: 'Controlled lateral camera slide past contemporary workspace into reflective medium close-up.',
    safeGroup: 'Group 4: 4 Weeks'
  },
  {
    id: 'S06',
    sceneNumber: 6,
    timeRange: '00:48 - 00:59',
    durationSec: 11,
    title: 'Lesson Format • 6-Tile Comic',
    image: '/images/comic_six_tiles_sample.jpg',
    narration: 'Each guided lesson uses a six-tile comic. The camera moves into one tile at a time while a five-minute voice-over teaches one practical idea.',
    overlayText: '6-Tile Comic Format • 5-Minute Voiced Micro-Lesson',
    motionDescription: 'Start on 3x2 sheet; ease into tile 1; travel across tiles 2 and 3, then down to tiles 4, 5, and 6.',
    safeGroup: 'Every Stream'
  },
  {
    id: 'S07',
    sceneNumber: 7,
    timeRange: '00:59 - 01:09',
    durationSec: 10,
    title: 'Quiz & Instant Feedback',
    image: '/images/emw_s07_quiz.jpg',
    narration: 'A short quiz responds to each choice with immediate explanations, followed by a one-minute recap based on what you learned.',
    overlayText: '8-Question Quiz • Immediate Educational Feedback & 1-Min Recap',
    motionDescription: 'Subtle push-in on phone quiz UI; selection highlight reveals warm educational feedback bubble.',
    safeGroup: 'Interactive Review'
  },
  {
    id: 'S08',
    sceneNumber: 8,
    timeRange: '01:09 - 01:20',
    durationSec: 11,
    title: 'Progress & Certificate',
    image: '/images/emw_s08_progress.jpg',
    narration: 'Choose a weekend time, use an eligible promo code if you have one, and track your lessons toward a completion certificate. Find your learning path today.',
    overlayText: 'Weekend Scheduling • Promo Codes • Earned Completion Certificate',
    motionDescription: 'Slow orbit from weekend calendar to phone progress rings, then reveal of the earned certificate.',
    safeGroup: 'Enroll Now'
  }
];

// The 8-Step Learner Journey (Infographic & Doc 2)
export const LEARNER_JOURNEY_STEPS = [
  {
    step: 1,
    title: 'Enroll in the right stream',
    desc: 'Select from 4 tailored adult tracks (52 or 4 weeks). Confirm 18+ eligibility and set preferences.',
    icon: 'UserCheck',
    color: '#31D5D5'
  },
  {
    step: 2,
    title: 'Receive email access',
    desc: 'Receive a secure, single-use activation link to set your password and access your dashboard.',
    icon: 'Mail',
    color: '#38bdf8'
  },
  {
    step: 3,
    title: 'Choose a weekend session time',
    desc: 'Pick an intimate weekend slot matched to your local timezone and provider timezone.',
    icon: 'Calendar',
    color: '#818cf8'
  },
  {
    step: 4,
    title: 'Pay or apply a promo code',
    desc: 'Enter an authorized promo code (e.g. WELLNESS100) or complete secure checkout.',
    icon: 'CreditCard',
    color: '#a78bfa'
  },
  {
    step: 5,
    title: 'Receive WhatsApp join link 1 min before',
    desc: 'Opted-in learners receive a direct WhatsApp join link at T-1 minute, with an in-app backup join button.',
    icon: 'MessageSquare',
    color: '#34d399'
  },
  {
    step: 6,
    title: 'Watch a 5-minute voiced comic lesson',
    desc: 'Follow the 3x2 comic sheet as it zooms tiles 1 through 6 with synchronized audio narration.',
    icon: 'PlayCircle',
    color: '#F4B84B'
  },
  {
    step: 7,
    title: 'Take the quiz, get live feedback & 1-minute recap',
    desc: 'Answer 8 scenario questions with immediate educational explanations and a tailored recap.',
    icon: 'CheckSquare',
    color: '#fb923c'
  },
  {
    step: 8,
    title: 'Continue weekly; earn certificate after 52 or 4 weeks',
    desc: 'Build continuous emotional resilience and receive an official verifiable completion certificate.',
    icon: 'Award',
    color: '#facc15'
  }
];

// Curated Lesson 1: Group 1 Adults (Maya)
export const SAMPLE_LESSON_G1 = {
  id: 'g1-l1',
  streamId: 'group1',
  streamName: 'General Adults (18+)',
  lessonNumber: 1,
  title: 'Lesson 01: Welcome to Mental Health Learning',
  module: 'Mental Health Foundations',
  setting: 'Shared apartment with Maya',
  targetLengthText: '5-Minute Voiced Comic Lesson + 8-Question Quiz + 1-Minute Recap',
  intro: 'Maya closes a laptop after a tiring day and wonders whether a wellbeing lesson is meant for her. Follow her journey across 6 sequential comic tiles.',
  tiles: [
    {
      tileIndex: 1,
      name: 'Ordinary Moment',
      timeCode: '0:00 - 0:45',
      image: '/images/comic_six_tiles_sample.jpg',
      dialogue: 'Maya closes her laptop: "Another exhausting day. Is this wellbeing lesson really meant for someone like me?"',
      narration: 'At the shared apartment, Maya faces an ordinary problem. She closes a laptop after a tiring day and wonders whether a wellbeing lesson is meant for her. You can listen without making your own story public. Watch what changes when the character moves from an automatic reaction to a chosen response.',
      learningPoint: 'Mental health learning is an everyday adult skill, not a clinical consultation.'
    },
    {
      tileIndex: 2,
      name: 'First Signal',
      timeCode: '0:45 - 1:40',
      image: '/images/comic_six_tiles_sample.jpg',
      dialogue: 'Maya notices: "My shoulders are tense, my jaw is clenched, and my thoughts are spinning."',
      narration: 'Start with a simple explanation. Mental health is part of everyday life, and learning can begin at any age. Separate three things: what happened, what Maya noticed, and what Maya guessed it meant. When we separate them, there is room for another action.',
      learningPoint: 'Distinguish between external events, bodily sensations, and self-criticism.'
    },
    {
      tileIndex: 3,
      name: 'Idea Becomes Visible',
      timeCode: '1:40 - 2:25',
      image: '/images/comic_six_tiles_sample.jpg',
      dialogue: 'Maya pauses: "I do not need to solve everything tonight. I just need to pause and take one small breath."',
      narration: 'Maya notices tiredness, a tight jaw, and a friend she trusts. Notice the scale of the action. It does not require Maya to solve everything at once. It simply tests a helpful possibility in this setting.',
      learningPoint: 'Modest micro-actions prevent overwhelm and open space for realistic coping.'
    },
    {
      tileIndex: 4,
      name: 'Skill Begins',
      timeCode: '2:25 - 3:20',
      image: '/images/comic_six_tiles_sample.jpg',
      dialogue: 'Maya writes in her journal: "1 Feeling: Fatigue. 1 Body Signal: Tight jaw. 1 Support: Text Elena."',
      narration: 'Now the skill becomes concrete. Notice one feeling, one body signal, and one source of support; write these down privately. Work through the sequence at a comfortable pace, without trying to make a difficult emotion vanish on command.',
      learningPoint: 'Practice the tripartite anchor: 1 Feeling + 1 Body Signal + 1 Support Contact.'
    },
    {
      tileIndex: 5,
      name: 'Choice and Boundary',
      timeCode: '3:20 - 4:05',
      image: '/images/comic_six_tiles_sample.jpg',
      dialogue: 'Maya reflects: "I will not judge myself for feeling drained. Self-care is a practice, not a cure."',
      narration: 'Notice what this lesson cannot promise. Do not use a short lesson to label yourself or another person. Maya\'s choice is one option, not a guaranteed result. A helpful boundary keeps the skill in its proper role: everyday self-care, not clinical therapy.',
      learningPoint: 'Educational self-care respect boundaries; it does not replace licensed medical care.'
    },
    {
      tileIndex: 6,
      name: 'Small Next Step',
      timeCode: '4:05 - 5:00',
      image: '/images/comic_six_tiles_sample.jpg',
      dialogue: 'Maya saves: "Elena (Friend) & Local Health Line (Tele-MANAS 14416 / 112) saved in contacts. Ready for tomorrow."',
      narration: 'Your weekly experiment is modest: Save one trusted person and one local professional support option. Try it once and note what happened without grading yourself. One skill. One small action.',
      learningPoint: 'Anchor practical support before crisis arises.'
    }
  ],
  // 8 Quiz Questions with Q3-Q6 as distinct situational applications (Handoff requirement AT11)
  quizQuestions: [
    {
      id: 'q1',
      question: 'What is the primary educational goal of Group 1 mental wellness micro-learning?',
      options: [
        'To diagnose personal psychiatric disorders using self-assessments',
        'To build everyday vocabulary, emotional literacy, and self-regulation skills',
        'To guarantee immediate cure for severe clinical depression',
        'To replace outpatient psychotherapy with automated algorithms'
      ],
      correctIndex: 1,
      explanation: 'Everyday Mental Wellness is an educational literacy program designed to teach self-regulation and practical coping. It is deliberately non-diagnostic and non-clinical.'
    },
    {
      id: 'q2',
      question: 'In Tile 2, what three elements did Maya learn to separate?',
      options: [
        'Past trauma, present crisis, and future catastrophe',
        'What happened (event), what was noticed (sensation), and what she guessed it meant (interpretation)',
        'Diet, exercise routine, and sleep tracking metrics',
        'Work deadlines, social obligations, and family demands'
      ],
      correctIndex: 1,
      explanation: 'Separating external events, immediate physiological cues, and subjective assumptions creates room for deliberate choice rather than an automated stress reaction.'
    },
    {
      id: 'q3',
      isScenario: true,
      question: 'Scenario A: You finish an intense 9-hour workday and notice tightness in your throat and irritability. Based on Lesson 1, what is the best immediate response?',
      options: [
        'Ignore the physical cue and work two more hours to push through',
        'Label yourself as clinically burned out and give up on tasks',
        'Acknowledge the body signal privately, name the fatigue, and take a 5-minute pause without self-blame',
        'Demand that your colleagues immediately adjust their behavior'
      ],
      correctIndex: 2,
      explanation: 'Recognizing a bodily signal and fatigue without clinical catastrophizing allows you to take an intentional restorative pause.'
    },
    {
      id: 'q4',
      isScenario: true,
      question: 'Scenario B: A friend texts you saying they feel overwhelmed by weekend chores. How can you apply the tripartite anchor (feeling, body, support)?',
      options: [
        'Offer an amateur psychological diagnosis of their personality traits',
        'Encourage them to identify one feeling, one tension spot in the body, and one small supportive action for today',
        'Tell them that stress is harmless and they should ignore it',
        'Insist that they must achieve a 100% positive mood by tomorrow morning'
      ],
      correctIndex: 1,
      explanation: 'The tripartite anchor provides a gentle, structured way to ground attention on manageable, concrete reality rather than abstract distress.'
    },
    {
      id: 'q5',
      isScenario: true,
      question: 'Scenario C: You planned to do your weekly 10-minute reflection on Saturday morning, but had an unexpected family emergency. Under the program rules, what should happen?',
      options: [
        'You are permanently expelled from the course with a failed streak',
        'You receive a clinical penalty flag on your learner dashboard',
        'You resume your session at your next available window without guilt or streak penalties',
        'You must complete 5 lessons in a single afternoon to catch up'
      ],
      correctIndex: 2,
      explanation: 'Course progression is educational and self-paced; life disruptions do not trigger punitive scores or streak shaming.'
    },
    {
      id: 'q6',
      isScenario: true,
      question: 'Scenario D: While practicing the Lesson 1 notebook exercise, a learner notices thoughts of acute distress or hopelessness. What does the program safety protocol mandate?',
      options: [
        'The app hides the crisis buttons and urges the learner to keep doing quizzes',
        'The program immediately signposts Tele-MANAS (14416) / Emergency 112 and routes the learner to human support resources',
        'The automated guide diagnoses the learner with clinical emergency syndrome',
        'The app locks the account permanently without explanation'
      ],
      correctIndex: 1,
      explanation: 'Immediate distress triggers an automatic safety signposting protocol with direct Tele-MANAS (14416 / 112) and human professional referral.'
    },
    {
      id: 'q7',
      question: 'What is the modest weekly experiment assigned at the conclusion of Lesson 1?',
      options: [
        'Save one trusted contact and one local professional support resource',
        'Meditate in silence for 60 consecutive minutes each day',
        'Cut off all communication with challenging coworkers',
        'Write a 20-page personal autobiography'
      ],
      correctIndex: 0,
      explanation: 'The experiment is deliberately modest and achievable: proactively saving one trusted friend and one professional helpline (e.g. Tele-MANAS 14416 / 112) in your phone.'
    },
    {
      id: 'q8',
      question: 'Why does the program emphasize that "concerning responses are referred for human support"?',
      options: [
        'To sell additional pharmaceutical products',
        'Because AI tools are educational facilitators, and acute mental health distress requires qualified human care',
        'To publicly share quiz responses with employers',
        'Because quizzes are used as legal evaluations'
      ],
      correctIndex: 1,
      explanation: 'AI is bounded to educational facilitation. Any acute crisis signals must be handed off to qualified human specialists and emergency services.'
    }
  ]
};

// Available Promo Codes with Server-Side Validation Rules
export const PROMO_CODES = {
  'WELLNESS100': {
    code: 'WELLNESS100',
    discountPercent: 100,
    validGroups: ['group1', 'group2', 'group3', 'group4'],
    description: '100% Full Access Scholarship for all streams',
    isExpired: false
  },
  'STUDENT50': {
    code: 'STUDENT50',
    discountPercent: 50,
    validGroups: ['group3'],
    description: '50% Student Subsidy (Group 3 Students only)',
    isExpired: false
  },
  'WORKPLACE100': {
    code: 'WORKPLACE100',
    discountPercent: 100,
    validGroups: ['group4'],
    description: '100% Corporate Sponsored Access (Group 4 Employees only)',
    isExpired: false
  },
  'EXPIRED2025': {
    code: 'EXPIRED2025',
    discountPercent: 100,
    validGroups: ['group1'],
    description: 'Expired Pilot Grant (Testing Fixture)',
    isExpired: true
  }
};

// Available Weekend Session Slots
export const WEEKEND_SESSION_SLOTS = [
  { id: 'sat-10am', day: 'Saturday', timeLocal: '10:00 AM', timeProviderUTC: '04:30 AM UTC', label: 'Saturday Morning • 10:00 AM' },
  { id: 'sat-3pm', day: 'Saturday', timeLocal: '03:00 PM', timeProviderUTC: '09:30 AM UTC', label: 'Saturday Afternoon • 3:00 PM' },
  { id: 'sun-10am', day: 'Sunday', timeLocal: '10:00 AM', timeProviderUTC: '04:30 AM UTC', label: 'Sunday Morning • 10:00 AM' },
  { id: 'sun-7pm', day: 'Sunday', timeLocal: '07:00 PM', timeProviderUTC: '01:30 PM UTC', label: 'Sunday Evening • 7:00 PM' }
];

// Akheedha's Acceptance Test Definitions (AT01 to AT18 from Doc 2)
export const ACCEPTANCE_TESTS = [
  {
    id: 'AT01',
    scenario: 'Landing card opens the matching enrollment path',
    requirement: 'Four cards each create the correct group; parent language has no child diagnosis.',
    group: 'All Groups',
    category: 'Public Site & Routing'
  },
  {
    id: 'AT02',
    scenario: 'Age and access boundaries',
    requirement: 'Under-18 registration fails; wrong group URL and another user’s lesson are denied.',
    group: 'All Groups',
    category: 'Security & Access'
  },
  {
    id: 'AT03',
    scenario: 'Email activation',
    requirement: 'Setup link opens once, expires as configured, and password reset works without plaintext email.',
    group: 'All Groups',
    category: 'Authentication'
  },
  {
    id: 'AT04',
    scenario: 'Schedule and timezone display',
    requirement: 'Chosen weekend time is identical in app, email, and join record across local and provider timezones.',
    group: 'All Groups',
    category: 'Scheduling'
  },
  {
    id: 'AT05',
    scenario: 'Payment failure and retry',
    requirement: 'Payment failure grants no entitlement; duplicate webhook never creates double purchase.',
    group: 'All Groups',
    category: 'Commerce'
  },
  {
    id: 'AT06',
    scenario: 'Promo code scope validation',
    requirement: 'Valid code applies server-side; expired, exhausted, and wrong-group codes fail with descriptive errors.',
    group: 'All Groups',
    category: 'Commerce'
  },
  {
    id: 'AT07',
    scenario: 'WhatsApp consent separation',
    requirement: 'Only opted-in learners receive reminders; opt-out prevents later messages without losing access.',
    group: 'All Groups',
    category: 'Notifications'
  },
  {
    id: 'AT08',
    scenario: 'One-minute reminder dispatch',
    requirement: 'Job queues at T-1 minute; actual delivery logged; authenticated in-app join backup always accessible.',
    group: 'All Groups',
    category: 'Notifications'
  },
  {
    id: 'AT09',
    scenario: 'Lesson tile sequence order',
    requirement: 'Tiles 1–6 zoom and narrate in order; all speech bubbles and dialogue remain clearly visible.',
    group: 'All Groups',
    category: 'Classroom'
  },
  {
    id: 'AT10',
    scenario: 'Accessible playback controls',
    requirement: 'Captions toggle, full transcript drawer, keyboard control, pause, resume, and speed settings work.',
    group: 'All Groups',
    category: 'Accessibility'
  },
  {
    id: 'AT11',
    scenario: 'Quiz evaluation with scenario questions',
    requirement: 'Approved key marks all eight questions; Q3–Q6 return distinct situational educational explanations.',
    group: 'All Groups',
    category: 'Classroom'
  },
  {
    id: 'AT12',
    scenario: 'Recap personalization',
    requirement: 'One-minute recap synthesizes missed concepts without psychological diagnosis or unsupported claims.',
    group: 'All Groups',
    category: 'AI & Safety'
  },
  {
    id: 'AT13',
    scenario: 'Completion ledger and lesson unlock',
    requirement: 'Incomplete video or quiz cannot unlock; completed lesson unlocks only the next eligible queue item.',
    group: 'All Groups',
    category: 'Entitlements'
  },
  {
    id: 'AT14',
    scenario: 'Student & employee 4-week cadence',
    requirement: 'Week 1 has 7 daily lessons; Weeks 2–4 have 1 weekend micro-class each (10 lessons total).',
    group: 'Group 3 & 4',
    category: 'Curriculum'
  },
  {
    id: 'AT15',
    scenario: 'Daily check-in and 30-day follow-up',
    requirement: '"Not good" response offers gentle support options without punitive streak loss or clinical diagnosis.',
    group: 'Group 3 & 4',
    category: 'Daily Care'
  },
  {
    id: 'AT16',
    scenario: 'Human safety escalation route',
    requirement: 'Concerning crisis disclosure shows immediate Tele-MANAS (14416) support text and routes ticket to human reviewer queue.',
    group: 'All Groups',
    category: 'Safety & Ethics'
  },
  {
    id: 'AT17',
    scenario: 'Certificate issue boundary',
    requirement: '51 of 52 or incomplete 4-week path fails; 100% completion issues one verifiable certificate with ID.',
    group: 'All Groups',
    category: 'Certificates'
  },
  {
    id: 'AT18',
    scenario: 'Recovery and idempotency',
    requirement: 'Browser refresh, network loss, and replay do not duplicate booking, score, or certificate generation.',
    group: 'All Groups',
    category: 'Architecture'
  }
];
