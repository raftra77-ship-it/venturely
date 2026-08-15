import React from 'react';
import { Product } from '@/types';
import { formatNumber } from '@/lib/format';
import { Filter, BarChart3 } from 'lucide-react';

export function FunnelChart({ product }: { product: Product }) {
  const impressions = product.adMetrics?.impressions || Math.round((product.views || 100) * 2.4);
  const views = product.views || 1;
  const waitlists = product.waitlistCount || 0;
  const addToCart = product.cartAdditionsCount || 420;
  const checkoutStarted = product.checkoutInitiatedCount || 160;
  const purchases = product.preOrdersCount || product.ordersCount || 0;
  const cpr = product.cartPurchaseRate || 18.5;

  const funnelSteps = [
    { label: 'Ad Impressions', count: impressions, pct: 100, color: 'bg-slate-800' },
    { label: 'Product Views', count: views, pct: Math.round((views / impressions) * 100), color: 'bg-slate-700' },
    { label: 'Waitlist / Interest', count: waitlists, pct: Math.round((waitlists / Math.max(views, 1)) * 100), color: 'bg-[#489cff]' },
    { label: 'Added to Cart', count: addToCart, pct: Math.round((addToCart / Math.max(views, 1)) * 100), color: 'bg-indigo-600' },
    { label: 'Checkout Started', count: checkoutStarted, pct: Math.round((checkoutStarted / Math.max(addToCart, 1)) * 100), color: 'bg-purple-600' },
    { label: 'Validated Pre-Order / Purchase', count: purchases, pct: Math.round((purchases / Math.max(checkoutStarted, 1)) * 100), color: 'bg-emerald-600' },
  ];

  return (
    <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#489cff]" />
          <h3 className="font-extrabold text-black text-base">Validation Conversion Funnel</h3>
        </div>
        <span className="text-xs text-gray-500 font-bold">
          Cart Purchase Rate (CPR): <strong className="text-emerald-600">{cpr.toFixed(1)}%</strong>
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {funnelSteps.map((step, idx) => {
          const widthPct = Math.max(25, 100 - idx * 13);
          return (
            <div key={step.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-700">{step.label}</span>
                <div className="flex items-center gap-3 font-semibold">
                  <span className="text-black font-extrabold">{formatNumber(step.count)} users</span>
                  <span className="text-gray-400 text-[11px]">({step.pct}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-xl h-7 p-1 flex items-center">
                <div
                  className={`h-full rounded-lg ${step.color} text-white font-extrabold text-[11px] flex items-center justify-end px-3 shadow-sm transition-all`}
                  style={{ width: `${widthPct}%` }}
                >
                  {formatNumber(step.count)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
