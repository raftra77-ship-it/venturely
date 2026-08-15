'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, Order, LogisticsModel, ValidationPackageTier } from '@/types';
import { useRole } from '@/context/RoleContext';
import { getProducts, getOrders, updateProduct } from '@/lib/data';
import { ValidationScoreCard } from './ValidationScoreCard';
import { RecommendationCard } from './RecommendationCard';
import { FunnelChart } from './FunnelChart';
import { StageBadge } from '../product/StageBadge';
import { formatCurrency, formatNumber } from '@/lib/format';
import { VALIDATION_PACKAGE_TIERS, LOGISTICS_OPTIONS } from '@/lib/constants';
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
} from 'lucide-react';

export function FounderOverview() {
  const { activeProductId, setActiveProductId, showToast, refreshProducts } = useRole();
  const [activeTab, setActiveTab] = useState<'analytics' | 'adpackages' | 'fomo' | 'logistics' | 'inventory'>('analytics');
  const [productsList, setProductsList] = useState<Product[]>(getProducts());

  const currentProduct = productsList.find((p) => p.id === activeProductId) || productsList[0];
  const productOrders = getOrders().filter(o => o.productId === currentProduct?.id);

  if (!currentProduct) {
    return <div className="p-8 text-center">No products found. Create one first.</div>;
  }

  const handleLogisticsToggle = (mode: LogisticsModel) => {
    const updated = updateProduct(currentProduct.id, { logisticsModel: mode });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
      showToast(`Logistics mode updated to ${mode === 'VENTURELY_SUPPORTED' ? 'Venturely Platform Logistics' : 'Merchant Self-Fulfillment'}`);
    }
  };

  const handleActivateAdPackage = (tier: ValidationPackageTier) => {
    const pkg = VALIDATION_PACKAGE_TIERS[tier];
    const updated = updateProduct(currentProduct.id, {
      adMetrics: {
        activePackage: tier,
        adSpend: pkg.adSpendAllocation,
        impressions: pkg.targetVisitors * 12,
        clicks: pkg.targetVisitors,
        ctr: 4.2,
        cpc: Math.round((pkg.adSpendAllocation / pkg.targetVisitors) * 10) / 10,
        cac: currentProduct.cac || 480,
        roas: 3.8,
      },
    });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
      showToast(`Activated ${pkg.packageName}! Managed ads campaign initiated.`);
    }
  };

  const handleGraduateRequest = () => {
    const updated = updateProduct(currentProduct.id, {
      isGraduatedToMarketplace: true,
      stage: '6_MARKETPLACE',
      commissionRate: 6,
    });
    if (updated) {
      setProductsList(getProducts());
      refreshProducts();
      showToast(`Graduation approved! ${currentProduct.name} is now listed in Curated Marketplace with 6% commission.`);
    }
  };

  const cpr = currentProduct.cartPurchaseRate || 18.5;
  const sellThrough = currentProduct.inventoryTotal > 0 ? Math.round((currentProduct.inventorySold / currentProduct.inventoryTotal) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header & Product Switcher Bar */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            className="w-16 h-16 object-cover rounded-2xl border border-gray-200"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold text-black">{currentProduct.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0f1628] text-white">
                {currentProduct.startupType}
              </span>
              <StageBadge stage={currentProduct.stage} />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Company: <strong className="text-black">{currentProduct.companyName}</strong> | Founder: {currentProduct.founderName}
            </p>
          </div>
        </div>

        {/* Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-gray-400 uppercase">Select Startup</label>
            <select
              value={currentProduct.id}
              onChange={(e) => setActiveProductId(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-semibold bg-gray-50 text-black focus:outline-none focus:border-[#489cff]"
            >
              {productsList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.startupType} • {p.stage.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/founder/new"
            className="smytten-btn text-xs py-2 px-3.5 flex items-center gap-1 bg-[#489cff] hover:bg-blue-600 self-end"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {/* Primary Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Cart Purchase Rate */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Cart Purchase Rate (CPR)</span>
            <BarChart3 className="w-4 h-4 text-[#489cff]" />
          </div>
          <div className="text-2xl font-extrabold text-black">{cpr.toFixed(1)}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Target &gt; 12.0% Met
          </div>
        </div>

        {/* Metric 2: Managed Ad Spend & CAC */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Ad CAC & Spend</span>
            <Megaphone className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-black">{formatCurrency(currentProduct.adMetrics?.cac || currentProduct.cac)}</div>
          <div className="text-[11px] text-gray-500">
            Ad Budget: {formatCurrency(currentProduct.adMetrics?.adSpend || 14999)} ({currentProduct.adMetrics?.activePackage || 'GROWTH'})
          </div>
        </div>

        {/* Metric 3: Batch Manufacturing Signal */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Batch Signal</span>
            <Box className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">{currentProduct.recommendedBatchSize || 500} Units</div>
          <div className="text-[11px] text-gray-500">Breakeven: {currentProduct.breakevenUnits || 120} units</div>
        </div>

        {/* Metric 4: Logistics Model */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200 space-y-1 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Logistics Status</span>
            <Truck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-base font-extrabold text-black truncate">
            {currentProduct.logisticsModel === 'VENTURELY_SUPPORTED' ? 'Platform Logistics (₹49)' : 'Merchant Self-Logistics'}
          </div>
          <div className="text-[11px] text-[#489cff] font-semibold">
            {currentProduct.shippingEstimateDays || '3-4 Days Estimate'}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-px overflow-x-auto">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#489cff]" />
          <span>Cart Conversion & Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('adpackages')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'adpackages'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <Megaphone className="w-4 h-4 text-purple-600" />
          <span>Managed Validation Ads</span>
        </button>

        <button
          onClick={() => setActiveTab('fomo')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'fomo'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Waitlist & High-FOMO Engine</span>
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'logistics'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <Truck className="w-4 h-4 text-emerald-600" />
          <span>Logistics & Dispatch Mode</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'inventory'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <Percent className="w-4 h-4 text-[#489cff]" />
          <span>Batch Forecast & 5-7% Commission</span>
        </button>
      </div>

      {/* Tab 1: Cart Conversion & Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <ValidationScoreCard score={currentProduct.validationScore} stage={currentProduct.stage} />
            <FunnelChart product={currentProduct} />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="font-extrabold text-black text-base">Key Recommendations</h3>
              <div className="space-y-4">
                {currentProduct.recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} recommendation={rec} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Managed Validation Ads */}
      {activeTab === 'adpackages' && (
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-black">Managed Meta & Google Ad Campaigns</h3>
                <p className="text-xs text-gray-500">Run targeted advertising to test real audience willingness-to-pay.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-xs">
                Active Package: {currentProduct.adMetrics?.activePackage || 'GROWTH'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(VALIDATION_PACKAGE_TIERS).map((pkg) => {
                const isActive = currentProduct.adMetrics?.activePackage === pkg.tier;
                return (
                  <div
                    key={pkg.tier}
                    className={`p-6 rounded-2xl border flex flex-col justify-between space-y-5 transition-all ${
                      isActive ? 'border-[#489cff] bg-blue-50/40 shadow-md ring-2 ring-[#489cff]/20' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-black text-base">{pkg.packageName}</h4>
                        {isActive && <span className="text-[10px] font-extrabold bg-[#489cff] text-white px-2 py-0.5 rounded-full">ACTIVE</span>}
                      </div>
                      <div className="text-2xl font-extrabold text-black">{formatCurrency(pkg.price)}</div>
                      <div className="text-xs text-gray-500 font-medium">Ad Credit Allocation: <strong className="text-emerald-600">{formatCurrency(pkg.adSpendAllocation)}</strong></div>
                      <p className="text-xs text-gray-600">Targeting ~{formatNumber(pkg.targetVisitors)} live visitors across social & search channels.</p>
                    </div>

                    <button
                      onClick={() => handleActivateAdPackage(pkg.tier)}
                      disabled={isActive}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#0f1628] hover:bg-black text-white'
                      }`}
                    >
                      {isActive ? 'Package Active & Tracking' : `Activate ${pkg.packageName}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Waitlist & High-FOMO Engine */}
      {activeTab === 'fomo' && (
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-black">Waitlist & FOMO Urgency Controls</h3>
                <p className="text-xs text-gray-500">Configure limited batch meters, price lock timers, and viral referral ranks.</p>
              </div>
              <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Limited Batch Counter */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                <div className="font-bold text-amber-900 text-sm">Limited Batch Counter</div>
                <div className="text-2xl font-extrabold text-amber-950">
                  {currentProduct.batchClaimedCount} / {currentProduct.limitedBatchSize} Slots Filled
                </div>
                <div className="w-full bg-amber-200 rounded-full h-2">
                  <div
                    className="bg-amber-600 h-2 rounded-full"
                    style={{ width: `${Math.min((currentProduct.batchClaimedCount / currentProduct.limitedBatchSize) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-amber-800">Scarcity signal boosts checkout intent by 32%.</p>
              </div>

              {/* Price Lock Timer */}
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
                <div className="font-bold text-blue-900 text-sm">Price-Lock Countdown</div>
                <div className="text-2xl font-extrabold text-blue-950">48 Hours Remaining</div>
                <p className="text-xs text-blue-800">Pre-order price locked at {formatCurrency(currentProduct.price)}. Retail price: {formatCurrency(currentProduct.expectedPrice || currentProduct.price * 1.3)}.</p>
              </div>

              {/* Live Viewers Surge */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="font-bold text-emerald-900 text-sm">Live Viewer Surge</div>
                <div className="text-2xl font-extrabold text-emerald-950">{currentProduct.currentViewersCount} Active Viewers</div>
                <p className="text-xs text-emerald-800">Live social proof badge active on product landing page.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Logistics & Dispatch Mode */}
      {activeTab === 'logistics' && (
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-xl font-extrabold text-black">Fulfillment & Logistics Setup</h3>
              <p className="text-xs text-gray-500">Choose how your validation pre-orders & prototype samples are shipped.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: Self Logistics */}
              <div
                onClick={() => handleLogisticsToggle('SELF_FULFILLED')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-4 ${
                  currentProduct.logisticsModel === 'SELF_FULFILLED'
                    ? 'border-[#489cff] bg-blue-50/40 ring-2 ring-[#489cff]/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-black text-base">Merchant Self-Fulfillment</h4>
                  {currentProduct.logisticsModel === 'SELF_FULFILLED' && (
                    <CheckCircle2 className="w-5 h-5 text-[#489cff]" />
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  You handle packaging and ship directly using your own courier account (Shiprocket, Delhivery, BlueDart, etc.).
                </p>
                <span className="inline-block text-xs font-bold text-emerald-600">₹0 Platform Logistics Fee</span>
              </div>

              {/* Option 2: Venturely Platform Logistics */}
              <div
                onClick={() => handleLogisticsToggle('VENTURELY_SUPPORTED')}
                className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-4 ${
                  currentProduct.logisticsModel === 'VENTURELY_SUPPORTED'
                    ? 'border-[#489cff] bg-blue-50/40 ring-2 ring-[#489cff]/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-black text-base">Venturely Platform Logistics</h4>
                  {currentProduct.logisticsModel === 'VENTURELY_SUPPORTED' && (
                    <CheckCircle2 className="w-5 h-5 text-[#489cff]" />
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Use Venturely integrated dispatch. Automated shipping label generation, doorstep pickup scheduling & live tracking.
                </p>
                <div className="text-xs font-bold text-purple-700">
                  Surface: ₹49/unit • Express Air: ₹89/unit
                </div>
              </div>
            </div>

            {/* Orders Dispatch Simulator */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <h4 className="font-bold text-black text-sm">Recent Validation Orders ({productOrders.length})</h4>
              {productOrders.length > 0 ? (
                <div className="space-y-3">
                  {productOrders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-black">Order #{ord.orderNumber} — {ord.customerName}</div>
                        <div className="text-gray-500">{ord.shippingAddress} • Mode: {ord.logisticsModel}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-[#489cff]">{formatCurrency(ord.amount)}</span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No orders received yet for this product.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Batch Forecast & 5-7% Commission Marketplace */}
      {activeTab === 'inventory' && (
        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-black">Batch Manufacturing Signal & Marketplace Graduation</h3>
                <p className="text-xs text-gray-500">Algorithmic demand recommendation and 5-7% commission marketplace onboarding.</p>
              </div>
              {currentProduct.isGraduatedToMarketplace ? (
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Graduated to Marketplace (6% Fee)
                </span>
              ) : (
                <button
                  onClick={handleGraduateRequest}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-all shadow-md"
                >
                  Graduate to Marketplace (5-7% Fee)
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Batch Recommendation Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-[#0f1628] text-white space-y-3">
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Batch Manufacturing Signal</div>
                <div className="text-3xl font-extrabold">Prepare {currentProduct.recommendedBatchSize || 500} Units</div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Based on your {cpr.toFixed(1)}% Cart Purchase Rate and pre-order velocity, this is your optimal primary production run to meet forecasted demand.
                </p>
                <div className="pt-2 text-xs text-emerald-300 font-semibold">
                  Breakeven Volume: {currentProduct.breakevenUnits || 120} units
                </div>
              </div>

              {/* Commission Calculator Box */}
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Marketplace Economics</div>
                <div className="text-3xl font-extrabold text-black">{currentProduct.commissionRate || 6}% Platform Commission</div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Zero monthly subscription fees. Venturely takes a flat 5% to 7% commission only on completed marketplace purchases after graduation.
                </p>
                <div className="pt-2 text-xs text-[#489cff] font-semibold">
                  Estimated Founder Payout: 94% of Gross Sales
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
