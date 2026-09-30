'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { activateAccount, getWellnessState } from '../../lib/wellnessStore';

function ActivateContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const tokenAlreadyUsed = typeof window !== 'undefined' && getWellnessState().enrollment.tokenUsed && getWellnessState().enrollment.activationToken === token;

  const handleActivate = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      activateAccount(token, password);
      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EB] border border-[#789B87]/30 text-[#4F7462] text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4F7462]" />
            <span>STEP 2 OF 8 • ACCOUNT ACTIVATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#293934] tracking-tight mb-2">
            Set Your <span className="text-[#4F7462]">Account Password</span>
          </h1>
          <p className="text-[#667A72] text-xs">
            Enter your secure credentials to complete your learner profile activation.
          </p>
        </div>

        <MagicalCard className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8F0EB] shadow-sm" maxTilt={3}>
          {tokenAlreadyUsed ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-600">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-[#293934] mb-2">Link Expired or Already Used</h2>
              <p className="text-[#667A72] text-xs mb-6">
                This one-time activation link has already been verified. You can proceed directly to your schedule.
              </p>
              <Link href="/schedule" className="btn-primary-glow text-xs py-2.5 px-5 rounded-full inline-flex items-center gap-2">
                <span>Proceed to Scheduling</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : isSuccess ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-[#293934] mb-2">Account Successfully Activated</h2>
              <p className="text-[#667A72] text-xs mb-6">
                Your password is saved securely. Next, choose your preferred weekend session time and timezone.
              </p>
              <Link href="/schedule" className="btn-primary-glow text-xs py-2.5 px-6 rounded-full inline-flex items-center gap-2 font-bold">
                <span>Choose Weekend Slot (Step 3)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleActivate} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-1.5">
                  Activation Token
                </label>
                <input
                  type="text"
                  disabled
                  value={token || 'No token provided'}
                  className="w-full px-3 py-2 rounded-lg bg-[#F8F7F2] border border-[#E8F0EB] text-[#667A72] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-1.5">
                  Create Password (Min 6 Characters)
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#D5E2D9] text-[#293934] text-sm focus:outline-none focus:border-[#4F7462]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-lg bg-white border border-[#D5E2D9] text-[#293934] text-sm focus:outline-none focus:border-[#4F7462]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full btn-primary-glow text-xs font-bold flex items-center justify-center gap-2 mt-4"
              >
                <span>Activate Account &amp; Save Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </MagicalCard>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <div className="mindbloom-app-shell bg-[#F8F7F2] min-h-screen text-[#293934]">
      <Navbar />
      <main className="subpage-main">
        <Suspense fallback={<div className="container py-20 text-center text-[#667A72]">Validating activation link...</div>}>
          <ActivateContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
