'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, Calendar, CreditCard, MessageSquare, CheckCircle2, 
  ArrowRight, ShieldCheck, Flame, BookOpen, Clock, Sparkles 
} from 'lucide-react';
import MagicalCard from './MagicalCard';

export default function ProgressAppPreviewSection() {
  return (
    <section id="progress-preview" className="progress-preview-section py-20 bg-[#F8F7F2] border-t border-b border-[#D3DFD7] relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#789B87]/30 text-[#4F7462] text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>DELIVERABLE 2 • THE PROGRESS EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#29443A] tracking-tight mb-4">
            The Learner <span className="text-[#4F7462]">Progress App</span>
          </h2>
          <p className="text-[#5F746B] text-base leading-relaxed">
            Schedule weekend sessions, apply scholarship promo codes, receive timely WhatsApp reminders,
            and earn an official verifiable certificate after 52 or 4 weeks.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left Column: S08 Hero Visual Frame (Doc 1: S08 Stills) */}
          <div className="lg:col-span-6">
            <MagicalCard className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] overflow-hidden" maxTilt={3}>
              <div className="relative w-full h-80 rounded-xl overflow-hidden border border-[#D3DFD7]">
                <Image
                  src="/images/emw_s08_progress.jpg"
                  alt="Learner Progress App and Certificate Preview"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#29443A]/90 via-[#29443A]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#789B87] animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Earned Milestone Verification
                    </span>
                  </div>
                  <p className="text-xs text-[#DDE9E2] font-medium">
                    &ldquo;Track your progress, build steady habits, and earn your verified certificate.&rdquo;
                  </p>
                </div>
              </div>
            </MagicalCard>
          </div>

          {/* Right Column: 4 App Capabilities Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Weekend Scheduling */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:border-[#789B87] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] text-[#4F7462] flex items-center justify-center mb-2.5">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#29443A] mb-1">Weekend Scheduling</h4>
              <p className="text-xs text-[#5F746B] leading-relaxed">
                Pick your preferred weekend morning or afternoon slot shown in both your local timezone and provider UTC.
              </p>
            </div>

            {/* 2. Promo Validation */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:border-[#789B87] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] text-[#4F7462] flex items-center justify-center mb-2.5">
                <CreditCard className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#29443A] mb-1">Promo &amp; Payment</h4>
              <p className="text-xs text-[#5F746B] leading-relaxed">
                Redeem valid organization codes (e.g. <code className="text-[#29443A] bg-[#EEF3EF] px-1 py-0.5 rounded text-[11px] font-mono">WELLNESS100</code>) with secure server-side scope and expiration checks.
              </p>
            </div>

            {/* 3. WhatsApp 1-Min Reminder */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:border-[#789B87] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] text-[#4F7462] flex items-center justify-center mb-2.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#29443A] mb-1">WhatsApp 1-Min Link</h4>
              <p className="text-xs text-[#5F746B] leading-relaxed">
                Receive an opted-in direct join link 1 minute before your session starts, with an in-app backup button always available.
              </p>
            </div>

            {/* 4. Completion Certificate */}
            <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:border-[#789B87] transition-all">
              <div className="w-9 h-9 rounded-lg bg-[#DDE9E2] text-[#4F7462] flex items-center justify-center mb-2.5">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-[#29443A] mb-1">Verified Certificate</h4>
              <p className="text-xs text-[#5F746B] leading-relaxed">
                Issued strictly upon 100% completion of required sessions with unique ID and verification link.
              </p>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/progress"
            className="btn-primary-glow px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <span>Open Learner Progress App</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/classroom"
            className="btn-secondary-glass px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#4F7462]" />
            <span>Enter Interactive Classroom</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
