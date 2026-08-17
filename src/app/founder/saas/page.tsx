'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useRole } from '@/context/RoleContext';
import { SAAS_SUBSCRIPTION_PLANS, MOCK_CRM_CONTACTS } from '@/lib/constants';
import { formatCurrency } from '@/lib/format';
import { CrmContact, SaaSSubscriptionPlan } from '@/types';
import {
  Users,
  Sparkles,
  Zap,
  CheckCircle2,
  Mail,
  MessageSquare,
  Repeat,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Clock,
  ArrowLeft,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';

export default function ScaleSaaSHubPage() {
  const { showToast } = useRole();
  const [activeTab, setActiveTab] = useState<'crm' | 'retention' | 'plans'>('crm');
  const [activePlanTier, setActivePlanTier] = useState<'Starter' | 'Growth' | 'Scale'>('Growth');
  const [contacts, setContacts] = useState<CrmContact[]>(MOCK_CRM_CONTACTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('ALL');

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = segmentFilter === 'ALL' || c.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const handleSubscribe = (plan: SaaSSubscriptionPlan) => {
    setActivePlanTier(plan.tier);
    showToast(`Subscribed to Venturely Scale SaaS (${plan.name}) at ${formatCurrency(plan.priceMonthly)}/mo!`);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-10 px-6 max-w-7xl mx-auto w-full space-y-10">
        {/* Breadcrumb & Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/founder/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Founder Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#489cff] font-bold">Scale SaaS Hub</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#489cff] font-extrabold text-xs">
                <Zap className="w-3.5 h-3.5" /> Post-Launch Growth Suite
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Venturely Scale SaaS & CRM
              </h1>
              <p className="text-gray-400 text-sm max-w-2xl">
                Unlocked for validated & marketplace brands. Automate customer retention, repeat-purchase drips, and early adopter CRM under tiered plans.
              </p>
            </div>

            {/* Active Subscription Badge */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">
                ✓
              </div>
              <div className="text-xs">
                <div className="text-gray-400">Current Plan:</div>
                <div className="text-sm font-extrabold text-white">{activePlanTier} Tier Active</div>
              </div>
              <button
                onClick={() => setActiveTab('plans')}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white cursor-pointer"
              >
                Change Plan
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'crm'
                  ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customer CRM & Segments</span>
            </button>

            <button
              onClick={() => setActiveTab('retention')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'retention'
                  ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Repeat className="w-4 h-4" />
              <span>Retention & Re-Order Automations</span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'plans'
                  ? 'bg-[#489cff] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Subscription Tiers</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CRM & Customer Segments */}
        {activeTab === 'crm' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search buyer name or email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#489cff]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {['ALL', 'VIP_REPEAT_BUYER', 'FIRST_TIME_BUYER', 'VIP_WAITLIST', 'CART_ABANDONER'].map((seg) => (
                  <button
                    key={seg}
                    onClick={() => setSegmentFilter(seg)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer transition-all whitespace-nowrap ${
                      segmentFilter === seg
                        ? 'bg-white text-black'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {seg.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacts Table */}
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-gray-400 uppercase font-extrabold border-b border-white/10">
                    <tr>
                      <th className="py-4 px-6">Customer</th>
                      <th className="py-4 px-6">Phone</th>
                      <th className="py-4 px-6">Segment</th>
                      <th className="py-4 px-6">Total Orders</th>
                      <th className="py-4 px-6">LTV Spent</th>
                      <th className="py-4 px-6">Lifecycle Stage</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {filteredContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-white">{c.name}</div>
                          <div className="text-[11px] text-gray-500">{c.email}</div>
                        </td>
                        <td className="py-4 px-6 font-mono text-[11px]">{c.phone}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                              c.segment === 'VIP_REPEAT_BUYER'
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : c.segment === 'VIP_WAITLIST'
                                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                : c.segment === 'CART_ABANDONER'
                                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                                : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            }`}
                          >
                            {c.segment.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-bold text-white">{c.totalOrders}</td>
                        <td className="py-4 px-6 font-bold text-emerald-400">
                          {c.totalSpent > 0 ? formatCurrency(c.totalSpent) : '—'}
                        </td>
                        <td className="py-4 px-6 text-gray-400">{c.stage}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => showToast(`Triggered automated email campaign to ${c.name}!`)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] cursor-pointer"
                          >
                            Send Drip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Retention Automations */}
        {activeTab === 'retention' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Workflow 1 */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-[#489cff] flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">Post-Purchase Review Drip</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Triggered 5 days after delivery via Shiprocket. Collects photo reviews and incentivizes a 10% discount repeat code.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-emerald-400 font-bold">Active (48 sent this wk)</span>
                  <button
                    onClick={() => showToast('Workflow settings saved.')}
                    className="text-[#489cff] hover:underline cursor-pointer"
                  >
                    Edit Workflow
                  </button>
                </div>
              </div>

              {/* Workflow 2 */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <Repeat className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">30-Day Re-Order Trigger</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Predictive reminder email/WhatsApp sent when customer is estimated to run low on consumable refills or accessory add-ons.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-emerald-400 font-bold">Active (18.2% re-order rate)</span>
                  <button
                    onClick={() => showToast('Workflow settings saved.')}
                    className="text-[#489cff] hover:underline cursor-pointer"
                  >
                    Edit Workflow
                  </button>
                </div>
              </div>

              {/* Workflow 3 */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white">VIP Waitlist Conversion Blast</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Automatically blasts batch availability alerts to the top 100 waitlist rank holders as soon as manufacturing batch units are verified.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-emerald-400 font-bold">Ready to Dispatch</span>
                  <button
                    onClick={() => showToast('Triggered blast to 840 waitlist leads!')}
                    className="text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    Send Blast
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Subscription Plans */}
        {activeTab === 'plans' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Tiered Growth & Scale Subscriptions
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Scale your D2C brand from prototype validation to omnichannel customer retention.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SAAS_SUBSCRIPTION_PLANS.map((plan) => (
                <div
                  key={plan.tier}
                  className={`rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between transition-all relative ${
                    plan.recommended
                      ? 'bg-gradient-to-b from-blue-950/40 to-slate-900 border-2 border-[#489cff] shadow-2xl shadow-blue-500/10'
                      : 'bg-slate-900 border border-white/10'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#489cff] text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                      Most Popular for Marketplace Sellers
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#489cff]">
                        {plan.tier} Tier
                      </div>
                      <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white">{formatCurrency(plan.priceMonthly)}</span>
                      <span className="text-xs text-gray-400">/ month</span>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-white/10">
                      {plan.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all cursor-pointer ${
                      activePlanTier === plan.tier
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : plan.recommended
                        ? 'bg-[#489cff] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {activePlanTier === plan.tier ? 'Current Active Plan' : `Upgrade to ${plan.tier}`}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
