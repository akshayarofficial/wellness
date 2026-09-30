'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  Calendar, Globe, CheckCircle2, ArrowRight, Sparkles, 
  Info 
} from 'lucide-react';
import { WEEKEND_SESSION_SLOTS } from '../../lib/wellnessData';
import { getWellnessState, saveWellnessState } from '../../lib/wellnessStore';

export default function SchedulePage() {
  const [state] = useState(() => getWellnessState());
  const [selectedSlot, setSelectedSlot] = useState(() => getWellnessState().enrollment.selectedSlot || 'sat-10am');
  const [localTz] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata (IST)';
    } catch {
      return 'Asia/Kolkata (IST)';
    }
  });
  const [saved, setSaved] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!state) return;
    const updated = { ...state };
    updated.enrollment.selectedSlot = selectedSlot;
    updated.user.timezone = localTz;
    saveWellnessState(updated);
    setSaved(true);
  };

  const isFourWeekCourse = state?.enrollment.groupId === 'group3' || state?.enrollment.groupId === 'group4';

  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
              <span>WEEKEND COHORT SCHEDULING</span>
            </div>
            <h1 className="text-3xl font-black text-[#29443A] tracking-tight mb-2">
              Select Your <span className="text-[#4F7462]">Session Window</span>
            </h1>
            <p className="text-[#5F746B] text-xs max-w-md mx-auto">
              Small 6-person peer groups matched in your local timezone for reliable weekend routines.
            </p>
          </div>

          <MagicalCard className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm" maxTilt={2}>
            {/* Timezone Identification Bar */}
            <div className="mb-6 p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#4F7462]" />
                <div>
                  <span className="text-[#5F746B] block text-[11px]">Your Detected Local Timezone:</span>
                  <span className="font-bold text-[#29443A] text-xs">{localTz}</span>
                </div>
              </div>
              <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#D3DFD7]">
                <span className="text-[#5F746B] block text-[11px]">Provider Server Reference:</span>
                <span className="font-mono text-[#4F7462] text-xs font-bold">04:30 AM / 09:30 AM UTC</span>
              </div>
            </div>

            {/* Course Cadence Notice */}
            {isFourWeekCourse ? (
              <div className="mb-6 p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-xs text-[#29443A] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#4F7462] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">4-Week Intensive Cadence:</strong>
                  <span className="text-[#5F746B]">
                    Week 1 consists of 7 daily self-paced lessons. Weeks 2 through 4 feature one scheduled weekend micro-class in your chosen slot below.
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-xs text-[#29443A] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#4F7462] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-0.5">52-Week Cadence Structure:</strong>
                  <span className="text-[#5F746B]">
                    One 10-minute micro-learning session per week on your chosen weekend slot for 52 weeks.
                  </span>
                </div>
              </div>
            )}

            {saved ? (
              <div className="text-center py-6 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center mx-auto mb-4 text-[#4F7462]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#29443A] mb-2">Session Time Locked!</h3>
                <p className="text-xs text-[#5F746B] max-w-sm mx-auto mb-6">
                  Slot selected: <strong>{WEEKEND_SESSION_SLOTS.find(s => s.id === selectedSlot)?.label}</strong>.
                  Session time confirmed and synchronized between your local timezone and provider schedule.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href="/checkout" className="btn-primary-glow text-xs py-2.5 px-6 rounded-full inline-flex items-center gap-2 font-bold shadow-sm">
                    <span>Proceed to Payment &amp; Confirmation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/progress" className="px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-xs font-semibold border border-[#D3DFD7]">
                    <span>Return to Dashboard</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirm} className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-2">
                  Choose Preferred Weekend Cohort Time:
                </label>

                <div className="space-y-2.5">
                  {WEEKEND_SESSION_SLOTS.map((slot) => (
                    <label
                      key={slot.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedSlot === slot.id
                          ? 'bg-[#DDE9E2] border-2 border-[#4F7462] text-[#29443A] shadow-xs'
                          : 'bg-[#FFFFFF] border-[#D3DFD7] text-[#5F746B] hover:border-[#789B87] hover:bg-[#F8F7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="slot"
                          value={slot.id}
                          checked={selectedSlot === slot.id}
                          onChange={() => setSelectedSlot(slot.id)}
                          className="text-[#4F7462] focus:ring-[#4F7462]"
                        />
                        <div>
                          <div className="font-bold text-sm text-[#29443A]">{slot.label}</div>
                          <div className="text-[11px] text-[#5F746B]">
                            Local Time: {slot.timeLocal} ({localTz.split('/')[1] || localTz})
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-mono text-[#4F7462] bg-[#FFFFFF] px-2.5 py-1 rounded-md border border-[#D3DFD7]">
                          {slot.timeProviderUTC}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full btn-primary-glow text-xs font-bold flex items-center justify-center gap-2 mt-6 shadow-sm"
                >
                  <span>Confirm Weekend Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </MagicalCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
