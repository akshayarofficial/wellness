'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  User, Award, Flame, Calendar, Clock, BookOpen, CheckCircle2, 
  ArrowRight, ShieldCheck, HeartPulse, Settings, Bell, ShieldAlert, Sparkles 
} from 'lucide-react';

const MOOD_HISTORY = [
  { day: 'Mon', mood: 'Great', statusColor: 'bg-[#4F7462]', note: 'Morning walk helped' },
  { day: 'Tue', mood: 'Doing Good', statusColor: 'bg-[#789B87]', note: 'Calm workday' },
  { day: 'Wed', mood: 'Down', statusColor: 'bg-[#B85C5C]', note: 'Overload at work' },
  { day: 'Thu', mood: 'Okay', statusColor: 'bg-[#A3B899]', note: 'Paced myself' },
  { day: 'Fri', mood: 'Doing Good', statusColor: 'bg-[#789B87]', note: 'Clear weekend ahead' },
  { day: 'Sat', mood: 'Great', statusColor: 'bg-[#4F7462]', note: 'Completed 10-Min Session' },
  { day: 'Sun', mood: 'Great', statusColor: 'bg-[#4F7462]', note: 'Refreshed & grounded' },
];

const BADGES = [
  { name: '14-Day Streak', icon: Flame, desc: 'Checked in for 14 consecutive days' },
  { name: 'First Cohort', icon: Clock, desc: 'Completed first 6-person voice room' },
  { name: 'Comic Reader', icon: BookOpen, desc: 'Read 8 illustrated comic micro-lessons' },
  { name: 'Boundary Setter', icon: ShieldCheck, desc: 'Completed Module 2 behavioral action' },
];

export default function ProfilePage() {
  return (
    <div className="mindbloom-app-shell">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Profile Header Banner */}
        <div className="subpage-hero-banner">
          <div className="container">
            <div className="subpage-badge">
              <User className="w-3.5 h-3.5 text-[#4F7462] mr-1.5 inline" />
              <span>YOUR WELLNESS DASHBOARD</span>
            </div>
            <h1 className="subpage-title">
              Welcome Back, <span className="text-[#4F7462]">Alex</span>
            </h1>
            <p className="subpage-description">
              Review your 10-minute weekend rituals, daily emotional weather history, and active cohort schedule.
            </p>
          </div>
        </div>

        <section className="profile-content-section py-8">
          <div className="container">
            {/* Top Stats Overview Row */}
            <div className="profile-stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <MagicalCard className="stat-card p-5 bg-[#FFFFFF] border border-[#D3DFD7] rounded-2xl shadow-xs" maxTilt={6}>
                <div className="flex items-center gap-3">
                  <div className="stat-icon-wrap w-12 h-12 rounded-xl bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center text-[#4F7462]">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#29443A]">14 Days</div>
                    <div className="text-xs text-[#5F746B] font-medium">Daily Streak</div>
                  </div>
                </div>
              </MagicalCard>

              <MagicalCard className="stat-card p-5 bg-[#FFFFFF] border border-[#D3DFD7] rounded-2xl shadow-xs" maxTilt={6}>
                <div className="flex items-center gap-3">
                  <div className="stat-icon-wrap w-12 h-12 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] flex items-center justify-center text-[#4F7462]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#29443A]">8 / 52</div>
                    <div className="text-xs text-[#5F746B] font-medium">Weeks Finished</div>
                  </div>
                </div>
              </MagicalCard>

              <MagicalCard className="stat-card p-5 bg-[#FFFFFF] border border-[#D3DFD7] rounded-2xl shadow-xs" maxTilt={6}>
                <div className="flex items-center gap-3">
                  <div className="stat-icon-wrap w-12 h-12 rounded-xl bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center text-[#4F7462]">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#29443A]">Room #4</div>
                    <div className="text-xs text-[#5F746B] font-medium">Weekend Cohort</div>
                  </div>
                </div>
              </MagicalCard>

              <MagicalCard className="stat-card p-5 bg-[#FFFFFF] border border-[#D3DFD7] rounded-2xl shadow-xs" maxTilt={6}>
                <div className="flex items-center gap-3">
                  <div className="stat-icon-wrap w-12 h-12 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] flex items-center justify-center text-[#4F7462]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-[#29443A]">Sat 10:00 AM</div>
                    <div className="text-xs text-[#5F746B] font-medium">Next Session</div>
                  </div>
                </div>
              </MagicalCard>
            </div>

            {/* Main Profile Grid: Course Progress + Mood Tracker */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Enrolled Course Card (2 Cols) */}
              <div className="lg:col-span-2">
                <MagicalCard className="profile-main-card p-7" maxTilt={4}>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <span className="curriculum-meta-tag mb-1">Active Course</span>
                      <h3 className="text-2xl font-bold text-white">The Resilience Continuum</h3>
                      <p className="text-xs text-amber-200/70">52-Week Program • Track 1: General Adults (18+)</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-amber-400">15%</span>
                      <p className="text-[11px] text-stone-400">Completed</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-black/50 h-2.5 rounded-full overflow-hidden border border-white/10 mb-6">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-[15%] rounded-full shadow-[0_0_12px_rgba(255,170,34,0.6)]"></div>
                  </div>

                  {/* Next Lesson Box */}
                  <div className="next-lesson-box p-5 rounded-2xl bg-amber-500/10 border border-amber-400/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                        Upcoming Lesson • Week 9
                      </div>
                      <h4 className="text-lg font-bold text-white">Lesson 09: Box Breathing Under Work Pressure</h4>
                      <p className="text-xs text-stone-300 mt-1">
                        6-Tile Comic • 4-Minute Cohort Voice Reflection • 1 Daily Micro-Practice
                      </p>
                    </div>
                    <Link href="/classroom" className="btn-primary-glow flex-shrink-0 text-xs py-2.5 px-4">
                      <span>Open Classroom</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>

                  {/* Milestone Badges */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Earned Milestone Badges</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {BADGES.map((b, idx) => {
                        const Icon = b.icon;
                        return (
                          <div key={idx} className="badge-item p-3 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-xs">
                            <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] text-[#4F7462] flex items-center justify-center mx-auto mb-2">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-xs font-bold text-[#29443A]">{b.name}</div>
                            <div className="text-[10px] text-[#5F746B] mt-0.5">{b.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </MagicalCard>
              </div>

              {/* Weekly Mood Weather Log (1 Col) */}
              <div className="lg:col-span-1">
                <MagicalCard className="profile-mood-card p-6 bg-[#FFFFFF] border border-[#D3DFD7] rounded-2xl shadow-xs" maxTilt={5}>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D3DFD7]">
                    <div>
                      <h3 className="text-lg font-bold text-[#29443A] flex items-center gap-2">
                        <HeartPulse className="w-4 h-4 text-[#B85C5C]" />
                        <span>Emotional Weather</span>
                      </h3>
                      <p className="text-xs text-[#5F746B]">Past 7 Days Private Log</p>
                    </div>
                    <Link href="/daily-checkin" className="text-xs text-[#4F7462] font-bold hover:underline">
                      Log Today →
                    </Link>
                  </div>

                  <div className="space-y-2.5">
                    {MOOD_HISTORY.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#EEF3EF] border border-[#D3DFD7] text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-[#29443A] w-8">{item.day}</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${item.statusColor}`} />
                          <span className="text-[#263832] font-semibold">{item.mood}</span>
                        </div>
                        <span className="text-[#5F746B] text-[11px] truncate max-w-[110px]">{item.note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-xs text-emerald-300">
                    <span className="font-bold">Insight:</span> Your mood stabilized during weekend cohorts. Keep the Saturday morning habit consistent!
                  </div>
                </MagicalCard>
              </div>
            </div>

            {/* Quick Action Navigation Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/daily-checkin" className="block">
                <MagicalCard className="p-4 flex items-center justify-between" maxTilt={5}>
                  <div className="flex items-center gap-3">
                    <HeartPulse className="w-5 h-5 text-rose-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Daily Check In</div>
                      <div className="text-xs text-stone-400">Log today&apos;s 30-sec mood</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </MagicalCard>
              </Link>

              <Link href="/tracks" className="block">
                <MagicalCard className="p-4 flex items-center justify-between" maxTilt={5}>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-sky-400" />
                    <div>
                      <div className="text-sm font-bold text-white">4 Adult Tracks</div>
                      <div className="text-xs text-stone-400">Explore learning paths</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </MagicalCard>
              </Link>

              <Link href="/settings" className="block">
                <MagicalCard className="p-4 flex items-center justify-between" maxTilt={5}>
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-amber-400" />
                    <div>
                      <div className="text-sm font-bold text-white">Account Settings</div>
                      <div className="text-xs text-stone-400">Reminders &amp; privacy firewall</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </MagicalCard>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
