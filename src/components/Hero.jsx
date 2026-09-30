'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroVideo from './HeroVideo';
import { Sparkles, ShieldCheck, Users, Clock, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const scrollToVideo = (e) => {
    e.preventDefault();
    const el = document.getElementById('hero-video-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrograms = (e) => {
    e.preventDefault();
    const el = document.getElementById('four-paths');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section relative min-h-screen flex flex-col justify-center overflow-hidden py-12 md:py-20">
      {/* Background Layers: L01 Backdrop + Honeycomb Overlay + Radial Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/emw_hero_l01.jpg"
          alt="Everyday Mental Wellness Hero Journey"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
          priority
        />
        {/* Honeycomb Pattern (Referencing ToonBee backdrop) */}
        <div className="honeycomb-pattern-overlay" />
        {/* Ambient Dark Navy & Obsidian Gradients for Razor-Sharp Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080F1E]/90 via-[#0D1B34]/85 to-[#080F1E] z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent z-1" />
      </div>

      <div className="container relative z-10">
        <div className="hero-content-container relative">
          {/* Flanking Floating Comic Cards (Visible on desktop screens, referencing ToonBee) */}
          <div className="floating-card floating-card-left hidden xl:block">
            <div className="floating-card-magical">
              <div className="floating-card-inner">
                <span className="card-badge-top">Group 1 • Adult</span>
                <div className="floating-img-wrap" style={{ width: '100%', height: '140px', position: 'relative' }}>
                  <Image
                    src="/images/comic_adult_track.jpg"
                    alt="Adult Track Sample"
                    fill
                    sizes="240px"
                    className="floating-card-img"
                  />
                </div>
                <div className="card-meta">
                  <span className="card-lesson-tag">Week 01 • Tile 01</span>
                  <span className="card-title">Anchoring in Calm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-right hidden xl:block">
            <div className="floating-card-magical">
              <div className="floating-card-inner">
                <span className="card-badge-top">Group 2 • Parent</span>
                <div className="floating-img-wrap" style={{ width: '100%', height: '140px', position: 'relative' }}>
                  <Image
                    src="/images/comic_parent_track.jpg"
                    alt="Parent Track Sample"
                    fill
                    sizes="240px"
                    className="floating-card-img"
                  />
                </div>
                <div className="card-meta">
                  <span className="card-lesson-tag">Week 01 • Tile 01</span>
                  <span className="card-title">The Regulated Parent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Central Hero Column (Referencing ToonBee Central Stage) */}
          <div className="hero-center-column w-full max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Pre-Headline Pill */}
            <div className="hero-pre-headline-pill">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-2" />
              <span>PREVENTATIVE MENTAL WELLNESS • 10-MINUTE HABIT</span>
            </div>

            {/* 3-Tier Headline Group with Center Highlight Badge */}
            <div className="hero-headline-group">
              <div className="headline-tier headline-tier-1">
                Everyday Mental Wellness
              </div>
              <div className="headline-tier-2-container my-1">
                <div className="headline-badge-box">
                  <div className="headline-mascot-sticker flex items-center justify-center">
                    <Image
                      src="/images/mascot.png"
                      alt="Wellness Mascot"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <span className="headline-accent-text">
                    One Practical Lesson
                  </span>
                </div>
              </div>
              <div className="headline-tier headline-tier-3">
                At A Time
              </div>
            </div>

            {/* Value Highlight Pill (ToonBee Metric Pill Style) */}
            <div className="hero-value-pill">
              <span>
                Build Lifelong Resilience &amp; Boundaries In <strong>10 Mins / Weekend</strong>
              </span>
            </div>

            {/* Approved Subtitle (Doc 1: Section 1) */}
            <p className="hero-subtitle text-stone-200/90 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-6">
              Choose a learning path designed for your stage of adult life. Illustrated 6-tile comic micro-lessons,
              immediate feedback, and actionable habits without medical jargon or clinical diagnoses.
            </p>

            {/* Primary & Secondary Action CTA Buttons */}
            <div className="hero-cta-group flex flex-wrap items-center justify-center gap-4 mb-6">
              <Link
                href="/register"
                className="btn-primary-glow px-8 py-4 rounded-full text-base font-bold flex items-center gap-2.5 shadow-[0_0_25px_rgba(79,116,98,0.35)]"
              >
                <Users className="w-5 h-5" />
                <span>Register for a Group</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={scrollToPrograms}
                className="btn-secondary-glass px-6 py-4 rounded-full text-base font-semibold flex items-center gap-2"
              >
                <span>Compare 4 Groups</span>
              </button>

              <button
                onClick={scrollToVideo}
                className="btn-secondary-glass px-6 py-4 rounded-full text-base font-semibold flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-[#4F7462] fill-[#4F7462]" />
                <span>Watch 80s preview</span>
              </button>
            </div>

            {/* 4 Streams Quick Glance Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#5F746B] mb-8 max-w-2xl">
              <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D3DFD7] text-[#263832] font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#789B87]" />
                Group 1: General Adults (18+)
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D3DFD7] text-[#263832] font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#4F7462]" />
                Group 2: Parents &amp; Caregivers
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D3DFD7] text-[#263832] font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#789B87]" />
                Group 3: University &amp; College Students (18+)
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D3DFD7] text-[#263832] font-semibold flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#4F7462]" />
                Group 4: Workplace Professionals
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================================
            CENTER STAGE HERO VIDEO PLAYER (Referencing ToonBee Video Embed)
            ================================================================== */}
        <div className="hero-video-wrapper w-full max-w-4xl mx-auto relative mt-2" id="hero-video-section">
          {/* Subtle Ambient Glow Behind Video Frame */}
          <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/25 via-teal-500/20 to-purple-500/25 rounded-3xl blur-2xl opacity-75 pointer-events-none" />

          {/* Interactive 80-Second Cinematic Hero Video */}
          <div className="relative z-10">
            <HeroVideo />
          </div>

          {/* Hand-drawn style video annotation callout */}
          <div className="text-center mt-4">
            <span className="text-xs sm:text-sm text-[#5F746B] font-medium tracking-wide">
              &ldquo;This 80-second cinematic preview demonstrates our 6-tile comics, peer voice rooms &amp; verified certificate&rdquo;
            </span>
          </div>

          {/* Program Educational Scope Lock & Trust Bar */}
          <div className="hero-trust-bar mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#5F746B]">
            <div className="trust-item flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#4F7462] flex-shrink-0" />
              <span>Wellness Education Only (Non-Diagnostic)</span>
            </div>
            <span className="trust-bullet">•</span>
            <div className="trust-item flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#4F7462] flex-shrink-0" />
              <span>Max 6 Adults / Peer Room</span>
            </div>
            <span className="trust-bullet">•</span>
            <div className="trust-item flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#4F7462] flex-shrink-0" />
              <span>10 Mins / Weekend</span>
            </div>
            <span className="trust-bullet">•</span>
            <div className="trust-item flex items-center gap-1.5">
              <span>Crisis 14416 / 112 Signposted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
