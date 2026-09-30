'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Users, ShieldAlert, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PROGRAM_STREAMS } from '../lib/wellnessData';
import MagicalCard from './MagicalCard';

export default function FourPathsSection() {
  return (
    <section id="four-paths" className="four-paths-section py-20 bg-[#FFFFFF] border-t border-b border-[#D3DFD7] relative">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>FOUR DEDICATED ADULT CURRICULA (18+)</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#29443A] tracking-tight mb-4">
            Choose Your <span className="text-[#4F7462]">Learning Path</span>
          </h2>
          <p className="text-[#5F746B] text-base leading-relaxed">
            Tailored specifically for distinct adult life stages. Every track features 6-tile comic lessons, 
            low-pressure peer voice rooms, and practical daily habits.
          </p>
        </div>

        {/* 4 Cards Grid (Desktop 4-column, Tablet 2-column, Mobile vertical stack) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 items-stretch">
          {PROGRAM_STREAMS.map((stream) => (
            <MagicalCard 
              key={stream.id} 
              className="four-path-card flex flex-col justify-between h-full bg-[#FFFFFF] border border-[#D3DFD7] hover:border-[#789B87] rounded-2xl overflow-hidden transition-all p-6 shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:shadow-[0_10px_24px_rgba(41,68,58,0.12)] hover:-translate-y-0.5"
              maxTilt={4}
            >
              <div className="flex-1 flex flex-col">
                {/* Header Strip with Group Number and Duration (never collides with image) */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EEF3EF]">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEF3EF] border border-[#D3DFD7] text-xs font-bold text-[#4F7462]">
                    Group {stream.number}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[#D3DFD7] text-xs font-semibold text-[#5F746B]">
                    <Clock className="w-3.5 h-3.5 text-[#4F7462]" />
                    <span>{stream.badge}</span>
                  </span>
                </div>

                {/* Clean Image Container (Uncluttered, no overlapping badges) */}
                <div 
                  className="relative w-full rounded-xl overflow-hidden mb-5 border border-[#D3DFD7] flex-shrink-0"
                  style={{ width: '100%', height: '175px', position: 'relative' }}
                >
                  <Image
                    src={stream.image}
                    alt={stream.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Card Title & Curriculum Subtitle (Clean hierarchy, zero duplicate words) */}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-[#29443A] leading-snug">
                    {stream.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#4F7462] mt-1 line-clamp-1">
                    {stream.title}
                  </p>
                </div>

                {/* Duration & Cadence */}
                <div className="flex items-center gap-1.5 text-xs text-[#5F746B] mb-3 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#4F7462] flex-shrink-0" />
                  <span>{stream.durationText}</span>
                </div>

                {/* Focus Line */}
                <p className="text-xs text-[#5F746B] mb-4 leading-relaxed min-h-[44px]">
                  {stream.focus}
                </p>

                {/* Dedicated Focus / Safeguarding Badge */}
                <div className="p-3 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] mb-4 text-xs text-[#29443A] flex items-start gap-2.5 min-h-[58px]">
                  <ShieldCheck className="w-4 h-4 text-[#4F7462] flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {stream.id === 'group1' && (
                      <><strong>Resilience Model:</strong> Foundations of emotional regulation, nervous system pacing &amp; boundaries.</>
                    )}
                    {stream.id === 'group2' && (
                      <><strong>Safeguarding Lock:</strong> Supporting minor children without diagnosing. No child accounts.</>
                    )}
                    {stream.id === 'group3' && (
                      <><strong>Fast-Track Cadence:</strong> 7 daily Week 1 lessons + 3 weekend peer sessions for students.</>
                    )}
                    {stream.id === 'group4' && (
                      <><strong>Workplace Cadence:</strong> 7 daily Week 1 lessons + 3 weekend sessions for work boundaries.</>
                    )}
                  </span>
                </div>

                {/* Features Bullet Points */}
                <ul className="space-y-2 mb-5 text-xs text-[#5F746B] flex-grow">
                  {stream.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7462] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Registration Action pinned cleanly at bottom */}
              <div className="mt-auto pt-4 border-t border-[#EEF3EF]">
                <Link
                  href={`/register?group=${stream.id}`}
                  className="btn-primary-glow w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all"
                >
                  <span>Register for Group {stream.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </MagicalCard>
          ))}
        </div>

        {/* 18+ Age Eligibility Notice */}
        <div className="mt-8 text-center text-xs text-[#667C72]">
          <span>All four streams require adult confirmation (18+). Enrollment is strictly confidential.</span>
        </div>
      </div>
    </section>
  );
}
