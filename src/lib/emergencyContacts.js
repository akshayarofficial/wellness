/**
 * Official Emergency & Mental Health Helplines for India and Global
 */

export const INDIA_EMERGENCY_CONTACTS = [
  {
    id: 'tele-manas',
    name: 'Tele-MANAS',
    fullTitle: 'National Tele Mental Health Programme of India',
    numbers: ['14416', '1800-891-4416'],
    primaryDial: '14416',
    tel: 'tel:14416',
    type: 'Government of India • Ministry of Health & Family Welfare',
    availability: '24/7 • 365 Days • Toll-Free',
    languages: 'Available in 20+ Regional Indian Languages',
    description: 'Immediate comprehensive mental health counseling, psychiatric referral, and crisis intervention run by apex mental health institutions including NIMHANS.',
    isPrimary: true,
    badge: 'Govt. 24/7 Toll-Free'
  },
  {
    id: 'kiran',
    name: 'KIRAN Helpline',
    fullTitle: 'Mental Health Rehabilitation Helpline (Govt. of India)',
    numbers: ['1800-599-0019'],
    primaryDial: '1800-599-0019',
    tel: 'tel:18005990019',
    type: 'Ministry of Social Justice & Empowerment',
    availability: '24/7 • Toll-Free',
    languages: '13 Languages (Hindi, English, Tamil, Telugu, Marathi, Bengali, Gujarati, etc.)',
    description: 'Early screening, first-aid, psychological support, distress management, and mental health rehabilitation counseling.',
    isPrimary: true,
    badge: 'Govt. 24/7 Free'
  },
  {
    id: 'national-emergency',
    name: 'Emergency 112',
    fullTitle: 'National Emergency Response Support System (ERSS)',
    numbers: ['112'],
    primaryDial: '112',
    tel: 'tel:112',
    type: 'Pan-India Unified Emergency Services',
    availability: '24/7 Immediate Dispatch',
    languages: 'All Indian States & UTs',
    description: 'Single emergency number for acute safety threats, urgent ambulance dispatch, police assistance, or disaster rescue.',
    isPrimary: true,
    badge: 'Pan-India 112'
  },
  {
    id: 'vandrevala',
    name: 'Vandrevala Foundation',
    fullTitle: 'Mental Health & Crisis Intervention Helpline',
    numbers: ['+91 9999 666 555'],
    primaryDial: '+91 9999 666 555',
    tel: 'tel:+919999666555',
    type: 'Non-Profit Mental Health Support',
    availability: '24/7 Free Confidential Support',
    languages: 'English, Hindi, and Major Regional Languages',
    description: 'Experienced clinical psychologists and trained counselors offering immediate emotional support, de-escalation, and crisis counseling via phone or WhatsApp.',
    isPrimary: false,
    badge: 'Call / WhatsApp 24/7'
  },
  {
    id: 'nimhans',
    name: 'NIMHANS Helpline',
    fullTitle: 'National Institute of Mental Health & Neurosciences',
    numbers: ['080-46110007'],
    primaryDial: '080-46110007',
    tel: 'tel:08046110007',
    type: 'Apex Neuro-Psychiatric Institute of India',
    availability: '24/7 Dedicated Psychosocial Support',
    languages: 'English, Hindi, Kannada, and Multiple Languages',
    description: 'Specialist psychosocial and mental health support by medical professionals and clinical psychologists.',
    isPrimary: false,
    badge: 'NIMHANS Institute'
  },
  {
    id: 'aasra',
    name: 'AASRA',
    fullTitle: '24/7 Crisis Intervention & Suicide Prevention',
    numbers: ['+91 98204 66726'],
    primaryDial: '+91 98204 66726',
    tel: 'tel:+919820466726',
    type: 'Crisis Intervention Center',
    availability: '24/7 Free & Confidential',
    languages: 'English & Hindi',
    description: 'Compassionate, non-judgmental emotional support for anyone in severe distress or feeling suicidal.',
    isPrimary: false,
    badge: 'Crisis Line'
  },
  {
    id: 'childline',
    name: 'Childline India',
    fullTitle: 'Emergency Helpline for Children & Minors',
    numbers: ['1098'],
    primaryDial: '1098',
    tel: 'tel:1098',
    type: 'Ministry of Women and Child Development',
    availability: '24/7 Toll-Free',
    languages: 'Pan-India',
    description: 'Dedicated crisis, care, and emotional protection helpline for young individuals and children under 18.',
    isPrimary: false,
    badge: 'Youth / Under-18'
  }
];

export const INTERNATIONAL_RESOURCES = {
  usCanada: {
    name: '988 Suicide & Crisis Lifeline',
    dial: '988',
    tel: 'tel:988',
    coverage: 'US & Canada (24/7 Free & Confidential)'
  },
  crisisTextLine: {
    name: 'Crisis Text Line',
    text: 'Text HOME to 741741',
    sms: 'sms:741741?body=HOME',
    coverage: 'US, UK & Canada'
  },
  globalDirectory: {
    name: 'Find A Helpline',
    url: 'https://findahelpline.com',
    coverage: 'Worldwide directories across 130+ countries'
  }
};
