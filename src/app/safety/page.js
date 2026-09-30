'use client';
import React from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import SafetySection from '../../components/SafetySection';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { ShieldCheck, ShieldAlert, Lock, AlertTriangle, PhoneCall, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';

export default function SafetyPage() {
  return (
    <div className="mindbloom-app-shell">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Page Header Banner */}
        <div className="subpage-hero-banner">
          <div className="container">
            <div className="subpage-badge">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
              <span>PAGE • CLINICAL SAFETY &amp; ETHICS</span>
            </div>
            <h1 className="subpage-title">
              Our Safety &amp; <span className="text-amber-gradient">Safeguarding Model</span>
            </h1>
            <p className="subpage-description">
              Preventative mental health education requires radical honesty about what technology can and cannot do.
              Explore our non-therapy policies, AI guardrails, and crisis protocols.
            </p>
          </div>
        </div>

        {/* Safety Boundaries Component with 988 Hotline Box */}
        <SafetySection />

        {/* 3-Tier AI Safety Classifier (Section 14 & 15) */}
        <section className="safety-classifier-section">
          <div className="container">
            <div className="section-header-block">
              <h2 className="section-title">The 3-Tier AI Clinical Classifier</h2>
              <p className="section-description">
                Every voice and text interaction is continuously screened through strict clinical guardrails:
              </p>
            </div>

            <div className="classifier-grid">
              {/* Tier 1 */}
              <div className="tier-card tier-green">
                <div className="tier-header">
                  <span className="tier-badge">Tier 1 • Green</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h4>Everyday Stress &amp; Skill Practice</h4>
                <p>Standard educational self-help conversation. Reflecting on boundary setting, time pressure, or parenting communication.</p>
                <ul className="tier-protocols">
                  <li>AI Guide facilitates peer conversation</li>
                  <li>Prompts personal micro-action</li>
                  <li>No escalation needed</li>
                </ul>
              </div>

              {/* Tier 2 */}
              <div className="tier-card tier-amber">
                <div className="tier-header">
                  <span className="tier-badge">Tier 2 • Amber</span>
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <h4>Moderate Distress / Rumination</h4>
                <p>Repetitive hopelessness or overwhelming friction that exceeds peer group reflection scope.</p>
                <ul className="tier-protocols">
                  <li>AI Guide gently de-escalates tone</li>
                  <li>Validates difficulty without diagnosis</li>
                  <li>Recommends grounding + human resources</li>
                </ul>
              </div>

              {/* Tier 3 */}
              <div className="tier-card tier-red">
                <div className="tier-header">
                  <span className="tier-badge">Tier 3 • Red</span>
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                </div>
                <h4>Acute Crisis or Harm Indicators</h4>
                <p>Explicit mention of self-harm, suicidal ideation, abuse, or acute mental health emergency.</p>
                <ul className="tier-protocols">
                  <li>Immediate AI stop protocol</li>
                  <li>Direct display of Tele-MANAS (14416) &amp; Emergency (112) lines</li>
                  <li>Emergency contact facilitation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Crisis Contact Action Block - India Official Emergency & Mental Health Helplines */}
        <section id="crisis" className="py-12 bg-[#FFFFFF] border-t border-[#D3DFD7]">
          <div className="container max-w-5xl">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#FDF4F4] border border-[#E8B8B8] shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8B8B8]/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAE8E8] text-[#B85C5C] flex items-center justify-center border border-[#E8B8B8] flex-shrink-0">
                    <ShieldAlert className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#29443A]">
                      24/7 Immediate Crisis Helplines in India
                    </h3>
                    <p className="text-xs text-[#5F746B]">
                      Everyday Mental Wellness is purely educational literacy. If you or someone you know is in acute distress, free confidential human support is available immediately.
                    </p>
                  </div>
                </div>

                <a
                  href="tel:14416"
                  className="px-5 py-2.5 rounded-full bg-[#B85C5C] hover:bg-[#A94E4E] text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-2 flex-shrink-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 14416 (Tele-MANAS)</span>
                </a>
              </div>

              {/* Grid of India Helplines */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Tele-MANAS */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#B85C5C]/30 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAE8E8] text-[#B85C5C]">
                        Govt. 24/7 Toll-Free
                      </span>
                      <span className="text-xs text-[#5F746B]">20+ Languages</span>
                    </div>
                    <h4 className="text-base font-bold text-[#29443A] mb-1">Tele-MANAS</h4>
                    <p className="text-[11px] text-[#5F746B] mb-3 leading-relaxed">
                      National Tele Mental Health Programme of India (Ministry of Health &amp; Family Welfare). Apex guidance by NIMHANS.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EEF3EF] flex items-center gap-2">
                    <a
                      href="tel:14416"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#B85C5C] hover:bg-[#A94E4E] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call 14416</span>
                    </a>
                    <a
                      href="tel:18008914416"
                      className="py-2 px-3 rounded-xl bg-[#F8F7F2] hover:bg-[#EEF3EF] text-[#29443A] border border-[#D3DFD7] text-[11px] font-bold transition-colors"
                      title="Toll-free 1800-891-4416"
                    >
                      1800-891-4416
                    </a>
                  </div>
                </div>

                {/* 2. KIRAN */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FEF6E9] text-[#A6620C]">
                        Govt. Helpline
                      </span>
                      <span className="text-xs text-[#5F746B]">13 Languages</span>
                    </div>
                    <h4 className="text-base font-bold text-[#29443A] mb-1">KIRAN Helpline</h4>
                    <p className="text-[11px] text-[#5F746B] mb-3 leading-relaxed">
                      Mental health rehabilitation helpline by the Ministry of Social Justice &amp; Empowerment. Screening and distress relief.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EEF3EF]">
                    <a
                      href="tel:18005990019"
                      className="w-full py-2 px-3 rounded-xl bg-[#FEF6E9] hover:bg-[#FDEED3] text-[#A6620C] border border-[#F4B84B] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call 1800-599-0019</span>
                    </a>
                  </div>
                </div>

                {/* 3. National Emergency 112 */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDF4F4] text-[#A94E4E]">
                        Pan-India 112
                      </span>
                      <span className="text-xs text-[#5F746B]">Immediate Police/Medical</span>
                    </div>
                    <h4 className="text-base font-bold text-[#29443A] mb-1">National Emergency (112)</h4>
                    <p className="text-[11px] text-[#5F746B] mb-3 leading-relaxed">
                      All-in-one emergency response service across India for immediate medical, ambulance, or safety intervention.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EEF3EF]">
                    <a
                      href="tel:112"
                      className="w-full py-2 px-3 rounded-xl bg-[#29443A] hover:bg-[#1F332B] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Dial 112 (Emergency)</span>
                    </a>
                  </div>
                </div>

                {/* 4. Vandrevala Foundation */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E5F9ED] text-[#128C4A]">
                        Call / WhatsApp
                      </span>
                      <span className="text-xs text-[#5F746B]">24/7 Free</span>
                    </div>
                    <h4 className="text-base font-bold text-[#29443A] mb-1">Vandrevala Foundation</h4>
                    <p className="text-[11px] text-[#5F746B] mb-3 leading-relaxed">
                      Experienced clinical psychologists offering free psychological first-aid and de-escalation via phone or WhatsApp.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EEF3EF]">
                    <a
                      href="tel:+919999666555"
                      className="w-full py-2 px-3 rounded-xl bg-[#E5F9ED] hover:bg-[#D0F4DE] text-[#128C4A] border border-[#25D366] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call +91 9999 666 555</span>
                    </a>
                  </div>
                </div>

                {/* 5. NIMHANS Psychosocial Helpline */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAF2F9] text-[#1F5F8B]">
                        Apex Institute
                      </span>
                      <span className="text-xs text-[#5F746B]">Mental Health</span>
                    </div>
                    <h4 className="text-base font-bold text-[#29443A] mb-1">NIMHANS Helpline</h4>
                    <p className="text-[11px] text-[#5F746B] mb-3 leading-relaxed">
                      Specialist psychosocial and crisis counseling provided by clinical staff at the National Institute of Mental Health and Neurosciences.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EEF3EF]">
                    <a
                      href="tel:08046110007"
                      className="w-full py-2 px-3 rounded-xl bg-[#EAF2F9] hover:bg-[#D5E5F4] text-[#1F5F8B] border border-[#A2C7E5] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call 080-46110007</span>
                    </a>
                  </div>
                </div>

                {/* 6. AASRA Suicide Prevention */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDF4F4] text-[#A94E4E]">
                        Suicide Prevention
                      </span>
                      <span className="text-xs text-[#5F746B]">24/7 Confidential</span>
                    </div>
                    <h4 className="text-base font-bold text-[#29443A] mb-1">AASRA</h4>
                    <p className="text-[11px] text-[#5F746B] mb-3 leading-relaxed">
                      Non-judgmental, caring support for anyone coping with extreme distress, loneliness, or suicidal feelings.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#EEF3EF]">
                    <a
                      href="tel:+919820466726"
                      className="w-full py-2 px-3 rounded-xl bg-[#F8F7F2] hover:bg-[#EEF3EF] text-[#29443A] border border-[#D3DFD7] text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call +91 98204 66726</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* International note */}
              <div className="mt-6 pt-4 border-t border-[#E8B8B8]/60 text-center text-xs text-[#5F746B]">
                <span>International Learners: In the US &amp; Canada, dial <strong>988</strong> (Lifeline). In the UK &amp; EU, dial <strong>112</strong> or <strong>999</strong>. Visit <strong>findahelpline.com</strong> for country-specific directories.</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
