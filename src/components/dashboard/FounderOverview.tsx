'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, Order, LogisticsModel, ValidationPackageTier } from '@/types';
import { useRole } from '@/context/RoleContext';
import { getProducts, getOrders, updateProduct } from '@/lib/data';
import { ValidationScoreCard } from './ValidationScoreCard';
import { DecisionGateCard } from './DecisionGateCard';
import { MetaAdsManager } from './MetaAdsManager';
import { ValidationReportModal } from './ValidationReportModal';
import { FunnelChart } from './FunnelChart';
import { StageBadge } from '../product/StageBadge';
import { formatCurrency, formatNumber } from '@/lib/format';
import { VALIDATION_PACKAGE_TIERS, LOGISTICS_OPTIONS } from '@/lib/constants';
import { calculateValidationScore, getDecisionStatus } from '@/lib/validation-engine';
import {
  TrendingUp,
  Eye,
  Users,
  ShoppingBag,
  DollarSign,
  Megaphone,
  Award,
  Box,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Truck,
  Percent,
  Clock,
  Zap,
  BarChart3,
  Layers,
  Settings,
  Sparkles,
  ExternalLink,
  Download,
  Activity,
  FileText,
} from 'lucide-react';

export function FounderOverview() {
  const { activeProductId, setActiveProductId, showToast, refreshProducts } = useRole();
  const [activeTab, setActiveTab] = useState<'analytics' | 'decisiongate' | 'metaads' | 'orders' | 'logistics' | 'inventory'>('decisiongate');
  const [productsList, setProductsList] = useState<Product[]>(getProducts());
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const currentProduct = productsList.find((p) => p.id === activeProductId) || productsList[0];
  const productOrders = getOrders().filter((o) => o.productId === currentProduct?.id);

  if (!currentProduct) {
    return <div className="p-8 text-center text-white">No products found. Create one first.</div>;
  }

  const handleLogisticsToggle = (mode: LogisticsModel) => {
    const updated = updateProduct(currentProduct.id, { logisticsModel: mode });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
      showToast(
        `Logistics mode updated to ${
          mode === 'VENTURELY_SUPPORTED' ? 'Shiprocket Partner Logistics' : 'Merchant Self-Fulfillment'
        }`
      );
    }
  };

  const handleUpdateAdBudget = (newBudget: number) => {
    const prevMeta = currentProduct.adMetrics?.metaCampaign;
    const updated = updateProduct(currentProduct.id, {
      adMetrics: {
        ...currentProduct.adMetrics,
        adSpend: newBudget,
        metaCampaign: prevMeta ? { ...prevMeta, budget: newBudget, dailyBudget: Math.round(newBudget / 7) } : undefined,
      },
    });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
    }
  };

  const handleToggleAdStatus = () => {
    const prevMeta = currentProduct.adMetrics?.metaCampaign;
    const nextStatus = prevMeta?.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    const updated = updateProduct(currentProduct.id, {
      adMetrics: {
        ...currentProduct.adMetrics,
        metaCampaign: prevMeta ? { ...prevMeta, status: nextStatus } : undefined,
      },
    });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
      showToast(`Meta Ads campaign is now ${nextStatus}!`);
    }
  };

  const handleInjectTraffic = () => {
    const newViews = currentProduct.views + 500;
    const newClicks = (currentProduct.adMetrics?.clicks || 7360) + 120;
    const newPreOrders = (currentProduct.preOrdersCount || 42) + 8;
    const newWaitlist = (currentProduct.waitlistCount || 840) + 24;
    const newCartAdds = (currentProduct.cartAdditionsCount || 680) + 32;

    const newScore = calculateValidationScore({
      ...currentProduct,
      views: newViews,
      uniqueVisitors: newClicks,
      preOrdersCount: newPreOrders,
      waitlistCount: newWaitlist,
      cartAdditionsCount: newCartAdds,
    });

    const updated = updateProduct(currentProduct.id, {
      views: newViews,
      uniqueVisitors: newClicks,
      preOrdersCount: newPreOrders,
      ordersCount: newPreOrders,
      waitlistCount: newWaitlist,
      cartAdditionsCount: newCartAdds,
      cartPurchaseRate: Math.round((newPreOrders / newCartAdds) * 1000) / 10,
      totalRevenue: newPreOrders * currentProduct.price,
      validationScore: newScore,
      decisionStatus: getDecisionStatus(newScore.overall),
    });

    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
    }
  };

  const handleLaunchToMarketplace = () => {
    const updated = updateProduct(currentProduct.id, {
      isGraduatedToMarketplace: true,
      stage: '6_MARKETPLACE',
      commissionRate: 6,
    });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
      showToast(
        `🎉 Graduation Approved! ${currentProduct.name} is now LIVE in Venturely Marketplace with 6% platform commission.`
      );
    }
  };

  const handleRetest = () => {
    showToast('A/B Re-Test initiated: Refreshing Meta ad set targeting and testing variant price points.');
  };

  const cpr = currentProduct.cartPurchaseRate || 22.4;
  const sellThrough =
    currentProduct.inventoryTotal > 0
      ? Math.round((currentProduct.inventorySold / currentProduct.inventoryTotal) * 100)
      : 0;

  return (
    <div className="space-y-8 font-sans">
      {/* Top Header & Product Selector */}
      <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-4">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            className="w-16 h-16 object-cover rounded-2xl border border-white/10 shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold text-white">{currentProduct.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#489cff]/20 text-[#489cff] border border-[#489cff]/30">
                {currentProduct.startupType} Startup
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white/10 text-gray-300">
                Mode: {currentProduct.inventoryMode === 'zero' ? 'Zero-Inventory Pre-Order' : 'Batch Production'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{currentProduct.companyName}</span>
              <span>·</span>
              <a
                href={`/v/${currentProduct.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#489cff] font-bold hover:underline flex items-center gap-1"
              >
                <span>Live Micro-Landing Page (/v/{currentProduct.slug})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons & Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={currentProduct.id}
            onChange={(e) => setActiveProductId(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs font-bold text-white focus:outline-none focus:border-[#489cff] cursor-pointer"
          >
            {productsList.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                {p.name.substring(0, 32)}...
              </option>
            ))}
          </select>

          <Link
            href="/founder/new"
            className="px-4 py-2.5 rounded-xl bg-[#489cff] hover:bg-blue-600 font-extrabold text-xs text-white transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/25"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Validation</span>
          </Link>
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
        <button
          onClick={() => setActiveTab('decisiongate')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'decisiongate'
              ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Decision Gate & Score</span>
        </button>

        <button
          onClick={() => setActiveTab('metaads')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'metaads'
              ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Meta Ads Manager</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Conversion Telemetry</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Pre-Orders & Revenue ({productOrders.length})</span>
        </button>

        <Link
          href="/founder/saas"
          className="ml-auto px-4 py-2.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-extrabold transition-all flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Scale SaaS Hub (CRM & Retention)</span>
        </Link>
      </div>

      {/* TAB CONTENT: DECISION GATE */}
      {activeTab === 'decisiongate' && (
        <div className="space-y-8 animate-fadeIn">
          <DecisionGateCard
            product={currentProduct}
            onExportReport={() => setIsReportModalOpen(true)}
            onLaunchMarketplace={handleLaunchToMarketplace}
            onRetest={handleRetest}
          />
        </div>
      )}

      {/* TAB CONTENT: META ADS */}
      {activeTab === 'metaads' && (
        <div className="space-y-8 animate-fadeIn">
          <MetaAdsManager
            product={currentProduct}
            onUpdateBudget={handleUpdateAdBudget}
            onToggleStatus={handleToggleAdStatus}
            onInjectTraffic={handleInjectTraffic}
          />
        </div>
      )}

      {/* TAB CONTENT: CONVERSION TELEMETRY */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 text-white space-y-1">
              <div className="text-xs text-gray-400">Total Validated Visitors</div>
              <div className="text-2xl font-black">{formatNumber(currentProduct.views)}</div>
              <div className="text-[10px] text-blue-400">Verified Meta Ad Traffic</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 text-white space-y-1">
              <div className="text-xs text-gray-400">Cart Purchase Rate (CPR)</div>
              <div className="text-2xl font-black text-emerald-400">{cpr}%</div>
              <div className="text-[10px] text-emerald-300 font-semibold">+124% vs 10% Benchmark</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 text-white space-y-1">
              <div className="text-xs text-gray-400">Pre-Order Units & Revenue</div>
              <div className="text-2xl font-black text-white">{currentProduct.preOrdersCount} Units</div>
              <div className="text-[10px] text-gray-400">{formatCurrency(currentProduct.totalRevenue)} Gross</div>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-white/10 text-white space-y-1">
              <div className="text-xs text-gray-400">VIP Waitlist Leads</div>
              <div className="text-2xl font-black text-purple-400">{currentProduct.waitlistCount} Leads</div>
              <div className="text-[10px] text-purple-300">High Intent Signups</div>
            </div>
          </div>

          {/* Full Funnel Chart */}
          <FunnelChart product={currentProduct} />
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="rounded-3xl bg-slate-900 border border-white/10 p-6 space-y-4 text-white shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-extrabold">Pre-Order Validation Ledger</h2>
              <span className="text-xs text-emerald-400 font-bold">
                Platform Commission Rate: 6%
              </span>
            </div>

            {productOrders.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">
                No orders yet for this product. Launch Meta Ads to drive traffic.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-gray-400 uppercase font-bold border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Address</th>
                      <th className="py-3 px-4">Gross Amount</th>
                      <th className="py-3 px-4">6% Fee</th>
                      <th className="py-3 px-4">Net Payout</th>
                      <th className="py-3 px-4">Logistics</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {productOrders.map((ord) => {
                      const comm = Math.round(ord.amount * 0.06);
                      const net = ord.amount - comm;
                      return (
                        <tr key={ord.id} className="hover:bg-white/5">
                          <td className="py-3 px-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{ord.customerName}</div>
                            <div className="text-[10px] text-gray-500">{ord.customerEmail}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-gray-400">{ord.shippingAddress}</td>
                          <td className="py-3 px-4 font-bold text-white">{formatCurrency(ord.amount)}</td>
                          <td className="py-3 px-4 text-rose-400 font-bold">{formatCurrency(comm)}</td>
                          <td className="py-3 px-4 font-bold text-emerald-400">{formatCurrency(net)}</td>
                          <td className="py-3 px-4">
                            <span className="text-[11px] font-mono text-blue-400">
                              {ord.trackingNumber ? `Shiprocket: ${ord.trackingNumber}` : 'Standard'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Validation Report Modal */}
      <ValidationReportModal
        product={currentProduct}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
