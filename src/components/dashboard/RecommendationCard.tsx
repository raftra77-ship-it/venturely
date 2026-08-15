import React from 'react';
import Link from 'next/link';
import { NextStepRecommendation } from '@/types';
import { Lightbulb, ArrowRight, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface RecommendationCardProps {
  recommendations: NextStepRecommendation[];
  onTabChange?: (tab: string) => void;
}

export function RecommendationCard({ recommendations, onTabChange }: RecommendationCardProps) {
  if (!recommendations || recommendations.length === 0) return null;

  const topRec = recommendations[0];

  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 shadow-xl border border-slate-800 space-y-4 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Core Recommendation Engine</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
          Priority: {topRec.priority}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold tracking-tight text-white">{topRec.title}</h3>
        <p className="text-sm font-mono text-emerald-400 font-medium">{topRec.statusHeadline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/80 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Recommended Action</span>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {topRec.recommendationText}
          </p>
        </div>

        <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700/80 space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Underlying Telemetry & Why</span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {topRec.whyText}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="font-mono text-slate-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
          <span>Based on: {topRec.metricsBasis}</span>
        </div>

        {topRec.actionRoute && onTabChange ? (
          <button
            onClick={() => {
              if (topRec.actionRoute?.includes('tab=')) {
                const tab = topRec.actionRoute.split('tab=')[1];
                onTabChange(tab);
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md"
          >
            <span>{topRec.actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium text-xs shadow-md">
            <span>{topRec.actionText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
