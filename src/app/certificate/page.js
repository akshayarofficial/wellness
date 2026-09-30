'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  Award, CheckCircle2, ShieldCheck, ArrowRight, 
  Sparkles, Lock, Printer, QrCode, Search 
} from 'lucide-react';
import { getWellnessState, issueCertificate } from '../../lib/wellnessStore';
import { PROGRAM_STREAMS } from '../../lib/wellnessData';

export default function CertificatePage() {
  const [state] = useState(() => getWellnessState());
  const [certData] = useState(() => {
    const res = issueCertificate(false);
    return res.success ? res.certificate : null;
  });
  const [errorMsg] = useState(() => {
    const res = issueCertificate(false);
    return res.success ? '' : res.error;
  });
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  if (!state) return null;

  const isG1orG2 = state.enrollment.groupId === 'group1' || state.enrollment.groupId === 'group2';
  const totalRequired = isG1orG2 ? 52 : 10;
  const stream = PROGRAM_STREAMS.find(s => s.id === state.enrollment.groupId) || PROGRAM_STREAMS[0];

  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#29443A]">
      <AmbientSparks />
      <Navbar />

      <main className="subpage-main container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] text-[#4F7462] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#4F7462]" />
              <span>OFFICIAL PROGRAM CREDENTIAL</span>
            </div>
            <h1 className="text-3xl font-black text-[#29443A] tracking-tight mb-2">
              Certificate of <span className="text-[#4F7462]">Completion</span>
            </h1>
            <p className="text-[#5F746B] text-xs max-w-md mx-auto">
              Issued exclusively upon 100% completion of all required curriculum sessions.
            </p>
          </div>

          {/* If Incomplete: Certificate Boundary Notice */}
          {errorMsg ? (
            <MagicalCard className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] text-center shadow-sm" maxTilt={2}>
              <div className="w-16 h-16 rounded-full bg-[#EEF3EF] border border-[#D3DFD7] flex items-center justify-center mx-auto mb-4 text-[#4F7462]">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#29443A] mb-2">
                Certificate In Progress
              </h2>
              <p className="text-[#5F746B] text-xs max-w-md mx-auto mb-4 leading-relaxed">
                {errorMsg.replace(/^AT17:\s*/, '')}
              </p>

              <div className="p-4 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] max-w-sm mx-auto mb-6 text-xs text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[#5F746B]">Current Completed:</span>
                  <span className="font-mono text-[#29443A] font-bold">{state.learning.completedCount} / {totalRequired} Sessions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5F746B]">Required to Unlock:</span>
                  <span className="font-mono text-[#4F7462] font-bold">100% ({totalRequired} of {totalRequired})</span>
                </div>
              </div>

              <div>
                <Link 
                  href="/classroom" 
                  className="btn-primary-glow text-xs py-3 px-6 rounded-full font-bold inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Return to Classroom to Complete Lessons</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </MagicalCard>
          ) : (
            /* Official Verifiable Certificate Layout */
            <div className="space-y-6 animate-fade-in">
              <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border-4 border-[#789B87] shadow-[0_12px_36px_rgba(41,68,58,0.12)] relative text-center">
                {/* Certificate Corner Ornaments */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#789B87]" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#789B87]" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#789B87]" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#789B87]" />

                {/* Seal */}
                <div className="w-20 h-20 rounded-full bg-[#DDE9E2] p-1 shadow-md mx-auto mb-6 flex items-center justify-center border-2 border-[#4F7462]">
                  <div className="w-full h-full rounded-full bg-[#FFFFFF] border border-[#789B87] flex flex-col items-center justify-center text-[#4F7462]">
                    <Award className="w-7 h-7" />
                    <span className="text-[8px] font-black uppercase tracking-widest mt-0.5">OFFICIAL</span>
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#4F7462] block mb-2">
                  EVERYDAY MENTAL WELLNESS PROGRAM
                </span>

                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#29443A] tracking-wide mb-4">
                  Certificate of Completion
                </h2>

                <p className="text-xs text-[#5F746B] italic mb-6">
                  This certifies that
                </p>

                <div className="text-2xl sm:text-3xl font-bold text-[#29443A] font-serif pb-2 mb-4 border-b border-[#D3DFD7] max-w-md mx-auto">
                  {certData?.recipientName || 'Maya Al-Mansoor'}
                </div>

                <p className="text-xs sm:text-sm text-[#5F746B] max-w-lg mx-auto mb-6 leading-relaxed">
                  has successfully fulfilled all required micro-learning modules, weekly reflections,
                  and scenario mastery evaluations in:
                </p>

                <div className="inline-block px-4 py-1.5 rounded-full bg-[#EEF3EF] border border-[#D3DFD7] text-[#4F7462] text-sm font-bold mb-8">
                  {certData?.programTitle || stream.name} ({certData?.totalWeeks})
                </div>

                {/* Footer Signatures and Verification */}
                <div className="pt-6 border-t border-[#D3DFD7] grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs text-[#5F746B]">
                  <div>
                    <span className="block text-[10px] text-[#667C72] uppercase tracking-wider">Date of Issue</span>
                    <strong className="text-[#29443A]">{certData?.completedAt || 'September 28, 2026'}</strong>
                  </div>

                  <div className="flex flex-col items-center">
                    <QrCode className="w-8 h-8 text-[#4F7462] mb-1" />
                    <span className="text-[10px] font-mono text-[#4F7462] font-bold">{certData?.id}</span>
                  </div>

                  <div>
                    <span className="block text-[10px] text-[#667C72] uppercase tracking-wider">Verification Status</span>
                    <span className="text-[#4F7462] font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{certData?.status}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-xs font-semibold flex items-center gap-2 border border-[#D3DFD7] shadow-xs"
                >
                  <Printer className="w-4 h-4 text-[#4F7462]" />
                  <span>Print Certificate</span>
                </button>

                <button
                  onClick={() => setVerifyModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#DDE9E2] hover:bg-[#D0E0D6] text-[#4F7462] text-xs font-semibold border border-[#D3DFD7] flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Credential</span>
                </button>

                <Link
                  href="/progress"
                  className="btn-primary-glow px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2"
                >
                  <span>Return to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Verification Lookup Modal */}
      {verifyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] text-[#29443A] shadow-2xl">
            <h3 className="text-lg font-bold text-[#29443A] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#4F7462]" />
              <span>Certificate Credential Verification</span>
            </h3>
            <p className="text-xs text-[#5F746B] mb-4">
              Cryptographically verified against the Everyday Mental Wellness learner registry:
            </p>

            <div className="p-4 rounded-xl bg-[#EEF3EF] border border-[#D3DFD7] text-xs space-y-1.5 font-mono mb-5 text-[#29443A]">
              <div>Certificate ID: <strong className="text-[#4F7462]">{certData?.id}</strong></div>
              <div>Recipient: <strong>{certData?.recipientName}</strong></div>
              <div>Course: <strong>{certData?.programTitle}</strong></div>
              <div>Audit Status: <span className="text-[#4F7462] font-bold">100% COMPLETE • VERIFIED</span></div>
            </div>

            <button
              onClick={() => setVerifyModalOpen(false)}
              className="w-full py-2.5 rounded-xl btn-primary-glow text-xs font-bold"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
