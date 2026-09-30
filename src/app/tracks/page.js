'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import TracksShowcase from '../../components/TracksShowcase';
import Footer from '../../components/Footer';
import { 
  Sparkles, CheckCircle2, ArrowRight, 
  Shield, Clock, Target, Compass
} from 'lucide-react';

const COMPARISON_MATRIX = [
  {
    groupNumber: 1,
    id: 'group1',
    name: 'Group 1: General Adults (18+)',
    shortAudience: 'General Adults 18+',
    idealFor: 'Adults seeking lifelong emotional regulation, stress pacing, and cognitive defusion.',
    duration: '52 Weeks',
    cadence: '1 Weekend Lesson / Week (10 mins)',
    primaryGoals: [
      'Emotional regulation without judgment',
      'Cognitive defusion & worry postponement',
      'Burnout recovery & restorative sleep rituals',
      'Sustainable personal & relational boundaries'
    ],
    bestFit: 'You want a steady, year-long habit to prevent burnout and handle adult life pressures.',
    safeguarding: 'Confidential personal wellness literacy. 100% self-paced and private.',
    badge: 'Flagship 52 Wks'
  },
  {
    groupNumber: 2,
    id: 'group2',
    name: 'Group 2: Parents & Caregivers',
    shortAudience: 'Parents & Caregivers',
    idealFor: 'Parents supporting minor children through emotional storms, school stress, and conflict.',
    duration: '52 Weeks',
    cadence: '1 Weekend Lesson / Week (10 mins)',
    primaryGoals: [
      'The Regulated Parent: calm yourself first',
      'Child emotion coaching & active listening',
      'Post-conflict repair & household boundaries',
      'Recognizing red flags without diagnosing'
    ],
    bestFit: 'You want to support a child emotionally without amateur diagnosing. Strictly adult accounts.',
    safeguarding: 'Non-diagnostic child support skills only. Strictly zero accounts or scores for children.',
    badge: 'Caregiver 52 Wks'
  },
  {
    groupNumber: 3,
    id: 'group3',
    name: 'Group 3: University & College Students (18+)',
    shortAudience: 'Students (18+)',
    idealFor: 'Undergraduate and graduate students balancing academic overwhelm, deadlines, and social life.',
    duration: '4 Weeks',
    cadence: 'Week 1 Daily (7 Lessons) + Weeks 2–4 Weekend',
    primaryGoals: [
      'Exam day panic relief & grounding anchors',
      'Imposter syndrome defusion in lecture halls',
      'Overcoming perfectionism & procrastination loops',
      'Navigating roommate friction & social courage'
    ],
    bestFit: 'You need rapid relief during an intense academic term, followed by 3 weekend integration sessions.',
    safeguarding: 'Completely private from university administration and academic faculty.',
    badge: 'Accelerated 4 Wks'
  },
  {
    groupNumber: 4,
    id: 'group4',
    name: 'Group 4: Workplace Professionals',
    shortAudience: 'Workplace Professionals',
    idealFor: 'Working professionals navigating workload creep, back-to-back meetings, and communication fatigue.',
    duration: '4 Weeks',
    cadence: 'Week 1 Daily (7 Lessons) + Weeks 2–4 Weekend',
    primaryGoals: [
      'The 5:00 PM cognitive shutdown ritual',
      'Asynchronous email & Slack boundary formulas',
      'Saying "No" without guilt or burning bridges',
      'Meeting overload detox & focus protection'
    ],
    bestFit: 'You are struggling with work-from-home bleed, weekend email checks, or demanding managers.',
    safeguarding: 'Complete employer firewall. Zero corporate or HR access to your notes or logs.',
    badge: 'Accelerated 4 Wks'
  }
];


export default function TracksPage() {
  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Comparison Hero Banner */}
        <div className="subpage-hero-banner bg-[#EEF3EF] border-b border-[#D3DFD7] py-8 sm:py-10">
          <div className="container max-w-4xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#4F7462]" />
              <span>DECISION &amp; COMPARISON GUIDE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#29443A] tracking-tight mb-3">
              Find Your <span className="text-[#4F7462]">Best-Fit Learning Track</span>
            </h1>
            <p className="text-[#5F746B] text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Compare our 4 dedicated adult streams side-by-side by audience, time commitment, core goals, and weekly cadence to choose the path built for your environment.
            </p>
          </div>
        </div>

        {/* Section 1: Side-by-Side Track Decision Matrix */}
        <section className="py-10 sm:py-12 border-b border-[#D3DFD7]">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDE9E2] text-[#4F7462] text-xs font-semibold mb-2">
                <Target className="w-3.5 h-3.5 text-[#4F7462]" />
                <span>SIDE-BY-SIDE COMPARISON</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#29443A] tracking-tight mb-2">
                Compare All 4 Tracks At A Glance
              </h2>
              <p className="text-xs sm:text-sm text-[#5F746B]">
                Review the core differences in weekly rhythm, focal skills, and safeguarding rules.
              </p>
            </div>

            {/* Responsive 4-Column Grid on Desktop, 2 on Tablet, 1 on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {COMPARISON_MATRIX.map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#FFFFFF] border border-[#D3DFD7] rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-[#789B87] transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F7462] bg-[#DDE9E2] px-2.5 py-0.5 rounded-full">
                        Group {item.groupNumber}
                      </span>
                      <span className="text-[10px] font-bold text-[#5F746B] bg-[#EEF3EF] px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#29443A] mb-2 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#5F746B] mb-4 leading-relaxed">
                      {item.idealFor}
                    </p>

                    {/* Cadence Pill */}
                    <div className="p-3 rounded-xl bg-[#F8F7F2] border border-[#E8F0EB] mb-4 text-xs">
                      <div className="text-[10px] uppercase font-bold text-[#4F7462] tracking-wider mb-1">
                        Cadence &amp; Duration
                      </div>
                      <div className="font-semibold text-[#29443A] mb-0.5">{item.duration}</div>
                      <div className="text-[11px] text-[#5F746B] leading-tight">{item.cadence}</div>
                    </div>

                    {/* Primary Goals */}
                    <div className="mb-4">
                      <div className="text-[11px] uppercase font-bold text-[#29443A] tracking-wider mb-2">
                        Key Competencies:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#5F746B]">
                        {item.primaryGoals.map((g, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7462] flex-shrink-0 mt-0.5" />
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best Fit Use Case */}
                    <div className="p-3 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] mb-4 text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#4F7462] tracking-wider block mb-1">
                        Best Fit If
                      </span>
                      <p className="text-[#29443A] leading-relaxed text-[11px]">
                        {item.bestFit}
                      </p>
                    </div>

                    {/* Safeguarding Notice */}
                    <div className="mb-5 text-[11px] text-[#5F746B] flex items-start gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#4F7462] flex-shrink-0 mt-0.5" />
                      <span>{item.safeguarding}</span>
                    </div>
                  </div>

                  {/* Register CTA */}
                  <div className="pt-3 border-t border-[#E8F0EB]">
                    <Link
                      href={`/register?group=${item.id}`}
                      className="w-full py-2.5 rounded-full btn-primary-glow text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Register for Group {item.groupNumber}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Deep-Dive Profile Explorer */}
        <TracksShowcase />

        {/* Section 3: Next Steps & Course Catalog Handoff */}
        <section className="py-10 sm:py-12 bg-[#EEF3EF] border-t border-[#D3DFD7]">
          <div className="container max-w-4xl mx-auto text-center px-4">
            <h3 className="text-2xl font-bold text-[#29443A] mb-3">
              Ready to Join an Adult Learning Cohort?
            </h3>
            <p className="text-xs sm:text-sm text-[#5F746B] mb-6 max-w-xl mx-auto leading-relaxed">
              Reserve your confidential seat in a safe, moderated 6-person peer group. 10 minutes every weekend with zero homework or clinical pressure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="btn-primary-glow px-8 py-3.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <span>Register for Your Cohort</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/how-it-works" 
                className="px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-xs font-bold border border-[#D3DFD7] transition-colors shadow-xs"
              >
                Learn How It Works
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
