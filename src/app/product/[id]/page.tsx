'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StageBadge } from '@/components/product/StageBadge';
import { ValidationScoreCard } from '@/components/dashboard/ValidationScoreCard';
import { STAGES } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Star,
  ArrowLeft,
  Check,
  Shield,
  Sparkles,
  Flame,
  Truck,
  Clock,
  MessageSquare,
  BarChart3,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToValidationCart } = useRole();
  const id = params?.id as string;
  const product = getProductById(id);

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-black">Startup Product Not Found</h2>
            <p className="text-gray-500 text-sm">The validation campaign you requested is no longer active.</p>
            <button onClick={() => router.push('/marketplace')} className="smytten-btn">Return to Marketplace</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const cpr = product.cartPurchaseRate || 18.5;
  const batchClaimed = product.batchClaimedCount || 40;
  const batchTotal = product.limitedBatchSize || 50;
  const percentFilled = Math.min(Math.round((batchClaimed / batchTotal) * 100), 100);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Back Button */}
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to Validation Marketplace
          </button>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-lg relative">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Scarcity Banner Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0f1628] text-white font-extrabold text-xs shadow-md">
                  {product.startupType} Startup
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  <span>Validation Score: {product.validationScore.overall}/100</span>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                        activeImageIdx === idx ? 'border-[#489cff] scale-105 shadow-md' : 'border-gray-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Validation Score Breakdown */}
              <div className="pt-4">
                <ValidationScoreCard score={product.validationScore} stage={product.stage} />
              </div>
            </div>

            {/* RIGHT: Validation Pre-Order Panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* FOMO Live Banner */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-900 text-xs flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
                    Micro-Batch Scarcity Signal
                  </span>
                  <span className="text-[11px] font-bold text-amber-800">{product.currentViewersCount || 45} Viewing Now</span>
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${percentFilled}%` }} />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-amber-900 pt-1">
                  <span>{batchClaimed} of {batchTotal} Units Claimed</span>
                  <span>{100 - percentFilled}% Left</span>
                </div>
              </div>

              {/* Header Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{product.companyName}</span>
                  <StageBadge stage={product.stage} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-black leading-tight">{product.name}</h1>
                <p className="text-gray-600 text-sm leading-relaxed">{product.tagline}</p>
              </div>

              {/* Price & CPR Info */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-black">{formatCurrency(product.price)}</div>
                  {product.expectedPrice && (
                    <div className="text-xs text-gray-400 line-through">Retail Launch Price: {formatCurrency(product.expectedPrice)}</div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Cart Conversion</div>
                  <div className="text-base font-extrabold text-emerald-600">{cpr.toFixed(1)}% CPR</div>
                </div>
              </div>

              {/* Logistics Box */}
              <div className="p-4 rounded-2xl border border-gray-200 flex items-center gap-3 bg-white">
                <Truck className="w-5 h-5 text-gray-700" />
                <div className="text-xs">
                  <div className="font-bold text-black">
                    Fulfillment: {product.logisticsModel === 'VENTURELY_SUPPORTED' ? 'Venturely Platform Logistics (₹49)' : 'Merchant Self-Fulfillment'}
                  </div>
                  <div className="text-gray-500">{product.shippingEstimateDays || '3-4 Business Days Shipping'}</div>
                </div>
              </div>

              {/* Primary Pre-Order CTA */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => addToValidationCart(product, true)}
                  className="smytten-btn w-full justify-center py-4 bg-[#489cff] hover:bg-blue-600 text-white font-extrabold text-base shadow-xl shadow-blue-500/25"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Pre-Order & Lock Price ({formatCurrency(product.price)})</span>
                </button>

                <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                  Price locked in for Batch #1. Full buyer protection & shipping updates provided.
                </p>
              </div>

              {/* Customer Feedback Sentiment */}
              {product.feedbackThemes.length > 0 && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h4 className="font-extrabold text-black text-sm flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-[#489cff]" /> Customer Sentiment & Feedback
                  </h4>
                  <div className="space-y-2">
                    {product.feedbackThemes.map((theme, i) => (
                      <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                        <div className="flex justify-between items-center text-xs font-bold text-black">
                          <span>{theme.title}</span>
                          <span className="text-emerald-600">{theme.percentage}% Positive</span>
                        </div>
                        <p className="text-[11px] text-gray-600 italic">"{theme.quotes[0]}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
