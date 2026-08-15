'use client';

import React, { useState } from 'react';
import { getProducts, getOrders, updateProduct } from '@/lib/data';
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
  Percent,
  Truck,
  Megaphone,
} from 'lucide-react';

export function AdminDashboard() {
  const { showToast, refreshProducts } = useRole();
  const [products, setProducts] = useState<Product[]>(getProducts());
  const orders = getOrders();
  const [activeTab, setActiveTab] = useState<'moderation' | 'commission' | 'logistics'>('moderation');

  const totalGMV = products.reduce((acc, p) => acc + p.totalRevenue, 0);
  const estimatedRevenue = Math.round(totalGMV * 0.06 + products.length * 4999);

  const handleApproveToggle = (productId: string, current: boolean) => {
    updateProduct(productId, { isApprovedByAdmin: !current });
    setProducts(getProducts());
    refreshProducts();
    showToast(`Product approval status updated.`);
  };

  const handleGraduateApprove = (productId: string) => {
    updateProduct(productId, {
      isGraduatedToMarketplace: true,
      stage: '6_MARKETPLACE',
      commissionRate: 6,
    });
    setProducts(getProducts());
    refreshProducts();
    showToast(`Approved marketplace graduation! 6% commission active.`);
  };

  const handleSetCommission = (productId: string, rate: number) => {
    updateProduct(productId, { commissionRate: rate });
    setProducts(getProducts());
    refreshProducts();
    showToast(`Set commission rate for product to ${rate}%`);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0f1628] text-white rounded-3xl p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Platform Administration & Moderation</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">Admin Control Console</h1>
          <p className="text-xs text-gray-300 mt-1">
            Oversee startup validation campaigns, approve marketplace graduations, adjust 5–7% commission rates, and track logistics dispatches.
          </p>
        </div>

        <div className="bg-white/10 px-5 py-2.5 rounded-2xl border border-white/15 backdrop-blur-md">
          <span className="text-xs text-gray-300">Commission Range:</span>{' '}
          <strong className="text-emerald-400 font-extrabold">5% – 7% Fee</strong>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase">Platform GMV</span>
          <div className="text-2xl font-extrabold text-black">{formatCurrency(totalGMV)}</div>
          <p className="text-[11px] text-gray-500">Gross Pre-Order Volume</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase">Est. Platform Fees</span>
          <div className="text-2xl font-extrabold text-emerald-600">{formatCurrency(estimatedRevenue)}</div>
          <p className="text-[11px] text-gray-500">Ad Fees + 5–7% Commission</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase">Active Startups</span>
          <div className="text-2xl font-extrabold text-[#489cff]">{products.length}</div>
          <p className="text-[11px] text-gray-500">D2C, SaaS, B2B, B2C</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase">Graduated Products</span>
          <div className="text-2xl font-extrabold text-purple-600">
            {products.filter((p) => p.isGraduatedToMarketplace).length}
          </div>
          <p className="text-[11px] text-gray-500">Marketplace Listed</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-px">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'moderation'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#489cff]" />
          <span>Startup Campaign Moderation</span>
        </button>

        <button
          onClick={() => setActiveTab('commission')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'commission'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <Percent className="w-4 h-4 text-emerald-600" />
          <span>5–7% Commission Management</span>
        </button>

        <button
          onClick={() => setActiveTab('logistics')}
          className={`px-5 py-3 text-xs font-extrabold cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'logistics'
              ? 'text-[#0f1628] border-[#489cff] bg-white rounded-t-2xl shadow-sm'
              : 'text-gray-500 border-transparent hover:text-black'
          }`}
        >
          <Truck className="w-4 h-4 text-amber-600" />
          <span>Platform Logistics Dispatches</span>
        </button>
      </div>

      {/* Tab 1: Moderation */}
      {activeTab === 'moderation' && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="font-extrabold text-black text-lg">Campaign Approvals & Graduation</h3>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="p-4 rounded-2xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-xl border border-gray-200" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-black text-sm">{product.name}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0f1628] text-white">{product.startupType}</span>
                      <StageBadge stage={product.stage} />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Company: {product.companyName} | Score: <strong className="text-black">{product.validationScore.overall}/100</strong> | CPR: <strong className="text-emerald-600">{(product.cartPurchaseRate || 18.5).toFixed(1)}%</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApproveToggle(product.id, product.isApprovedByAdmin)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                      product.isApprovedByAdmin
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {product.isApprovedByAdmin ? 'Approved' : 'Pending Review'}
                  </button>

                  {!product.isGraduatedToMarketplace && (
                    <button
                      onClick={() => handleGraduateApprove(product.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#489cff] hover:bg-blue-600 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      Approve Marketplace (6%)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Commission Management */}
      {activeTab === 'commission' && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="font-extrabold text-black text-lg">Marketplace Commission Rates (5% – 7%)</h3>
            <p className="text-xs text-gray-500">Configure custom commission rates per startup upon marketplace graduation.</p>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="p-4 rounded-2xl border border-gray-200 flex items-center justify-between bg-gray-50">
                <div>
                  <div className="font-bold text-black text-sm">{product.name} ({product.companyName})</div>
                  <div className="text-xs text-gray-500">Stage: {product.stage} • Current Commission: <strong className="text-emerald-600">{product.commissionRate || 6}%</strong></div>
                </div>

                <div className="flex items-center gap-2">
                  {[5, 6, 7].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleSetCommission(product.id, rate)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                        (product.commissionRate || 6) === rate
                          ? 'bg-[#0f1628] text-white shadow-md'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {rate}% Fee
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Logistics Dispatches */}
      {activeTab === 'logistics' && (
        <div className="bg-white border border-gray-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="font-extrabold text-black text-lg">Venturely Platform Logistics Supervision</h3>
          <div className="space-y-3">
            {orders.map((ord) => (
              <div key={ord.id} className="p-4 rounded-2xl border border-gray-200 flex justify-between items-center bg-gray-50 text-xs">
                <div>
                  <div className="font-bold text-black">Order #{ord.orderNumber} — {ord.productName}</div>
                  <div className="text-gray-500">Buyer: {ord.customerName} ({ord.customerEmail}) • Mode: {ord.logisticsModel}</div>
                  <div className="text-gray-500 font-mono">Tracking: {ord.trackingNumber || 'VNT-DISPATCH-991'}</div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-600 text-sm">{formatCurrency(ord.amount)}</span>
                  <div className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{ord.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
