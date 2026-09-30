'use client';
import React from 'react';
import MagicalCard from './MagicalCard';
import { ShieldAlert, ShieldCheck, HeartPulse, PhoneCall, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

export default function SafetySection() {
  return (
    <section id="safety" className="safety-section py-20 bg-[#EEF3EF] border-t border-b border-[#D3DFD7] relative">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>CLINICAL ETHICS &amp; SAFEGUARDING</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#29443A] tracking-tight mb-4">
            Our Uncompromising <span className="text-[#4F7462]">Safety &amp; Non-Therapy Boundaries</span>
          </h2>
          <p className="text-[#5F746B] text-base leading-relaxed">
            Mental wellness education requires strict clinical responsibility. We are clear about what we are,
            and equally transparent about what we are not.
          </p>
        </div>

        <div className="safety-grid">
          {/* What We Are vs What We Are Not */}
          <MagicalCard className="safety-card safety-boundaries-card bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_20px_rgba(41,68,58,0.07)] rounded-2xl" maxTilt={6}>
            <div className="card-inner-padding">
              <h3 className="safety-card-heading text-[#29443A]">
                <ShieldCheck className="w-5 h-5 text-[#4F7462] mr-2 inline" />
                Clear Program Boundaries
              </h3>

              <div className="boundary-comparison-list">
                <div className="boundary-row affirmative bg-[#EEF3EF] border border-[#D3DFD7] text-[#263832]">
                  <span className="boundary-badge yes bg-[#DDE9E2] text-[#4F7462]">WHAT WE ARE</span>
                  <p>A preventative, evidence-informed mental health literacy and coping skills micro-learning habit.</p>
                </div>
                <div className="boundary-row prohibitive bg-[#FDF4F4] border border-[#E8B8B8] text-[#263832]">
                  <span className="boundary-badge no bg-[#FDF4F4] text-[#A94E4E] border border-[#E8B8B8]">NOT THERAPY</span>
                  <p>We do not provide psychotherapy, medical diagnoses, psychiatric treatment, or clinical patient care.</p>
                </div>
                <div className="boundary-row affirmative bg-[#EEF3EF] border border-[#D3DFD7] text-[#263832]">
                  <span className="boundary-badge yes bg-[#DDE9E2] text-[#4F7462]">BOUNDED AI</span>
                  <p>Our AI Wellbeing Guide is strictly limited to answering curriculum questions and clarifying coping skills.</p>
                </div>
                <div className="boundary-row prohibitive bg-[#FDF4F4] border border-[#E8B8B8] text-[#263832]">
                  <span className="boundary-badge no bg-[#FDF4F4] text-[#A94E4E] border border-[#E8B8B8]">NO MEDICATIONS</span>
                  <p>The system never recommends, alters, or reviews psychiatric medications or medical dosages.</p>
                </div>
              </div>
            </div>
          </MagicalCard>

          {/* Red-Tier Crisis Escalation & 988 Hotline */}
          <MagicalCard className="safety-card crisis-box-card bg-[#FFFFFF] border border-[#E8B8B8] shadow-[0_6px_20px_rgba(184,92,92,0.08)] rounded-2xl" maxTilt={6} glowColor="rgba(184, 92, 92, 0.20)">
            <div className="card-inner-padding">
              <div className="crisis-badge-top bg-[#FDF4F4] border border-[#E8B8B8] text-[#A94E4E]">
                <AlertCircle className="w-4 h-4 text-[#B85C5C] mr-1.5" />
                <span>Immediate 24/7 Crisis Signposting</span>
              </div>
              <h3 className="crisis-heading text-[#29443A]">Need Help Right Now?</h3>
              <p className="crisis-desc text-[#5F746B]">
                If you are in acute distress, experiencing thoughts of self-harm, or feeling unsafe,
                please bypass our educational courses and connect directly with dedicated human professionals:
              </p>

              <div className="hotline-buttons-group space-y-3">
                <a href="tel:14416" className="btn-hotline btn-988 bg-[#B85C5C] hover:bg-[#9E4A4A] text-[#FFFFFF] shadow-sm flex items-center p-3.5 rounded-xl transition-all">
                  <PhoneCall className="w-5 h-5 mr-3 text-[#FFFFFF] flex-shrink-0" />
                  <div className="text-left">
                    <strong className="text-[#FFFFFF] text-sm block">Call 14416 (Tele-MANAS)</strong>
                    <span className="hotline-sub text-white/90 text-xs block">National Tele Mental Health Helpline India • 24/7 Free • 20+ Languages</span>
                  </div>
                </a>

                <a href="tel:18005990019" className="btn-hotline bg-[#F7F4EB] hover:bg-[#EFEAD9] border border-[#D5CBB2] text-[#29443A] shadow-xs flex items-center p-3.5 rounded-xl transition-all">
                  <HeartPulse className="w-5 h-5 mr-3 text-[#A6620C] flex-shrink-0" />
                  <div className="text-left">
                    <strong className="text-[#29443A] text-sm block">Call 1800-599-0019 (KIRAN Helpline)</strong>
                    <span className="hotline-sub text-[#5F746B] text-xs block">Govt. Mental Health Rehabilitation Helpline • 24/7 Free</span>
                  </div>
                </a>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a href="tel:112" className="p-2.5 rounded-xl bg-[#EEF3EF] hover:bg-[#DDE9E2] border border-[#789B87] text-[#29443A] text-center text-xs font-bold transition-colors">
                    Emergency: <strong className="text-[#B85C5C]">112</strong>
                  </a>
                  <a href="tel:+919999666555" className="p-2.5 rounded-xl bg-[#EEF3EF] hover:bg-[#DDE9E2] border border-[#789B87] text-[#29443A] text-center text-xs font-bold transition-colors">
                    Vandrevala: <strong className="text-[#25D366]">+91 9999 666 555</strong>
                  </a>
                </div>
              </div>

              <div className="intl-crisis-note text-[#667C72] border-t border-[#D3DFD7] mt-4 pt-3 text-[11px]">
                <span>International Users: US &amp; Canada call/text 988, UK/EU dial 112/999, or visit findahelpline.com</span>
              </div>
            </div>
          </MagicalCard>
        </div>
      </div>
    </section>
  );
}
