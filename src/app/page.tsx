'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { STARTUP_CATEGORIES, VALIDATION_PACKAGE_TIERS, LIVE_FOMO_EVENTS, STAGES } from '@/lib/constants';
import { formatCurrency, formatNumber } from '@/lib/format';
import { StartupCategory } from '@/types';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Rocket,
  ShoppingBag,
  Zap,
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Flame,
  PlusCircle,
  Truck,
  Percent,
  Sliders,
  BarChart3,
  Layers,
  Activity,
  Megaphone,
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does Venturely validate real demand for early-stage startups?',
    a: 'Venturely runs managed validation campaigns (via Meta, Google, & LinkedIn targeted ads) driving verified audience traffic to your live prototype card. We capture true purchase intent via Cart Purchase Rate (CPR), pre-orders, deposit reservations, and SaaS demo requests.',
  },
  {
    q: 'What startup models are supported on Venturely?',
    a: 'Venturely supports D2C Physical Brands, SaaS & Digital Software, B2B & Wholesale, and B2C Consumer Apps. Whether you are at prototype stage, low inventory (10-50 units), or pre-launch, Venturely provides tailored conversion funnels.',
  },
  {
    q: 'How does logistics work for physical products?',
    a: 'Founders have full flexibility: 1) Merchant Self-Logistics (ship directly using your own courier), or 2) Venturely Platform Logistics (integrated dispatch with automated labels, doorstep pickup, and tracking for flat ₹49 surface / ₹89 express per unit).',
  },
  {
    q: 'What is the Batch Manufacturing Signal?',
    a: 'Our algorithmic engine analyzes your Cart Purchase Rate (CPR), customer willingness to pay (WTP), and sales velocity to give you a precise production forecast — e.g. "Validated demand high: Ready to manufacture 500 units next batch".',
  },
  {
    q: 'How does graduation to the public marketplace work?',
    a: 'Products that reach target benchmark metrics (Validation Score ≥ 75, CPR ≥ 12%, positive unit economics) earn the "Venturely Validated" trust badge and graduate to the public marketplace with a standard 5% to 7% platform commission fee.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { setRole, showToast } = useRole();
  const [activeCategory, setActiveCategory] = useState<StartupCategory | 'ALL'>('ALL');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [fomoTickerIndex, setFomoTickerIndex] = useState(0);

  // Interactive Live Calculator State
  const [calcPrice, setCalcPrice] = useState<number>(2999);
  const [calcAdBudget, setCalcAdBudget] = useState<number>(14999);

  const products = getProducts();
  const filteredProducts = activeCategory === 'ALL'
    ? products
    : products.filter((p) => p.startupType === activeCategory);

  const verifiedMarketplaceProducts = products.filter((p) => p.isGraduatedToMarketplace || p.validationScore.overall >= 80);

  useEffect(() => {
    const timer = setInterval(() => {
      setFomoTickerIndex((prev) => (prev + 1) % LIVE_FOMO_EVENTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const activeFomo = LIVE_FOMO_EVENTS[fomoTickerIndex];

  // Live Calculator formulas
  const calcVisitors = Math.round(calcAdBudget * 0.35);
  const calcCpr = Math.min(Math.round((14.5 + (calcAdBudget / 10000) * 1.5) * 10) / 10, 28.5);
  const calcPreOrders = Math.round(calcVisitors * (calcCpr / 100));
  const calcRecommendedBatch = Math.max(Math.round(calcPreOrders * 3.5 / 50) * 50, 250);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />



      {/* SECTION: Validation Ground (Interactive Startup Showcase) */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-6">
          <div className="space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#489cff] font-extrabold text-xs uppercase tracking-wider">
              Validation Ground
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              Active Startup Validation Campaigns
            </h2>
            <p className="text-gray-600 text-sm max-w-xl">
              Explore prototype micro-batches, SaaS demo signups, and B2B quote requests. Pre-order to lock early founder pricing!
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('ALL')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeCategory === 'ALL'
                  ? 'bg-[#0f1628] text-white shadow-lg shadow-slate-900/20'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Startups ({products.length})
            </button>
            {STARTUP_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Interactive Batch Readiness & Forecast Calculator */}
      <section className="py-16 px-6 bg-[#0f1628] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" /> Algorithmic Demand Calculator
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Test Your Startup Batch Readiness Signal
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Adjust your target product price and validation ad budget to see projected audience traffic, estimated Cart Purchase Rate (CPR), and your automated primary batch manufacturing recommendation.
            </p>

            <div className="space-y-5 pt-2">
              {/* Slider 1: Target Price */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">Target Product Price</span>
                  <span className="text-[#489cff] text-sm">{formatCurrency(calcPrice)}</span>
                </div>
                <input
                  type="range"
                  min={999}
                  max={24999}
                  step={500}
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#489cff]"
                />
              </div>

              {/* Slider 2: Validation Ad Budget */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-400">Managed Ad Campaign Budget</span>
                  <span className="text-emerald-400 text-sm">{formatCurrency(calcAdBudget)}</span>
                </div>
                <input
                  type="range"
                  min={4999}
                  max={49999}
                  step={5000}
                  value={calcAdBudget}
                  onChange={(e) => setCalcAdBudget(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* Calculator Output Display Card */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-2xl space-y-6 shadow-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Projected Validation Telemetry</div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400">Target Audience Traffic</div>
                  <div className="text-2xl font-extrabold text-white">{formatNumber(calcVisitors)}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Verified Ad Clicks</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400">Estimated Cart Purchase Rate</div>
                  <div className="text-2xl font-extrabold text-emerald-400">{calcCpr}% CPR</div>
                  <div className="text-[10px] text-emerald-300 mt-0.5">High Demand Signal</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400">Projected Pre-Orders</div>
                  <div className="text-2xl font-extrabold text-white">{calcPreOrders} Units</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Gross Revenue: {formatCurrency(calcPreOrders * calcPrice)}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400">Recommended Batch Run</div>
                  <div className="text-2xl font-extrabold text-[#489cff]">{calcRecommendedBatch} Units</div>
                  <div className="text-[10px] text-blue-300 mt-0.5">Production Ready</div>
                </div>
              </div>

              <Link
                href="/founder/new"
                className="w-full py-3.5 rounded-2xl bg-[#489cff] hover:bg-blue-600 font-extrabold text-white text-sm text-center block transition-all shadow-xl shadow-blue-500/25"
              >
                Launch Validation Campaign with {formatCurrency(calcAdBudget)} Ad Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Packages Showcase */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#489cff] font-extrabold text-xs uppercase tracking-wider">
              Managed Validation Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              Ad Packages with Built-In Meta & Google Credit
            </h2>
            <p className="text-gray-600 text-sm">
              We manage ad creation & targeting on Meta, Google, & LinkedIn to inject real customer traffic into your startup page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(VALIDATION_PACKAGE_TIERS).map((pkg) => (
              <div
                key={pkg.tier}
                className={`p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                  pkg.tier === 'GROWTH'
                    ? 'bg-gradient-to-b from-blue-50/50 to-white border-[#489cff] shadow-xl relative scale-105'
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                {pkg.tier === 'GROWTH' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#489cff] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    Most Popular Tier
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-extrabold text-black">{pkg.packageName}</h3>
                    <p className="text-xs text-gray-500">Targeting ~{formatNumber(pkg.targetVisitors)} live visitors</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-black">{formatCurrency(pkg.price)}</span>
                    <span className="text-xs text-gray-500">/ campaign</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Ad Credit Allocation:</span>
                      <span className="font-extrabold text-emerald-600">{formatCurrency(pkg.adSpendAllocation)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Platform Execution:</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(pkg.platformFee)}</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/founder/new"
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-xs text-center transition-all cursor-pointer ${
                    pkg.tier === 'GROWTH'
                      ? 'bg-[#489cff] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-[#0f1628] hover:bg-black text-white'
                  }`}
                >
                  Select {pkg.packageName}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Logistics & 5-7% Commission Model Info */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logistics Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-[#0f1628] text-white space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold">Flexible Fulfillment & Logistics</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Startups can choose between <strong className="text-white">Merchant Self-Logistics</strong> (use your own Shiprocket or courier) or opt into <strong className="text-emerald-400">Venturely Platform Logistics</strong> with flat ₹49 surface / ₹89 express rates, automated labels, and tracking simulator.
            </p>
            <div className="pt-2 text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Doorstep Pickup & End-to-End Tracking Available
            </div>
          </div>

          {/* 5-7% Commission Marketplace Box */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0f1628] to-slate-900 text-white space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-[#489cff] flex items-center justify-center font-bold">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold">5% to 7% Commission Marketplace</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Once your startup achieves validated metrics (Validation Score ≥ 75, CPR ≥ 12%), your product earns the official <strong className="text-[#489cff]">"Venturely Validated"</strong> badge and graduates to the public consumer marketplace with zero upfront listing fees.
            </p>
            <div className="pt-2 text-xs text-sky-300 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Transparent 5–7% Commission on Validated Sales
            </div>
          </div>
        </div>
      </section>

      {/* Verified Marketplace Teaser */}
      {verifiedMarketplaceProducts.length > 0 && (
        <section className="py-12 px-6 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Public Marketplace</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black">Graduated & Validated Products</h2>
            </div>
            <Link href="/marketplace" className="text-xs font-bold text-[#489cff] hover:underline flex items-center gap-1">
              View All Validated ({verifiedMarketplaceProducts.length}) <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedMarketplaceProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-black">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500">Everything you need to know about Venturely Validation Engine</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-gray-50 border border-gray-200 transition-all cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between font-bold text-black text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <span className="text-gray-400 text-lg">{openFaq === index ? '−' : '+'}</span>
                </div>
                {openFaq === index && (
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
