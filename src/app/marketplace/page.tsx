'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';
import { PRODUCT_CATEGORIES, STAGES } from '@/lib/constants';
import { useRole } from '@/context/RoleContext';
import {
  Search,
  ShieldCheck,
  Flame,
  Clock,
  Gift,
  ArrowRight,
  Heart,
  Headphones,
  Coffee,
  Laptop,
  Home,
  SlidersHorizontal,
} from 'lucide-react';

const SIDEBAR_CATEGORIES = [
  { name: 'All Categories', icon: SlidersHorizontal, value: 'All' },
  { name: 'Health & Wellness', icon: Heart, value: 'Health & Wellness' },
  { name: 'Audio & Wearables', icon: Headphones, value: 'Audio & Wearables' },
  { name: 'D2C Food & Beverage', icon: Coffee, value: 'D2C Food & Beverage' },
  { name: 'Workspace & Productivity', icon: Laptop, value: 'Workspace & Productivity' },
  { name: 'Home & Kitchen', icon: Home, value: 'Home & Kitchen' },
];

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'trial' | 'shop'>('trial');

  const { trialCart, userTrialPoints, maxTrialPoints, setIsTrialDrawerOpen } = useRole();

  let products = getProducts({
    category: selectedCategory,
    stage: selectedStage,
    query: searchQuery,
  });

  if (selectedBadge === 'validated') {
    products = products.filter((p) => p.isGraduatedToMarketplace || p.stage === '6_VALIDATED');
  } else if (selectedBadge === 'limited') {
    products = products.filter((p) => p.stage === '4_EARLY_PRODUCT');
  } else if (selectedBadge === 'trending') {
    products = products.filter((p) => p.validationScore.overall >= 80);
  }

  if (viewMode === 'trial') {
    products = products.filter((p) => p.hasTrialOption);
  }

  // Sort
  if (sortBy === 'new') {
    products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'points-low') {
    products.sort((a, b) => (a.trialPointsCost || 1) - (b.trialPointsCost || 1));
  } else if (sortBy === 'score') {
    products.sort((a, b) => b.validationScore.overall - a.validationScore.overall);
  }

  return (
    <div className="flex-1">
      {/* Smytten-style 2-column layout: Sidebar + Main */}
      <div className="flex items-start gap-4 px-6 lg:px-[8vw] py-6 justify-center w-full">
        {/* LEFT: Sticky Category Sidebar — Smytten 260px */}
        <aside className="hidden lg:flex flex-col w-[260px] max-h-screen overflow-y-auto sticky top-28 rounded-2xl smytten-card p-0" style={{ scrollbarWidth: 'none' }}>
          <div className="p-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <h3 className="font-bold text-[14px] text-black">Categories</h3>
          </div>

          <div className="flex flex-col">
            {SIDEBAR_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-3 px-4 py-3 text-[13px] cursor-pointer text-left transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-[#b9fff5]/40 text-[#0f1628] font-bold border-l-3 border-[#489cff]'
                    : 'text-gray-600 hover:bg-gray-50 font-normal'
                }`}
              >
                <cat.icon className="w-4 h-4 shrink-0" />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Stage Filter in Sidebar */}
          <div className="p-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
            <h3 className="font-bold text-[13px] text-black mb-2">Validation Stage</h3>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-[12px] focus:outline-none"
            >
              <option value="All">All Stages</option>
              {Object.keys(STAGES).map((stg) => (
                <option key={stg} value={stg}>
                  {STAGES[stg as keyof typeof STAGES].label}
                </option>
              ))}
            </select>
          </div>
        </aside>

        {/* RIGHT: Product Feed */}
        <div className="flex-1 flex flex-col min-w-0 space-y-4">
          {/* Trial/Shop Toggle + Sort + Filter Chips */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {/* Trial / Shop Toggle — Smytten-style pill toggle */}
            <div className="flex items-center rounded-full border border-gray-200 overflow-hidden">
              <button
                onClick={() => setViewMode('trial')}
                className={`px-4 py-2 text-[13px] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors ${
                  viewMode === 'trial' ? 'bg-[#b9fff5] text-[#0f1628]' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Gift className="w-3.5 h-3.5" /> Trial Samples
              </button>
              <button
                onClick={() => setViewMode('shop')}
                className={`px-4 py-2 text-[13px] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors ${
                  viewMode === 'shop' ? 'bg-[#b9fff5] text-[#0f1628]' : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                Full-Size Shop
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-[12px] bg-white focus:outline-none cursor-pointer"
              >
                <option value="popular">Popular</option>
                <option value="new">New Arrivals</option>
                <option value="points-low">Points: Low to High</option>
                <option value="score">Validation Score</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'All', value: 'All', icon: null },
              { label: 'Validated', value: 'validated', icon: ShieldCheck },
              { label: 'Limited Launch', value: 'limited', icon: Clock },
              { label: 'High Score (≥80)', value: 'trending', icon: Flame },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedBadge(filter.value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium cursor-pointer transition-colors ${
                  selectedBadge === filter.value
                    ? 'bg-[#489cff] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.icon && <filter.icon className="w-3 h-3" />}
                {filter.label}
              </button>
            ))}

            <span className="ml-auto text-[12px] text-gray-400">{products.length} products</span>
          </div>

          {/* Mobile Category Selector */}
          <div className="lg:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[13px] focus:outline-none"
            >
              {SIDEBAR_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Product Grid — 3 columns on desktop */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3">
              <Search className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-black">No Products Found</h3>
              <p className="text-[13px] text-gray-500 max-w-sm mx-auto">
                Try broadening your filters or search query.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStage('All');
                  setSelectedBadge('All');
                  setSearchQuery('');
                }}
                className="smytten-btn text-[13px]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Floating Trial Cart Bar — Smytten bottom bar */}
      {trialCart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1628] text-white py-3 px-6 flex items-center justify-between shadow-2xl animate-fadeInUp">
          <div className="flex items-center gap-4">
            <Gift className="w-5 h-5 text-[#b9fff5]" />
            <div>
              <span className="font-bold text-[14px]">{trialCart.length} item{trialCart.length > 1 ? 's' : ''} selected</span>
              <span className="text-gray-400 text-[12px] ml-3">{userTrialPoints}/{maxTrialPoints} points remaining</span>
            </div>
          </div>
          <button
            onClick={() => setIsTrialDrawerOpen(true)}
            className="smytten-btn text-[13px] py-2"
          >
            Proceed <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="flex-1 p-12 text-center text-gray-500 text-sm">Loading discovery feed...</div>}>
        <MarketplaceContent />
      </Suspense>
      <Footer />
    </div>
  );
}
