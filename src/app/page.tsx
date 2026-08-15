'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { STAGES } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Gift,
  Sparkles,
  Shield,
  Star,
  Rocket,
  ShoppingBag,
  ShieldAlert,
  Zap,
  Heart,
  Headphones,
  Coffee,
  Laptop,
  Home,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  Flame,
  Award,
  Users,
  Box,
  HelpCircle,
  BarChart3,
  Percent,
} from 'lucide-react';

const CATEGORIES = [
  { name: 'All', icon: Sparkles, color: '#489cff', count: '140+ Items' },
  { name: 'Health & Wellness', icon: Heart, color: '#ff6b6b', count: '38 Trials' },
  { name: 'Audio & Wearables', icon: Headphones, color: '#489cff', count: '24 Trials' },
  { name: 'D2C Food & Beverage', icon: Coffee, color: '#f59e0b', count: '45 Trials' },
  { name: 'Workspace & Productivity', icon: Laptop, color: '#8b5cf6', count: '19 Trials' },
  { name: 'Home & Kitchen', icon: Home, color: '#10b981', count: '22 Trials' },
];

const FAQS = [
  {
    q: 'How does the 6 Free Trial Points system work?',
    a: 'Every new user gets 6 Trial Points to create a custom Startup Discovery Pack. Each startup sample costs 1 to 3 points. Select your favorite samples, pay a nominal flat shipping & packaging fee of ₹199, and your trial pack is delivered to your doorstep.',
  },
  {
    q: 'How do I get 100% Cashback on my trial order?',
    a: 'After receiving your trial pack and testing the products at home, submit authentic feedback for the founders on Venturely. You will instantly unlock 100% cashback in your wallet to purchase full-sized validated products from our marketplace!',
  },
  {
    q: 'How does Venturely help startup founders validate demand?',
    a: 'Founders can test their startup ideas, 3D prototypes, or limited launch batches with real consumers before investing heavily in manufacturing. Venturely calculates a real-time Validation Score (0–100) and provides automated next-step recommendations.',
  },
  {
    q: 'What is the 9-Stage Validation Pipeline?',
    a: 'Products progress systematically through 8 stages: 0_IDEA → 1_CONCEPT → 2_PROTOTYPE → 3_MVP → 4_EARLY_PRODUCT → 5_D2C_LAUNCH → 6_VALIDATED → 7_MARKETPLACE. Each stage unlocks specific tools like waitlists, pre-orders, and batch sell-through meters.',
  },
  {
    q: 'Are the trial samples genuine and safe?',
    a: 'Yes, 100%! All trial discovery kits are authentic, direct-from-founder samples approved by Venturely platform moderators before being listed.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { setRole, showToast, setIsTrialDrawerOpen, userTrialPoints, maxTrialPoints, trialCart, addToTrialCart } = useRole();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [liveTickerIndex, setLiveTickerIndex] = useState(0);

  const products = getProducts();
  const trialProducts = products.filter((p) => p.hasTrialOption);
  const filteredProducts = activeCategory === 'All' 
    ? trialProducts 
    : trialProducts.filter((p) => p.category === activeCategory);
  
  const featuredStartups = products.filter((p) => p.isFeatured || p.isGraduatedToMarketplace);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Live order ticker events
  const LIVE_EVENTS = [
    { name: 'Alex M. from Bengaluru', action: 'claimed 7-Day NerveBand Discovery Kit', time: '12 seconds ago', points: '2 Pts' },
    { name: 'Priya S. from Mumbai', action: 'claimed AuraSound Frame Fitting Kit', time: '34 seconds ago', points: '1 Pt' },
    { name: 'Rohan K. from Delhi', action: 'joined HydroPure UV Flask Pre-Order', time: '1 min ago', points: '1 Pt' },
    { name: 'Sneha T. from Pune', action: 'unlocked 100% Cashback for review', time: '2 mins ago', points: '100% Back' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTickerIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollFeatured = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handlePortalLogin = (selectedRole: 'FOUNDER' | 'CUSTOMER' | 'ADMIN', targetRoute: string) => {
    setRole(selectedRole);
    showToast(`Logged in as ${selectedRole}`);
    router.push(targetRoute);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* TOP REAL-TIME ACTIVITY TICKER */}
        <div className="bg-[#0f1628] text-white py-2 px-4 border-b border-slate-800 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-[#b9fff5] uppercase font-bold tracking-wider">LIVE TELEMETRY:</span>
              <div className="truncate text-slate-300 text-xs">
                <strong className="text-white">{LIVE_EVENTS[liveTickerIndex].name}</strong> {LIVE_EVENTS[liveTickerIndex].action}
                <span className="text-slate-500 text-[10px] ml-2">({LIVE_EVENTS[liveTickerIndex].time})</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span>⚡ 142 Active Validations</span>
              <span className="text-emerald-400 font-bold">● 6 Points Free / User</span>
            </div>
          </div>
        </div>

        {/* HERO SECTION — HIGH IMPACT WITH DUAL VALUE PROPOSITION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#e0fff9]/60 via-white to-white pt-12 pb-16 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Copy */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b9fff5] border border-emerald-300 text-xs font-bold text-[#0f1628] shadow-sm">
                  <Gift className="w-4 h-4 text-[#0f1628]" />
                  <span>Smytten-Inspired Discovery + Startup Validation Engine</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f1628] leading-[1.12] tracking-tight font-[Poppins,sans-serif]">
                  Try Revolutionary Startups <br />
                  <span className="text-[#489cff] relative">
                    Before They Scale.
                  </span>
                </h1>

                <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  Sample high-potential prototypes and D2C innovations using <strong>6 Free Trial Points</strong>. Give authentic feedback to founders and unlock <strong>100% Cashback</strong>.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsTrialDrawerOpen(true)}
                    className="smytten-btn text-base py-3.5 px-6 shadow-lg shadow-blue-500/20"
                  >
                    <Gift className="w-5 h-5" />
                    <span>Claim 6 Free Trial Points</span>
                  </button>

                  <Link
                    href="/marketplace"
                    className="px-6 py-3.5 rounded-full border border-gray-300 bg-white text-[14px] font-bold text-[#0f1628] hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Explore Trial Packs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/founder/new"
                    className="px-5 py-3.5 rounded-full bg-[#0f1628] text-white text-[14px] font-bold hover:bg-gray-800 transition-all flex items-center gap-2 shadow-sm"
                  >
                    <Rocket className="w-4 h-4 text-[#b9fff5]" />
                    <span>For Founders</span>
                  </Link>
                </div>

                {/* Micro Metric Highlights */}
                <div className="pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-extrabold text-[#0f1628] font-mono">6 Points</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">Free Trial Credits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-emerald-600 font-mono">100%</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">Cashback On Feedback</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-[#489cff] font-mono">8 Stages</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">Idea to Marketplace</div>
                  </div>
                </div>
              </div>

              {/* Right Hero Card — Interactive Trial Box Preview */}
              <div className="lg:col-span-5">
                <div className="smytten-card p-6 bg-white shadow-xl border-gray-200 relative space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#b9fff5' }}>
                        <Gift className="w-5 h-5 text-[#0f1628]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[15px] text-[#0f1628]">Your 6-Point Trial Pack</h3>
                        <p className="text-[11px] text-gray-500">Curate startup discovery samples</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#b9fff5] text-[#0f1628]">
                      {userTrialPoints} / {maxTrialPoints} Pts Available
                    </span>
                  </div>

                  {/* Sample items inside box */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=200&q=80"
                        alt="NerveBand"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#0f1628] truncate">NerveBand Stress Relief</div>
                        <div className="text-[11px] text-gray-500 truncate">7-Day Haptic Pulse Kit</div>
                        <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Stage 4: Early Product</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-800">
                        2 Pts
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&q=80"
                        alt="AuraSound"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#0f1628] truncate">AuraSound Glasses</div>
                        <div className="text-[11px] text-gray-500 truncate">3D Frame Demo Fitting</div>
                        <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Stage 0: Idea Validation</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-800">
                        1 Pt
                      </span>
                    </div>
                  </div>

                  {/* Cashback Guarantee banner */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#b9fff5]/50 to-[#e0fff9]/80 border border-[#b9fff5] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-xs font-bold text-[#0f1628]">100% Cashback on Feedback</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-800 font-bold">₹199 Shipping Only</span>
                  </div>

                  <button
                    onClick={() => setIsTrialDrawerOpen(true)}
                    className="smytten-btn w-full justify-center text-sm py-2.5"
                  >
                    Open Trial Pack ({trialCart.length} Selected)
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CIRCULAR CATEGORY STRIP WITH REAL-TIME COUNTS */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">Browse by Category</h3>
              <Link href="/marketplace" className="text-xs font-semibold text-[#489cff] hover:underline flex items-center gap-1">
                View All Categories <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className="flex flex-col items-center gap-2 min-w-[90px] group cursor-pointer"
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'ring-2 ring-[#489cff] scale-105 shadow-md'
                          : 'border border-gray-100 hover:shadow-sm group-hover:scale-105'
                      }`}
                      style={{ background: `${cat.color}15` }}
                    >
                      <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                    </div>
                    <div className="text-center">
                      <span className={`text-[12px] font-medium block whitespace-nowrap ${isActive ? 'text-[#0f1628] font-bold' : 'text-gray-600 group-hover:text-black'}`}>
                        {cat.name.split(' & ')[0]}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{cat.count}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED TRIAL SAMPLES GRID */}
        <section className="py-14 bg-[#f9fafb]">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#489cff] uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>Trending Startup Discovery Samples</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1628] font-[Poppins,sans-serif] mt-1">
                  Active Trial Packs Available Now
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Spend your 6 trial points to experience these pre-market and newly launched products.
                </p>
              </div>

              <Link
                href="/marketplace"
                className="smytten-btn text-xs py-2.5 px-5 self-start sm:self-auto"
              >
                <span>View Full Discovery Feed ({trialProducts.length})</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* HOW STARTUP SAMPLING WORKS — 4 INTERACTIVE STEPS */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-[#489cff] uppercase tracking-widest">Simple 4-Step Process</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1628] font-[Poppins,sans-serif]">
                How Venturely Startup Trial Works
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                Try miniature sample packs from innovative startups before committing to full-sized purchases.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Claim 6 Trial Points',
                  desc: 'Sign up to receive 6 instant trial credits in your Venturely wallet with zero upfront commitment.',
                  icon: Gift,
                  color: '#10b981',
                },
                {
                  step: '02',
                  title: 'Select Startup Samples',
                  desc: 'Pick 1 to 3 point discovery packs across wellness, audio, hardware, and gourmet D2C brands.',
                  icon: ShoppingBag,
                  color: '#489cff',
                },
                {
                  step: '03',
                  title: 'Try at Home & Review',
                  desc: 'Receive your sealed trial package, test the product in your daily routine, and submit feedback.',
                  icon: Star,
                  color: '#f59e0b',
                },
                {
                  step: '04',
                  title: 'Get 100% Cashback',
                  desc: 'Earn 100% cashback to buy full-sized validated products from the founders on our marketplace.',
                  icon: Sparkles,
                  color: '#8b5cf6',
                },
              ].map((item) => (
                <div key={item.step} className="smytten-card p-6 space-y-4 hover:shadow-md transition-shadow relative">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: `${item.color}15` }}>
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <span className="text-3xl font-extrabold font-mono text-gray-200">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#0f1628]">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE 9-STAGE STARTUP VALIDATION PIPELINE */}
        <section className="py-16 bg-[#0f1628] text-white">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold text-[#b9fff5] uppercase tracking-widest">Proprietary Growth Framework</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-[Poppins,sans-serif]">
                The 9-Stage Validation Progression
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "Idea → Demand → Validation → Limited Launch → Data → Decision → Scale → Marketplace"
              </p>
            </div>

            {/* Pipeline Stage Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { stage: '0_IDEA', num: 'Stage 0', name: 'Idea', focus: 'Capture waitlists & buyer interest' },
                { stage: '1_CONCEPT', num: 'Stage 1', name: 'Concept', focus: 'Feature voting & willingness-to-pay' },
                { stage: '2_PROTOTYPE', num: 'Stage 2', name: 'Prototype', focus: 'Working model demo feedback' },
                { stage: '3_MVP', num: 'Stage 3', name: 'MVP', focus: 'Paid pre-order reservations' },
                { stage: '4_EARLY_PRODUCT', num: 'Stage 4', name: 'Early Product', focus: 'Limited batch launch (50–250 units)' },
                { stage: '5_D2C_LAUNCH', num: 'Stage 5', name: 'D2C Launch', focus: 'Sell-through velocity & CAC optimization' },
                { stage: '6_VALIDATED', num: 'Stage 6', name: 'Validated', focus: 'Validated Product Badge awarded' },
                { stage: '7_MARKETPLACE', num: 'Stage 7', name: 'Marketplace', focus: 'Curated retail distribution' },
              ].map((stg) => (
                <div key={stg.stage} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#b9fff5] font-bold">{stg.num}</span>
                    <span className="text-slate-400">Pipeline</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{stg.name}</h4>
                  <p className="text-[11px] text-slate-300 leading-snug">{stg.focus}</p>
                </div>
              ))}
            </div>

            {/* Validation Score Weight Engine */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-base text-white">Proprietary Validation Score Formula (0–100)</h3>
                </div>
                <span className="text-xs font-mono text-emerald-400">Transparent Algorithmic Scoring</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs text-center">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-blue-400">30%</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Real Demand</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-emerald-400">25%</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Conversion Rate</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-purple-400">20%</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Satisfaction (NPS)</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-amber-400">15%</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Unit Economics</div>
                </div>
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xl font-bold text-teal-400">10%</div>
                  <div className="text-[11px] text-slate-300 mt-0.5">Sales Momentum</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED STARTUP VALIDATION CAMPAIGNS (CAROUSEL) */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#489cff] uppercase tracking-wider">Founder Spotlight</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1628] font-[Poppins,sans-serif]">
                  Validated High-Scoring Startups
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollFeatured('left')} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer shadow-sm">
                  <ArrowLeft className="w-4 h-4 text-gray-700" />
                </button>
                <button onClick={() => scrollFeatured('right')} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 cursor-pointer shadow-sm">
                  <ArrowRight className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-3">
              {featuredStartups.map((p) => (
                <div key={p.id} className="min-w-[280px] max-w-[300px] flex-shrink-0">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLATFORM PORTALS SECTION */}
        <section id="portals" className="py-16 bg-[#f9fafb] border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-[#489cff] uppercase tracking-widest">Role-Based Access</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1628] font-[Poppins,sans-serif]">
                Platform Portals & Workspaces
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                Whether you are testing demand for a new invention or discovering early-stage brands — access your portal below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Founder Workspace */}
              <div className="smytten-card p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: '#489cff15' }}>
                    <Rocket className="w-6 h-6 text-[#489cff]" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0f1628]">Founders Workspace</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Test product ideas with real demand data, manage trial inventory, view automated advice, and request marketplace graduation.
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Distribute trial samples & measure conversion</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Live Validation Score (0–100) engine</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> "What Should I Do Next?" advisory feed</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Limited batch inventory sellout telemetry</li>
                  </ul>
                </div>
                <button
                  onClick={() => handlePortalLogin('FOUNDER', '/founder/dashboard')}
                  className="smytten-btn w-full justify-center text-xs py-3"
                >
                  <span>Open Founder Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Customer Portal */}
              <div className="smytten-card p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: '#10b98115' }}>
                    <ShoppingBag className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0f1628]">Customer Discovery</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Discover new startup products before mass retail. Claim 6 trial samples, join priority waitlists, and track order deliveries.
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Use 6 Trial Points to claim sample packs</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 100% Cashback wallet upon review</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Priority waitlists & pre-order reservations</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Verified authentic direct deliveries</li>
                  </ul>
                </div>
                <button
                  onClick={() => handlePortalLogin('CUSTOMER', '/customer/dashboard')}
                  className="smytten-btn w-full justify-center text-xs py-3"
                  style={{ background: '#10b981' }}
                >
                  <span>Open Customer Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Admin Panel */}
              <div className="smytten-card p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: '#f59e0b15' }}>
                    <ShieldAlert className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0f1628]">Platform Admin</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Moderate startup submissions, approve marketplace graduations, monitor trust signals, and configure platform commissions.
                  </p>
                  <ul className="space-y-2.5 text-xs text-gray-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Startup moderation & approval queue</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Award "Validated Product" badges</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Configure marketplace commissions</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Anti-gaming & review verification</li>
                  </ul>
                </div>
                <button
                  onClick={() => handlePortalLogin('ADMIN', '/admin/dashboard')}
                  className="smytten-btn w-full justify-center text-xs py-3"
                  style={{ background: '#f59e0b' }}
                >
                  <span>Open Admin Control</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-bold text-[#489cff] uppercase tracking-widest">Have Questions?</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1628] font-[Poppins,sans-serif]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="smytten-card overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#0f1628] hover:bg-gray-50/80 cursor-pointer transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#489cff]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CASHBACK BANNER */}
        <section className="py-12 bg-gradient-to-r from-[#b9fff5] via-[#e0fff9] to-[#b9fff5]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#0f1628] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Risk Trial Promise</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1628] font-[Poppins,sans-serif]">
                Ready to Experience Early Innovations?
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 max-w-xl">
                Get your 6 free trial points now, select your startup sample pack, and earn 100% cashback upon review.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsTrialDrawerOpen(true)}
                className="smytten-btn text-sm sm:text-base py-3.5 px-7 shadow-md"
              >
                <Gift className="w-5 h-5" />
                <span>Claim 6 Free Points</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
