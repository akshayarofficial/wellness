'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  MessageSquare, Clock, ArrowRight, ShieldCheck, 
  Send, Sparkles 
} from 'lucide-react';
import { getWellnessState, saveWellnessState, triggerOneMinuteReminder } from '../../lib/wellnessStore';

function formatDeterministicTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const hours = d.getUTCHours();
  const minutes = String(d.getUTCMinutes()).padStart(2, '0');
  const seconds = String(d.getUTCSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes}:${seconds} ${ampm} UTC`;
}

export default function NotificationsPage() {
  const [state, setState] = useState(() => getWellnessState());
  const [dispatchedResult, setDispatchedResult] = useState(null);

  const handleToggleOptIn = () => {
    if (!state) return;
    const updated = { ...state };
    updated.enrollment.whatsAppOptIn = !updated.enrollment.whatsAppOptIn;
    saveWellnessState(updated);
    setState(updated);
  };

  const handleTriggerSimulatedReminder = () => {
    const res = triggerOneMinuteReminder();
    setDispatchedResult(res);
    setState(getWellnessState());
  };

  if (!state) return null;

  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
              <span>SESSION NOTIFICATIONS</span>
            </div>
            <h1 className="text-3xl font-black text-[#29443A] tracking-tight mb-2">
              WhatsApp <span className="text-[#4F7462]">Session Reminders</span>
            </h1>
            <p className="text-[#5F746B] text-xs max-w-md mx-auto">
              Receive a private, direct join link on WhatsApp exactly 1 minute before your weekend cohort session.
            </p>
          </div>

          <MagicalCard className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm" maxTilt={2}>
            {/* Consent Toggle */}
            <div className="p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-[#4F7462]" />
                  <span className="text-sm font-bold text-[#29443A]">WhatsApp Reminder Consent</span>
                </div>
                <p className="text-xs text-[#5F746B]">
                  Current Status:{' '}
                  <span className={`font-bold ${state.enrollment.whatsAppOptIn ? 'text-[#4F7462]' : 'text-[#B85C5C]'}`}>
                    {state.enrollment.whatsAppOptIn ? 'Enabled (Receives 1-min reminders)' : 'Disabled (No messages)'}
                  </span>
                </p>
                <span className="text-[11px] text-[#667C72] block mt-0.5">
                  Phone: {state.enrollment.whatsAppPhone || 'Registered Mobile Number'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleToggleOptIn}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  state.enrollment.whatsAppOptIn
                    ? 'bg-[#FDF4F4] text-[#A94E4E] border border-[#E8B8B8] hover:bg-[#FAE8E8]'
                    : 'bg-[#DDE9E2] text-[#4F7462] border border-[#D3DFD7] hover:bg-[#D0E0D6]'
                }`}
              >
                {state.enrollment.whatsAppOptIn ? 'Disable Reminders' : 'Enable Reminders'}
              </button>
            </div>

            {/* Test Reminder Preview */}
            <div className="p-5 rounded-2xl bg-[#F8F7F2] border border-[#D3DFD7] mb-6 text-center">
              <span className="text-xs text-[#4F7462] font-bold uppercase tracking-wider block mb-1">
                Preview Join Reminder
              </span>
              <p className="text-xs text-[#5F746B] mb-4 max-w-sm mx-auto">
                Test the notification dispatcher to verify your phone number and message delivery:
              </p>

              <button
                type="button"
                onClick={handleTriggerSimulatedReminder}
                className="btn-primary-glow text-xs py-2.5 px-6 rounded-full inline-flex items-center gap-2 font-bold shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Reminder Preview</span>
              </button>

              {dispatchedResult && (
                <div className={`mt-4 p-3.5 rounded-xl text-xs text-left ${
                  dispatchedResult.dispatched 
                    ? 'bg-[#DDE9E2] border border-[#D3DFD7] text-[#29443A]' 
                    : 'bg-[#EEF3EF] border border-[#D3DFD7] text-[#5F746B]'
                }`}>
                  <strong className="block font-bold text-[#4F7462] mb-1">
                    {dispatchedResult.dispatched ? '✓ Test Reminder Dispatched Successfully' : 'Notice (Consent Respected)'}:
                  </strong>
                  <span>{dispatchedResult.reason || dispatchedResult.notification?.message}</span>
                </div>
              )}
            </div>

            {/* Direct In-App Classroom Access */}
            <div className="p-4 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#4F7462] font-bold block mb-0.5">
                  Direct In-App Classroom Access
                </span>
                <p className="text-xs text-[#5F746B]">
                  Never blocked by carrier delays. You can always join your active room directly from the app.
                </p>
              </div>

              <Link
                href="/classroom"
                className="btn-primary-glow text-xs py-2.5 px-5 rounded-full flex-shrink-0 flex items-center gap-1.5 font-bold shadow-xs"
              >
                <span>Enter Classroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Sent Notifications History Table */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#5F746B] mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#4F7462]" />
                <span>Notification Activity ({state.notifications.length})</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {state.notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-[11px] shadow-xs">
                    <div className="flex items-center justify-between text-[#5F746B] mb-1">
                      <span className="font-mono text-[#4F7462] font-bold uppercase">{n.type} • {n.intendedTime}</span>
                      <span suppressHydrationWarning>{formatDeterministicTime(n.sentAt)}</span>
                    </div>
                    <p className="text-[#29443A]">{n.message}</p>
                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#667C72]">
                      <span>Recipient: {n.recipient}</span>
                      <span className="text-[#4F7462] font-bold uppercase">Status: {n.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MagicalCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
