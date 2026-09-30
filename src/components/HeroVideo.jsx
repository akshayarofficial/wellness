'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, 
  Subtitles, FileText, CheckCircle2, ArrowRight, Sparkles, Clock, Compass 
} from 'lucide-react';
import { HERO_VIDEO_SCENES } from '../lib/wellnessData';

export default function HeroVideo() {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const totalDurationSec = 80;

  // Derive active scene index directly during render
  let accumulated = 0;
  let activeSceneIndex = 0;
  for (let i = 0; i < HERO_VIDEO_SCENES.length; i++) {
    accumulated += HERO_VIDEO_SCENES[i].durationSec;
    if (currentSec <= accumulated || i === HERO_VIDEO_SCENES.length - 1) {
      activeSceneIndex = i;
      break;
    }
  }

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSec((prev) => {
        const next = prev + 0.25 * speed;
        if (next >= totalDurationSec) {
          setIsPlaying(false);
          return totalDurationSec;
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Voiceover synthesis on scene change if unmuted
  useEffect(() => {
    if (!isPlaying || isMuted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const currentScene = HERO_VIDEO_SCENES[activeSceneIndex];
      if (currentScene?.narration) {
        const utterance = new SpeechSynthesisUtterance(currentScene.narration);
        utterance.rate = 0.95 * speed;
        utterance.pitch = 1.0;
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [activeSceneIndex, isPlaying, isMuted, speed]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (currentSec >= totalDurationSec) {
        setCurrentSec(0);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const next = !prev;
      if (next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  const handleTimelineClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = ratio * totalDurationSec;
    setCurrentSec(targetSec);
  };

  const jumpToScene = (sceneIndex) => {
    let startSec = 0;
    for (let i = 0; i < sceneIndex; i++) {
      startSec += HERO_VIDEO_SCENES[i].durationSec;
    }
    setCurrentSec(startSec + 0.1);
    setIsPlaying(true);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const activeScene = HERO_VIDEO_SCENES[activeSceneIndex];
  const progressPercent = Math.min(100, (currentSec / totalDurationSec) * 100);
  const mins = String(Math.floor(currentSec / 60)).padStart(2, '0');
  const secs = String(Math.floor(currentSec % 60)).padStart(2, '0');

  return (
    <div className="hero-video-wrapper my-6" ref={containerRef}>
      {/* Video Container Shell with Cinematic Border & Glow */}
      <div 
        className="hero-video-container relative rounded-2xl overflow-hidden shadow-2xl border border-teal-400/30 bg-[#0D1B34]"
        onClick={togglePlay}
        style={{ aspectRatio: '16/9' }}
      >
        {/* Visual Scene Display Layer with Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          <Image
            src={activeScene.image}
            alt={activeScene.title}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover transition-opacity duration-700 ease-in-out"
            priority
          />
          {/* Subtle Dusk Volumetric Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B34]/95 via-[#0D1B34]/40 to-transparent" />
        </div>

        {/* Top Header Badge Strip */}
        <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 bg-[#0D1B34]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-400/40 text-xs font-semibold text-teal-300">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping inline-block" />
            <span>Scene {activeScene.sceneNumber}/8: {activeScene.title}</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={(e) => { e.stopPropagation(); setShowTranscript(!showTranscript); }}
              className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                showTranscript ? 'bg-amber-400 text-slate-900 font-bold' : 'bg-black/60 text-stone-300 hover:text-white border border-white/10'
              }`}
              title="View full voiceover transcript"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Transcript</span>
            </button>
            <span className="bg-black/60 backdrop-blur-sm text-stone-300 px-2.5 py-1 rounded-full text-xs border border-white/10">
              {activeScene.safeGroup}
            </span>
          </div>
        </div>

        {/* Center Play / Pause Indicator Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] transition-all">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-teal-400 p-0.5 shadow-[0_0_40px_rgba(49,213,213,0.45)] hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0D1B34] flex items-center justify-center">
                <Play className="w-9 h-9 text-amber-300 fill-amber-300 translate-x-1" />
              </div>
            </div>
            <span className="mt-4 text-sm font-semibold tracking-wide text-stone-100 bg-[#0D1B34]/80 px-4 py-1.5 rounded-full border border-teal-400/30">
              Watch 80-Second Cinematic Journey Preview
            </span>
          </div>
        )}

        {/* Center Unmute Button (ToonBee Style matching user screenshot) */}
        {isPlaying && isMuted && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-25 pointer-events-auto">
            <button
              onClick={toggleMute}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/85 backdrop-blur-md border border-amber-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(244,184,75,0.45)] hover:scale-105 transition-transform cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Click to Unmute</span>
            </button>
          </div>
        )}

        {/* Synced Narration Captions (AT10) */}
        {captionsEnabled && (
          <div className="absolute bottom-16 left-6 right-6 z-20 pointer-events-none">
            <div className="max-w-2xl mx-auto bg-[#0D1B34]/90 backdrop-blur-md px-5 py-2.5 rounded-xl border border-teal-400/40 text-center shadow-lg">
              <div className="text-[11px] uppercase tracking-wider text-teal-300 font-bold mb-0.5">
                {activeScene.overlayText}
              </div>
              <p className="text-sm md:text-base text-amber-100 font-medium leading-snug">
                &ldquo;{activeScene.narration}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Video End Slate with Call to Action (When 80s completed) */}
        {currentSec >= totalDurationSec && (
          <div className="absolute inset-0 z-30 bg-[#0D1B34]/95 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <Sparkles className="w-12 h-12 text-amber-400 mb-3" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Everyday Mental Wellness
            </h3>
            <p className="text-sm text-stone-300 max-w-md mb-6">
              Choose your adult stream: General Adults, Parents, Students, or Workplace Professionals.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/register"
                onClick={(e) => e.stopPropagation()}
                className="btn-primary-glow px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2"
              >
                <span>Register for a Group (18+)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentSec(0); setIsPlaying(true); }}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium flex items-center gap-2 border border-white/15"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Preview</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Interactive Control Bar (Doc 1 & Doc 2) */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent pt-6 pb-3 px-4 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Timeline with Chapter Markers */}
          <div 
            className="relative w-full h-3 bg-white/20 hover:h-4 rounded-full cursor-pointer transition-all flex items-center"
            onClick={handleTimelineClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-teal-400 via-amber-400 to-purple-400 rounded-full shadow-[0_0_12px_rgba(49,213,213,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Controls Strip */}
          <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-amber-300 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-amber-300" /> : <Play className="w-4 h-4 fill-amber-300 translate-x-0.5" />}
              </button>

              <span className="font-mono text-stone-200">
                {mins}:{secs} / 01:20
              </span>

              {/* Mute / Unmute Button with Voiceover Label */}
              <button
                onClick={toggleMute}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition-colors"
                aria-label={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-400" />
                    <span className="text-[11px] text-stone-400">Audio Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-teal-300" />
                    <span className="text-[11px] text-teal-300">Voiceover Active</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Captions Toggle */}
              <button
                onClick={() => setCaptionsEnabled(!captionsEnabled)}
                className={`p-1.5 rounded-lg border text-[11px] flex items-center gap-1 ${
                  captionsEnabled ? 'bg-teal-500/20 border-teal-400/50 text-teal-300' : 'bg-white/5 border-white/10 text-stone-400'
                }`}
                title="Toggle subtitles"
              >
                <Subtitles className="w-3.5 h-3.5" />
                <span>CC</span>
              </button>

              {/* Speed Toggle */}
              <button
                onClick={() => setSpeed(speed === 1 ? 1.25 : 1)}
                className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-[11px] font-mono"
                title="Playback speed"
              >
                {speed}x
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200"
                aria-label="Toggle Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Scene Jump Selector Strip (Doc 1 Storyboard) */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1 pr-2 flex-shrink-0">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Jump to:</span>
        </span>
        {HERO_VIDEO_SCENES.map((scene, i) => (
          <button
            key={scene.id}
            onClick={() => jumpToScene(i)}
            className={`px-3 py-1.5 rounded-lg text-xs flex-shrink-0 transition-all font-medium ${
              activeSceneIndex === i 
                ? 'bg-teal-500/20 border border-teal-400 text-teal-200 font-bold shadow-[0_0_10px_rgba(49,213,213,0.3)]'
                : 'bg-[#183866]/50 hover:bg-[#183866] text-stone-300 border border-white/5'
            }`}
          >
            <span className="text-amber-400 font-bold mr-1">{scene.id}:</span>
            <span>{scene.title.split('•')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Transcript Drawer Modal (Accessibility & Verification AT10) */}
      {showTranscript && (
        <div className="mt-3 p-4 rounded-xl bg-[#0D1B34] border border-teal-400/30 text-stone-200 text-xs animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <div className="font-bold text-teal-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Approved Hero Video Narration Transcript (80 Seconds)</span>
            </div>
            <button 
              onClick={() => setShowTranscript(false)}
              className="text-stone-400 hover:text-white px-2 py-0.5 rounded bg-white/5"
            >
              ✕ Close
            </button>
          </div>
          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-2">
            {HERO_VIDEO_SCENES.map((s, idx) => (
              <div 
                key={s.id} 
                onClick={() => jumpToScene(idx)}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  activeSceneIndex === idx ? 'bg-teal-500/15 border-l-2 border-teal-400' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-amber-400">{s.id} ({s.timeRange})</span>
                  <span className="text-stone-400">• {s.title}</span>
                </div>
                <p className="text-stone-300 italic">&ldquo;{s.narration}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
