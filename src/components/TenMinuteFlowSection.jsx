'use client';
import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, CheckCircle2, ArrowRight, Sparkles, Clock } from 'lucide-react';
import MagicalCard from './MagicalCard';

export default function TenMinuteFlowSection() {
  const steps = [
    {
      num: '01',
      time: '0:00 – 5:00',
      duration: '5 Mins',
      title: 'Illustrated Comic Strip',
      icon: BookOpen,
      desc: 'Relatable adult characters navigate real situations. Name the psychological mechanism and see the coping skill modeled visually.',
    },
    {
      num: '02',
      time: '5:00 – 9:00',
      duration: '4 Mins',
      title: '6-Person AI Voice Room',
      icon: Users,
      desc: 'Audio-only reflection with a small group of peers in your timezone. Zero cameras, zero pressure, guided by an educational AI facilitator.',
    },
    {
      num: '03',
      time: '9:00 – 10:00',
      duration: '1 Min',
      title: 'One Concrete Habit',
      icon: CheckCircle2,
      desc: 'Leave with a single realistic micro-practice for your week. Small behavioral adjustments that build genuine resilience over time.',
    },
  ];

  return (
    <section className="ten-minute-flow-section py-20 bg-[#EEF3EF] border-t border-b border-[#D3DFD7] relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
            <Clock className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>THE WEEKEND RHYTHM • 10 MINUTES TOTAL</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#29443A] tracking-tight mb-4">
            How a <span className="text-[#4F7462]">10-Minute Weekend Session</span> Works
          </h2>
          <p className="text-[#5F746B] text-base leading-relaxed">
            No long therapy lectures, no homework overload. A focused, 3-part micro-learning ritual designed to respect busy adult lives.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <MagicalCard
                key={step.num}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] hover:border-[#789B87] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:shadow-[0_10px_24px_rgba(41,68,58,0.12)] transition-all flex flex-col justify-between"
                maxTilt={4}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-[#DDE9E2] text-[#4F7462] flex items-center justify-center font-black text-sm border border-[#D3DFD7]">
                      {step.num}
                    </span>
                    <span className="text-xs font-mono text-[#4F7462] bg-[#EEF3EF] px-2.5 py-1 rounded-full border border-[#D3DFD7] font-semibold">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#29443A] mb-2 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#4F7462]" />
                    <span>{step.title}</span>
                  </h3>

                  <p className="text-xs text-[#5F746B] leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D3DFD7] text-[11px] text-[#667C72] font-mono">
                  Timeline: {step.time}
                </div>
              </MagicalCard>
            );
          })}
        </div>

        {/* Link to Deep Dive */}
        <div className="text-center">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#4F7462] hover:text-[#29443A] transition-colors"
          >
            <span>Explore the complete 8-step learner journey on How It Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
