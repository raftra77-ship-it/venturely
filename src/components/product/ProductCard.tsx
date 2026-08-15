'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { StageBadge } from './StageBadge';
import { useRole } from '@/context/RoleContext';
import { Star, Flame, ShoppingBag, Truck, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export function ProductCard({ product }: { product: Product }) {
  const { addToValidationCart } = useRole();

  const cpr = product.cartPurchaseRate || 18.5;
  const batchClaimed = product.batchClaimedCount || 40;
  const batchTotal = product.limitedBatchSize || 50;
  const percentFilled = Math.min(Math.round((batchClaimed / batchTotal) * 100), 100);

  return (
    <div className="smytten-card group flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 bg-white rounded-3xl overflow-hidden border border-gray-200">
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="relative aspect-square bg-gray-50 overflow-hidden block">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Startup Type Badge — Top Left */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#0f1628] text-white shadow-md">
          {product.startupType}
        </div>

        {/* Validation Score / CPR Badge — Top Right */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold shadow-md">
          <Star className="w-3.5 h-3.5 fill-white text-white" />
          <span>{product.validationScore.overall}/100</span>
        </div>

        {/* Scarcity / FOMO Meter — Bottom Banner */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between text-white text-[11px]">
          <span className="font-semibold text-amber-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            {percentFilled}% Slots Filled ({batchClaimed}/{batchTotal})
          </span>
          <span className="text-gray-300">{product.currentViewersCount || 45} Viewing</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Brand & Stage */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold text-gray-500 truncate">{product.companyName}</span>
          <StageBadge stage={product.stage} />
        </div>

        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-extrabold text-black text-[15px] leading-snug line-clamp-2 hover:text-[#489cff] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Tagline / Problem */}
        <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
          {product.tagline}
        </p>

        {/* Logistics Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-600 font-medium">
          <Truck className="w-3.5 h-3.5 text-gray-400" />
          <span>{product.logisticsModel === 'VENTURELY_SUPPORTED' ? 'Venturely Logistics (₹49)' : 'Direct Merchant Fulfillment'}</span>
        </div>

        {/* Price & CPR Row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <div className="font-extrabold text-black text-lg">{formatCurrency(product.price)}</div>
            {product.expectedPrice && (
              <div className="text-[11px] text-gray-400 line-through">Retail: {formatCurrency(product.expectedPrice)}</div>
            )}
          </div>

          <div className="text-right">
            <div className="text-[10px] text-gray-400 font-bold uppercase">Cart Conversion</div>
            <div className="text-sm font-extrabold text-emerald-600">{cpr.toFixed(1)}% CPR</div>
          </div>
        </div>

        {/* Pre-Order CTA Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToValidationCart(product, true);
          }}
          className="smytten-btn w-full justify-center text-xs py-2.5 mt-1 bg-[#489cff] hover:bg-blue-600 text-white font-bold"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Pre-Order & Reserve Slot</span>
        </button>
      </div>
    </div>
  );
}
