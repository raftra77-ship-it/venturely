'use client';

import React from 'react';
import { Product } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  Download,
  Printer,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  Star,
  Layers,
  X,
  ExternalLink,
} from 'lucide-react';
import { useRole } from '@/context/RoleContext';

interface ValidationReportModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ValidationReportModal({
  product,
  isOpen,
  onClose,
}: ValidationReportModalProps) {
  const { showToast } = useRole();

  if (!isOpen) return null;

  const score = product.validationScore?.overall || 91;
  const cpr = product.cartPurchaseRate || 22.4;
  const ctr = product.adMetrics?.ctr || 4.0;
  const preOrders = product.preOrdersCount || 42;
  const waitlists = product.waitlistCount || 840;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const data = {
      venturely_validation_certificate: {
        certificate_id: `VNT-VAL-${product.id.toUpperCase()}-2026`,
        generated_at: new Date().toISOString(),
        product_name: product.name,
        founder: product.founderName,
        company: product.companyName,
        stage: product.stage,
        business_stage: product.businessStage,
        inventory_mode: product.inventoryMode,
        validation_score: score,
        decision_status: product.decisionStatus || 'green',
        telemetry: {
          impressions: product.adMetrics?.impressions || 184000,
          verified_clicks: product.adMetrics?.clicks || 7360,
          click_through_rate: `${ctr}%`,
          cost_per_click: `₹${product.adMetrics?.cpc || 2.03}`,
          cart_purchase_rate: `${cpr}%`,
          total_pre_orders: preOrders,
          vip_waitlist_leads: waitlists,
          gross_pre_order_value: `₹${product.totalRevenue || 20958}`,
        },
        recommendations: {
          recommended_batch_units: product.recommendedBatchSize || 500,
          pricing_confidence: 'High (WTP score 92/100)',
          mass_tooling_readiness: 'Approved',
        },
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Venturely_Validation_Report_${product.slug}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported Validation Certificate (JSON)!');
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="w-full max-w-3xl bg-[#090d16] border border-white/20 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl relative my-8">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-sm uppercase tracking-wider text-white">
              Official Validation Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadJson}
              className="px-3 py-1.5 rounded-xl bg-[#489cff] hover:bg-blue-600 font-bold text-xs text-white flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-6">
          {/* Certificate Badge & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                Verified Market Demand Signal
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{product.name}</h2>
              <div className="text-xs text-gray-400">
                Created by <strong>{product.founderName}</strong> ({product.companyName})
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
              <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Validation Score</div>
              <div className="text-3xl font-black text-emerald-400">{score}<span className="text-sm text-gray-400">/100</span></div>
              <div className="text-[10px] text-emerald-300 font-semibold mt-0.5">Scale-Ready Status</div>
            </div>
          </div>

          {/* Key Validation Telemetry Matrix */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-gray-300">Empirical Test Telemetry Matrix</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-gray-400">Cart Purchase Rate</div>
                <div className="text-base font-extrabold text-emerald-400">{cpr}% CPR</div>
                <div className="text-[9px] text-gray-400">Benchmark: 10.0%</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-gray-400">Ad Click-Through</div>
                <div className="text-base font-extrabold text-[#489cff]">{ctr}% CTR</div>
                <div className="text-[9px] text-blue-300">+75% lift</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-gray-400">Pre-Order Units</div>
                <div className="text-base font-extrabold text-white">{preOrders} Units</div>
                <div className="text-[9px] text-gray-400">{formatCurrency(product.totalRevenue || 20958)} gross</div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-[10px] text-gray-400">Waitlist Audience</div>
                <div className="text-base font-extrabold text-purple-400">{waitlists} Leads</div>
                <div className="text-[9px] text-gray-400">92% WTP Index</div>
              </div>
            </div>
          </div>

          {/* Executive Assessment */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Executive Launch & Manufacturing Recommendation</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Product demonstrates confirmed product-market fit with high pre-order conversion velocity.
              Customer Acquisition Cost (₹{product.cac || 120}) generates sustainable contribution margins at the current ₹{product.price} price point.
            </p>
            <div className="pt-1 text-emerald-300 font-semibold">
              ✓ Recommended Primary Production Batch: <strong>{product.recommendedBatchSize || 500} Units</strong>
            </div>
          </div>

          {/* Verification Code Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-gray-500 pt-2 border-t border-white/10">
            <div>Verification Hash: <span className="font-mono text-gray-400">SHA256: 8f9b4...e81c</span></div>
            <div>Issued by Venturely Validation Engine (Bangalore, India)</div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 font-bold text-xs text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
