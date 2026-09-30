'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import CountryPhoneInput from '../../components/CountryPhoneInput';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Sparkles, 
  AlertCircle, MessageSquare, Mail 
} from 'lucide-react';
import { PROGRAM_STREAMS } from '../../lib/wellnessData';
import { createEnrollment } from '../../lib/wellnessStore';

function EnrollForm() {
  const searchParams = useSearchParams();
  const groupFromUrl = searchParams.get('group');
  const validGroup = groupFromUrl && PROGRAM_STREAMS.some(s => s.id === groupFromUrl) ? groupFromUrl : null;
  const [userSelectedGroup, setUserSelectedGroup] = useState(null);
  const selectedGroup = userSelectedGroup || validGroup || 'group1';
  const setSelectedGroup = setUserSelectedGroup;

  const [email, setEmail] = useState('');
  const [is18OrOver, setIs18OrOver] = useState(true);
  const [whatsAppOptIn, setWhatsAppOptIn] = useState(true);
  const [whatsAppPhone, setWhatsAppPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [enrollResult, setEnrollResult] = useState(null);

  const activeStream = PROGRAM_STREAMS.find(s => s.id === selectedGroup) || PROGRAM_STREAMS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Strict Age Check
    if (!is18OrOver) {
      setErrorMsg('Under-18 registration notice: Everyday Mental Wellness is strictly designed for adults aged 18 and older. If you or a young person needs support, please contact Tele-MANAS (14416 / 1800-891-4416), Childline (1098), or dial 112 (India). (International: 988).');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid adult email address.');
      return;
    }

    if (whatsAppOptIn && !whatsAppPhone) {
      setErrorMsg('Please enter your mobile phone number for WhatsApp session reminders, or uncheck the opt-in.');
      return;
    }

    try {
      const res = createEnrollment({
        groupId: selectedGroup,
        email,
        is18OrOver,
        whatsAppOptIn,
        whatsAppPhone
      });
      setEnrollResult(res);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="container py-8 sm:py-10">
      <div className="max-w-3xl mx-auto">
        {/* Primary Flow Callout */}
        <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#EEF3EF] border border-[#789B87]/60 text-[#29443A] text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F7462] flex-shrink-0 animate-pulse" />
            <span>Looking for cohort assignment with real-time room capacity? Use our primary <strong>Group Registration</strong> page.</span>
          </div>
          <Link href="/register" className="btn-primary-glow text-xs py-1.5 px-3.5 rounded-full font-bold flex items-center gap-1.5 flex-shrink-0 shadow-xs">
            <span>Open Registration</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Page Banner Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>ACCOUNT ENROLLMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#29443A] tracking-tight mb-2">
            Enroll in Your <span className="text-[#4F7462]">Learning Path</span>
          </h1>
          <p className="text-[#5F746B] text-xs sm:text-sm max-w-lg mx-auto">
            100% confidential. No clinical diagnosis. Choose your stage of adult life.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FDF4F4] border border-[#E8B8B8] text-[#A94E4E] text-xs flex items-start gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 text-[#B85C5C] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Eligibility Notice:</strong>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        <MagicalCard className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm" maxTilt={2}>
          {enrollResult ? (
            /* Enrollment Success State */
            <div className="text-center py-6 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center mx-auto mb-4 text-[#4F7462]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#29443A] mb-2">
                Pending Enrollment Created!
              </h2>
              <p className="text-[#5F746B] text-xs max-w-md mx-auto mb-6">
                We have registered your pending seat for <strong>{enrollResult.enrollment.streamName}</strong>. 
                A secure one-time password setup link has been prepared for <strong>{email}</strong>.
              </p>

              {/* Activation Link Box */}
              <div className="p-5 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-left mb-6 max-w-lg mx-auto">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4F7462] mb-2">
                  <Mail className="w-4 h-4" />
                  <span>Activation Email Link</span>
                </div>
                <p className="text-[11px] text-[#5F746B] mb-3">
                  Subject: Activate your Everyday Mental Wellness account • Set your password
                </p>
                <Link
                  href={`/activate?token=${enrollResult.token}`}
                  className="btn-primary-glow text-xs py-2.5 px-5 rounded-xl inline-flex items-center gap-1.5 font-bold shadow-xs"
                >
                  <span>Click Activation Link to Set Password</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="text-xs text-[#5F746B]">
                <span>Next steps: Set password → Select weekend time window → Enter classroom</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Select Stream */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-2">
                  1. Select Your Learning Stream (4 Adult Paths)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROGRAM_STREAMS.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedGroup(st.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedGroup === st.id
                          ? 'bg-[#DDE9E2] border-2 border-[#4F7462] text-[#29443A] shadow-xs'
                          : 'bg-[#FFFFFF] border-[#D3DFD7] text-[#5F746B] hover:border-[#789B87] hover:bg-[#F8F7F2]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#4F7462] text-xs">Group {st.number}</span>
                        <span className="text-[10px] font-mono bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#D3DFD7] text-[#29443A]">
                          {st.badge}
                        </span>
                      </div>
                      <div className="font-bold text-sm text-[#29443A]">{st.name}</div>
                      <div className="text-[11px] text-[#5F746B] mt-1 leading-snug">{st.focus}</div>
                    </button>
                  ))}
                </div>

                {/* Group 2 Non-Diagnostic Safeguard Notice */}
                {selectedGroup === 'group2' && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-xs text-[#29443A] flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#4F7462] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Group 2 Notice:</strong> This track equips parents and caregivers with supportive communication and emotional climate skills. It does not diagnose minor children or create child accounts.
                    </span>
                  </div>
                )}
              </div>

              {/* 2. Adult Age Confirmation */}
              <div className="p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={is18OrOver}
                    onChange={(e) => setIs18OrOver(e.target.checked)}
                    className="mt-1 rounded border-[#789B87] text-[#4F7462] focus:ring-[#4F7462]"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#29443A] block">
                      Adult Eligibility Confirmation (Required: Age 18+)
                    </span>
                    <span className="text-[11px] text-[#5F746B] block mt-0.5">
                      I confirm I am 18 years of age or older. I understand this is an educational wellness literacy program and not a psychotherapy or medical service.
                    </span>
                  </div>
                </label>
              </div>

              {/* 3. Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-1.5">
                  2. Confidential Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-[#29443A] text-sm focus:outline-none focus:border-[#4F7462]"
                />
                <span className="text-[11px] text-[#667C72] mt-1 block">
                  Used solely for your password activation link and booking receipts. Zero marketing spam.
                </span>
              </div>

              {/* 3. WhatsApp Reminder Opt-In Card */}
              <div className="p-4 rounded-2xl bg-[#F8FBF9] border border-[#C5E3D2] transition-all">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="enroll-whatsapp-optin"
                    checked={whatsAppOptIn}
                    onChange={(e) => setWhatsAppOptIn(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#2A9D8F] text-[#2A9D8F] focus:ring-[#2A9D8F] cursor-pointer flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor="enroll-whatsapp-optin" className="cursor-pointer select-none block">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#136A5E]">
                          WhatsApp 1-Minute Session Reminders (Optional)
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#E5F9ED] text-[#128C4A] text-[10px] font-semibold border border-[#BDEBD0]">
                          <ShieldCheck className="w-2.5 h-2.5 text-[#128C4A]" />
                          <span>Spam-Free</span>
                        </span>
                      </div>
                      <span className="text-[11px] text-[#3E6554] block mt-0.5 leading-relaxed">
                        Automated join link sent 1 min before your scheduled weekend room.
                      </span>
                    </label>

                    {whatsAppOptIn && (
                      <div className="mt-3 pt-2.5 border-t border-[#DDECE4]">
                        <CountryPhoneInput
                          value={whatsAppPhone}
                          onChange={(val) => setWhatsAppPhone(val)}
                          placeholder="98765 43210"
                          helperText="India (+91) selected by default. Type your 10-digit mobile number."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full btn-primary-glow text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Continue Registration for Group {activeStream.number}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </MagicalCard>
      </div>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />
      <main className="subpage-main">
        <Suspense fallback={<div className="container py-20 text-center">Loading enrollment...</div>}>
          <EnrollForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
