'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { StageBadge } from './StageBadge';
import { useRole } from '@/context/RoleContext';
import { Gift, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export function ProductCard({ product }: { product: Product }) {
  const { addToTrialCart } = useRole();
  const trialCost = product.trialPointsCost || 1;

  return (
    <div className="smytten-card group flex flex-col cursor-pointer hover:shadow-md transition-shadow">
      {/* Image — 1:1 aspect like Smytten trial products */}
      <Link href={`/product/${product.id}`} className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Trial Point Badge — top right mint green */}
        {product.hasTrialOption && (
          <div
            className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold"
            style={{ background: '#b9fff5', color: '#0f1628' }}
          >
            <Gift className="w-3 h-3" />
            <span>{trialCost} Pt{trialCost > 1 ? 's' : ''}</span>
          </div>
        )}

        {/* Validation Score badge */}
        {product.validationScore && product.validationScore.overall >= 75 && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span>{product.validationScore.overall}/100</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        {/* Brand + Stage */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-gray-500 font-normal truncate">{product.companyName}</span>
          <StageBadge stage={product.stage} />
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-black text-[14px] leading-tight line-clamp-2 hover:text-[#489cff] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Trial Size Description */}
        {product.trialSizeDescription && (
          <p className="text-[11px] text-gray-500 leading-snug line-clamp-1">
            Trial: {product.trialSizeDescription}
          </p>
        )}

        {/* Price Row */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-bold text-black text-[15px]">₹{formatCurrency(product.price)}</span>
          {product.discountPrice && (
            <span className="text-[12px] text-gray-400 line-through">₹{formatCurrency(product.discountPrice)}</span>
          )}
        </div>

        {/* CTA Button — Smytten blue pill */}
        {product.hasTrialOption && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToTrialCart(product);
            }}
            className="smytten-btn w-full justify-center text-[13px] py-2 mt-1"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Add to Trial ({trialCost} Pt{trialCost > 1 ? 's' : ''})</span>
          </button>
        )}
      </div>
    </div>
  );
}
