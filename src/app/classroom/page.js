'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  Play, Pause, Volume2, VolumeX, RotateCcw, CheckCircle2, 
  ArrowRight, ShieldAlert, Sparkles, BookOpen, Clock, AlertCircle, 
  FileText, Subtitles, HelpCircle, Heart, PhoneCall, MessageSquare, Award,
  Check, ChevronRight
} from 'lucide-react';
import { SAMPLE_LESSON_G1, PROGRAM_STREAMS } from '../../lib/wellnessData';
import { 
  getWellnessState, saveWellnessState, reportConcerningSignal 
} from '../../lib/wellnessStore';

// 2x3 grid zoom focus points for each of the 6 comic panels in comic_six_tiles_sample.jpg
const TILE_ORIGINS = [
  '17% 25%', // Tile 1: Top-Left
  '50% 25%', // Tile 2: Top-Center
  '83% 25%', // Tile 3: Top-Right
  '17% 75%', // Tile 4: Bottom-Left
  '50% 75%', // Tile 5: Bottom-Center
  '83% 75%', // Tile 6: Bottom-Right
];

export default function ClassroomPage() {
  const [state, setState] = useState(() => getWellnessState());
  const [activeTab, setActiveTab] = useState('comic'); // 'comic' | 'quiz' | 'recap'
  
  // Comic Player State
  const [currentTileIndex, setCurrentTileIndex] = useState(0); // 0 to 5 (Tiles 1-6)
  const [viewMode, setViewMode] = useState('focus'); // 'focus' | 'storyboard'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoWatchedThresholdMet, setVideoWatchedThresholdMet] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [showSafetyEscalationModal, setShowSafetyEscalationModal] = useState(false);
  const [escalationLog, setEscalationLog] = useState(null);

  // Group Entitlement Security
  const accessDenied = state?.enrollment?.status === 'none';

  const lesson = SAMPLE_LESSON_G1;
  const currentTile = lesson.tiles[currentTileIndex];

  // Auto-advance through tiles 1-6 when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTileIndex((prev) => {
        if (prev < 5) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          setVideoWatchedThresholdMet(true);
          return 5;
        }
      });
    }, 4500 / playbackSpeed);

    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed]);

  // Voiceover audio speech synthesis on tile change when unmuted
  useEffect(() => {
    if (!isPlaying || isAudioMuted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${currentTile.name}. ${currentTile.narration}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95 * playbackSpeed;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  }, [currentTileIndex, isPlaying, isAudioMuted, playbackSpeed, currentTile.name, currentTile.narration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsAudioMuted((prev) => {
      const next = !prev;
      if (next && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return next;
    });
  };

  const handleSelectAnswer = (qId, optionIndex) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qId]: optionIndex });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    const missed = [];

    lesson.quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      } else {
        missed.push(q);
      }
    });

    setQuizScore(score);
    setMissedQuestions(missed);
    setQuizSubmitted(true);

    // Save completion event in state store
    if (state) {
      const updated = { ...state };
      updated.learning.quizScores[lesson.id] = {
        score,
        total: lesson.quizQuestions.length,
        passed: score >= 6,
        timestamp: new Date().toISOString()
      };
      if (!updated.learning.completedLessonIds.includes(lesson.id)) {
        updated.learning.completedLessonIds.push(lesson.id);
      }
      saveWellnessState(updated);
      setState(updated);
    }
  };

  const handleTriggerCrisisSignal = (customText) => {
    const report = reportConcerningSignal(
      customText || 'Learner expressed acute thoughts of hopelessness and self-harm during lesson reflection.',
      'classroom_safety_protocol'
    );
    setEscalationLog(report);
    setShowSafetyEscalationModal(true);
  };

  if (accessDenied) {
    return (
      <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
        <AmbientSparks />
        <Navbar />
        <div className="container py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-300 flex items-center justify-center mx-auto mb-4 text-[#B85C5C]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#29443A] mb-2">Access Restricted: Active Enrollment Required</h2>
          <p className="text-[#5F746B] text-xs max-w-md mx-auto mb-6">
            You must have an active enrollment and verified age to enter the learning room.
          </p>
          <Link href="/register" className="btn-primary-glow text-xs py-3 px-6 rounded-full inline-flex items-center gap-2">
            <span>Register for a Group</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Clean dialogue string (removes character label prefix if present)
  const cleanDialogue = currentTile.dialogue
    .replace(/^Maya[^:]*:\s*"?/, '')
    .replace(/"?$/, '');

  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main container py-10">
        {/* Top Header Strip with Stream Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D3DFD7]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] font-mono text-[11px] font-bold">
                Room #4 • Active Cohort
              </span>
              <span className="text-xs text-[#5F746B]">|</span>
              <span className="text-xs text-[#4F7462] font-semibold">{lesson.streamName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#29443A]">
              {lesson.title}
            </h1>
            <p className="text-xs text-[#5F746B] mt-0.5">
              Module: {lesson.module} • Setting: {lesson.setting}
            </p>
          </div>

          {/* Tab Navigation: Comic Video -> Quiz -> Personalized Recap */}
          <div className="flex items-center gap-2 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#D3DFD7] shadow-sm">
            <button
              onClick={() => setActiveTab('comic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'comic'
                  ? 'bg-[#DDE9E2] text-[#4F7462] shadow-xs'
                  : 'text-[#5F746B] hover:text-[#29443A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. 5-Min Comic</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-[#DDE9E2] text-[#4F7462] shadow-xs'
                  : 'text-[#5F746B] hover:text-[#29443A]'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>2. 8-Question Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab('recap')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'recap'
                  ? 'bg-[#DDE9E2] text-[#4F7462] shadow-xs'
                  : 'text-[#5F746B] hover:text-[#29443A]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>3. 1-Min Recap</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB 1: 5-MINUTE VOICED COMIC LESSON
           ======================================================== */}
        {activeTab === 'comic' && (
          <div className="space-y-6">
            <MagicalCard className="p-4 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-[0_6px_24px_rgba(41,68,58,0.08)]" maxTilt={1}>
              {/* Comic Player Viewport (Properly Framed, Responsive, Non-overflowing) */}
              <div 
                className="relative rounded-2xl overflow-hidden bg-[#16231E] border border-[#D3DFD7] mb-5 shadow-inner"
                style={{ width: '100%', height: '390px', maxHeight: '480px', minHeight: '300px', position: 'relative' }}
              >
                {/* Active Tile View: Responsive 6-panel zoom or full storyboard view */}
                <div 
                  className="w-full h-full relative transition-all duration-500 ease-out"
                  style={{
                    transform: viewMode === 'focus' ? 'scale(1.45)' : 'scale(1.0)',
                    transformOrigin: viewMode === 'focus' ? (TILE_ORIGINS[currentTileIndex] || '50% 50%') : 'center center',
                  }}
                >
                  <Image
                    src="/images/comic_six_tiles_sample.jpg"
                    alt={currentTile.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className={viewMode === 'focus' ? 'object-cover' : 'object-contain'}
                    priority
                  />
                </div>

                {/* Explicit Subtle Scrim for Controls & Badges (Keeps Art Bright) */}
                <div 
                  className="absolute inset-0 pointer-events-none" 
                  style={{ background: 'linear-gradient(to bottom, rgba(16, 26, 22, 0.45) 0%, transparent 22%, transparent 68%, rgba(16, 26, 22, 0.8) 100%)' }}
                />

                {/* Top Badge: Active Tile Info & View Mode Toggle */}
                <div 
                  className="absolute flex items-center justify-between pointer-events-auto z-20"
                  style={{ top: '12px', left: '12px', right: '12px' }}
                >
                  <div className="bg-[#16231E]/90 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[#789B87]/50 text-xs font-bold text-white shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#789B87] animate-pulse" />
                    <span>Panel {currentTile.tileIndex} of 6 • {currentTile.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode(viewMode === 'focus' ? 'storyboard' : 'focus')}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer border border-white/20"
                    >
                      {viewMode === 'focus' ? 'View All 6 Panels' : 'Focus Panel'}
                    </button>
                    <div className="bg-black/75 px-2.5 py-1 rounded-full text-[11px] text-amber-300 font-mono border border-white/10">
                      {currentTile.timeCode}
                    </div>
                  </div>
                </div>

                {/* High-Resolution Readable Speech Bubble (SVG/HTML Overlay) */}
                <div 
                  className="absolute max-w-xs sm:max-w-sm z-20 animate-fade-in pointer-events-none"
                  style={{ top: '56px', left: '16px' }}
                >
                  <div className="relative bg-[#FFFFFF]/95 backdrop-blur-md text-[#293934] p-3 sm:p-3.5 rounded-xl rounded-tl-sm shadow-[0_8px_20px_rgba(0,0,0,0.25)] border-2 border-[#8FAF9D]">
                    {/* Speaker Badge */}
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#4F7462]" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#4F7462]">
                        Maya • Shared Apartment
                      </span>
                    </div>
                    {/* Dialogue Text */}
                    <p className="text-xs sm:text-xs font-semibold text-[#293934] leading-snug">
                      &ldquo;{cleanDialogue}&rdquo;
                    </p>
                    {/* SVG Bubble Tail */}
                    <svg className="absolute -bottom-2 left-4 w-3.5 h-3.5 text-[#FFFFFF] fill-current drop-shadow-sm" viewBox="0 0 20 20">
                      <polygon points="0,0 20,0 6,18" />
                    </svg>
                  </div>
                </div>

                {/* Narration Subtitles Box */}
                {captionsOn && (
                  <div 
                    className="absolute z-20 pointer-events-none"
                    style={{ bottom: '52px', left: '16px', right: '16px' }}
                  >
                    <div className="max-w-xl mx-auto bg-[#16231E]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#789B87]/40 text-center shadow-lg">
                      <span className="text-[9px] uppercase font-bold text-[#8FAF9D] block mb-0.5 tracking-wider">
                        Voiceover Narration (110–130 WPM)
                      </span>
                      <p className="text-[11px] sm:text-xs text-[#F8F7F2] font-medium leading-relaxed">
                        &ldquo;{currentTile.narration}&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Media Controls Bar with Explicit Solid Dark Gradient */}
                <div 
                  className="absolute bottom-0 left-0 right-0 z-30 p-2.5 sm:p-3 flex items-center justify-between text-xs text-white"
                  style={{ background: 'linear-gradient(to top, rgba(16, 26, 22, 0.95) 0%, rgba(16, 26, 22, 0.8) 70%, transparent 100%)' }}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={togglePlay}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-amber-300 transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause lesson' : 'Play lesson'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300 translate-x-0.5" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer text-[11px]"
                    >
                      {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-teal-300" />}
                      <span className="hidden sm:inline">{isAudioMuted ? 'Muted' : 'Voiceover'}</span>
                    </button>
                  </div>

                  {/* Tile 1 to 6 Navigation Pills */}
                  <div className="flex items-center gap-1">
                    {lesson.tiles.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentTileIndex(idx)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                          currentTileIndex === idx
                            ? 'bg-[#4F7462] text-white shadow-[0_0_10px_rgba(79,116,98,0.8)]'
                            : 'bg-white/15 text-stone-200 hover:bg-white/25'
                        }`}
                        title={t.name}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => setCaptionsOn(!captionsOn)}
                      className={`px-2 py-0.5 sm:py-1 rounded border text-[10px] sm:text-[11px] font-bold cursor-pointer ${
                        captionsOn ? 'bg-teal-500/30 border-teal-400 text-teal-200' : 'bg-white/10 border-white/20 text-stone-400'
                      }`}
                    >
                      CC
                    </button>
                    <button
                      onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.25 : 1)}
                      className="px-2 py-0.5 sm:py-1 rounded bg-white/15 hover:bg-white/25 text-[10px] sm:text-[11px] font-mono cursor-pointer"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>
                </div>
              </div>

              {/* Learning Point Summary Box */}
              <div className="p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs uppercase font-bold text-[#4F7462] block mb-0.5">
                    Core Skill Anchor • Panel {currentTile.tileIndex}:
                  </span>
                  <p className="text-xs text-[#29443A] font-medium">
                    {currentTile.learningPoint}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setShowFullTranscript(!showFullTranscript)}
                    className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F8F7F2] text-xs font-semibold text-[#29443A] border border-[#D3DFD7] transition-colors"
                  >
                    {showFullTranscript ? 'Hide Transcript' : 'Full Transcript'}
                  </button>

                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="btn-primary-glow text-xs py-2 px-4 rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Proceed to 8-Question Quiz</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Full Transcript Drawer */}
              {showFullTranscript && (
                <div className="mb-6 p-5 rounded-2xl bg-[#F8F7F2] border border-[#D3DFD7] text-xs space-y-3 max-h-64 overflow-y-auto">
                  <span className="font-bold text-[#4F7462] block uppercase tracking-wider">
                    Full 5-Minute Lesson Transcript (Maya Al-Mansoor)
                  </span>
                  {lesson.tiles.map((t, idx) => (
                    <div key={idx} className="pb-3 border-b border-[#D3DFD7] last:border-b-0">
                      <strong className="text-[#29443A] block mb-0.5">Tile {t.tileIndex} ({t.timeCode}) • {t.name}</strong>
                      <p className="text-[#5F746B] leading-relaxed">{t.narration}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 6-Panel Storyboard Navigation Ribbon */}
              <div className="pt-4 border-t border-[#D3DFD7]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-3">
                  6-Tile Storyboard Sequence:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {lesson.tiles.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTileIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        currentTileIndex === idx
                          ? 'bg-[#DDE9E2] border-2 border-[#4F7462] shadow-xs'
                          : 'bg-[#FFFFFF] border border-[#D3DFD7] hover:border-[#789B87]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[#4F7462]">Tile 0{t.tileIndex}</span>
                        <span className="text-[9px] font-mono text-[#667C72]">{t.timeCode.split(' - ')[0]}</span>
                      </div>
                      <div className="text-xs font-bold text-[#29443A] truncate mb-1">{t.name}</div>
                      <div className="text-[10px] text-[#5F746B] line-clamp-2 leading-tight">
                        {t.learningPoint}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </MagicalCard>
          </div>
        )}

        {/* ========================================================
            TAB 2: 8-QUESTION INTERACTIVE QUIZ
           ======================================================== */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <MagicalCard className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm" maxTilt={1}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-[#D3DFD7]">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-[#4F7462] block mb-1">
                    Lesson 01 Mastery Assessment
                  </span>
                  <h3 className="text-xl font-bold text-[#29443A]">
                    8-Question Educational Quiz
                  </h3>
                  <p className="text-xs text-[#5F746B] mt-0.5">
                    Questions evaluate real-world situations and practical coping skills. Immediate educational feedback provided.
                  </p>
                </div>

                {/* Direct Crisis Support Button */}
                <button
                  type="button"
                  onClick={() => handleTriggerCrisisSignal('Learner requested immediate crisis support resources')}
                  className="px-3.5 py-1.5 rounded-full bg-[#FDF4F4] text-[#A94E4E] border border-[#E8B8B8] text-xs font-bold hover:bg-[#FAE8E8] flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#B85C5C]" />
                  <span>Need Support? Tele-MANAS (14416)</span>
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {lesson.quizQuestions.map((q, qIndex) => {
                  const selectedAnswer = quizAnswers[q.id];
                  const isCorrect = selectedAnswer === q.correctIndex;

                  return (
                    <div 
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        q.isScenario ? 'bg-[#EEF3EF] border-[#D3DFD7]' : 'bg-[#FFFFFF] border-[#D3DFD7]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#DDE9E2] text-[#4F7462] text-xs font-bold flex items-center justify-center">
                            Q{qIndex + 1}
                          </span>
                          {q.isScenario && (
                            <span className="text-[10px] font-bold text-[#4F7462] bg-[#FFFFFF] px-2.5 py-0.5 rounded-full border border-[#D3DFD7]">
                              Real-Life Scenario
                            </span>
                          )}
                        </div>

                        {quizSubmitted && (
                          <span className={`text-xs font-bold ${isCorrect ? 'text-[#4F7462]' : 'text-[#B85C5C]'}`}>
                            {isCorrect ? '✓ Correct' : '✗ Review Point'}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-semibold text-[#29443A] mb-3 leading-snug">
                        {q.question}
                      </h4>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, oIndex) => {
                          const isOptionSelected = selectedAnswer === oIndex;
                          let optionClass = 'bg-[#FFFFFF] border-[#D3DFD7] text-[#29443A] hover:border-[#789B87] hover:bg-[#F8F7F2]';

                          if (quizSubmitted) {
                            if (oIndex === q.correctIndex) {
                              optionClass = 'bg-[#DDE9E2] border-2 border-[#4F7462] text-[#29443A] font-semibold';
                            } else if (isOptionSelected) {
                              optionClass = 'bg-[#FDF4F4] border-2 border-[#E8B8B8] text-[#A94E4E]';
                            }
                          } else if (isOptionSelected) {
                            optionClass = 'bg-[#DDE9E2] border-2 border-[#4F7462] text-[#29443A] font-semibold';
                          }

                          return (
                            <button
                              key={oIndex}
                              type="button"
                              onClick={() => handleSelectAnswer(q.id, oIndex)}
                              className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${optionClass}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono flex-shrink-0">
                                {String.fromCharCode(65 + oIndex)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Educational Explanation */}
                      {quizSubmitted && (
                        <div className="mt-3.5 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-xs text-[#5F746B]">
                          <strong className="block font-bold text-[#4F7462] mb-0.5">Educational Explanation:</strong>
                          <span>{q.explanation}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Score Action */}
              <div className="mt-8 pt-6 border-t border-[#D3DFD7] flex flex-col sm:flex-row items-center justify-between gap-4">
                {quizSubmitted ? (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full justify-between">
                    <div className="text-sm">
                      <span className="text-[#5F746B]">Your Score: </span>
                      <strong className="text-[#29443A] text-lg font-mono">{quizScore} / 8</strong>
                      <span className="text-[#4F7462] ml-2 font-bold">
                        {quizScore >= 6 ? '(Curriculum Standard Met)' : '(Review Recommended)'}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveTab('recap')}
                      className="btn-primary-glow text-xs py-2.5 px-6 rounded-full font-bold inline-flex items-center gap-2"
                    >
                      <span>View Personalized Recap</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="w-full sm:w-auto btn-primary-glow text-xs py-3 px-8 rounded-full font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Submit Quiz Answers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </MagicalCard>
          </div>
        )}

        {/* ========================================================
            TAB 3: 1-MINUTE PERSONALIZED RECAP
           ======================================================== */}
        {activeTab === 'recap' && (
          <div className="space-y-6">
            <MagicalCard className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm" maxTilt={1}>
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="w-12 h-12 rounded-full bg-[#DDE9E2] text-[#4F7462] border border-[#D3DFD7] flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#29443A] mb-2">
                  Personalized Lesson Recap
                </h3>
                <p className="text-xs text-[#5F746B]">
                  Synthesizes key takeaways from Lesson 1 and addresses any concepts to strengthen—strictly without clinical labeling.
                </p>
              </div>

              {/* Personalized Synthesis Card */}
              <div className="p-6 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] space-y-4 mb-6 text-xs text-[#29443A] leading-relaxed">
                <div>
                  <h4 className="font-bold text-[#4F7462] text-sm mb-1">
                    Lesson 1 Takeaways for {state?.user.name || 'Learner'}:
                  </h4>
                  <p className="text-[#5F746B]">
                    You explored how everyday stress can be de-escalated through the tripartite anchor: naming one feeling,
                    identifying one physical tension point, and reaching out to one trusted support contact.
                  </p>
                </div>

                {missedQuestions.length > 0 ? (
                  <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-[#5F746B]">
                    <strong className="block font-bold text-[#4F7462] mb-1">
                      Reinforcement Topic ({missedQuestions.length} Concept to Review):
                    </strong>
                    <p>
                      Remember: Everyday Mental Wellness is educational. Disruptions in routine or missed days carry zero streak penalties,
                      and immediate safety concerns always route directly to qualified emergency lines.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-[#5F746B]">
                    <strong className="block font-bold text-[#4F7462] mb-1">✓ Complete Concept Mastery:</strong>
                    <p>
                      You successfully identified all educational distinctions, non-diagnostic boundaries, and practical coping habits!
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-[#4F7462] mb-1">Your 1-Minute Micro-Action for the Week:</h4>
                  <p className="italic text-[#5F746B]">
                    &ldquo;Save one trusted contact and local support line (Tele-MANAS 14416 / 112) in your phone. Try the pause technique once when work ends.&rdquo;
                  </p>
                </div>
              </div>

              {/* Progress & Next Lesson Unlocked Notice */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#D3DFD7] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4F7462] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-[#29443A] text-xs block">
                      Lesson 01 Completed • Progress Saved
                    </span>
                    <span className="text-[11px] text-[#5F746B] block">
                      Next lesson: Lesson 02: Mental Health Changes Over Time (Available next weekend)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/progress"
                    className="btn-primary-glow text-xs py-2.5 px-5 rounded-full font-bold flex items-center gap-1.5"
                  >
                    <span>View Learner Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </MagicalCard>
          </div>
        )}
      </main>

      {/* ========================================================
          HUMAN SAFETY ESCALATION MODAL
         ======================================================== */}
      {showSafetyEscalationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-2xl animate-fade-in text-[#29443A]">
            <div className="w-12 h-12 rounded-full bg-[#FDF4F4] text-[#B85C5C] border border-[#E8B8B8] flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>

            <h3 className="text-xl font-bold text-[#29443A] mb-2">
              Immediate Crisis Support Signposting
            </h3>

            <p className="text-xs text-[#5F746B] mb-4 leading-relaxed">
              Everyday Mental Wellness is an educational learning program and cannot provide emergency treatment. If you are experiencing acute distress or feeling unsafe, free confidential human support is available immediately:
            </p>

            <div className="space-y-2 mb-4">
              <a
                href="tel:14416"
                className="w-full p-3 rounded-xl bg-[#B85C5C] hover:bg-[#A94E4E] text-white text-xs font-bold flex items-center justify-between transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 14416 (Tele-MANAS • India 24/7 Free)</span>
                </div>
                <span>Call Now →</span>
              </a>

              <a
                href="tel:18005990019"
                className="w-full p-3 rounded-xl bg-[#FEF6E9] hover:bg-[#FDEED3] text-[#A6620C] border border-[#F4B84B] text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#A6620C]" />
                  <span>Call 1800-599-0019 (KIRAN Helpline)</span>
                </div>
                <span>Call Now →</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:112"
                  className="p-2.5 rounded-xl bg-[#EEF3EF] hover:bg-[#DDE9E2] text-[#29443A] text-xs font-bold text-center border border-[#789B87] transition-colors"
                >
                  Emergency: <span className="text-[#B85C5C]">112</span>
                </a>
                <a
                  href="tel:+919999666555"
                  className="p-2.5 rounded-xl bg-[#EEF3EF] hover:bg-[#DDE9E2] text-[#29443A] text-xs font-bold text-center border border-[#789B87] transition-colors"
                >
                  Vandrevala: <span className="text-[#25D366]">+91 9999666555</span>
                </a>
              </div>

              <div className="pt-2 text-center text-[10px] text-[#5F746B]">
                <span>International learners: US/Canada dial <strong>988</strong> • UK/EU dial <strong>112/999</strong></span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] text-[11px] text-[#5F746B] mb-4">
              Confidential record: Support request logged securely with reference <strong>{escalationLog?.id}</strong>.
            </div>

            <button
              onClick={() => setShowSafetyEscalationModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#EEF3EF] hover:bg-[#DDE9E2] text-[#29443A] text-xs font-semibold transition-colors"
            >
              Return to Learning Room
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
