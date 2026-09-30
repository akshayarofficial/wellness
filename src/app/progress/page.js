'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  Award, BookOpen, CheckCircle2, Calendar, Clock, ArrowRight, 
  Sparkles, ShieldCheck, MessageSquare, Lock, PlayCircle, UserCheck
} from 'lucide-react';
import { getWellnessState } from '../../lib/wellnessStore';
import { PROGRAM_STREAMS, WEEKEND_SESSION_SLOTS } from '../../lib/wellnessData';

export default function ProgressPage() {
  const [state] = useState(() => getWellnessState());

  if (!state) return null;

  const isFourWeekCourse = state.enrollment.groupId === 'group3' || state.enrollment.groupId === 'group4';
  const totalRequired = isFourWeekCourse ? 10 : 52;
  const completedCount = state.learning.completedCount || 1;
  const progressPercent = Math.min(100, Math.round((completedCount / totalRequired) * 100));
  const isFullyComplete = completedCount >= totalRequired;

  const stream = PROGRAM_STREAMS.find(s => s.id === state.enrollment.groupId) || PROGRAM_STREAMS[0];
  const slot = WEEKEND_SESSION_SLOTS.find(s => s.id === state.enrollment.selectedSlot) || WEEKEND_SESSION_SLOTS[0];

  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main container max-w-5xl mx-auto py-12 px-4 sm:px-8">
        <div className="space-y-10">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#D3DFD7]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-bold mb-3 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#4F7462]" />
                <span>PERSONAL LEARNING DASHBOARD</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#29443A] tracking-normal mb-2">
                My Learning <span className="text-[#4F7462]">Progress</span>
              </h1>
              <p className="text-sm sm:text-base text-[#5F746B] leading-relaxed max-w-xl">
                Welcome back, {state.user.name || 'Learner'}. Track your weekly micro-learning habits, cohort schedule, and completion credentials.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/classroom"
                className="btn-primary-glow text-sm py-3.5 px-7 rounded-full font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Enter Classroom</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Large Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Completed Lessons */}
            <MagicalCard className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-sm flex flex-col justify-between" maxTilt={3}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EEF3EF] text-[#4F7462] flex items-center justify-center mx-auto mb-4 border border-[#D3DFD7]">
                  <BookOpen className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase font-bold text-[#5F746B] tracking-wider block mb-1">
                  Lessons Completed
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#29443A] font-mono my-2">
                  {completedCount} <span className="text-xl text-[#789B87] font-sans">/ {totalRequired}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-[#EEF3EF]">
                <span className="text-xs text-[#4F7462] font-bold">
                  {isFullyComplete ? '✓ 100% Completed' : `${totalRequired - completedCount} weekly lessons to go`}
                </span>
              </div>
            </MagicalCard>

            {/* Card 2: Quiz Mastery */}
            <MagicalCard className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-sm flex flex-col justify-between" maxTilt={3}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EEF3EF] text-[#4F7462] flex items-center justify-center mx-auto mb-4 border border-[#D3DFD7]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase font-bold text-[#5F746B] tracking-wider block mb-1">
                  Quiz Mastery
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#29443A] font-mono my-2">
                  {completedCount} <span className="text-xl text-[#789B87] font-sans">/ {totalRequired}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-[#EEF3EF]">
                <span className="text-xs text-[#4F7462] font-bold">
                  Immediate Takeaway Feedback
                </span>
              </div>
            </MagicalCard>

            {/* Card 3: Total Progress Bar */}
            <MagicalCard className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-sm flex flex-col justify-between" maxTilt={3}>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EEF3EF] text-[#4F7462] flex items-center justify-center mx-auto mb-4 border border-[#D3DFD7]">
                  <Sparkles className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase font-bold text-[#5F746B] tracking-wider block mb-1">
                  Overall Completion
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#29443A] font-mono my-2">
                  {progressPercent}%
                </div>
              </div>
              <div className="w-full bg-[#EEF3EF] h-3 rounded-full overflow-hidden mt-2 border border-[#D3DFD7]">
                <div 
                  className="bg-[#4F7462] h-full rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </MagicalCard>

            {/* Card 4: Official Certificate */}
            <MagicalCard className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-sm flex flex-col justify-between" maxTilt={3}>
              <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#D3DFD7] ${
                  isFullyComplete ? 'bg-[#EEF3EF] text-[#4F7462]' : 'bg-[#EEF3EF] text-[#667C72]'
                }`}>
                  {isFullyComplete ? <Award className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                </div>
                <span className="text-xs uppercase font-bold text-[#5F746B] tracking-wider block mb-1">
                  Credential Status
                </span>
                <div className="text-lg sm:text-xl font-bold text-[#29443A] my-2">
                  {isFullyComplete ? 'Unlocked!' : `${stream.badge} Track`}
                </div>
              </div>
              <div className="pt-3 border-t border-[#EEF3EF]">
                <Link 
                  href="/certificate" 
                  className="text-xs text-[#4F7462] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>{isFullyComplete ? 'View Official Certificate' : 'Certificate Criteria'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </MagicalCard>
          </div>

          {/* Active Course & Cohort Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Active Enrolled Stream (7 Cols) */}
            <div className="lg:col-span-7">
              <MagicalCard className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] h-full shadow-sm flex flex-col justify-between" maxTilt={1.5}>
                <div>
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#EEF3EF]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F7462]">
                      Currently Enrolled Learning Track
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-xs font-bold text-[#4F7462] inline-flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5" />
                      Active Cohort
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#29443A] mb-2 leading-snug">
                    {stream.name} (Group {stream.number})
                  </h3>
                  <p className="text-sm font-semibold text-[#4F7462] mb-3">
                    {stream.title}
                  </p>
                  <p className="text-sm text-[#5F746B] mb-6 leading-relaxed">
                    {stream.focus}
                  </p>

                  <div className="p-5 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] space-y-3.5 text-sm mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5F746B]">Cadence:</span>
                      <span className="font-semibold text-[#29443A]">{stream.cadenceText}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5F746B]">Session Format:</span>
                      <span className="font-semibold text-[#29443A]">6-Tile Comic + 6-Person Voice Room</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5F746B]">Enrollment Status:</span>
                      <span className="font-mono text-[#4F7462] font-bold">Confirmed Seat</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/classroom"
                  className="w-full py-4 rounded-2xl btn-primary-glow text-sm font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Resume Lesson 01 in Virtual Classroom</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagicalCard>
            </div>

            {/* Right: Cohort Schedule & WhatsApp Status (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              {/* Weekend Time Card */}
              <div className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm">
                <div className="flex items-center gap-2.5 mb-3">
                  <Calendar className="w-5 h-5 text-[#4F7462]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4F7462]">
                    Weekend Cohort Schedule
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-[#29443A] mb-1.5">{slot.label}</div>
                <p className="text-xs sm:text-sm text-[#5F746B] mb-4 leading-relaxed">
                  Timezone: <strong>{state.user.timezone}</strong> <br />
                  Universal Sync: {slot.timeProviderUTC}
                </p>
                <Link href="/register" className="text-xs font-bold text-[#4F7462] hover:underline inline-flex items-center gap-1">
                  <span>Modify cohort or time slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* WhatsApp Notification Card */}
              <div className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-5 h-5 text-[#4F7462]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4F7462]">
                      WhatsApp Reminders
                    </span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    state.enrollment.whatsAppOptIn ? 'bg-[#DDE9E2] text-[#4F7462]' : 'bg-[#FDF4F4] text-[#B85C5C]'
                  }`}>
                    {state.enrollment.whatsAppOptIn ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5F746B] mb-4 leading-relaxed">
                  {state.enrollment.whatsAppOptIn 
                    ? `Join link is automatically sent 1 minute before your scheduled room to ${state.enrollment.whatsAppPhone || 'your registered phone'}.`
                    : 'WhatsApp reminders currently disabled. Enter directly via the classroom page on weekends.'}
                </p>
                <Link href="/register" className="text-xs font-bold text-[#4F7462] hover:underline inline-flex items-center gap-1">
                  <span>Manage notification preferences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Safeguarding Card */}
              <div className="p-6 rounded-3xl bg-[#EEF3EF] border border-[#D3DFD7] text-xs text-[#29443A] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#4F7462] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Safe &amp; Educational:</strong> All peer sessions are low-pressure, moderated, and strictly focused on resilience skills. Never psychotherapy or diagnosis.
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
