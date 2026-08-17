'use client';

import React, { useState } from 'react';
import { Product, MetaAdCampaign } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  Megaphone,
  Play,
  Pause,
  Sliders,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Eye,
  MousePointer,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

interface MetaAdsManagerProps {
  product: Product;
  onUpdateBudget: (newBudget: number) => void;
  onToggleStatus: () => void;
  onInjectTraffic: () => void;
}

export function MetaAdsManager({
  product,
  onUpdateBudget,
  onToggleStatus,
  onInjectTraffic,
}: MetaAdsManagerProps) {
  const { showToast } = useRole();
  const meta = product.adMetrics?.metaCampaign || {
    id: 'meta_cmp_active',
    productId: product.id,
    adPlatform: 'meta' as const,
    budget: product.adMetrics?.adSpend || 14999,
    dailyBudget: Math.round((product.adMetrics?.adSpend || 14999) / 7),
    status: 'ACTIVE' as const,
    targetAudience: product.targetAudience || 'Early adopters, fitness & tech consumers in tier 1 metros',
    creativeHeadline: product.tagline || '15-min Graphene Recovery Wearable',
    creativeImageUrl: product.images[0],
    pixelId: 'pix_meta_99412',
    impressions: product.adMetrics?.impressions || 184000,
    reach: Math.round((product.adMetrics?.impressions || 184000) * 0.8),
    clicks: product.adMetrics?.clicks || 7360,
    ctr: product.adMetrics?.ctr || 4.0,
    cpc: product.adMetrics?.cpc || 2.03,
    cpm: 81.5,
    add_to_cart: product.cartAdditionsCount || 680,
    purchases: product.preOrdersCount || 42,
    waitlist_signups: product.waitlistCount || 840,
    geoBreakdown: { Bengaluru: 36.4, Mumbai: 28.1, 'Delhi NCR': 22.5, Hyderabad: 8.5, Others: 4.5 },
    demographics: { '18-24': 18.0, '25-34': 58.0, '35-44': 19.0, '45+': 5.0 },
    startedAt: '2026-07-20T10:00:00Z',
  };

  const [budget, setBudget] = useState(meta.budget);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleBudgetSave = () => {
    onUpdateBudget(budget);
    showToast(`Ad budget updated to ${formatCurrency(budget)}. Meta campaign pacing refreshed.`);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      onInjectTraffic();
      setIsSimulating(false);
      showToast('Simulated +500 high-intent Meta ad visits! Validation telemetry updated.');
    }, 600);
  };

  const benchmarkLift = Math.round(((meta.ctr - 2.4) / 2.4) * 100);

  return (
    <div className="rounded-3xl bg-[#090d16] border border-white/15 p-6 sm:p-8 text-white space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-[#489cff] font-bold text-xs">
              Meta Marketing API
            </span>
            <span className="text-xs text-gray-400 font-mono">Pixel ID: {meta.pixelId}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Managed Test Ad Campaign</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleStatus}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              meta.status === 'ACTIVE'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {meta.status === 'ACTIVE' ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Campaign Live (Meta)</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Campaign Paused</span>
              </>
            )}
          </button>

          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 font-bold text-xs text-white transition-all shadow-lg shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
            <span>{isSimulating ? 'Injecting Traffic...' : 'Simulate Live Ad Clicks'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Meta Telemetry / Right Ad Creative Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Metrics & Budget Controller */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-blue-400" /> Impressions
              </div>
              <div className="text-xl font-black text-white">{formatNumber(meta.impressions)}</div>
              <div className="text-[10px] text-gray-400">Reach: {formatNumber(meta.reach)}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] text-gray-400 flex items-center gap-1">
                <MousePointer className="w-3.5 h-3.5 text-emerald-400" /> Verified Clicks
              </div>
              <div className="text-xl font-black text-white">{formatNumber(meta.clicks)}</div>
              <div className="text-[10px] text-emerald-300">₹{meta.cpc} Avg CPC</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] text-gray-400">Ad CTR vs Benchmark</div>
              <div className="text-xl font-black text-[#489cff]">{meta.ctr}%</div>
              <div className="text-[10px] text-emerald-400 font-bold">+{benchmarkLift}% vs 2.4% avg</div>
            </div>
          </div>

          {/* Budget Slider */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-gray-300">Test Ad Campaign Budget</span>
              <span className="text-[#489cff] text-sm">{formatCurrency(budget)}</span>
            </div>
            <input
              type="range"
              min={4999}
              max={49999}
              step={2500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#489cff]"
            />
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>₹4,999 (Starter)</span>
              <span>₹14,999 (Growth Recommended)</span>
              <span>₹49,999 (Scale)</span>
            </div>
            {budget !== meta.budget && (
              <button
                onClick={handleBudgetSave}
                className="mt-2 w-full py-2.5 rounded-xl bg-[#489cff] hover:bg-blue-600 font-bold text-xs text-white transition-all cursor-pointer"
              >
                Apply Budget Change
              </button>
            )}
          </div>

          {/* Geographic Distribution */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-3">
            <div className="text-xs font-bold text-gray-300">Geographic Traffic Breakdown</div>
            <div className="space-y-2">
              {Object.entries(meta.geoBreakdown).map(([city, percent]) => (
                <div key={city} className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{city}</span>
                    <span className="text-white font-bold">{percent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Ad Creative Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Live Meta Ad Creative Preview
          </div>

          <div className="rounded-2xl bg-white text-black p-4 space-y-3 shadow-xl max-w-sm mx-auto">
            {/* Meta Ad Header */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center font-bold text-xs">
                  V
                </div>
                <div>
                  <div className="font-bold text-black text-xs leading-none">{product.companyName}</div>
                  <div className="text-[10px] text-gray-500">Sponsored · Meta Ads</div>
                </div>
              </div>
              <span className="text-gray-400">•••</span>
            </div>

            {/* Creative Headline */}
            <p className="text-xs text-gray-800 font-medium leading-relaxed">
              {meta.creativeHeadline} 🔥 Zero-risk pre-order open now.
            </p>

            {/* Ad Image */}
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative">
              <img
                src={meta.creativeImageUrl || product.images[0]}
                alt="Ad Creative"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-bold">
                {product.startupType}
              </div>
            </div>

            {/* CTA bar */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold">VENTURELY.IO/V/{product.slug}</div>
                <div className="text-xs font-extrabold text-black">{product.name}</div>
              </div>
              <a
                href={`/v/${product.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 flex items-center gap-1"
              >
                <span>Learn More</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
            <strong>Target Audience:</strong> {meta.targetAudience}
          </div>
        </div>
      </div>
    </div>
  );
}
