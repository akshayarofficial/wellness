'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeartPulse, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Compact Global Safety Notice - High Contrast */}
        <div className="footer-crisis-callout flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs rounded-xl mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0 text-rose-300">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block sm:inline mr-1.5">Educational literacy only.</span>
              <span className="text-[#C2D4CB]">
                Not therapy or emergency service. In crisis in India, call <strong className="text-white font-bold underline decoration-rose-400">14416</strong> (Tele-MANAS) or <strong className="text-white font-bold underline decoration-rose-400">112</strong> (24/7 Free). International: 988.
              </span>
            </div>
          </div>
          <Link 
            href="/safety#crisis" 
            className="text-[#9EC4B2] hover:text-white font-semibold text-xs inline-flex items-center gap-1.5 flex-shrink-0 transition-colors py-1 px-2 rounded-md hover:bg-white/10"
          >
            <span>Safety boundaries &amp; India 14416 guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link href="/" className="brand-logo-group inline-flex items-center gap-2.5">
              <div className="mascot-badge-wrapper bg-[#1F332B] p-1.5 rounded-xl border border-[#2F4B3F]">
                <Image
                  src="/images/mascot.png"
                  alt="EverydayWellness Mascot"
                  width={34}
                  height={34}
                  className="mascot-img"
                />
              </div>
              <div className="brand-text-block">
                <span className="brand-name font-black tracking-tight text-white text-lg">
                  Everyday<span className="text-[#8FAF9D]">Wellness</span>
                </span>
                <span className="brand-sub block text-[11px] text-[#9EB3A7] font-semibold tracking-wide">
                  Adult Mental Health Micro-Learning
                </span>
              </div>
            </Link>
            <p className="footer-tagline">
              A 1-year micro-learning habit built for busy adults. 5-minute six-tile editorial comics, 
              4-minute shared AI voice rooms, and 1-minute daily actions.
            </p>
            <div className="footer-meta-pill">
              <span>English-Only MVP • Adults 18+</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="footer-col">
            <h5 className="footer-heading">Navigation</h5>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/register">Group Registration</Link></li>
              <li><Link href="/tracks">4 Adult Tracks</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/comic-method">6-Tile Comic Method</Link></li>
              <li><Link href="/daily-checkin">Daily Mood Check-In</Link></li>
              <li><Link href="/classroom">Virtual Classroom</Link></li>
            </ul>
          </div>

          {/* Curriculum Tracks Column */}
          <div className="footer-col">
            <h5 className="footer-heading">Learning Tracks</h5>
            <ul className="footer-links">
              <li><Link href="/register?group=group1">Group 1: General Adults (18+)</Link></li>
              <li><Link href="/register?group=group2">Group 2: Parents &amp; Caregivers</Link></li>
              <li><Link href="/register?group=group3">Group 3: Adult Students (18+)</Link></li>
              <li><Link href="/register?group=group4">Group 4: Workplace Professionals</Link></li>
              <li>
                <Link href="/register" className="font-bold text-[#8FAF9D] hover:text-white flex items-center gap-1">
                  <span>Register for a Group</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Support Column */}
          <div className="footer-col">
            <h5 className="footer-heading">Safety &amp; Support</h5>
            <ul className="footer-links">
              <li><Link href="/safety">Clinical Boundaries</Link></li>
              <li><Link href="/safety#crisis">Crisis Helplines (India 14416 / 112)</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
              <li><Link href="/progress">Learner Progress &amp; Streaks</Link></li>
              <li><Link href="/schedule">Weekly Session Schedule</Link></li>
              <li><Link href="/certificate">Completion Certificates</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2B3D35] text-xs">
          <p className="copyright-text text-[#8EA397] text-center sm:text-left">
            © {new Date().getFullYear()} EverydayWellness. All rights reserved. 52-Week Mental Health &amp; Wellness Blueprint.
          </p>
          <div className="footer-legal-links flex items-center gap-4 text-[#BACDC4]">
            <Link href="/safety" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/safety" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/safety" className="hover:text-white transition-colors">Clinical Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
