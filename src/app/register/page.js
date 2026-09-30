'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CountryPhoneInput from '../../components/CountryPhoneInput';
import { 
  Users, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, 
  Clock, Calendar, MessageSquare, Mail, Phone, User, 
  ArrowRight, RefreshCw, Check, Heart, ShieldAlert, Award, Headphones, Mic
} from 'lucide-react';

const FALLBACK_GROUPS = [
  {
    id: 'group1',
    number: 1,
    name: 'General Adults (18+)',
    title: 'The Resilience Continuum: Foundational Self-Care',
    duration: '52 Weeks • 10 Mins / Weekend',
    cadence: '1 Weekend Lesson per Week',
    cohortSize: 'Max 6 Adults / Room',
    badge: '52 Weeks',
    accentColor: '#2A9D8F',
    tagBg: '#D8F5EE',
    tagText: '#136A5E',
    borderActive: 'border-[#2A9D8F]',
    bgActive: 'bg-[#F2FBF9]',
    focus: 'Emotional regulation, cognitive defusion, and healthy boundaries for lifelong mental wellness.',
    eligibilityNotice: 'Available to any adult aged 18 and above.'
  },
  {
    id: 'group2',
    number: 2,
    name: 'Parents & Caregivers',
    title: 'The Regulated Parent: Co-Regulation & Family Climate',
    duration: '52 Weeks • 10 Mins / Weekend',
    cadence: '1 Weekend Lesson per Week',
    cohortSize: 'Max 6 Parents / Room',
    badge: '52 Weeks',
    accentColor: '#E59819',
    tagBg: '#FDECCE',
    tagText: '#965507',
    borderActive: 'border-[#E59819]',
    bgActive: 'bg-[#FFFBF3]',
    focus: 'Parental self-regulation, emotion coaching for children, and calm family communication without child diagnosis.',
    eligibilityNotice: 'Exclusively for parents/guardians. Teaches caregiver skills only; never diagnoses minors.'
  },
  {
    id: 'group3',
    number: 3,
    name: 'University & College Students (18+)',
    title: 'Academic Stress, Imposter Syndrome & Social Courage',
    duration: '4 Weeks • 10 Lessons Total',
    cadence: 'Week 1 Daily + Weeks 2–4 Weekend',
    cohortSize: 'Max 6 Students / Room',
    badge: '4 Weeks',
    accentColor: '#8E65E2',
    tagBg: '#ECE4FD',
    tagText: '#5A2DB7',
    borderActive: 'border-[#8E65E2]',
    bgActive: 'bg-[#FAF8FE]',
    focus: 'Study panic de-escalation, imposter syndrome defusion, roommate communication, and campus isolation relief.',
    eligibilityNotice: 'Exclusively for college and graduate students aged 18+.'
  },
  {
    id: 'group4',
    number: 4,
    name: 'Workplace Professionals',
    title: 'Corporate Burnout Recovery & Work-Life Boundaries',
    duration: '4 Weeks • 10 Lessons Total',
    cadence: 'Week 1 Daily + Weeks 2–4 Weekend',
    cohortSize: 'Max 6 Professionals / Room',
    badge: '4 Weeks',
    accentColor: '#3A86C8',
    tagBg: '#DBECFB',
    tagText: '#1A5B96',
    borderActive: 'border-[#3A86C8]',
    bgActive: 'bg-[#F4F8FD]',
    focus: 'Corporate burnout recovery, asynchronous Slack/email firewalls, and guilt-free boundary formulas.',
    eligibilityNotice: 'For working professionals aged 18+. 100% confidential from employers.'
  }
];

const TIME_SLOTS = [
  { id: 'sat_morning', label: 'Saturday Morning', time: '10:00 AM – 10:10 AM', desc: 'Kick off your weekend with clarity and mindful presence' },
  { id: 'sat_afternoon', label: 'Saturday Afternoon', time: '3:00 PM – 3:10 PM', desc: 'Mid-afternoon reflection break and boundary reset' },
  { id: 'sun_morning', label: 'Sunday Morning', time: '10:00 AM – 10:10 AM', desc: 'Calm Sunday habit before household errands or leisure' },
  { id: 'sun_evening', label: 'Sunday Evening', time: '6:00 PM – 6:10 PM', desc: 'Pre-week cognitive decompression and boundary planning' },
];

const WELLNESS_GOALS = [
  'Managing everyday anxiety & nervous system regulation',
  'Setting healthier boundaries with family or colleagues',
  'Recovering from chronic mental burnout and exhaustion',
  'Improving sleep rituals and end-of-day cognitive shutdown',
  'Parenting communication, co-regulation & calm climate',
  'Overcoming imposter syndrome and study/work procrastination',
  'Building a sustainable 10-minute lifelong mental health habit'
];

function RegistrationFormInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const groupParam = searchParams.get('group');
  const validGroupParam = (groupParam && ['group1', 'group2', 'group3', 'group4'].includes(groupParam)) ? groupParam : 'group1';
  const [groups, setGroups] = useState(FALLBACK_GROUPS);
  const [selectedGroup, setSelectedGroup] = useState(validGroupParam);
  const [loadingGroups, setLoadingGroups] = useState(true);

  // Form Fields (Sequential line-by-line)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [is18OrOver, setIs18OrOver] = useState(true);
  const [phone, setPhone] = useState('');
  const [whatsAppOptIn, setWhatsAppOptIn] = useState(true);
  const [timeSlot, setTimeSlot] = useState('sat_morning');
  const [participationStyle, setParticipationStyle] = useState('active_voice');
  const [primaryGoal, setPrimaryGoal] = useState(WELLNESS_GOALS[0]);
  const [notes, setNotes] = useState('');
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(true);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(null);

  // Fetch groups data from Express backend
  useEffect(() => {
    async function loadGroups() {
      try {
        const res = await fetch('/api/groups');

        if (res.ok) {
          const data = await res.json();
          if (data && data.groups && data.groups.length > 0) {
            // merge with color tokens
            const merged = data.groups.map(g => {
              const fallback = FALLBACK_GROUPS.find(f => f.id === g.id) || FALLBACK_GROUPS[0];
              return { ...fallback, ...g };
            });
            setGroups(merged);
          }
        }
      } catch (err) {
        console.warn('Using fallback group list:', err);
      } finally {
        setLoadingGroups(false);
      }
    }
    loadGroups();
  }, []);

  const activeGroupData = groups.find(g => g.id === selectedGroup) || groups[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-flight client checks
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid adult email address.');
      return;
    }

    if (!is18OrOver) {
      setErrorMessage('Under-18 registration notice: Everyday Mental Wellness is strictly designed for adults aged 18 and older. If you or a minor needs immediate emotional support, please call Tele-MANAS (14416 / 1800-891-4416), Childline (1098), or dial 112 (India). (International: 988).');
      return;
    }

    if (!agreedToGuidelines) {
      setErrorMessage('Please confirm that you agree to the peer community guidelines and understand this is an educational program, not clinical therapy.');
      return;
    }

    setSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      whatsAppOptIn,
      groupId: selectedGroup,
      is18OrOver,
      timeSlot,
      participationStyle,
      primaryGoal,
      notes: notes.trim(),
      agreedToGuidelines
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit registration. Please try again.');
      }

      setRegistrationSuccess(result.registration);
      window.scrollTo({ top: 80, behavior: 'smooth' });
    } catch (err) {
      console.error('Registration submission error:', err);
      setErrorMessage(err.message || 'Network error connecting to registration server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Decorative Top Badge & Hero Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF5EF] border border-[#C5E3D2] text-[#29443A] text-xs font-bold mb-3.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
          <span>CONFIDENTIAL ADULT PEER COHORT REGISTRATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#29443A] tracking-normal mb-3">
          Join Your <span className="text-[#2A9D8F]">Wellness Cohort</span>
        </h1>
        <p className="text-[#5F746B] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Reserve your confidential seat in a safe, moderated 6-adult cohort for 10 minutes every weekend. Simple, bite-sized comics and supportive reflection without clinical pressure.
        </p>

        {/* 4-Step Progress Indicator Bar */}
        <div className="mt-7 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#D3DFD7] shadow-xs flex items-center gap-2.5">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2A9D8F] text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0">1</span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#2A9D8F] uppercase tracking-wider block">Step 1</span>
              <span className="text-xs font-bold text-[#29443A] truncate block">Profile</span>
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#D3DFD7] shadow-xs flex items-center gap-2.5">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E59819] text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0">2</span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#E59819] uppercase tracking-wider block">Step 2</span>
              <span className="text-xs font-bold text-[#29443A] truncate block">Track</span>
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#D3DFD7] shadow-xs flex items-center gap-2.5">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#3A86C8] text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0">3</span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#3A86C8] uppercase tracking-wider block">Step 3</span>
              <span className="text-xs font-bold text-[#29443A] truncate block">Slot</span>
            </div>
          </div>
          <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#D3DFD7] shadow-xs flex items-center gap-2.5">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#8E65E2] text-white flex items-center justify-center text-xs font-bold shadow-xs flex-shrink-0">4</span>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#8E65E2] uppercase tracking-wider block">Step 4</span>
              <span className="text-xs font-bold text-[#29443A] truncate block">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert Box */}
      {errorMessage && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#FDF4F4] border border-[#E8B8B8] text-[#A94E4E] text-sm flex items-start gap-3 shadow-xs animate-fade-in">
          <AlertCircle className="w-5 h-5 text-[#B85C5C] flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block font-bold text-sm sm:text-base mb-0.5">Please review your information:</strong>
            <span className="leading-relaxed text-xs sm:text-sm">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION STATE */}
      {registrationSuccess ? (
        <div className="bg-[#FFFFFF] border-2 border-[#2A9D8F] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-md text-center animate-fade-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E2F7F4] border-2 border-[#2A9D8F] flex items-center justify-center mx-auto mb-4 text-[#2A9D8F] shadow-xs">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-[#E2F7F4] text-[#136A5E] text-xs font-bold uppercase tracking-wider mb-2">
            Registration Confirmed • Live Seat Allocated
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-[#29443A] mb-2.5">
            Welcome to the Cohort, {registrationSuccess.fullName}!
          </h2>

          <p className="text-[#5F746B] text-xs sm:text-sm max-w-lg mx-auto mb-6 leading-relaxed">
            Your confidential seat has been reserved in our moderated adult peer room. You are all set for your upcoming weekend 10-minute micro-learning session.
          </p>

          {/* Admission Pass Details */}
          <div className="max-w-lg mx-auto bg-[#F8F7F2] border border-[#D3DFD7] rounded-2xl p-5 sm:p-6 text-left mb-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D3DFD7] pb-3.5 mb-3.5">
              <div>
                <span className="text-[11px] uppercase font-bold text-[#5F746B] tracking-wider block">Registration Reference</span>
                <span className="font-mono font-bold text-base sm:text-lg text-[#2A9D8F]">{registrationSuccess.registrationNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase font-bold text-[#5F746B] tracking-wider block">Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#136A5E] bg-[#D8F5EE] px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Confirmed Seat
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-3.5">
              <div>
                <span className="text-[#5F746B] block text-xs font-semibold">Selected Learning Track</span>
                <span className="font-bold text-[#29443A] text-sm sm:text-base block mt-0.5">{registrationSuccess.groupName}</span>
              </div>
              <div>
                <span className="text-[#5F746B] block text-xs font-semibold">Assigned Peer Room</span>
                <span className="font-mono font-bold text-[#2A9D8F] text-sm sm:text-base block mt-0.5">
                  {registrationSuccess.cohortCode} (Seat {registrationSuccess.seatNumber} of 6)
                </span>
              </div>
              <div>
                <span className="text-[#5F746B] block text-xs font-semibold">Weekend Time Slot</span>
                <span className="font-semibold text-[#29443A] block mt-0.5">{registrationSuccess.timeSlotLabel}</span>
              </div>
              <div>
                <span className="text-[#5F746B] block text-xs font-semibold">Participation Style</span>
                <span className="font-semibold text-[#29443A] block mt-0.5">{registrationSuccess.participationStyleLabel}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[#5F746B] block text-xs font-semibold">Registered Contact</span>
                <span className="font-semibold text-[#29443A] block mt-0.5">{registrationSuccess.email}</span>
              </div>
              {registrationSuccess.phone && (
                <div className="sm:col-span-2">
                  <span className="text-[#5F746B] block text-xs font-semibold">WhatsApp Reminder</span>
                  <span className="font-semibold text-[#29443A] block mt-0.5">
                    {registrationSuccess.phone} {registrationSuccess.whatsAppOptIn ? '• 1-Minute Alert Enabled' : ''}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#D3DFD7] flex items-center gap-2 text-xs text-[#5F746B]">
              <ShieldCheck className="w-4 h-4 text-[#2A9D8F] flex-shrink-0" />
              <span>Peer Room Privacy: Your contact information is never shared with other participants.</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/classroom"
              className="btn-primary-glow px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <span>Enter Learner Classroom</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tracks"
              className="px-6 py-3.5 rounded-full bg-white border border-[#D3DFD7] text-[#29443A] text-xs sm:text-sm font-bold hover:bg-[#EEF3EF] transition-colors"
            >
              <span>View All 4 Tracks</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setRegistrationSuccess(null);
                setFullName('');
                setEmail('');
                setPhone('');
              }}
              className="text-xs text-[#5F746B] hover:text-[#29443A] underline px-2 py-1.5 cursor-pointer"
            >
              Register another adult learner
            </button>
          </div>
        </div>
      ) : (
        /* SPACIOUS, POLISHED SEQUENTIAL REGISTRATION FORM */
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

          {/* STEP 1: LEARNER DETAILS (FRESH MINT / SAGE ACCENTS) */}
          <div className="bg-white border border-[#D3DFD7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs relative">
            {/* Top Color Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2A9D8F] to-[#4F7462] rounded-t-2xl sm:rounded-t-3xl" />

            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#EEF3EF]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#E2F7F4] text-[#136A5E] flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                1
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#29443A]">
                  Step 1 • Your Learner Information
                </h2>
                <p className="text-xs text-[#5F746B]">
                  Confidential details to setup your personalized peer room credentials.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29443A] mb-1.5">
                  <User className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Full / Preferred Name <span className="text-[#B85C5C]">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full h-12 sm:h-[50px] px-4 rounded-xl bg-white border border-[#D3DFD7] text-[#29443A] text-sm sm:text-base placeholder:text-[#94A79C] focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/15 transition-all shadow-xs"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#29443A] mb-1.5">
                  <Mail className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Confidential Email Address <span className="text-[#B85C5C]">*</span></span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@domain.com"
                  className="w-full h-12 sm:h-[50px] px-4 rounded-xl bg-white border border-[#D3DFD7] text-[#29443A] text-sm sm:text-base placeholder:text-[#94A79C] focus:outline-none focus:border-[#2A9D8F] focus:ring-2 focus:ring-[#2A9D8F]/15 transition-all shadow-xs"
                />
                <p className="text-[11px] text-[#5F746B] mt-1 pl-0.5 leading-normal">
                  We use this email to send your private cohort calendar invite and weekly comic summary.
                </p>
              </div>

              {/* Age 18+ Confirmation Card */}
              <div className="p-4 sm:p-4.5 rounded-xl bg-[#F2F8F5] border border-[#CDE3D7] flex items-start gap-3">
                <input
                  type="checkbox"
                  id="age-verify-checkbox"
                  checked={is18OrOver}
                  onChange={(e) => setIs18OrOver(e.target.checked)}
                  className="mt-0.5 w-4.5 h-4.5 rounded border-[#2A9D8F] text-[#2A9D8F] focus:ring-[#2A9D8F] cursor-pointer flex-shrink-0"
                />
                <div>
                  <label htmlFor="age-verify-checkbox" className="cursor-pointer select-none">
                    <span className="text-xs sm:text-sm font-bold text-[#136A5E] block">
                      Adult Learner Verification (Age 18+) <span className="text-[#B85C5C]">*</span>
                    </span>
                    <span className="text-xs text-[#3E6554] block mt-0.5 leading-relaxed">
                      I confirm that I am 18 years of age or older. Everyday Mental Wellness is strictly structured for adult participants.
                    </span>
                  </label>
                </div>
              </div>

              {/* WhatsApp Notification Card */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAF9] border border-[#D3DFD7] transition-all">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="whatsapp-optin-checkbox"
                    checked={whatsAppOptIn}
                    onChange={(e) => setWhatsAppOptIn(e.target.checked)}
                    className="mt-0.5 w-4.5 h-4.5 rounded border-[#789B87] text-[#2A9D8F] focus:ring-[#2A9D8F] cursor-pointer flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor="whatsapp-optin-checkbox" className="cursor-pointer select-none block">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#29443A]">
                          WhatsApp 1-Minute Session Reminders (Optional)
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF7F2] text-[#136A5E] text-[10px] sm:text-[11px] font-semibold border border-[#CDE3D7]">
                          <ShieldCheck className="w-3 h-3 text-[#2A9D8F]" />
                          <span>Spam-Free Guarantee</span>
                        </span>
                      </div>
                      <p className="text-xs text-[#5F746B] mt-1 leading-relaxed">
                        Receive a direct 1-tap join link on WhatsApp exactly 1 minute before your scheduled 10-minute weekend room.
                      </p>
                    </label>

                    {/* Integrated Standardized Phone Input */}
                    {whatsAppOptIn && (
                      <div className="mt-3.5 pt-3.5 border-t border-[#E8EFEA] max-w-md">
                        <label htmlFor="reg-phone-input" className="block text-xs font-semibold text-[#29443A] mb-1.5">
                          Mobile Phone Number
                        </label>
                        <CountryPhoneInput
                          id="reg-phone-input"
                          value={phone}
                          onChange={(val) => setPhone(val)}
                          placeholder="98765 43210"
                          helperText="India (+91) selected by default. Enter your 10-digit mobile number."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: CHOOSE YOUR LEARNING GROUP (WARM AMBER / DISTINCT TRACK COLORS) */}
          <div className="bg-white border border-[#D3DFD7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs relative">
            {/* Top Color Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E59819] to-[#F4B84B] rounded-t-2xl sm:rounded-t-3xl" />

            <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-[#EEF3EF]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FEF6E9] text-[#A6620C] flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                  2
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#29443A]">
                    Step 2 • Choose Your Adult Cohort Track
                  </h2>
                  <p className="text-xs text-[#5F746B]">
                    Select the specific curriculum built for your adult life stage.
                  </p>
                </div>
              </div>

              {loadingGroups && (
                <span className="text-xs text-[#5F746B] flex items-center gap-1.5 bg-[#F8F7F2] px-2.5 py-1 rounded-full border border-[#D3DFD7]">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E59819]" /> Syncing...
                </span>
              )}
            </div>

            <div className="space-y-3.5">
              {groups.map((grp) => {
                const isSelected = selectedGroup === grp.id;
                return (
                  <div
                    key={grp.id}
                    onClick={() => setSelectedGroup(grp.id)}
                    className={`p-4 sm:p-5 rounded-xl border-2 text-left cursor-pointer transition-all ${
                      isSelected
                        ? `${grp.borderActive} ${grp.bgActive} shadow-xs ring-1 ring-opacity-20`
                        : 'bg-white border-[#D3DFD7] hover:border-[#B8CBC0] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0"
                          style={{ borderColor: grp.accentColor, backgroundColor: isSelected ? grp.accentColor : 'white' }}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span 
                          className="font-bold text-[11px] px-2.5 py-0.5 rounded-full border flex-shrink-0"
                          style={{ backgroundColor: grp.tagBg, color: grp.tagText, borderColor: grp.accentColor + '40' }}
                        >
                          Group {grp.number} • {grp.badge}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-[#29443A] truncate">
                          {grp.name}
                        </h3>
                      </div>

                      {/* Live Seat Pulse Tag */}
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#D3DFD7] text-[#29443A] flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                        {grp.availableSeats !== undefined ? `${grp.availableSeats} of 6 seats open` : grp.cohortSize}
                      </span>
                    </div>

                    <p className="text-xs font-semibold pl-7 mb-1" style={{ color: grp.accentColor }}>
                      {grp.title}
                    </p>
                    <p className="text-xs text-[#5F746B] pl-7 leading-relaxed mb-2.5">
                      {grp.focus}
                    </p>

                    <div className="pl-7 flex items-center justify-between text-xs text-[#667C72] pt-2 border-t border-[#D3DFD7]/50">
                      <span className="font-medium flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3.5 h-3.5" style={{ color: grp.accentColor }} />
                        {grp.duration}
                      </span>
                      <span className="font-medium text-[#4F7462] text-[11px]">
                        {grp.cadence}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedGroup === 'group2' && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-[#FEF6E9] border border-[#FBD9A5] text-xs text-[#8C4A05] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#E59819] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Caregiver Scope Notice:</strong> This track equips parents and caregivers with supportive communication and emotional climate tools. It strictly does not diagnose minor children or create child accounts.
                </span>
              </div>
            )}
          </div>

          {/* STEP 3: SCHEDULE & VOICE STYLE (SKY BLUE & TEAL ACCENTS) */}
          <div className="bg-white border border-[#D3DFD7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs relative">
            {/* Top Color Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3A86C8] to-[#1B6370] rounded-t-2xl sm:rounded-t-3xl" />

            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#EEF3EF]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EBF3FE] text-[#1E56A0] flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                3
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#29443A]">
                  Step 3 • Weekend Schedule &amp; Voice Comfort
                </h2>
                <p className="text-xs text-[#5F746B]">
                  Pick your preferred 10-minute slot and sharing style.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Weekend Time Slots */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#29443A] mb-2.5">
                  Preferred Weekend 10-Minute Time Slot <span className="text-[#B85C5C]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => {
                    const isSlotSelected = timeSlot === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => setTimeSlot(slot.id)}
                        className={`p-4 rounded-xl border-2 text-left cursor-pointer transition-all ${
                          isSlotSelected
                            ? 'bg-[#EBF3FE] border-[#3A86C8] shadow-xs'
                            : 'bg-white border-[#D3DFD7] hover:border-[#BCD4FA] hover:bg-[#F9FBFE]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-xs sm:text-sm text-[#29443A]">{slot.label}</span>
                          <span className="font-mono text-[11px] font-bold text-[#1E56A0] bg-white px-2 py-0.5 rounded border border-[#D3DFD7]">
                            {slot.time}
                          </span>
                        </div>
                        <p className="text-xs text-[#5F746B] leading-relaxed">{slot.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Participation Style */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#29443A] mb-2.5">
                  Peer Room Participation Comfort Level <span className="text-[#B85C5C]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setParticipationStyle('active_voice')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      participationStyle === 'active_voice'
                        ? 'bg-[#EBF3FE] border-[#3A86C8] shadow-xs'
                        : 'bg-white border-[#D3DFD7] hover:border-[#BCD4FA]'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-[#29443A] mb-1 flex items-center gap-2">
                      <Mic className="w-4 h-4 text-[#3A86C8]" />
                      <span>Active Voice Room</span>
                    </div>
                    <p className="text-xs text-[#5F746B] leading-relaxed">
                      Happy to share a brief 1-minute comic takeaway in the 4-minute moderated audio room.
                    </p>
                  </div>

                  <div
                    onClick={() => setParticipationStyle('listener_first')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      participationStyle === 'listener_first'
                        ? 'bg-[#EBF3FE] border-[#3A86C8] shadow-xs'
                        : 'bg-white border-[#D3DFD7] hover:border-[#BCD4FA]'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-[#29443A] mb-1 flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-[#3A86C8]" />
                      <span>Listener First Mode</span>
                    </div>
                    <p className="text-xs text-[#5F746B] leading-relaxed">
                      Prefer to listen and read along with cohort peers first, speaking only whenever comfortable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: GOALS & COMMUNITY AGREEMENT (LAVENDER & FOREST ACCENTS) */}
          <div className="bg-white border border-[#D3DFD7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs relative">
            {/* Top Color Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8E65E2] to-[#29443A] rounded-t-2xl sm:rounded-t-3xl" />

            <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[#EEF3EF]">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ECE4FD] text-[#5A2DB7] flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                4
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#29443A]">
                  Step 4 • Your Goals &amp; Community Guidelines
                </h2>
                <p className="text-xs text-[#5F746B]">
                  Tailor your habit and acknowledge safe educational boundaries.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Primary Goal */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#29443A] mb-1.5">
                  Primary Wellness Focus or Behavioral Goal
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full h-12 sm:h-[50px] px-4 rounded-xl bg-white border border-[#D3DFD7] text-[#29443A] text-xs sm:text-sm focus:outline-none focus:border-[#8E65E2] focus:ring-2 focus:ring-[#8E65E2]/15 transition-all shadow-xs"
                >
                  {WELLNESS_GOALS.map((goal, idx) => (
                    <option key={idx} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>

              {/* Optional Accommodations */}
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#29443A] mb-1.5">
                  Optional Questions or Accommodations
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any accessibility needs, scheduling notes, or questions for your cohort moderator..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D3DFD7] text-[#29443A] text-xs sm:text-sm placeholder:text-[#94A79C] focus:outline-none focus:border-[#8E65E2] focus:ring-2 focus:ring-[#8E65E2]/15 transition-all shadow-xs"
                />
              </div>

              {/* Community & Safety Agreement */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#F8F7F2] border border-[#D3DFD7]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedToGuidelines}
                    onChange={(e) => setAgreedToGuidelines(e.target.checked)}
                    className="mt-0.5 w-4.5 h-4.5 rounded border-[#789B87] text-[#2A9D8F] focus:ring-[#2A9D8F] cursor-pointer flex-shrink-0"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#29443A] block">
                      Community Agreement &amp; Educational Scope Acknowledgment <span className="text-[#B85C5C]">*</span>
                    </span>
                    <span className="text-xs text-[#5F746B] block mt-1 leading-relaxed">
                      I understand that Everyday Mental Wellness is an educational micro-learning program and does not provide psychotherapy, medical treatment, or emergency crisis intervention. For urgent crises in India, immediate 24/7 support is available via Tele-MANAS (14416 / 1800-891-4416), KIRAN (1800-599-0019), or 112. (International: 988).
                    </span>
                  </div>
                </label>
              </div>

              {/* Prominent High-Contrast Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-13 sm:h-14 rounded-xl text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg disabled:opacity-60 transition-all cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #1F362E 0%, #2A5445 50%, #2A9D8F 100%)',
                  }}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Allocating Your Cohort Seat...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Registration ({activeGroupData.name})</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3.5 text-xs text-[#5F746B]">
                  <span className="flex items-center gap-1.5 font-semibold text-[#136A5E]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    100% Confidential
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#A6620C]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E59819]" />
                    Instant Cohort Assignment
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[#1E56A0]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3A86C8]" />
                    Zero Cost / No Card Required
                  </span>
                </div>
              </div>
            </div>
          </div>

        </form>
      )}

      {/* Safety Signpost Bar */}
      <div className="mt-10 text-center text-xs sm:text-sm text-[#5F746B] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#2A9D8F]" />
        <span>In crisis in India? Call <strong>14416</strong> (Tele-MANAS, 24/7 Free) or dial <strong>112</strong>. International: Call or text <strong>988</strong> for suicide and mental health lifeline support.</span>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />
      <main className="subpage-main py-6">
        <Suspense fallback={<div className="container py-20 text-center text-[#5F746B]">Loading Group Registration...</div>}>
          <RegistrationFormInner />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
