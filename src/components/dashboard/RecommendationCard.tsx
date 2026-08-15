import React from 'react';
import Link from 'next/link';
import { NextStepRecommendation } from '@/types';
import { Lightbulb, ArrowRight, TrendingUp } from 'lucide-react';

interface RecommendationCardProps {
  recommendation?: NextStepRecommendation;
  recommendations?: NextStepRecommendation[];
  onTabChange?: (tab: string) => void;
}

export function RecommendationCard({ recommendation, recommendations, onTabChange }: RecommendationCardProps) {
  const topRec = recommendation || (recommendations && recommendations.length > 0 ? recommendations[0] : null);

  if (!topRec) return null;

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0f1628] via-slate-900 to-[#0f1628] text-white p-6 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#489cff] text-xs font-extrabold uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Batch Forecast & Recommendation</span>
        </div>
        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30">
          Priority: {topRec.priority}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-extrabold text-white">{topRec.title}</h3>
        <p className="text-xs font-semibold text-emerald-400">{topRec.statusHeadline}</p>
      </div>

      <div className="space-y-2 pt-1 text-xs">
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
          <span className="font-bold text-gray-400 uppercase text-[10px]">Recommended Action</span>
          <p className="text-gray-200 leading-relaxed font-medium">
            {topRec.recommendationText}
          </p>
        </div>

        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
          <span className="font-bold text-gray-400 uppercase text-[10px]">Empirical Rationale</span>
          <p className="text-gray-300 leading-relaxed">
            {topRec.whyText}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
        <span className="text-gray-400 text-[11px] font-semibold">{topRec.metricsBasis}</span>
        <span className="px-3 py-1.5 rounded-xl bg-[#489cff] text-white font-extrabold text-xs shadow-md">
          {topRec.actionText}
        </span>
      </div>
    </div>
  );
}
