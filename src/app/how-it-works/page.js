'use client';
import React from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import LearnerJourneySection from '../../components/LearnerJourneySection';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { Clock, Users, Bot, BookOpen, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function HowItWorksPage() {
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
              <span>PAGE • HOW IT WORKS</span>
            </div>
            <h1 className="subpage-title">
              How <span className="text-amber-gradient">Wellness App</span> Works
            </h1>
            <p className="subpage-description">
              A scientifically structured 10-minute weekend habit that integrates seamlessly into adult lives.
              No long therapy lectures, no intrusive questionnaires—just actionable coping literacy.
            </p>
          </div>
        </div>

        {/* 10-Minute Session Breakdown Graphic */}
        <section className="timeline-breakdown-section">
          <div className="container">
            <div className="section-header-block">
              <h2 className="section-title">The Exact 10-Minute Weekend Session</h2>
              <p className="section-description">
                Every weekend cohort is synchronized to respect your schedule with clockwork precision:
              </p>
            </div>

            <div className="session-steps-grid">
              <MagicalCard className="session-step-card" maxTilt={6}>
                <div className="step-num-bubble">01</div>
                <div className="step-content-col">
                  <div className="step-meta">
                    <span className="step-duration-tag">0:00 – 5:00 (5 Mins)</span>
                    <span className="curriculum-meta-tag">Self-Paced</span>
                  </div>
                  <h3>Phase 1: 6-Tile Illustrated Comic</h3>
                  <p>
                    Open your private weekly comic strip. Follow relatable characters navigating real friction,
                    naming the psychological concept, and seeing a practical skill demonstrated.
                  </p>
                </div>
              </MagicalCard>

              <MagicalCard className="session-step-card" maxTilt={6}>
                <div className="step-num-bubble">02</div>
                <div className="step-content-col">
                  <div className="step-meta">
                    <span className="step-duration-tag">5:00 – 9:00 (4 Mins)</span>
                    <span className="curriculum-meta-tag">Live Cohort Audio</span>
                  </div>
                  <h3>Phase 2: 6-Person AI Voice Room</h3>
                  <p>
                    Join an audio-only, 6-member cohort room. An AI Wellbeing Guide hosts a structured,
                    low-pressure reflection prompt. No video cameras, no forced vulnerability.
                  </p>
                </div>
              </MagicalCard>

              <MagicalCard className="session-step-card" maxTilt={6}>
                <div className="step-num-bubble">03</div>
                <div className="step-content-col">
                  <div className="step-meta">
                    <span className="step-duration-tag">9:00 – 10:00 (1 Min)</span>
                    <span className="curriculum-meta-tag">Action Habit</span>
                  </div>
                  <h3>Phase 3: One Concrete Daily Micro-Action</h3>
                  <p>
                    Leave the session with a single, clear practice to carry into your week.
                    Tiny behavioral experiments that build lasting neural pathways.
                  </p>
                </div>
              </MagicalCard>
            </div>
          </div>
        </section>

        {/* 6-Person Cohort Room Architecture */}
        <section className="cohort-architecture-section">
          <div className="container">
            <MagicalCard className="cohort-architecture-card" maxTilt={4}>
              <div className="cohort-arch-inner">
                <div className="cohort-badge-pill">
                  <Users className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
                  <span>THE 6-PERSON COHORT ROOM ARCHITECTURE</span>
                </div>
                <h2>Built for Low Pressure &amp; Authentic Safety</h2>
                <p className="cohort-lead-p">
                  Large group webinars trigger social anxiety and passive listening. Our 6-person audio rooms
                  create psychological safety through bounded structure:
                </p>

                <div className="cohort-features-grid">
                  <div className="cohort-feat-item">
                    <h4>Audio-Only, No Cameras</h4>
                    <p>Zero screen self-consciousness. Wear pajamas, take a walk, or sit quietly. No visual evaluation.</p>
                  </div>
                  <div className="cohort-feat-item">
                    <h4>Strictly Bounded AI Guide</h4>
                    <p>Our AI voice facilitator keeps time, asks reflection questions, and prevents dominant speakers.</p>
                  </div>
                  <div className="cohort-feat-item">
                    <h4>Non-Therapy Ground Rules</h4>
                    <p>Peers reflect on personal skills—not trauma dumping or armchair diagnosis. Complete emotional safety.</p>
                  </div>
                  <div className="cohort-feat-item">
                    <h4>Timezone Matched</h4>
                    <p>Paired with working adults, students, or parents in your timezone for reliable weekend routines.</p>
                  </div>
                </div>
              </div>
            </MagicalCard>
          </div>
        </section>

        {/* The 8-Step Learner Journey ("From Discovery to Certificate") */}
        <LearnerJourneySection />

        {/* Targeted Action Callout */}
        <section className="py-12 bg-[#FFFFFF] border-t border-[#D3DFD7]">
          <div className="container">
            <div className="p-8 md:p-10 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-center max-w-3xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-[#29443A] mb-3">
                Experience the 10-Minute Weekend Ritual
              </h3>
              <p className="text-sm text-[#5F746B] mb-6 max-w-xl mx-auto leading-relaxed">
                Choose the track designed for your current life stage and build lasting resilience 10 minutes at a time.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/register" className="btn-primary-glow px-8 py-3.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                  <span>Register for a Cohort</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/comic-method" className="px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-xs font-bold border border-[#D3DFD7] transition-colors">
                  Learn About the 6-Tile Method
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
