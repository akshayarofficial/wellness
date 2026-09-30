'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AmbientSparks from '../../components/AmbientSparks';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MagicalCard from '../../components/MagicalCard';
import { 
  Tag, ShieldCheck, CheckCircle2, AlertCircle, 
  ArrowRight, Sparkles, Lock, RefreshCw 
} from 'lucide-react';
import { getWellnessState, completeCheckout, validatePromoCode } from '../../lib/wellnessStore';
import { PROGRAM_STREAMS } from '../../lib/wellnessData';

export default function CheckoutPage() {
  const [state] = useState(() => getWellnessState());
  const [promoInput, setPromoInput] = useState('WELLNESS100');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Course Base Price
  const basePriceUSD = 49;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccessMsg('');

    if (!promoInput) return;
    const groupId = state?.enrollment?.groupId || 'group1';
    const res = validatePromoCode(promoInput, groupId);

    if (!res.valid) {
      setPromoError(res.error.replace(/^AT06 Pass check:\s*/, ''));
      setAppliedPromo(null);
    } else {
      setAppliedPromo(res);
      setPromoSuccessMsg(`Promo applied: ${res.code} (${res.discountPercent}% Discount) - ${res.description}`);
    }
  };

  const handleProcessPayment = () => {
    setPaymentError('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      try {
        const promoCode = appliedPromo ? appliedPromo.code : null;
        completeCheckout(promoCode, state?.enrollment?.selectedSlot);
        setPaymentSuccess(true);
      } catch (err) {
        setPaymentError(err.message);
      }
    }, 800);
  };

  const discountPercent = appliedPromo ? appliedPromo.discountPercent : 0;
  const finalPrice = basePriceUSD * (1 - discountPercent / 100);
  const stream = PROGRAM_STREAMS.find(s => s.id === state?.enrollment?.groupId) || PROGRAM_STREAMS[0];

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
              <span>SECURE ENROLLMENT CHECKOUT</span>
            </div>
            <h1 className="text-3xl font-black text-[#29443A] tracking-tight mb-2">
              Payment &amp; <span className="text-[#4F7462]">Scholarship Codes</span>
            </h1>
            <p className="text-[#5F746B] text-xs max-w-md mx-auto">
              Encrypted transactions and automatic scholarship code validation.
            </p>
          </div>

          <MagicalCard className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#D3DFD7] shadow-sm" maxTilt={2}>
            {paymentSuccess ? (
              /* Success State */
              <div className="text-center py-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#DDE9E2] border border-[#D3DFD7] flex items-center justify-center mx-auto mb-4 text-[#4F7462]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-[#29443A] mb-2">Enrollment Confirmed!</h2>
                <p className="text-[#5F746B] text-xs max-w-md mx-auto mb-6">
                  You are officially enrolled in <strong>{stream.name}</strong> ({stream.badge}).
                  Your session is ready in the interactive learning classroom.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link href="/classroom" className="btn-primary-glow text-xs py-3 px-6 rounded-full inline-flex items-center gap-2 font-bold shadow-sm">
                    <span>Enter Interactive Classroom</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/progress" className="px-5 py-3 rounded-full bg-[#FFFFFF] hover:bg-[#F8F7F2] text-[#29443A] text-xs font-semibold border border-[#D3DFD7]">
                    <span>View Learning Dashboard</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="p-5 rounded-2xl bg-[#EEF3EF] border border-[#D3DFD7]">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D3DFD7] text-xs">
                    <div>
                      <span className="text-[#4F7462] font-bold block text-sm">{stream.name}</span>
                      <span className="text-[#5F746B]">{stream.durationText} • 6-Person Cohort</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-base font-bold text-[#29443A]">${basePriceUSD}.00</span>
                      <span className="text-[11px] text-[#667C72] block">Single Enrollment</span>
                    </div>
                  </div>

                  {appliedPromo && (
                    <div className="flex items-center justify-between text-xs text-[#4F7462] font-semibold pb-2 mb-2 border-b border-[#D3DFD7]">
                      <span>Promo Discount ({appliedPromo.code}):</span>
                      <span>-{appliedPromo.discountPercent}% (-${(basePriceUSD * (appliedPromo.discountPercent / 100)).toFixed(2)})</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm font-bold text-[#29443A]">
                    <span>Total Due:</span>
                    <span className="text-[#4F7462] text-xl font-mono">
                      ${finalPrice.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Promo Code Form */}
                <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#D3DFD7]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4F7462] mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#4F7462]" />
                    <span>Promo or Scholarship Code</span>
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="e.g. WELLNESS100"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D3DFD7] text-[#29443A] text-xs font-mono uppercase focus:outline-none focus:border-[#4F7462]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-[#DDE9E2] hover:bg-[#D0E0D6] text-[#4F7462] border border-[#D3DFD7] text-xs font-bold transition-all"
                    >
                      Apply Code
                    </button>
                  </div>

                  {/* Promo Error or Success Messages */}
                  {promoError && (
                    <div className="mt-2.5 text-[11px] text-[#A94E4E] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 text-[#B85C5C] flex-shrink-0" />
                      <span>{promoError}</span>
                    </div>
                  )}

                  {promoSuccessMsg && (
                    <div className="mt-2.5 text-[11px] text-[#4F7462] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#4F7462] flex-shrink-0" />
                      <span>{promoSuccessMsg}</span>
                    </div>
                  )}

                  {/* Available codes prompt */}
                  <div className="mt-3 pt-2 border-t border-[#D3DFD7] flex flex-wrap items-center gap-1.5 text-[11px] text-[#5F746B]">
                    <span className="mr-1">Sample codes:</span>
                    <button
                      type="button"
                      onClick={() => { setPromoInput('WELLNESS100'); }}
                      className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] hover:bg-[#EEF3EF] text-[#4F7462] border border-[#D3DFD7] font-mono text-[10px] font-bold"
                    >
                      WELLNESS100 (100% Scholarship)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setPromoInput('STUDENT50'); }}
                      className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] hover:bg-[#EEF3EF] text-[#4F7462] border border-[#D3DFD7] font-mono text-[10px] font-bold"
                    >
                      STUDENT50 (50% Student Grant)
                    </button>
                  </div>
                </div>

                {/* Payment Failure Error Notice */}
                {paymentError && (
                  <div className="p-3.5 rounded-xl bg-[#FDF4F4] border border-[#E8B8B8] text-[#A94E4E] text-xs flex items-start gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-[#B85C5C] flex-shrink-0 mt-0.5" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Checkout Action Button */}
                <div>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleProcessPayment}
                    className="w-full py-4 rounded-full btn-primary-glow text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing Secure Transaction...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {finalPrice === 0 ? 'Redeem 100% Scholarship & Activate' : `Pay $${finalPrice.toFixed(2)} USD & Activate`}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Trust bar */}
                <div className="flex items-center justify-center gap-4 text-xs text-[#5F746B] pt-2">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#4F7462]" />
                    256-Bit SSL Encrypted
                  </span>
                  <span>•</span>
                  <span>Cancel Anytime</span>
                  <span>•</span>
                  <span>Confidential</span>
                </div>
              </div>
            )}
          </MagicalCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}
