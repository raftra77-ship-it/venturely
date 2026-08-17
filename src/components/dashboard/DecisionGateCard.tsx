'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { getDecisionStatus, getDecisionGateInterpretation } from '@/lib/validation-engine';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  ShieldCheck,
  Rocket,
  Download,
  RefreshCw,
  TrendingUp,
  Award,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

interface DecisionGateCardProps {
  product: Product;
  onExportReport: () => void;
  onLaunchMarketplace: () => void;
  onRetest: () => void;
}

export function DecisionGateCard({
  product,
  onExportReport,
  onLaunchMarketplace,
  onRetest,
}: DecisionGateCardProps) {
  const { showToast } = useRole();
  const [isGraduating, setIsGraduating] = useState(false);

  const score = product.validationScore?.overall || 84;
  const status = product.decisionStatus || getDecisionStatus(score);
  const gateInfo = getDecisionGateInterpretation(status, score);

  const handleLaunch = () => {
    setIsGraduating(true);
    setTimeout(() => {
      setIsGraduating(false);
      onLaunchMarketplace();
    }, 600);
  };

  return (
    <div className="rounded-3xl bg-[#090d16] border border-white/15 p-6 sm:p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none ${
          status === 'green'
            ? 'bg-emerald-500'
            : status === 'yellow'
            ? 'bg-amber-500'
            : 'bg-rose-500'
        }`}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${gateInfo.dotColor} animate-pulse`} />
            <span className="text-xs font-black uppercase tracking-wider text-gray-300">
              Venturely Decision Gate & Benchmark
            </span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>{gateInfo.headline}</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-2xl border text-center ${gateInfo.badge}`}>
            <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">Validation Score</div>
            <div className="text-2xl font-black">{score}<span className="text-sm font-normal text-gray-400">/100</span></div>
          </div>
        </div>
      </div>

      {/* Score Breakdown Radar Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="text-[11px] text-gray-400">Cart Purchase Rate</div>
          <div className="text-lg font-black text-emerald-400">{product.cartPurchaseRate || 18.5}% CPR</div>
          <div className="text-[10px] text-gray-400">Benchmark: 10.0%</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="text-[11px] text-gray-400">Ad CTR vs Industry</div>
          <div className="text-lg font-black text-[#489cff]">{product.adMetrics?.ctr || 4.2}% CTR</div>
          <div className="text-[10px] text-blue-300">+75% lift vs avg</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="text-[11px] text-gray-400">Waitlist Velocity</div>
          <div className="text-lg font-black text-purple-400">{product.waitlistCount} Leads</div>
          <div className="text-[10px] text-gray-400">92% WTP Index</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <div className="text-[11px] text-gray-400">Batch Manufacturing Signal</div>
          <div className="text-lg font-black text-amber-400">{product.recommendedBatchSize || 500} Units</div>
          <div className="text-[10px] text-emerald-300">Production Ready</div>
        </div>
      </div>

      {/* Decision Summary Text */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Algorithmic Recommendation:</span>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {gateInfo.summary}
        </p>
        <p className="text-xs text-[#489cff] font-semibold">
          {gateInfo.recommendation}
        </p>
      </div>

      {/* Action Gates Paths */}
      <div className="pt-2">
        <div className="text-xs uppercase font-extrabold tracking-wider text-gray-400 mb-3">
          Select Your Launch Strategy:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PATH A: Own Brand Store (Export Data) */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-white/15 space-y-4 hover:border-white/30 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                  Path A: Own Brand Launch
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                  Zero Platform Fee
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">Export Validated Telemetry</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Take your validated customer leads, pre-order intents, and ad metrics to launch independently on Shopify or your custom store.
              </p>
            </div>

            <button
              onClick={onExportReport}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Download Validation Certificate (PDF/JSON)</span>
            </button>
          </div>

          {/* PATH B: Venturely Curated Marketplace */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900 border border-[#489cff]/40 space-y-4 shadow-xl flex flex-col justify-between relative">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  Path B: Marketplace Launchpad
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  6% Platform Fee
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">Launch to Curated Marketplace</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Graduate to Venturely's curated shopper marketplace with instant checkout, Shiprocket partner logistics, and automated commission settlement.
              </p>
            </div>

            <button
              onClick={handleLaunch}
              disabled={isGraduating || product.isGraduatedToMarketplace}
              className={`w-full py-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                product.isGraduatedToMarketplace
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-[#489cff] hover:bg-blue-600 text-white shadow-blue-500/25 cursor-pointer'
              }`}
            >
              {product.isGraduatedToMarketplace ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Already Live on Marketplace</span>
                </>
              ) : isGraduating ? (
                <span>Publishing to Marketplace...</span>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>1-Click Launch to Marketplace</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* PATH C: Re-test Option if iterating */}
        {status !== 'green' && (
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-gray-400">Want to test an alternative price point or video creative?</span>
            <button
              onClick={onRetest}
              className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Configure A/B Re-Test</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
