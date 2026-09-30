import React from 'react';
import Link from 'next/link';
import MagicalCard from './MagicalCard';
import { ArrowRight, Sparkles, ShieldCheck, Users, Clock } from 'lucide-react';

export default function CtaBanner() {

  return (
    <section id="enroll" className="cta-banner-section py-20 bg-[#FFFFFF] relative border-t border-[#D3DFD7]">
      <div className="container">
        <MagicalCard className="master-cta-card p-8 md:p-12 rounded-3xl bg-[#EEF3EF] border border-[#D3DFD7] text-center relative overflow-hidden shadow-[0_6px_20px_rgba(41,68,58,0.07)]" maxTilt={3}>
          <div className="max-w-3xl mx-auto relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
              <span>CONFIDENTIAL ADULT COHORTS • GET STARTED</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#29443A] tracking-tight mb-4">
              Ready to Build Your <span className="text-[#4F7462]">Weekend Wellness Habit?</span>
            </h2>

            <p className="text-[#5F746B] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Start building lifelong emotional regulation, boundary setting, and burnout resilience.
              10 minutes a weekend, completely confidential, designed for your stage of adult life.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                href="/register"
                className="btn-primary-glow px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold flex items-center justify-center gap-2 shadow-md w-full sm:w-auto"
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Register for a Group</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="/tracks"
                className="px-6 py-3.5 sm:py-4 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-sm sm:text-base font-bold border border-[#D3DFD7] transition-colors shadow-xs w-full sm:w-auto text-center"
              >
                Compare All 4 Tracks
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 mt-8 border-t border-[#D3DFD7] flex flex-wrap items-center justify-center gap-6 text-xs text-[#5F746B]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#4F7462]" />
                100% Confidential
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-[#4F7462]" />
                Max 6 Adults per Room
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#4F7462]" />
                10 Minutes / Weekend
              </span>
            </div>
          </div>
        </MagicalCard>
      </div>
    </section>
  );
}
