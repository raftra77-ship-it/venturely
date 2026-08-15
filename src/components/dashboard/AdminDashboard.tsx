'use client';

import React, { useState } from 'react';
import { getProducts, getOrders, getPlatformConfig, updatePlatformConfig, approveProductByAdmin, graduateProductToMarketplace } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { Product } from '@/types';
import { StageBadge } from '../product/StageBadge';
import { formatCurrency } from '@/lib/format';
import {
  ShieldAlert,
  Award,
  DollarSign,
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Settings,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export function AdminDashboard() {
  const { showToast } = useRole();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const orders = getOrders();
  const [config, setConfig] = useState(getPlatformConfig());
  const [activeTab, setActiveTab] = useState<'moderation' | 'graduation' | 'commission' | 'trust'>('moderation');

  const totalGMV = products.reduce((acc, p) => acc + p.totalRevenue, 0);
  const estimatedRevenue = Math.round(totalGMV * (config.defaultCommissionRate / 100) + products.length * 1999);

  const handleApproveToggle = (productId: string, current: boolean) => {
    approveProductByAdmin(productId, !current);
    setProducts(getProducts());
    showToast(`Product approval status updated.`);
  };

  const handleGraduateApprove = (productId: string) => {
    graduateProductToMarketplace(productId);
    setProducts(getProducts());
    showToast(`Approved graduation for product! Badge awarded.`);
  };

  const handleCommissionChange = (rate: number) => {
    updatePlatformConfig({ defaultCommissionRate: rate });
    setConfig(getPlatformConfig());
    showToast(`Default marketplace commission updated to ${rate}%`);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <ShieldAlert className="w-4 h-4" />
            <span>Platform Administration & Trust System</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1">Platform Admin Control Panel</h1>
          <p className="text-xs text-slate-400 mt-1">
            Orchestrate startup validation campaigns, moderate submissions, approve marketplace graduations, and control platform commissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 font-mono text-xs">
            <span className="text-slate-400">Current Commission:</span>{' '}
            <strong className="text-emerald-400">{config.defaultCommissionRate}%</strong>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase">Platform GMV</span>
          <div className="text-2xl font-bold font-mono text-slate-900">₹{formatCurrency(totalGMV)}</div>
          <p className="text-[11px] text-slate-500">Gross Merchandise Volume</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase">Platform Revenue</span>
          <div className="text-2xl font-bold font-mono text-emerald-700">₹{formatCurrency(estimatedRevenue)}</div>
          <p className="text-[11px] text-slate-500">Commissions & Validation fees</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase">Active Startups</span>
          <div className="text-2xl font-bold font-mono text-blue-600">{products.length}</div>
          <p className="text-[11px] text-slate-500">Across 9 validation stages</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-mono text-slate-400 uppercase">Fulfilled Orders</span>
          <div className="text-2xl font-bold font-mono text-purple-600">{orders.length}</div>
          <p className="text-[11px] text-slate-500">Platform-wide orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'moderation', label: 'Product Moderation Queue', icon: CheckCircle2 },
          { id: 'graduation', label: 'Marketplace Graduation Approvals', icon: Award },
          { id: 'commission', label: 'Commission & Pricing Settings', icon: Settings },
          { id: 'trust', label: 'Trust & Fraud Monitor', icon: ShieldAlert },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-sm border-b-2 transition-all ${
                isActive ? 'border-slate-900 text-slate-900 font-bold bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: MODERATION */}
      {activeTab === 'moderation' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Submitted Startups Moderation Queue</h3>
            <span className="text-xs font-mono text-slate-500">{products.length} products listed</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-mono uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3">Product / Startup</th>
                  <th className="p-3">Founder</th>
                  <th className="p-3">Stage</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Validation Score</th>
                  <th className="p-3">Moderation Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3 font-semibold text-slate-900">
                      <div>{p.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal">{p.category}</div>
                    </td>
                    <td className="p-3 text-slate-600">
                      <div>{p.founderName}</div>
                      <div className="text-[11px] font-mono text-slate-400">{p.companyName}</div>
                    </td>
                    <td className="p-3"><StageBadge stage={p.stage} /></td>
                    <td className="p-3 font-mono font-bold text-slate-900">₹{formatCurrency(p.price)}</td>
                    <td className="p-3 font-mono font-bold text-blue-600">{p.validationScore.overall}/100</td>
                    <td className="p-3">
                      {p.isApprovedByAdmin ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">APPROVED</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">PENDING</span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleApproveToggle(p.id, p.isApprovedByAdmin)}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          p.isApprovedByAdmin
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {p.isApprovedByAdmin ? 'Reject / Hide' : 'Approve Submission'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: GRADUATION */}
      {activeTab === 'graduation' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Marketplace Graduation Queue</h3>
            <p className="text-xs text-slate-500">
              Review startups that have requested graduation into the Curated Marketplace and award the <strong>Validated Product</strong> badge.
            </p>
          </div>

          <div className="space-y-3">
            {products
              .filter((p) => p.validationScore.overall >= 75 && !p.isGraduatedToMarketplace)
              .map((p) => (
                <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-cover rounded-lg border" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                        <span className="font-mono text-xs text-emerald-700 font-bold">Score: {p.validationScore.overall}/100</span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Orders: {p.ordersCount} | Rating: 4.8★ | Refund rate: {p.refundRate}%
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleGraduateApprove(p.id)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    Approve Graduation & Grant Badge
                  </button>
                </div>
              ))}

            {products.filter((p) => p.validationScore.overall >= 75 && !p.isGraduatedToMarketplace).length === 0 && (
              <div className="py-8 text-center text-xs text-slate-500 font-mono">
                No pending graduation requests. All eligible products are reviewed.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: COMMISSION */}
      {activeTab === 'commission' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Marketplace Commission & Package Settings</h3>
            <p className="text-xs text-slate-500">Configure global marketplace commission rates and validation packages.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 text-sm">Default Marketplace Commission Rate</h4>
              <div className="flex items-center gap-3">
                {[5, 7, 10].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleCommissionChange(rate)}
                    className={`px-5 py-2.5 rounded-lg font-mono font-bold text-sm border transition-all ${
                      config.defaultCommissionRate === rate
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {rate}% Commission
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                Current active commission: <strong className="text-slate-900">{config.defaultCommissionRate}%</strong> charged on marketplace sales.
              </p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900">Validation Package Tier Pricing</h4>
              <div className="space-y-2 font-mono">
                <div className="flex justify-between p-2 bg-white rounded border"><span>Idea Validation Tier:</span><strong>₹1,999</strong></div>
                <div className="flex justify-between p-2 bg-white rounded border"><span>Launch Validation Tier:</span><strong>₹5,999</strong></div>
                <div className="flex justify-between p-2 bg-white rounded border"><span>Growth & D2C Tier:</span><strong>₹14,999</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: TRUST & FRAUD */}
      {activeTab === 'trust' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">Trust, Integrity & Anti-Gaming Monitor</h3>
            <p className="text-xs text-slate-500">Platform telemetry continuously verifies traffic authenticity to prevent score manipulation.</p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-emerald-900">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Validation Scores Verification: 100% Organic Signals Verified</span>
              </div>
              <span className="font-bold">CLEAN</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Review Authenticity Check: Verified Buyer Email Required</span>
              </div>
              <span className="font-bold text-blue-600">ENFORCED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
