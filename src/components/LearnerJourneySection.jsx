'use client';
import React from 'react';
import Link from 'next/link';
import { 
  UserCheck, Mail, Calendar, CreditCard, MessageSquare, 
  PlayCircle, CheckSquare, Award, ShieldAlert, ArrowRight, Sparkles, Heart 
} from 'lucide-react';
import { LEARNER_JOURNEY_STEPS } from '../lib/wellnessData';
import MagicalCard from './MagicalCard';

const STEP_ICONS = {
  1: UserCheck,
  2: Mail,
  3: Calendar,
  4: CreditCard,
  5: MessageSquare,
  6: PlayCircle,
  7: CheckSquare,
  8: Award,
};

export default function LearnerJourneySection() {
  return (
    <section id="how-it-works" className="learner-journey-section py-20 bg-[#EEF3EF] relative overflow-hidden border-t border-b border-[#D3DFD7]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>FROM DISCOVERY TO CERTIFICATE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#29443A] tracking-tight mb-4">
            The <span className="text-[#4F7462]">8-Step Learner Journey</span>
          </h2>
          <p className="text-[#5F746B] text-base leading-relaxed">
            A clear, predictable roadmap from your very first click to your official certificate of completion.
          </p>
        </div>

        {/* Top 2 Deliverables Banner (Directly from User Infographic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <MagicalCard className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:shadow-[0_10px_24px_rgba(41,68,58,0.12)] transition-all" maxTilt={4}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center flex-shrink-0 text-xl font-black text-[#4F7462]">
                1
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider font-bold text-[#4F7462] block mb-1">
                  Learning Experience
                </span>
                <h3 className="text-xl font-bold text-[#29443A] mb-2">
                  5-Minute Voiced Comic Lessons
                </h3>
                <p className="text-xs text-[#5F746B] mb-4 leading-relaxed">
                  Relatable stories covering four adult life stages (Managing Stress, Emotional Regulation, Healthy Relationships, Work-Life Balance).
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-[#263832]">
                  <span className="px-2.5 py-1 rounded bg-[#EEF3EF] border border-[#D3DFD7] font-medium">Manage Stress</span>
                  <span className="px-2.5 py-1 rounded bg-[#EEF3EF] border border-[#D3DFD7] font-medium">Build Resilience</span>
                  <span className="px-2.5 py-1 rounded bg-[#EEF3EF] border border-[#D3DFD7] font-medium">Family &amp; Boundaries</span>
                  <span className="px-2.5 py-1 rounded bg-[#EEF3EF] border border-[#D3DFD7] font-medium">Workplace Balance</span>
                </div>
              </div>
            </div>
          </MagicalCard>

          <MagicalCard className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] hover:shadow-[0_10px_24px_rgba(41,68,58,0.12)] transition-all" maxTilt={4}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center flex-shrink-0 text-xl font-black text-[#4F7462]">
                2
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider font-bold text-[#4F7462] block mb-1">
                  Interactive Platform
                </span>
                <h3 className="text-xl font-bold text-[#29443A] mb-2">
                  Learner Dashboard &amp; Classroom
                </h3>
                <p className="text-xs text-[#5F746B] mb-4 leading-relaxed">
                  Select your weekend slot, complete interactive comic lessons, take scenario quizzes, receive personalized recaps, and unlock your official certificate.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/progress"
                    className="btn-primary-glow text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-bold shadow-xs"
                  >
                    <span>Launch Progress App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/classroom"
                    className="btn-secondary-glass text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 font-semibold"
                  >
                    <span>Open Classroom</span>
                  </Link>
                </div>
              </div>
            </div>
          </MagicalCard>
        </div>

        {/* The 8 Journey Step Rows (Recreating User Diagram exactly) */}
        <div className="max-w-4xl mx-auto space-y-3 mb-10">
          {LEARNER_JOURNEY_STEPS.map((st) => {
            const Icon = STEP_ICONS[st.step] || CheckSquare;
            return (
              <div 
                key={st.step}
                className="group p-4 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] hover:border-[#789B87] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_4px_16px_rgba(41,68,58,0.05)] hover:shadow-[0_8px_20px_rgba(41,68,58,0.09)] hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4">
                  {/* Step Number Disc */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm bg-[#DDE9E2] text-[#4F7462] border border-[#D3DFD7]"
                  >
                    {st.step}
                  </div>

                  {/* Icon */}
                  <div className="w-9 h-9 rounded-xl bg-[#EEF3EF] flex items-center justify-center flex-shrink-0 border border-[#D3DFD7]">
                    <Icon className="w-4 h-4 text-[#4F7462]" />
                  </div>

                  {/* Title & Desc */}
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#29443A]">
                      {st.title}
                    </h4>
                    <p className="text-xs text-[#5F746B]">
                      {st.desc}
                    </p>
                  </div>
                </div>

                {/* Step Action Tag */}
                <div className="flex-shrink-0 pl-14 sm:pl-0">
                  <span className="text-[11px] font-mono text-[#29443A] bg-[#DDE9E2] px-2.5 py-1 rounded-full border border-[#D3DFD7] font-semibold">
                    Step {st.step} of 8
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mandatory Safety Footer Callout (From Image & Doc 2) */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 text-[#29443A] font-bold text-sm mb-1">
            <Heart className="w-4 h-4 text-[#B85C5C] fill-[#B85C5C]" />
            <span>Concerning responses are referred for human support.</span>
          </div>
          <p className="text-xs text-[#5F746B]">
            Our AI facilitator is strictly educational. If immediate distress is detected, the program seamlessly connects you to the Tele-MANAS helpline (14416 / 112) and human clinical resources.
          </p>
        </div>
      </div>
    </section>
  );
}
