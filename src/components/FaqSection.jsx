'use client';
import React, { useState } from 'react';
import MagicalCard from './MagicalCard';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: "Why are the weekend voice rooms strictly capped at 6 adults?",
    a: "To ensure psychological safety and meaningful engagement. In large webinars or 30-person groups, adults stay silent or tune out. In a small group of up to 6 peers, the 4-minute Q&A is intimate, respectful, and allows everyone to feel heard without feeling put on the spot."
  },
  {
    q: "Can my employer, university, or manager see my daily mood check-ins?",
    a: "Never. Privacy is guaranteed by design. Your daily 'How are you feeling today?' logs are strictly private to your personal profile. Even if an enterprise or university sponsors your enrollment, they only receive aggregated, anonymized completion metrics (e.g., '82% completed Module 1')—never your personal mood data."
  },
  {
    q: "What is the exact role of the AI Wellbeing Guide?",
    a: "The AI Wellbeing Guide is bounded by strict clinical guardrails. It synthesizes questions, clarifies concepts taught in the 6-tile comic, and provides evidence-based coping exercises. It is programmed to never provide medical diagnoses, prescribe treatments, or engage in unmonitored crisis therapy."
  },
  {
    q: "Why are the main lessons delivered as 6-tile comics rather than video lectures?",
    a: "Research demonstrates that 60-minute video lectures cause cognitive fatigue and high dropout rates. An adult editorial comic strip takes exactly 5 minutes, can be re-read at your own pace, visually anchors key concepts in memory, and fits effortlessly into realistic busy weekends."
  },
  {
    q: "Can my minor child join the Parent Track sessions?",
    a: "No. All cohorts are strictly for adults aged 18 and above. The Parent Track (Group 2) equips parents and caregivers with communication, listening, and de-escalation tools to support their children at home. Children never join the cohorts or receive assessments through the platform."
  },
  {
    q: "What does the 30-Day Wellbeing Streak actually measure?",
    a: "Our streak model tracks personal engagement consistency (checking in, doing a 60-second breathing exercise, or reviewing a takeaway)—never whether you reported feeling 'happy.' We believe bad days are a natural part of being human, and you should never feel shame or break your streak for having an honest difficult day."
  },
  {
    q: "Is this program available in languages other than English?",
    a: "For Year 1 / MVP, the program is English-only to guarantee highest clinical safety, accurate voiceover nuance, and precise AI guardrail moderation. Localized multi-language versions are planned for future phases."
  }
];

export default function FaqSection({ hideHeader = false }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        {!hideHeader && (
          <div className="section-header-block">
            <div className="pill-badge">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
              <span>CLARITY &amp; COMMON QUESTIONS</span>
            </div>
            <h2 className="section-title">
              Frequently Asked <span className="text-amber-gradient">Questions</span>
            </h2>
            <p className="section-description">
              Everything you need to know about our curriculum, safety standards, and 10-minute weekend rituals.
            </p>
          </div>
        )}

        <div className="faq-accordion-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-item-card ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-text">{faq.q}</h3>
                  <div className={`faq-chevron-disc ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
