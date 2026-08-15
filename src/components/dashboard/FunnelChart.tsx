import React from 'react';
import { Product } from '@/types';
import { formatNumber } from '@/lib/format';
import { ArrowDown, Filter } from 'lucide-react';

export function FunnelChart({ product }: { product: Product }) {
  const impressions = Math.round((product.views || 100) * 2.4);
  const views = product.views || 1;
  const interested = (product.waitlistCount || 0) + (product.interestVotes || 0);
  const addToCart = Math.round(product.ordersCount * 1.8 + product.preOrdersCount * 1.5 + 5);
  const checkoutStarted = Math.round(product.ordersCount * 1.25 + product.preOrdersCount * 1.1 + 2);
  const purchases = product.ordersCount || product.preOrdersCount || 0;

  const funnelSteps = [
    { label: 'Impressions', count: impressions, pct: 100, color: 'bg-slate-800' },
    { label: 'Product Views', count: views, pct: Math.round((views / impressions) * 100), color: 'bg-slate-700' },
    { label: 'Waitlist / Interest', count: interested, pct: Math.round((interested / Math.max(views, 1)) * 100), color: 'bg-blue-600' },
    { label: 'Added to Cart', count: addToCart, pct: Math.round((addToCart / Math.max(views, 1)) * 100), color: 'bg-indigo-600' },
    { label: 'Checkout Started', count: checkoutStarted, pct: Math.round((checkoutStarted / Math.max(addToCart, 1)) * 100), color: 'bg-purple-600' },
    { label: 'Purchase / Order', count: purchases, pct: Math.round((purchases / Math.max(checkoutStarted, 1)) * 100), color: 'bg-emerald-600' },
  ];

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Validation Conversion Funnel</h3>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Overall Conversion: <strong className="text-slate-900">{product.conversionRate}%</strong>
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {funnelSteps.map((step, idx) => {
          const widthPct = Math.max(25, 100 - idx * 13);
          return (
            <div key={step.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700">{step.label}</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-900 font-bold">{formatNumber(step.count)} users</span>
                  <span className="text-slate-500 text-[11px]">({step.pct}%)</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-lg h-7 p-1 flex items-center">
                <div
                  className={`h-full rounded-md ${step.color} text-white font-mono text-[11px] font-semibold flex items-center justify-end px-3 shadow-sm transition-all`}
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
