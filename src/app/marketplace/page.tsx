'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/lib/data';
import { STARTUP_CATEGORIES } from '@/lib/constants';
import { useRole } from '@/context/RoleContext';
import { StartupCategory } from '@/types';
import { Search, Percent, ShieldCheck, Flame, SlidersHorizontal, ShoppingBag } from 'lucide-react';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [selectedStartupType, setSelectedStartupType] = useState<StartupCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<'score' | 'cpr' | 'price-low' | 'price-high'>('score');

  let products = getProducts();

  if (selectedStartupType !== 'ALL') {
    products = products.filter((p) => p.startupType === selectedStartupType);
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    products = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.companyName.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sortBy === 'score') {
    products.sort((a, b) => b.validationScore.overall - a.validationScore.overall);
  } else if (sortBy === 'cpr') {
    products.sort((a, b) => (b.cartPurchaseRate || 0) - (a.cartPurchaseRate || 0));
  } else if (sortBy === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0f1628] via-slate-900 to-indigo-950 text-white space-y-3 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
          <Percent className="w-4 h-4" /> 5% to 7% Platform Commission Model
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Verified Startup Marketplace</h1>
        <p className="text-gray-300 text-sm max-w-2xl">
          Discover products that passed Venturely validation benchmarks. Backed by verified Cart Purchase Rates (CPR), real founder unit economics, and 5-7% commission transparency.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        {/* Startup Type Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedStartupType('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedStartupType === 'ALL'
                ? 'bg-[#0f1628] text-white shadow-md'
                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Models
          </button>
          {STARTUP_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedStartupType(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStartupType === cat.key
                  ? 'bg-[#489cff] text-white shadow-md'
                  : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search marketplace..."
              className="pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 focus:outline-none focus:border-[#489cff]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-gray-50 font-bold focus:outline-none focus:border-[#489cff]"
          >
            <option value="score">Highest Validation Score</option>
            <option value="cpr">Highest Cart Purchase Rate (CPR)</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      <Suspense fallback={<div className="p-8 text-center">Loading Marketplace...</div>}>
        <MarketplaceContent />
      </Suspense>
      <Footer />
    </div>
  );
}
