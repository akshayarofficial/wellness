'use client';
import React from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import ComicMethodSection from '../../components/ComicMethodSection';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { BookOpen, Mic, CheckCircle, Sparkles, Layers, Eye, Clock, ArrowRight } from 'lucide-react';

export default function ComicMethodPage() {
  return (
    <div className="mindbloom-app-shell">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Page Header Banner */}
        <div className="subpage-hero-banner">
          <div className="container">
            <div className="subpage-badge">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
              <span>PAGE • 6-TILE METHOD</span>
            </div>
            <h1 className="subpage-title">
              Why <span className="text-amber-gradient">6-Tile Graphic Comics</span> Work
            </h1>
            <p className="subpage-description">
              Long webinars and lecture videos have an 85% dropout rate. Our 6-tile illustrated comic standard
              delivers deep psychological insights in under 5 minutes without causing screen exhaustion.
            </p>
          </div>
        </div>

        {/* 6-Tile Interactive Storyboard Component */}
        <ComicMethodSection />

        {/* Production Standards Deep Dive */}
        <section className="comic-standards-section">
          <div className="container">
            <div className="section-header-block">
              <h2 className="section-title">Strict Production Standards (Section 10)</h2>
              <p className="section-description">
                Every comic strip adheres to rigorous visual and clinical guidelines before release:
              </p>
            </div>

            <div className="standards-grid">
              <div className="standard-card">
                <h4>2×3 Fixed Grid</h4>
                <p>Standardized reading flow across mobile and desktop. No visual clutter, erratic scrolling, or unpredictable zoom.</p>
              </div>

              <div className="standard-card">
                <h4>110–130 WPM Voiceover</h4>
                <p>Calm, pacing-controlled studio voice narration. Designed to down-regulate the nervous system while listening.</p>
              </div>

              <div className="standard-card">
                <h4>High-Contrast &amp; Accessible</h4>
                <p>Meets WCAG AA standards. Large font typography, high-contrast speech bubbles, and full closed-caption support.</p>
              </div>

              <div className="standard-card">
                <h4>Diverse &amp; Respectful</h4>
                <p>Nuanced character representations across age, ethnicity, and gender. Zero offensive tropes or caricatures.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Targeted Action Callout */}
        <section className="py-12 bg-[#FFFFFF] border-t border-[#D3DFD7]">
          <div className="container">
            <div className="p-8 md:p-10 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] text-center max-w-3xl mx-auto shadow-sm">
              <h3 className="text-2xl font-bold text-[#29443A] mb-3">
                Experience an Illustrated Lesson in Action
              </h3>
              <p className="text-sm text-[#5F746B] mb-6 max-w-xl mx-auto leading-relaxed">
                Step into the classroom to view an interactive 6-tile sample lesson, or explore our four distinct adult tracks.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/classroom" className="btn-primary-glow px-8 py-3.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
                  <span>Enter Interactive Classroom</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/tracks" className="px-6 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-xs font-bold border border-[#D3DFD7] transition-colors">
                  View 4 Adult Tracks
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
