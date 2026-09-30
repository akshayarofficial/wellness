'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  Settings, Bell, Shield, Volume2, Lock, Eye, Download, 
  CheckCircle2, ArrowRight, PhoneCall, Sparkles, User 
} from 'lucide-react';

export default function SettingsPage() {
  const [weekendSlot, setWeekendSlot] = useState('sat-morning');
  const [voiceSpeed, setVoiceSpeed] = useState('120');
  const [dailyReminder, setDailyReminder] = useState(true);
  const [employerFirewall, setEmployerFirewall] = useState(true);
  const [closedCaptions, setClosedCaptions] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="mindbloom-app-shell">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main">
        {/* Dedicated Settings Header Banner */}
        <div className="subpage-hero-banner">
          <div className="container">
            <div className="subpage-badge">
              <Settings className="w-3.5 h-3.5 text-amber-400 mr-1.5 inline" />
              <span>PREFERENCES &amp; FIREWALL</span>
            </div>
            <h1 className="subpage-title">
              Account &amp; <span className="text-amber-gradient">App Settings</span>
            </h1>
            <p className="subpage-description">
              Customize your 10-minute ritual schedule, audio narration pacing, and employer privacy protections.
            </p>
          </div>
        </div>

        <section className="settings-content-section py-8">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {saved && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Preferences saved successfully! Your cohort schedule and audio pacing have been updated.</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6">
                {/* 1. Schedule & Session Preferences */}
                <MagicalCard className="p-6" maxTilt={2}>
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                    <Bell className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Cohort Scheduling &amp; Reminders</h3>
                      <p className="text-xs text-stone-400">Configure your 10-minute weekend voice room timing</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-white font-medium mb-1.5">Weekend Session Time</label>
                      <select 
                        value={weekendSlot} 
                        onChange={(e) => setWeekendSlot(e.target.value)}
                        className="form-select"
                      >
                        <option value="sat-morning">Saturday Morning • 10:00 AM local time</option>
                        <option value="sat-afternoon">Saturday Afternoon • 3:00 PM local time</option>
                        <option value="sun-morning">Sunday Morning • 10:00 AM local time</option>
                        <option value="sun-evening">Sunday Evening • 7:00 PM local time</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={dailyReminder} 
                          onChange={(e) => setDailyReminder(e.target.checked)} 
                        />
                        <span>
                          <strong>Daily Mood Check-In Reminder:</strong> Send a quiet notification at 8:30 PM to log my 30-second emotional weather.
                        </span>
                      </label>
                    </div>
                  </div>
                </MagicalCard>

                {/* 2. Audio & Narration Pacing */}
                <MagicalCard className="p-6" maxTilt={2}>
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                    <Volume2 className="w-5 h-5 text-sky-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Comic Audio &amp; Narration Standards</h3>
                      <p className="text-xs text-stone-400">Calibrated voice pacing to down-regulate nervous system arousal</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="block text-white font-medium mb-2">Voice Narration Speed (Words Per Minute)</label>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          className={`p-3 rounded-xl border text-center transition ${voiceSpeed === '110' ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-black/30 border-white/10 text-stone-400'}`}
                          onClick={() => setVoiceSpeed('110')}
                        >
                          <div className="text-sm">110 WPM</div>
                          <div className="text-[10px] mt-0.5 opacity-70">Calming / Relaxed</div>
                        </button>
                        <button
                          type="button"
                          className={`p-3 rounded-xl border text-center transition ${voiceSpeed === '120' ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-black/30 border-white/10 text-stone-400'}`}
                          onClick={() => setVoiceSpeed('120')}
                        >
                          <div className="text-sm">120 WPM</div>
                          <div className="text-[10px] mt-0.5 opacity-70">Clinical Standard</div>
                        </button>
                        <button
                          type="button"
                          className={`p-3 rounded-xl border text-center transition ${voiceSpeed === '130' ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-black/30 border-white/10 text-stone-400'}`}
                          onClick={() => setVoiceSpeed('130')}
                        >
                          <div className="text-sm">130 WPM</div>
                          <div className="text-[10px] mt-0.5 opacity-70">Brisk Overview</div>
                        </button>
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={closedCaptions} 
                          onChange={(e) => setClosedCaptions(e.target.checked)} 
                        />
                        <span>
                          <strong>High-Contrast Closed Captions:</strong> Always show large-text speech transcript overlays during comic audio playback.
                        </span>
                      </label>
                    </div>
                  </div>
                </MagicalCard>

                {/* 3. Employer Firewall & Clinical Privacy */}
                <MagicalCard className="p-6" maxTilt={2}>
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/10">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="text-lg font-bold text-white">Employer Privacy Firewall</h3>
                      <p className="text-xs text-stone-400">Strict non-disclosure guarantees for corporate and campus users</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30">
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={employerFirewall} 
                          onChange={(e) => setEmployerFirewall(e.target.checked)} 
                        />
                        <span className="text-emerald-200">
                          <strong>Active Employer Firewall:</strong> Your employer or HR will NEVER receive your personal check-ins, mood logs, cohort recordings, or notes.
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-white font-medium">Export My Personal Journal</div>
                        <div className="text-xs text-stone-400">Download your personal coping reflections in encrypted JSON</div>
                      </div>
                      <button type="button" className="btn-secondary-glass text-xs py-2 px-3">
                        <Download className="w-3.5 h-3.5 mr-1.5" />
                        <span>Export Data</span>
                      </button>
                    </div>
                  </div>
                </MagicalCard>

                {/* Save Changes Button */}
                <div className="flex items-center justify-between pt-4">
                  <Link href="/profile" className="text-xs text-stone-400 hover:text-white transition">
                    ← Back to My Profile
                  </Link>
                  <button type="submit" className="btn-primary-glow py-3 px-8 text-sm">
                    <span>Save All Preferences</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
