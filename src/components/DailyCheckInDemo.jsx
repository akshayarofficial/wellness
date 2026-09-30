'use client';
import React, { useState } from 'react';
import MagicalCard from './MagicalCard';
import { Sun, CloudSun, CloudRain, MinusCircle, Flame, HeartHandshake, BookOpen, ShieldAlert, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export default function DailyCheckInDemo() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [streakCount, setStreakCount] = useState(14);
  const [checkedInToday, setCheckedInToday] = useState(false);

  const handleSelectMood = (mood) => {
    setSelectedMood(mood);
    if (!checkedInToday) {
      setStreakCount((prev) => prev + 1);
      setCheckedInToday(true);
    }
  };

  const resetDemo = () => {
    setSelectedMood(null);
    setCheckedInToday(false);
  };

  return (
    <section id="daily-checkin" className="daily-checkin-section">
      <div className="container">
        <div className="section-header-block">
          <div className="pill-badge">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
            <span>DAILY HABIT • SECTION 5 OF PROGRAM PLAN</span>
          </div>
          <h2 className="section-title">
            The Daily <span className="text-amber-gradient">&ldquo;How Are You Feeling Today?&rdquo;</span> Check-In
          </h2>
          <p className="section-description">
            A low-friction, 5-second private mood pulse for adult self-awareness. No judgment, no public scoreboards,
            and an optional 4-week self-help pathway if you are feeling down.
          </p>
        </div>

        <div className="checkin-demo-grid">
          {/* Interactive Check-in Mock Widget */}
          <MagicalCard className="checkin-interactive-card" maxTilt={8} glowColor="rgba(255, 170, 40, 0.25)">
            <div className="card-inner-padding">
              <div className="checkin-top-status">
                <span className="live-status-pill">Interactive Live Demo</span>
                <span className="privacy-badge flex items-center gap-1"><Lock className="w-3 h-3 text-[#4F7462]" /> 100% Private to You</span>
              </div>

              <h3 className="checkin-prompt-heading">How are you feeling today?</h3>
              <p className="checkin-prompt-sub">Select one response to record your private daily check-in:</p>

              {/* 4 Mood Buttons from the Spec */}
              <div className="mood-buttons-grid">
                <button
                  className={`mood-btn ${selectedMood === 'good' ? 'selected good' : ''}`}
                  onClick={() => handleSelectMood('good')}
                >
                  <Sun className="mood-icon text-amber-400" />
                  <span className="mood-label">Good</span>
                  <span className="mood-hint">Energy &amp; balance</span>
                </button>

                <button
                  className={`mood-btn ${selectedMood === 'okay' ? 'selected okay' : ''}`}
                  onClick={() => handleSelectMood('okay')}
                >
                  <CloudSun className="mood-icon text-sky-400" />
                  <span className="mood-label">Okay</span>
                  <span className="mood-hint">Navigating the day</span>
                </button>

                <button
                  className={`mood-btn ${selectedMood === 'not-good' ? 'selected not-good' : ''}`}
                  onClick={() => handleSelectMood('not-good')}
                >
                  <CloudRain className="mood-icon text-indigo-400" />
                  <span className="mood-label">Not Good</span>
                  <span className="mood-hint">Heavy or overwhelmed</span>
                </button>

                <button
                  className={`mood-btn ${selectedMood === 'skip' ? 'selected skip' : ''}`}
                  onClick={() => handleSelectMood('skip')}
                >
                  <MinusCircle className="mood-icon text-slate-400" />
                  <span className="mood-label">Prefer to Skip</span>
                  <span className="mood-hint">Just here for routine</span>
                </button>
              </div>

              {/* Dynamic Feedback Area */}
              {selectedMood && (
                <div className="checkin-response-drawer">
                  {selectedMood === 'good' && (
                    <div className="response-box good-box">
                      <div className="response-header">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
                        <strong>Wonderful to hear. Carry that momentum!</strong>
                      </div>
                      <p className="response-text">
                        Today&apos;s 60-second micro-action: Take 30 seconds to write down one specific thing that contributed to your energy today.
                      </p>
                    </div>
                  )}

                  {selectedMood === 'okay' && (
                    <div className="response-box okay-box">
                      <div className="response-header">
                        <CheckCircle2 className="w-5 h-5 text-sky-400 mr-2" />
                        <strong>Noted. An &ldquo;okay&rdquo; day is completely normal.</strong>
                      </div>
                      <p className="response-text">
                        Today&apos;s 60-second micro-action: Unclench your jaw, drop your shoulders, and take three diaphragmatic deep breaths.
                      </p>
                    </div>
                  )}

                  {selectedMood === 'not-good' && (
                    <div className="response-box down-box">
                      <div className="response-header">
                        <HeartHandshake className="w-5 h-5 text-amber-400 mr-2" />
                        <strong>We hear you. You don&apos;t have to carry it all at once.</strong>
                      </div>
                      <p className="response-text">
                        As designed in our clinical plan, selecting &ldquo;Not Good&rdquo; gives you gentle choices without any medical diagnosis:
                      </p>
                      <div className="support-path-options">
                        <div className="path-option-card">
                          <BookOpen className="w-4 h-4 text-amber-400 mr-2" />
                          <div>
                            <strong>5-Minute De-stress Comic</strong>
                            <p>Read an illustrated micro-story on gentle grounding.</p>
                          </div>
                        </div>
                        <div className="path-option-card">
                          <Sparkles className="w-4 h-4 text-emerald-400 mr-2" />
                          <div>
                            <strong>Optional 4-Week &ldquo;Feeling Down&rdquo; Path</strong>
                            <p>Self-paced daily micro-steps to stabilize and reset.</p>
                          </div>
                        </div>
                        <div className="path-option-card crisis-option">
                          <ShieldAlert className="w-4 h-4 text-rose-400 mr-2" />
                          <div>
                            <strong>24/7 Human Helpline (Tele-MANAS 14416 / 112)</strong>
                            <p>Free, confidential support available anytime.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMood === 'skip' && (
                    <div className="response-box skip-box">
                      <div className="response-header">
                        <CheckCircle2 className="w-5 h-5 text-slate-300 mr-2" />
                        <strong>No problem at all. Your check-in is logged.</strong>
                      </div>
                      <p className="response-text">
                        You preserve your wellbeing streak without having to explain or rate how you feel.
                      </p>
                    </div>
                  )}

                  <button className="btn-reset-demo" onClick={resetDemo}>
                    Reset Demo Check-In
                  </button>
                </div>
              )}
            </div>
          </MagicalCard>

          {/* 30-Day Wellbeing Engagement Streak Card */}
          <div className="streak-explanation-column">
            <MagicalCard className="streak-display-card" maxTilt={6} glowColor="rgba(255, 140, 20, 0.3)">
              <div className="card-inner-padding">
                <div className="streak-header">
                  <div className="streak-flame-wrapper">
                    <Flame className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="streak-number">{streakCount}-Day</span>
                    <h3 className="streak-title">Wellbeing Engagement Streak</h3>
                  </div>
                </div>

                <p className="streak-philosophy">
                  <strong>How our streak model is clinically different:</strong> We never pressure you to report
                  feeling &ldquo;good&rdquo; to maintain your streak. It measures <em>consistency of checking in and caring for yourself</em>,
                  so honest bad days never break your commitment.
                </p>

                {/* Visual Streak Week Grid */}
                <div className="streak-calendar-visual">
                  <div className="calendar-week-label">Current 30-Day Cycle:</div>
                  <div className="calendar-dots-grid">
                    {Array.from({ length: 30 }, (_, i) => {
                      const isCompleted = i < streakCount;
                      const isToday = i === streakCount - 1 && checkedInToday;
                      return (
                        <div
                          key={i}
                          className={`calendar-dot ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`}
                          title={`Day ${i + 1}`}
                        >
                          {isCompleted ? '✓' : i + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="streak-milestone-pill">
                  <Sparkles className="w-4 h-4 text-amber-300 mr-2" />
                  <span>30-Day Milestone unlocks personal reflection summary</span>
                </div>
              </div>
            </MagicalCard>
          </div>
        </div>
      </div>
    </section>
  );
}
