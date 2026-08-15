import React from 'react';
import { ValidationScoreBreakdown } from '@/types';
import { getScoreInterpretation } from '@/lib/validation-engine';
import { ShieldCheck, Info, BarChart3 } from 'lucide-react';

interface ValidationScoreCardProps {
  score: ValidationScoreBreakdown;
}

export function ValidationScoreCard({ score }: ValidationScoreCardProps) {
  const interp = getScoreInterpretation(score.overall);

  const submetrics = [
    { label: 'Demand Signal', val: score.demand, weight: '30%', desc: 'Waitlist growth & traffic interest ratio' },
    { label: 'Conversion Funnel', val: score.conversion, weight: '25%', desc: 'Impression to checkout completion' },
    { label: 'Customer Satisfaction', val: score.customerSatisfaction, weight: '20%', desc: 'Rating average & refund rate' },
    { label: 'Unit Economics', val: score.unitEconomics, weight: '15%', desc: 'Sell-through margin & CAC efficiency' },
    { label: 'Market Momentum', val: score.momentum, weight: '10%', desc: 'Sales velocity per day & surge rate' },
  ];

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-lg">Proprietary Validation Score</h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${interp.badgeColor}`}>
              {interp.label}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-lg">
            Platform-generated validation signal derived from empirical customer behavior, conversion funnel efficiency, and unit economics.
          </p>
        </div>

        {/* Big Score Display */}
        <div className="flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-inner">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <div>
            <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Score</div>
            <div className="text-3xl font-extrabold font-mono text-white leading-none">
              {score.overall}<span className="text-slate-500 text-lg font-normal">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {submetrics.map((item) => (
          <div key={item.label} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700">{item.label}</span>
              <span className="text-[10px] text-slate-400 font-mono">Weight {item.weight}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono font-bold text-xl text-slate-900">{item.val}</span>
              <span className="text-[11px] font-mono text-slate-500">/ 100</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  item.val >= 80 ? 'bg-emerald-600' : item.val >= 60 ? 'bg-blue-600' : 'bg-amber-500'
                }`}
                style={{ width: `${item.val}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
