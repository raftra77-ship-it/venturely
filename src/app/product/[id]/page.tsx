'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/data';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StageBadge } from '@/components/product/StageBadge';
import { WaitlistModal } from '@/components/modals/WaitlistModal';
import { CheckoutModal } from '@/components/modals/CheckoutModal';
import { ValidationScoreCard } from '@/components/dashboard/ValidationScoreCard';
import { STAGES } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  Star,
  Gift,
  ArrowLeft,
  Check,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToTrialCart } = useRole();
  const id = params?.id as string;
  const product = getProductById(id);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-black">Product Not Found</h2>
            <p className="text-gray-500 text-sm">The product you requested does not exist.</p>
            <button onClick={() => router.push('/marketplace')} className="smytten-btn">Return to Marketplace</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isIdeaOrConcept = product.stage === '0_IDEA' || product.stage === '1_CONCEPT';
  const isPrototypeOrMVP = product.stage === '2_PROTOTYPE' || product.stage === '3_MVP';
  const trialCost = product.trialPointsCost || 1;
  const sellThrough = product.inventoryTotal > 0 ? Math.round((product.inventorySold / product.inventoryTotal) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Back + Breadcrumb */}
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-black cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </button>

          {/* Main Product Layout: Gallery + Info */}
          <div className="flex gap-8 items-start flex-col lg:flex-row">
            {/* LEFT: Image Gallery */}
            <div className="lg:w-[55%] space-y-3">
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden smytten-card">
                <img
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all ${
                        activeImageIdx === idx ? 'ring-2 ring-[#489cff] scale-105' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Product Info Panel */}
            <div className="lg:w-[45%] space-y-5 lg:sticky lg:top-32">
              {/* Stage + Category */}
              <div className="flex items-center gap-2 flex-wrap">
                <StageBadge stage={product.stage} />
                <span className="text-[12px] text-gray-500">{product.category}</span>
                <span className="text-[12px] text-gray-400">•</span>
                <span className="text-[12px] text-gray-500">{product.companyName}</span>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl lg:text-[28px] font-bold text-black leading-tight font-[Poppins,sans-serif]">
                {product.name}
              </h1>
              <p className="text-[14px] text-gray-600 leading-relaxed">{product.tagline}</p>

              {/* Validation Score */}
              {product.validationScore && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-[12px] font-semibold text-black">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span>Validation: {product.validationScore.overall}/100</span>
                  </div>
                  {product.validationScore.overall >= 80 && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: '#b9fff5', color: '#0f1628' }}>
                      ⭐ Top Rated
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="smytten-card p-4 flex items-baseline justify-between">
                <div>
                  <span className="text-[12px] text-gray-500">Full Size Price</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-extrabold text-black">₹{formatCurrency(product.price)}</span>
                    {product.discountPrice && (
                      <span className="text-[13px] text-gray-400 line-through">₹{formatCurrency(product.discountPrice)}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-500 block">Manufacturing</span>
                  <span className="text-[11px] font-medium text-black">{product.manufacturingStatus}</span>
                </div>
              </div>

              {/* TRIAL OPTION — Smytten mint green box */}
              {product.hasTrialOption && (
                <div className="p-4 rounded-2xl space-y-3" style={{ background: '#b9fff5' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-[14px] text-[#0f1628]">
                      <Gift className="w-5 h-5" />
                      <span>Trial Sample Available</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-[12px] font-extrabold text-[#0f1628]">
                      {trialCost} Point{trialCost > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-700">
                    Trial Pack: <strong>{product.trialSizeDescription || 'Discovery Sample'}</strong>
                  </p>
                  <button
                    onClick={() => addToTrialCart(product)}
                    className="smytten-btn w-full justify-center text-[14px] py-2.5"
                  >
                    <Gift className="w-4 h-4" />
                    Add Trial Sample to Pack ({trialCost} Pt{trialCost > 1 ? 's' : ''})
                  </button>
                </div>
              )}

              {/* Stage-Specific Buy CTA */}
              {isIdeaOrConcept ? (
                <button onClick={() => setIsWaitlistOpen(true)} className="w-full py-3.5 rounded-full bg-[#0f1628] text-white font-bold text-[14px] hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" /> Join Priority Waitlist
                </button>
              ) : (
                <button onClick={() => setIsCheckoutOpen(true)} className="w-full py-3.5 rounded-full bg-[#0f1628] text-white font-bold text-[14px] hover:bg-gray-800 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  {isPrototypeOrMVP ? 'Reserve Early Access Unit' : `Buy Full Size (₹${formatCurrency(product.price)})`}
                </button>
              )}

              {/* Trust Badges */}
              <div className="flex items-center gap-4 pt-2 text-[11px] text-gray-500">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-green-500" /> Authentic</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green-500" /> Verified Founder</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#489cff]" /> 100% Cashback</span>
              </div>
            </div>
          </div>

          {/* Problem & Solution Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="smytten-card p-5 space-y-2">
              <h3 className="font-bold text-[14px] text-black">The Problem</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{product.problem}</p>
            </div>
            <div className="smytten-card p-5 space-y-2" style={{ background: '#b9fff515' }}>
              <h3 className="font-bold text-[14px] text-black">The Solution</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{product.solution}</p>
            </div>
          </div>

          {/* Description */}
          <div className="smytten-card p-5 space-y-2">
            <h3 className="font-bold text-[14px] text-black">Product Overview</h3>
            <p className="text-[13px] text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Validation Score Card */}
          <ValidationScoreCard score={product.validationScore} />
        </div>
      </main>

      <WaitlistModal product={product} isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <CheckoutModal product={product} isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <Footer />
    </div>
  );
}
