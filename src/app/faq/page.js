'use client';
import React from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import FaqSection from '../../components/FaqSection';
import Footer from '../../components/Footer';
import { HelpCircle, Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function FaqPage() {
  return (
    <div className="mindbloom-app-shell">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Page Header Banner */}
        <div className="subpage-hero-banner bg-[#EEF3EF] border-b border-[#D3DFD7] py-8 sm:py-10">
          <div className="container max-w-4xl mx-auto text-center px-4">
            <div className="subpage-badge mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#4F7462] mr-1.5 inline" />
              <span>PAGE • FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="subpage-title mb-3">
              Frequently Asked <span className="text-[#4F7462]">Questions</span>
            </h1>
            <p className="subpage-description max-w-2xl mx-auto">
              Clear answers regarding privacy, cohort matching, clinical boundaries, age requirements, and our 10-minute ritual.
            </p>
          </div>
        </div>

        {/* FAQ Accordion Component */}
        <FaqSection hideHeader={true} />

        {/* Support Inquiries Card */}
        <section className="faq-contact-section py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-center shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center mx-auto mb-4 text-[#4F7462]">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#29443A] mb-2">Have a clinical or corporate inquiry?</h3>
              <p className="text-[#5F746B] max-w-xl mx-auto mb-6 text-sm leading-relaxed">
                Our clinical curriculum board and employer wellness team are happy to answer any questions about cohort sizing, privacy, or track adaptation.
              </p>
              <a href="mailto:support@wellnessapp.com" className="btn-primary-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold shadow-sm">
                <span>Contact Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
