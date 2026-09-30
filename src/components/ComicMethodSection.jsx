'use client';
import React from 'react';
import Image from 'next/image';
import MagicalCard from './MagicalCard';
import { BookOpen, Layers, CheckSquare, Sparkles, Clock, MessageSquareQuote } from 'lucide-react';

const COMIC_STEPS = [
  {
    tile: "Tile 01",
    time: "0:00 – 0:30",
    title: "Everyday Hook",
    desc: "Immediate relatable life friction. A demanding manager, an emotional meltdown, or an anxiety surge. No theoretical introductions."
  },
  {
    tile: "Tile 02",
    time: "0:30 – 1:15",
    title: "The Reactive Pattern",
    desc: "Demonstrates what we naturally do when overwhelmed: avoidance, doomscrolling, snapping, or bottling up."
  },
  {
    tile: "Tile 03",
    time: "1:15 – 2:10",
    title: "Name the Concept",
    desc: "The psychological mechanism in plain English (e.g. Cognitive Defusion, Emotion Coaching) without medical diagnosis."
  },
  {
    tile: "Tile 04",
    time: "2:10 – 3:10",
    title: "Demonstrate the Skill",
    desc: "The illustrated character performs a concrete, realistic coping behavior in context."
  },
  {
    tile: "Tile 05",
    time: "3:10 – 4:10",
    title: "Try with Realistic Limits",
    desc: "Shows what happens when the character applies the skill: imperfect, human, yet distinctly calmer and more in control."
  },
  {
    tile: "Tile 06",
    time: "4:10 – 5:00",
    title: "1-Minute Action",
    desc: "One realistic, immediate takeaway habit the adult can do right now to lock in the learning."
  }
];

export default function ComicMethodSection() {
  return (
    <section id="comic-method" className="comic-method-section py-20 bg-[#FFFFFF] border-t border-b border-[#D3DFD7] relative">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>THE LEARNING STANDARD • 6-TILE COMIC METHOD</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#29443A] tracking-tight mb-4">
            Why <span className="text-[#4F7462]">6-Tile Graphic Comics</span> Beat Long Video Lectures
          </h2>
          <p className="text-[#5F746B] text-base leading-relaxed">
            Adults don&apos;t have time for 60-minute video lectures. By distilling evidence-informed psychology
            into 6 visual story panels, you absorb a life-changing coping skill in under 5 minutes.
          </p>
        </div>

        {/* Comic Sample Preview Image Banner */}
        <div className="comic-sample-container">
          <MagicalCard className="comic-sample-card" maxTilt={5} glowColor="rgba(120, 155, 135, 0.20)">
            <div className="comic-sample-header">
              <div className="comic-title-group">
                <BookOpen className="w-5 h-5 text-[#4F7462] mr-2" />
                <h3 className="comic-sample-name text-[#29443A]">Official 6-Tile Storyboard Prototype: &ldquo;Anchoring in Calm&rdquo;</h3>
              </div>
              <span className="comic-spec-tag">2×3 Editorial Grid • 5-Minute Audio Sync</span>
            </div>
            <div className="comic-image-wrapper border border-[#D3DFD7]">
              <Image
                src="/images/comic_six_tiles_sample.jpg"
                alt="6-Tile Comic Strip Storyboard Example"
                width={1200}
                height={675}
                className="comic-full-img"
              />
            </div>
            <div className="comic-sample-footer text-[#5F746B] border-t border-[#D3DFD7]">
              <span>✓ Visual panel layout standardized across all 52 weeks</span>
              <span>✓ Synchronized with 110–130 wpm conversational voiceover</span>
              <span>✓ Accessible typography and clear emotional storytelling</span>
            </div>
          </MagicalCard>
        </div>

        {/* 6 Step Panel Breakdown */}
        <div className="comic-tiles-breakdown-grid">
          {COMIC_STEPS.map((step, idx) => (
            <div key={idx} className="tile-step-card">
              <div className="tile-step-header">
                <span className="tile-pill">{step.tile}</span>
                <span className="tile-time">{step.time}</span>
              </div>
              <h4 className="tile-title">{step.title}</h4>
              <p className="tile-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
