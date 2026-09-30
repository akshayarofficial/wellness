'use client';
import React from 'react';
import MagicalCard from './MagicalCard';
import { BookOpen, Clock, Users, Bot, Sparkles, Compass, ShieldCheck, HeartHandshake, Flame, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: "6-Tile Illustrated Comics",
    subtitle: "5 Minutes • No Lecture Videos",
    desc: "Every weekend class is an adult editorial comic strip. Follow relatable characters solving stress, boundary, and communication friction without tedious lectures."
  },
  {
    icon: Clock,
    title: "10-Minute Weekend Habit",
    subtitle: "One Predictable Ritual",
    desc: "Exactly 10 minutes: 5 minutes of visual comic reading, 4 minutes of structured AI-assisted group Q&A, and 1 minute for a concrete real-world action."
  },
  {
    icon: Users,
    title: "6-Person Micro Voice Rooms",
    subtitle: "Max 6 Adults per Cohort",
    desc: "Never get lost in a crowd. Cohorts are strictly capped at 6 adults, matched by broad timezone and weekend slot for a safe, low-pressure conversation."
  },
  {
    icon: Bot,
    title: "Bounded AI Wellbeing Guide",
    subtitle: "Clinical Scope Guardrails",
    desc: "Answers questions within approved clinical curriculum. Explains coping strategies and clarifies concepts without diagnosing or prescribing."
  },
  {
    icon: Compass,
    title: "Two 52-Week Master Tracks",
    subtitle: "Adults 18+ vs Parents",
    desc: "Track A tackles workplace stress and adult relationships. Track B empowers parents to support minor children without labeling or amateur diagnosing."
  },
  {
    icon: Sparkles,
    title: "Two 4-Week Rapid Tracks",
    subtitle: "Students & Employees",
    desc: "Intensive 4-week modules tailored specifically for university exam stress & dorm life, and workplace burnout & boundary management."
  },
  {
    icon: HeartHandshake,
    title: "Private Daily Mood Pulse",
    subtitle: "1-Tap 'How Are You Feeling?'",
    desc: "A 5-second private check-in that never shows to employers or group cohorts. Helps you notice subtle patterns before burnout accumulates."
  },
  {
    icon: Flame,
    title: "30-Day Wellbeing Streak",
    subtitle: "Engagement, Not False Positivity",
    desc: "We never reward you for claiming to feel 'happy'. Our streak celebrates self-care consistency and honest daily engagement, even on rough days."
  },
  {
    icon: ShieldCheck,
    title: "Non-Therapy & Crisis Safety",
    subtitle: "Red-Tier Crisis Routing (14416 / 112)",
    desc: "We are education and coping literacy, not medical therapy. Any critical distress automatically triggers safe routing to human crisis lines (India Tele-MANAS 14416 / 112)."
  }
];

export default function FeatureGrid() {
  return (
    <section id="how-it-works" className="features-section">
      <div className="container">
        <div className="section-header-block">
          <div className="pill-badge">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
            <span>ARCHITECTED FOR REAL LIVES • 9 CORE PILLARS</span>
          </div>
          <h2 className="section-title">
            Everything You Need for <span className="text-amber-gradient">Year-Long Mental Resilience</span>
          </h2>
          <p className="section-description">
            Designed according to the 52-Week Master Program Blueprint. Simple enough for everyday life,
            and structured enough to build an unbreakable lifelong self-care ritual.
          </p>
        </div>

        {/* 9-Card Grid (Exact ToonBee & Mirave Aesthetic) */}
        <div className="features-grid">
          {FEATURES.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <MagicalCard
                key={idx}
                className="feature-card"
                maxTilt={10}
                glowColor="rgba(255, 175, 45, 0.28)"
              >
                <div className="feature-card-glow"></div>
                <div className="feature-icon-wrapper">
                  <IconComponent className="feature-icon text-amber-400" />
                </div>
                <span className="feature-subtitle">{item.subtitle}</span>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </MagicalCard>
            );
          })}
        </div>

        {/* Highlighted Banner underneath grid */}
        <div className="features-bottom-pill-bar">
          <span className="pill-dot">●</span>
          <span>52 Total Lessons</span>
          <span className="pill-divider">|</span>
          <span className="pill-dot">●</span>
          <span>10 Minutes per Weekend</span>
          <span className="pill-divider">|</span>
          <span className="pill-dot">●</span>
          <span>English-Only Year 1 MVP</span>
          <span className="pill-divider">|</span>
          <span className="pill-dot">●</span>
          <span>Adults 18+ Only</span>
        </div>
      </div>
    </section>
  );
}
