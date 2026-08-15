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
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-blue-600 font-semibold uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">My Discoveries & Orders</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track your pre-orders, joined startup waitlists, and backed validation campaigns.
          </p>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors shadow-sm"
        >
          <span>Discover More Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-sm border-b-2 transition-all ${
            activeTab === 'orders' ? 'border-slate-900 text-slate-900 font-bold bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-blue-600" />
          <span>My Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('waitlists')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-sm border-b-2 transition-all ${
            activeTab === 'waitlists' ? 'border-slate-900 text-slate-900 font-bold bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-purple-600" />
          <span>Joined Waitlists ({waitlists.length})</span>
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
                  <div key={ord.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {prod && (
                        <img
                          src={prod.images[0]}
                          alt={ord.productName}
                          className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">{ord.orderNumber}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800">
                            {ord.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base mt-1">{ord.productName}</h3>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          Amount: ₹{formatCurrency(ord.amount)} | Date: {new Date(ord.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      {prod && (
                        <Link
                          href={`/product/${prod.id}`}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          View Product Page
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Orders Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore limited launch products or pre-orders in the marketplace to back innovative startups.
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
              {waitlists.map((w) => {
                const prod = products.find((p) => p.id === w.productId);
                return (
                  <div key={w.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-mono text-purple-600 font-semibold uppercase">Priority Access</span>
                        <h4 className="font-bold text-slate-900 text-base">{w.productName}</h4>
                      </div>
                      {prod && <StageBadge stage={prod.stage} />}
                    </div>

                    <p className="text-xs text-slate-600 font-mono">
                      Target Willingness: ₹{w.willingnessToPay ? formatCurrency(w.willingnessToPay) : 'N/A'}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Joined on {new Date(w.createdAt).toLocaleDateString('en-IN')}</span>
                      {prod && (
                        <Link href={`/product/${prod.id}`} className="text-blue-600 font-medium hover:underline">
                          Track Launch →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 bg-white rounded-xl border border-slate-200 text-center space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">No Waitlists Joined</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Browse idea & concept products to join waitlists and help founders shape new innovations.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
