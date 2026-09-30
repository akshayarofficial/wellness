'use client';
import React from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import DailyCheckInDemo from '../../components/DailyCheckInDemo';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { HeartPulse, Flame, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const FEELING_DOWN_WEEKS = [
  {
    week: "Week 1",
    theme: "Notice & Stabilize",
    practice: "Daily 60-second grounding + one basic-needs check + personal support mapping",
    desc: "Acknowledge the current heavy state without panic or self-blame. Identify immediate sources of sensory overload."
  },
  {
    week: "Week 2",
    theme: "Tiny Actions & Routine",
    practice: "One five-minute micro-action + regular wake/meal anchor + ditching all-or-nothing thinking",
    desc: "When motivation is at zero, behavioral activation helps. We use micro-habits smaller than your resistance."
  },
  {
    week: "Week 3",
    theme: "Distance from Thoughts",
    practice: "One connection bid + 'I am noticing the thought that...' practice",
    desc: "Reduce isolation. Learn cognitive defusion to untangle your identity from automatic negative loops."
  },
  {
    week: "Week 4",
    theme: "Review & Next Support",
    practice: "Create a 30-day maintenance plan + bookmark professional support if distress is persistent",
    desc: "Review what helped and normalize professional care if difficulties significantly disrupt daily functioning."
  }
];

export default function DailyCheckInPage() {
  return (
    <div className="mindbloom-app-shell">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Page Header Banner */}
        <div className="subpage-hero-banner">
          <div className="container">
            <div className="subpage-badge">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
              <span>PAGE • DAILY MOOD PULSE</span>
            </div>
            <h1 className="subpage-title">
              Daily Mood Pulse &amp; <span className="text-amber-gradient">30-Day Streak</span>
            </h1>
            <p className="subpage-description">
              A 5-second private check-in to build emotional awareness. If you are having a rough day,
              we offer gentle self-help education—never clinical labels or public scoreboards.
            </p>
          </div>
        </div>

        {/* Live Interactive Daily Check-In Widget */}
        <DailyCheckInDemo />

        {/* 4-Week "Feeling Down" Stepped-Care Pathway */}
        <section className="feeling-down-pathway-section">
          <div className="container">
            <MagicalCard className="feeling-down-pathway-card" maxTilt={4}>
              <div className="section-header-block">
                <div className="pill-badge">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-400 mr-1.5 inline" />
                  <span>STEPPED-CARE SELF-HELP PROTOCOL</span>
                </div>
                <h2 className="section-title">
                  What Happens When You Select <span className="text-rose-400">&ldquo;Not Good&rdquo;</span>
                </h2>
                <p className="section-description">
                  No toxic positivity. When you indicate consistent distress, Wellness App unlocks a dedicated,
                  gentle 4-week micro-curriculum focused on recovery literacy:
                </p>
              </div>

              <div className="feeling-down-grid">
                {FEELING_DOWN_WEEKS.map((item, idx) => (
                  <div key={idx} className="pathway-week-card">
                    <span className="week-badge">{item.week}</span>
                    <h4>{item.theme}</h4>
                    <p className="practice-highlight"><strong>Practice:</strong> {item.practice}</p>
                    <p className="desc-text">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pathway-footer-note mt-6 text-center text-sm text-[#5F746B]">
                <ShieldAlert className="w-4 h-4 text-[#B85C5C] mr-2 inline" />
                <span>
                  <strong>Clinical Safety Firewall:</strong> If distress persists past 2–3 weeks or indicates acute harm,
                  Everyday Mental Wellness gently signposts human professional services and confidential crisis lines (Tele-MANAS 14416 / 112).
                </span>
              </div>
            </MagicalCard>
          </div>
        </section>

        {/* Learner Action Callout */}
        <section className="py-8 bg-[#FFFFFF] border-t border-[#D3DFD7]">
          <div className="container text-center">
            <p className="text-xs text-[#5F746B] mb-3">
              Daily check-ins are strictly confidential and visible only to you.
            </p>
            <Link href="/progress" className="text-xs text-[#4F7462] hover:underline font-bold inline-flex items-center gap-1">
              <span>View your personal learning streak on your dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
