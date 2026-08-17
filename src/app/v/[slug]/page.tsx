'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getProducts, addWaitlistEntry, recordCartAdd } from '@/lib/data';
import { Product } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  Sparkles,
  ShieldCheck,
  Star,
  CheckCircle2,
  Clock,
  Flame,
  ArrowRight,
  TrendingUp,
  Share2,
  Lock,
  ChevronRight,
  Truck,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export default function MicroLandingPage() {
  const params = useParams();
  const router = useRouter();
  const { addToValidationCart, showToast } = useRole();
  const slug = params?.slug as string;

  const products = getProducts();
  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  // Micro-page state
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [wtpInput, setWtpInput] = useState(product?.price || 499);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [userRank, setUserRank] = useState(1);
  const [referralCode, setReferralCode] = useState('');

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 54, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#090d16] text-white flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold">Startup Product Not Found</h1>
          <p className="text-gray-400">The micro-validation campaign may have concluded.</p>
          <Link href="/" className="inline-block px-6 py-3 rounded-full bg-[#489cff] font-bold text-white">
            Explore Active Validations
          </Link>
        </div>
      </div>
    );
  }

  const handlePreOrderClick = () => {
    recordCartAdd(product.id);
    addToValidationCart(product);
    showToast(`Locked in Zero-Inventory Pre-Order for ${product.name}!`);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;

    const entry = addWaitlistEntry({
      productId: product.id,
      productName: product.name,
      customerEmail: waitlistEmail,
      customerName: waitlistName || 'Early Supporter',
      willingnessToPay: wtpInput,
    });

    setUserRank(entry.rank);
    setReferralCode(entry.referralCode);
    setWaitlistSubmitted(true);
    showToast('Joined VIP Early Adopter Waitlist!');
  };

  const claimedPercent = Math.min(
    Math.round(((product.batchClaimedCount || 42) / (product.limitedBatchSize || 50)) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-[#489cff]/30 selection:text-white">
      {/* Top Banner: Real-Time Demand Ticker */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-b border-white/10 px-4 py-2 text-center text-xs font-semibold text-blue-200 flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>
          <strong>Live Validation Lab:</strong> {product.currentViewersCount || 128} verified shoppers viewing right now. Only {product.limitedBatchSize - product.batchClaimedCount} prototype spots remaining.
        </span>
      </div>

      {/* Navigation Header */}
      <header className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#489cff] to-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-md">
            V
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-white">Venturely</span>
            <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Validation Lab</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Risk Guarantee</span>
          </div>
          <Link
            href="/founder/dashboard"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Founder Dashboard
          </Link>
        </div>
      </header>

      {/* Main Hero Container */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Visual Assets & Mockups */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-white/10 relative shadow-2xl group">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0f172a]/90 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white shadow-lg">
                  {product.startupType} Innovation
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[11px] font-extrabold text-emerald-300 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                  Score: {product.validationScore?.overall || 91}/100
                </span>
              </div>

              {/* Zero-Inventory Pre-Order Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-gray-300 font-medium">Zero-Inventory Validation Batch</span>
                </div>
                <span className="text-emerald-400 font-bold">{claimedPercent}% Claimed</span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === idx
                        ? 'border-[#489cff] ring-2 ring-[#489cff]/30 scale-105'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Conversion Engine & Offer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#489cff] font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" /> Early Founder Validation Price
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price & Scarcity Block */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-gray-400">Special Validation Price</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-white">{formatCurrency(product.price)}</span>
                    {product.expectedPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(product.expectedPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20">
                    Save {Math.round((((product.expectedPrice || product.price * 2) - product.price) / (product.expectedPrice || product.price * 2)) * 100)}%
                  </span>
                </div>
              </div>

              {/* Price Lock Timer */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                  <Clock className="w-4 h-4" /> Price Lock Expires:
                </div>
                <div className="font-mono font-extrabold text-white tracking-wider">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </div>

              {/* Batch Scarcity Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Prototype Batch Allocation</span>
                  <span className="text-emerald-400 font-bold">{product.batchClaimedCount} of {product.limitedBatchSize} Reserved</span>
                </div>
                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#489cff] to-emerald-400 transition-all duration-1000"
                    style={{ width: `${claimedPercent}%` }}
                  />
                </div>
              </div>

              {/* Primary Call To Actions */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handlePreOrderClick}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#489cff] to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span>Pre-Order Prototype ({formatCurrency(product.price)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsWaitlistOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join VIP Waitlist (₹0 Down)</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>

              {/* Shipping & Trust notes */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px] text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#489cff]" />
                  <span>Shiprocket Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Refundable Deposit</span>
                </div>
              </div>
            </div>

            {/* Founder Note */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-extrabold text-white text-xs">
                {product.founderName.charAt(0)}
              </div>
              <div className="flex-1 text-xs">
                <div className="text-white font-bold">{product.founderName}</div>
                <div className="text-gray-400 text-[11px]">Founder, {product.companyName}</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-[#489cff] font-bold">
                Verified Founder
              </span>
            </div>
          </div>
        </div>

        {/* Problem vs Solution Deep Dive */}
        <section className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider text-blue-400 font-extrabold">Product Deep Dive</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why We Built {product.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/15 space-y-3">
              <div className="text-red-400 font-extrabold text-xs uppercase tracking-wider">The Problem</div>
              <p className="text-gray-300 text-sm leading-relaxed">{product.problem}</p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 space-y-3">
              <div className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider">Our Solution</div>
              <p className="text-gray-300 text-sm leading-relaxed">{product.solution}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h3 className="text-white font-bold text-sm">Full Product Description & Specs</h3>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{product.description}</p>
          </div>
        </section>

        {/* Real Customer Feedback Themes */}
        {product.feedbackThemes && product.feedbackThemes.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-white">Early Tester Feedback & Sentiment</h2>
              <span className="text-xs text-emerald-400 font-bold">94% Positive Sentiment</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.feedbackThemes.map((theme, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{theme.title}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {theme.percentage}% Agree
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {theme.quotes.map((quote, qIdx) => (
                      <p key={qIdx} className="text-xs text-gray-400 italic">
                        "{quote}"
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsWaitlistOpen(false);
                setWaitlistSubmitted(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>

            {!waitlistSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#489cff]">Zero-Risk Early Access</span>
                  <h3 className="text-xl font-extrabold text-white">Join the VIP Waitlist</h3>
                  <p className="text-xs text-gray-400">
                    Get priority queue access for the first manufacturing batch and unlock early-bird pricing.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      placeholder="e.g. Sneha Patel"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder="e.g. sneha@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">
                      Fair Target Price: <span className="text-[#489cff]">{formatCurrency(wtpInput)}</span>
                    </label>
                    <input
                      type="range"
                      min={Math.round(product.price * 0.7)}
                      max={Math.round(product.price * 1.5)}
                      step={50}
                      value={wtpInput}
                      onChange={(e) => setWtpInput(Number(e.target.value))}
                      className="w-full accent-[#489cff] cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#489cff] hover:bg-blue-600 font-extrabold text-white text-xs shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  Confirm Waitlist Reservation
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-white">You're on the VIP Waitlist!</h3>
                  <p className="text-xs text-gray-400">
                    Your Queue Rank: <span className="text-emerald-400 font-bold">#{userRank}</span>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-left space-y-2">
                  <div className="text-gray-400">Share your custom referral link to jump 5 spots:</div>
                  <div className="p-2 rounded bg-black/40 font-mono text-white text-[11px] break-all border border-white/10">
                    https://venturely.io/v/{product.slug}?ref={referralCode}
                  </div>
                </div>

                <button
                  onClick={() => setIsWaitlistOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
