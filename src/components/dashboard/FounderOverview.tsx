'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, Order } from '@/types';
import { useRole } from '@/context/RoleContext';
import { getProducts, getOrders, updateOrderStatus, graduateProductToMarketplace } from '@/lib/data';
import { RecommendationCard } from './RecommendationCard';
import { ValidationScoreCard } from './ValidationScoreCard';
import { FunnelChart } from './FunnelChart';
import { StageBadge } from '../product/StageBadge';
import { formatCurrency, formatNumber } from '@/lib/format';
import {
  TrendingUp,
  Eye,
  Users,
  ShoppingBag,
  DollarSign,
  PackageCheck,
  Megaphone,
  Award,
  MessageSquare,
  Box,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

export function FounderOverview() {
  const { activeProductId, setActiveProductId, showToast } = useRole();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'marketing' | 'orders' | 'inventory' | 'feedback' | 'graduation'>('overview');
  const [productsList, setProductsList] = useState<Product[]>(getProducts());
  const [adSpendInput, setAdSpendInput] = useState('10000');
  const [campaignName, setCampaignName] = useState('Validation Promo Wave 1');

  const currentProduct = productsList.find((p) => p.id === activeProductId) || productsList[0];
  const productOrders = getOrders(currentProduct?.id);

  if (!currentProduct) {
    return <div className="p-8 text-center">No products found. Create one first.</div>;
  }

  const isIdeaOrConcept = currentProduct.stage === '0_IDEA' || currentProduct.stage === '1_CONCEPT';
  const isPrototypeOrMVP = currentProduct.stage === '2_PROTOTYPE' || currentProduct.stage === '3_MVP';
  const isD2C = currentProduct.stage === '4_EARLY_PRODUCT' || currentProduct.stage === '5_D2C_LAUNCH' || currentProduct.stage === '6_VALIDATED' || currentProduct.stage === '7_MARKETPLACE';

  const sellThrough = currentProduct.inventoryTotal > 0 ? Math.round((currentProduct.inventorySold / currentProduct.inventoryTotal) * 100) : 0;

  const handleGraduateRequest = () => {
    graduateProductToMarketplace(currentProduct.id);
    setProductsList(getProducts());
    showToast(`Graduation request approved! ${currentProduct.name} is now listed in Curated Marketplace.`);
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    showToast(`Order status updated to ${status}`);
  };

  return (
    <div className="space-y-8">
      {/* Header & Product Switcher Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.name}
            className="w-16 h-16 object-cover rounded-lg border border-slate-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentProduct.name}</h1>
              <StageBadge stage={currentProduct.stage} />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Company: <strong className="text-slate-700">{currentProduct.companyName}</strong> | Founder: {currentProduct.founderName}
            </p>
          </div>
        </div>

        {/* Switcher & Action */}
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-mono text-slate-400 uppercase">Select Active Startup</label>
            <select
              value={currentProduct.id}
              onChange={(e) => setActiveProductId(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              {productsList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.stage.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/founder/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-blue-600 transition-colors shadow-sm self-end"
          >
            <PlusCircle className="w-4 h-4" />
            New Startup
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-1 text-sm font-medium">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
          { id: 'analytics', label: 'Funnel & Telemetry', icon: Eye },
          { id: 'marketing', label: 'Marketing Center', icon: Megaphone },
          { id: 'orders', label: `Orders (${productOrders.length})`, icon: ShoppingBag },
          { id: 'inventory', label: 'Inventory Health', icon: Box },
          { id: 'feedback', label: 'Customer Feedback', icon: MessageSquare },
          { id: 'graduation', label: 'Marketplace Graduation', icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-slate-900 text-slate-900 font-bold bg-slate-50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Stage-Adaptive Key Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Validation Score</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-slate-900">{currentProduct.validationScore.overall}</span>
                <span className="text-xs font-medium text-emerald-600 font-mono">/ 100</span>
              </div>
              <p className="text-[11px] text-slate-500">Platform demand signal</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase">Product Views</span>
              <div className="text-2xl font-bold font-mono text-slate-900">{formatNumber(currentProduct.views)}</div>
              <p className="text-[11px] text-slate-500">{formatNumber(currentProduct.uniqueVisitors)} unique visitors</p>
            </div>

            {isIdeaOrConcept ? (
              <>
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-mono text-slate-400 uppercase">Waitlist Signups</span>
                  <div className="text-2xl font-bold font-mono text-blue-600">{currentProduct.waitlistCount}</div>
                  <p className="text-[11px] text-slate-500">Waitlist conversion: {((currentProduct.waitlistCount / Math.max(currentProduct.views, 1)) * 100).toFixed(1)}%</p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-mono text-slate-400 uppercase">Interest Votes</span>
                  <div className="text-2xl font-bold font-mono text-purple-600">{currentProduct.interestVotes}</div>
                  <p className="text-[11px] text-slate-500">Audience interest signal</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-mono text-slate-400 uppercase">Total Orders / Pre-orders</span>
                  <div className="text-2xl font-bold font-mono text-slate-900">{currentProduct.ordersCount || currentProduct.preOrdersCount}</div>
                  <p className="text-[11px] text-emerald-700 font-medium font-mono">Conversion: {currentProduct.conversionRate}%</p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-xs font-mono text-slate-400 uppercase">Total Revenue</span>
                  <div className="text-2xl font-bold font-mono text-emerald-700">₹{formatCurrency(currentProduct.totalRevenue)}</div>
                  <p className="text-[11px] text-slate-500 font-mono">CAC: ₹{currentProduct.cac} | AOV: ₹{currentProduct.aov}</p>
                </div>
              </>
            )}
          </div>

          {/* Core Feature 1: "What Should I Do Next?" Recommendation Engine */}
          <RecommendationCard recommendations={currentProduct.recommendations} onTabChange={(t) => setActiveTab(t as any)} />

          {/* Core Feature 2: Proprietary Validation Score Breakdown Card */}
          <ValidationScoreCard score={currentProduct.validationScore} />

          {/* Split Layout: Conversion Funnel & Inventory Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FunnelChart product={currentProduct} />

            {/* Inventory & Batch Telemetry */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Box className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-base">Limited Batch Telemetry</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {sellThrough >= 80 ? 'High Sell-Through' : 'Normal Pace'}
                </span>
              </div>

              {currentProduct.inventoryTotal > 0 ? (
                <div className="space-y-4 pt-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-extrabold font-mono text-slate-900">{currentProduct.inventorySold}</span>
                      <span className="text-slate-500 text-sm font-mono"> / {currentProduct.inventoryTotal} units sold</span>
                    </div>
                    <span className="text-xl font-bold font-mono text-emerald-700">{sellThrough}%</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(sellThrough, 100)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-500 font-mono">Sales Velocity</span>
                      <div className="text-base font-bold font-mono text-slate-900">{currentProduct.salesVelocityPerDay || 6} units/day</div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="text-slate-500 font-mono">Est. Sellout Time</span>
                      <div className="text-base font-bold font-mono text-slate-900">
                        {Math.max(1, Math.round((currentProduct.inventoryTotal - currentProduct.inventorySold) / (currentProduct.salesVelocityPerDay || 6)))} days
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-500 space-y-2">
                  <p>Idea stage product — limited batch inventory tracking activates in Stage 4.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ANALYTICS & TELEMETRY */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <FunnelChart product={currentProduct} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Customer Acquisition Cost (CAC)</span>
              <div className="text-2xl font-bold font-mono text-slate-900">₹{formatCurrency(currentProduct.cac)}</div>
              <p className="text-xs text-slate-500">Platform benchmark: ₹450 - ₹850</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Average Order Value (AOV)</span>
              <div className="text-2xl font-bold font-mono text-slate-900">₹{formatCurrency(currentProduct.aov)}</div>
              <p className="text-xs text-slate-500">Gross revenue per buyer</p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Return on Ad Spend (ROAS)</span>
              <div className="text-2xl font-bold font-mono text-emerald-700">{currentProduct.roas}x</div>
              <p className="text-xs text-slate-500">Direct promotional campaign yield</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MARKETING CENTER */}
      {activeTab === 'marketing' && (
        <div className="space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Validation Marketing Center</h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure controlled social & platform validation exposure. Your advertising budget remains strictly separated from platform fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Campaign Config */}
            <div className="md:col-span-1 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Launch Validation Campaign</h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Campaign Name</label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Ad Spend Budget (₹)</label>
                  <input
                    type="number"
                    value={adSpendInput}
                    onChange={(e) => setAdSpendInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none font-mono"
                  />
                </div>

                {/* Cost Breakdown */}
                <div className="pt-2 border-t border-slate-200 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-600">
                    <span>Direct Ad Spend (100% to ads):</span>
                    <span>₹{formatCurrency(Number(adSpendInput))}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Setup Fee (12%):</span>
                    <span>₹{formatCurrency(Math.round(Number(adSpendInput) * 0.12))}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-xs pt-1 border-t border-slate-300">
                    <span>Total Campaign Budget:</span>
                    <span className="text-blue-600">₹{formatCurrency(Number(adSpendInput) * 1.12)}</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Validation Campaign '${campaignName}' Launched!`)}
                  className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-blue-600 transition-colors shadow-sm mt-2"
                >
                  Deploy Validation Campaign
                </button>
              </div>
            </div>

            {/* Active Campaigns Table */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-semibold text-slate-900 text-sm">Active & Past Validation Campaigns</h4>

              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-mono uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Campaign</th>
                      <th className="p-3">Ad Spend</th>
                      <th className="p-3">Platform Fee</th>
                      <th className="p-3">Impressions</th>
                      <th className="p-3">Conversions</th>
                      <th className="p-3">CAC</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-mono">
                    <tr>
                      <td className="p-3 font-sans font-semibold">Early Adopter Meta Wave 1</td>
                      <td className="p-3">₹15,000</td>
                      <td className="p-3 text-slate-500">₹1,800</td>
                      <td className="p-3">24,500</td>
                      <td className="p-3 text-emerald-700 font-bold">22 orders</td>
                      <td className="p-3">₹680</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">ACTIVE</span></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-semibold">LinkedIn Founder Retargeting</td>
                      <td className="p-3">₹8,000</td>
                      <td className="p-3 text-slate-500">₹960</td>
                      <td className="p-3">9,800</td>
                      <td className="p-3 text-emerald-700 font-bold">8 orders</td>
                      <td className="p-3">₹1,000</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">COMPLETED</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Order Management & Dispatch</h3>
              <p className="text-xs text-slate-500">Track and fulfill validated customer orders.</p>
            </div>
            <span className="font-mono text-xs text-slate-600">Total Fulfilled: {productOrders.length} orders</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-mono uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {productOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="p-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                    <td className="p-3">
                      <div className="font-semibold">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{ord.customerEmail}</div>
                    </td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{ord.shippingAddress}</td>
                    <td className="p-3 font-mono font-bold text-emerald-700">₹{formatCurrency(ord.amount)}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-blue-100 text-blue-800 font-semibold">
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {ord.status === 'PROCESSING' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'SHIPPED')}
                          className="px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-medium hover:bg-blue-600"
                        >
                          Mark Shipped
                        </button>
                      )}
                      {ord.status === 'SHIPPED' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'DELIVERED')}
                          className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[11px] font-medium hover:bg-emerald-700"
                        >
                          Mark Delivered
                        </button>
                      )}
                      {ord.status === 'DELIVERED' && (
                        <span className="text-[11px] text-emerald-700 font-medium">✓ Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INVENTORY */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Inventory Control & Batch Forecasting</h3>
              <p className="text-xs text-slate-500">Monitor remaining stock, sales velocity, and reorder thresholds.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-slate-600">Health:</span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                HEALTHY (28% remaining)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500">Initial Batch Size</span>
              <div className="text-xl font-bold text-slate-900 mt-1">{currentProduct.inventoryTotal} units</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500">Units Fulfilled</span>
              <div className="text-xl font-bold text-emerald-700 mt-1">{currentProduct.inventorySold} units</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500">Remaining Inventory</span>
              <div className="text-xl font-bold text-blue-600 mt-1">{currentProduct.inventoryTotal - currentProduct.inventorySold} units</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-500">Suggested Next Batch</span>
              <div className="text-xl font-bold text-purple-600 mt-1">250 units</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Customer Feedback & Sentiment Matrix</h3>
            <p className="text-xs text-slate-500">Aggregated insights captured during customer validation touchpoints.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span>Top Loved Features</span>
                <span>84% Sentiment</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>"Immediate HRV calm effect during high stakes work."</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>"Minimalist titanium design looks like premium fashion eyewear."</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span>Top Requested Improvements</span>
                <span>28% Interest</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>"Extend battery case capacity to 5 days."</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>"Provide local optometrist prescription inserts."</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GRADUATION */}
      {activeTab === 'graduation' && (
        <div className="space-y-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Curated Marketplace Graduation</h3>
            <p className="text-xs text-slate-500">
              Graduate your validated product into Venturely&apos;s main Curated Marketplace to scale commercial distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Graduation Requirement Checklist</h4>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span>Validation Score ≥ 75/100</span>
                  <span className="font-mono font-bold text-emerald-700">PASS ({currentProduct.validationScore.overall}/100)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span>Minimum Orders Fulfilled ≥ 40</span>
                  <span className="font-mono font-bold text-emerald-700">PASS ({currentProduct.ordersCount} orders)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span>Customer Satisfaction Rating ≥ 4.2★</span>
                  <span className="font-mono font-bold text-emerald-700">PASS (4.8★)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span>Refund Rate ≤ 3.0%</span>
                  <span className="font-mono font-bold text-emerald-700">PASS ({currentProduct.refundRate}%)</span>
                </div>
              </div>

              {!currentProduct.isGraduatedToMarketplace ? (
                <button
                  onClick={handleGraduateRequest}
                  className="w-full py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Request Marketplace Graduation Now
                </button>
              ) : (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto" />
                  <div className="font-bold text-emerald-900 text-sm">Graduated & Listed in Marketplace</div>
                  <p className="text-xs text-emerald-700">Your product has received the Validated Product badge.</p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 text-sm">Marketplace Commission Transparency</h4>
              <p className="text-slate-600 leading-relaxed">
                When listed in the Curated Marketplace, Venturely charges a default platform commission of <strong>7%</strong> per sale.
              </p>
              <div className="p-3 bg-white rounded-lg border border-slate-200 font-mono space-y-1 text-[11px]">
                <div className="flex justify-between"><span>Example Sale Price:</span><span>₹{formatCurrency(currentProduct.price)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Platform Commission (7%):</span><span>- ₹{formatCurrency(Math.round(currentProduct.price * 0.07))}</span></div>
                <div className="flex justify-between font-bold text-emerald-700 border-t border-slate-200 pt-1"><span>Net Founder Payout:</span><span>₹{formatCurrency(Math.round(currentProduct.price * 0.93))}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
