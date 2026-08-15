'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getOrders, getWaitlists, getProducts } from '@/lib/data';
import { Order, WaitlistEntry, Product } from '@/types';
import { ShoppingBag, Users, Heart, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { StageBadge } from '../product/StageBadge';
import { formatCurrency } from '@/lib/format';

export function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'waitlists' | 'following'>('orders');
  const orders = getOrders();
  const waitlists = getWaitlists();
  const products = getProducts();

  return (
    <div className="space-y-8">
      {/* Customer Header */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs text-[#489cff] font-bold uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-2xl font-extrabold text-black mt-1">My Pre-Orders & Joined Waitlists</h1>
          <p className="text-xs text-gray-500 mt-1">
            Track your pre-orders, VIP referral waitlist ranks, and backed startup campaigns.
          </p>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0f1628] text-white font-bold text-xs hover:bg-black transition-colors shadow-sm"
        >
          <span>Explore Verified Marketplace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-extrabold text-xs border-b-2 transition-all ${
            activeTab === 'orders' ? 'border-[#489cff] text-black bg-white shadow-sm' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-[#489cff]" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('waitlists')}
          className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-extrabold text-xs border-b-2 transition-all ${
            activeTab === 'waitlists' ? 'border-[#489cff] text-black bg-white shadow-sm' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          <Users className="w-4 h-4 text-purple-600" />
          <span>Joined VIP Waitlists ({waitlists.length})</span>
        </button>
      </div>

      {/* TAB: ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((ord) => {
                const prod = products.find((p) => p.id === ord.productId || p.name === ord.productName);
                return (
                  <div key={ord.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {prod && (
                        <img
                          src={prod.images[0]}
                          alt={ord.productName}
                          className="w-16 h-16 object-cover rounded-xl border border-gray-200"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-black">#{ord.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {ord.status}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-black text-base mt-1">{ord.productName}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Amount: {formatCurrency(ord.amount)} | Mode: {ord.logisticsModel} | Date: {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      {prod && (
                        <Link
                          href={`/product/${prod.id}`}
                          className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                        >
                          View Campaign Page
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 bg-white rounded-3xl border border-gray-200 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-lg font-extrabold text-black">No Orders Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Explore limited prototype launches or pre-orders in the marketplace to back innovative startups.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB: WAITLISTS */}
      {activeTab === 'waitlists' && (
        <div className="space-y-4">
          {waitlists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {waitlists.map((w: WaitlistEntry) => {
                const prod = products.find((p) => p.id === w.productId);
                return (
                  <div key={w.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] text-purple-600 font-bold uppercase">VIP Waitlist Rank #{w.rank}</span>
                        <h4 className="font-extrabold text-black text-base">{w.productName}</h4>
                      </div>
                      {prod && <StageBadge stage={prod.stage} />}
                    </div>

                    <div className="text-xs text-gray-600 font-medium">
                      Referral Code: <strong className="text-black">{w.referralCode}</strong> ({w.referralCount} referrals)
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <span>Joined on {new Date(w.createdAt).toLocaleDateString('en-IN')}</span>
                      {prod && (
                        <Link href={`/product/${prod.id}`} className="text-[#489cff] font-bold hover:underline">
                          Track Launch →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 bg-white rounded-3xl border border-gray-200 text-center space-y-3">
              <Users className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-lg font-extrabold text-black">No Waitlists Joined</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Browse prototype & SaaS products to join waitlists and unlock VIP referral pricing.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
