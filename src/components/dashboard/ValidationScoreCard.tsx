import React from 'react';
import { ValidationScoreBreakdown, ProductStage } from '@/types';
import { getScoreInterpretation } from '@/lib/validation-engine';
import { ShieldCheck, Flame, BarChart3 } from 'lucide-react';

interface ValidationScoreCardProps {
  score: ValidationScoreBreakdown;
  stage?: ProductStage;
}

export function ValidationScoreCard({ score }: ValidationScoreCardProps) {
  const interp = getScoreInterpretation(score.overall);

  const submetrics = [
    { label: 'Demand Signal', val: score.demand, weight: '25%', desc: 'Waitlist growth & traffic interest ratio' },
    { label: 'Conversion & CPR', val: score.conversion, weight: '25%', desc: 'Cart purchase rate & funnel efficiency' },
    { label: 'Unit Economics', val: score.unitEconomics, weight: '20%', desc: 'CAC ratio & batch sell-through' },
    { label: 'Customer Sentiment', val: score.customerSatisfaction, weight: '15%', desc: 'Rating average & refund intent' },
    { label: 'FOMO & Urgency', val: score.fomoUrgency || 85, weight: '15%', desc: 'Batch slot fill rate & viewer surge' },
  ];

  return (
    <div className="rounded-3xl bg-white border border-gray-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-black text-lg">Proprietary Validation Score</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${interp.badgeColor}`}>
              {interp.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 max-w-lg">
            Calculated in real-time based on Cart Purchase Rates (CPR), managed ad campaign CAC, FOMO urgency signals, and unit economics.
          </p>
        </div>

        {/* Big Score Display */}
        <div className="flex items-center gap-3 bg-[#0f1628] text-white px-5 py-3 rounded-2xl shadow-md">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Overall Score</div>
            <div className="text-3xl font-extrabold text-white leading-none">
              {score.overall}<span className="text-gray-400 text-lg font-normal">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {submetrics.map((item) => (
          <div key={item.label} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800">{item.label}</span>
              <span className="text-[10px] text-gray-400 font-bold">{item.weight}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-extrabold text-xl text-black">{item.val}</span>
              <span className="text-[11px] text-gray-400">/ 100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  item.val >= 80 ? 'bg-emerald-600' : item.val >= 60 ? 'bg-[#489cff]' : 'bg-amber-500'
                }`}
                style={{ width: `${item.val}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-500 line-clamp-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
