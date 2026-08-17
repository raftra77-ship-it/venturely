'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { ProductStage, StartupCategory, LogisticsModel, ValidationPackageTier, BusinessStage, InventoryMode } from '@/types';
import { PRODUCT_CATEGORIES, STARTUP_CATEGORIES, VALIDATION_PACKAGE_TIERS, LOGISTICS_OPTIONS } from '@/lib/constants';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Rocket, ShieldCheck, Truck, Megaphone, Box, Globe, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export function ProductCreationWizard() {
  const router = useRouter();
  const { setActiveProductId, showToast, refreshProducts } = useRole();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    founderName: 'Dr. Sameer Kapoor',
    companyName: 'NovaHealth Tech',
    founderEmail: 'sameer@novahealth.io',
    productName: 'Lumina Sleep Halo',
    tagline: 'Circadian blue-light blocking headband with smart sleep onset tracking.',
    description:
      'Lumina Sleep Halo delivers ultra-gentle micro-warmth and targeted red spectrum light that signals your brain to release melatonin naturally in under 12 minutes.',
    problem: '92% of working professionals suffer disrupted sleep due to late-night screen exposure.',
    solution: 'Smart light-blocking headband that actively accelerates deep REM sleep onset.',
    category: 'Health & Wellness',
    startupType: 'D2C' as StartupCategory,
    businessStage: 'prototype' as BusinessStage,
    inventoryMode: 'zero' as InventoryMode,
    stage: '2_PROTOTYPE' as ProductStage,
    logisticsModel: 'VENTURELY_SUPPORTED' as LogisticsModel,
    validationPackage: 'GROWTH' as ValidationPackageTier,
    price: 4999,
    expectedPrice: 6999,
    inventoryTotal: 50,
    recommendedBatchSize: 500,
    breakevenUnits: 120,
    manufacturingStatus: '3D Printed Prototype & Sensor Circuitry Tested',
    targetAudience: 'Executives, night-shift workers, & sleep enthusiasts',
    validationObjective: 'Test pre-order conversion, cart purchase rate & price acceptance',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
  });

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const slug = formData.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = VALIDATION_PACKAGE_TIERS[formData.validationPackage];
    const created = addProduct({
      ...formData,
      name: formData.productName,
      slug: slug,
      images: [formData.imageUrl],
      inventorySold: 0,
      isApprovedByAdmin: true,
      isGraduatedToMarketplace: false,
      isFeatured: true,
      isSponsored: false,
      decisionStatus: 'yellow',
      logisticsModel: formData.logisticsModel,
      shippingEstimateDays: formData.logisticsModel === 'VENTURELY_SUPPORTED' ? '3-4 Business Days' : 'Merchant Direct Delivery',
      shippingFee: formData.logisticsModel === 'VENTURELY_SUPPORTED' ? 49 : 0,
    });

    setActiveProductId(created.id);
    refreshProducts();
    showToast(`Validation Campaign for "${created.name}" is now live!`);
    router.push(`/v/${created.slug}`);
  };

  const previewProduct: any = {
    id: 'preview_temp',
    name: formData.productName || 'Untitled Startup',
    slug: slug,
    tagline: formData.tagline || 'Revolutionary new product',
    description: formData.description,
    problem: formData.problem,
    solution: formData.solution,
    category: formData.category,
    startupType: formData.startupType,
    stage: formData.stage,
    businessStage: formData.businessStage,
    inventoryMode: formData.inventoryMode,
    decisionStatus: 'yellow',
    founderName: formData.founderName,
    companyName: formData.companyName,
    founderEmail: formData.founderEmail,
    images: [formData.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    price: Number(formData.price) || 4999,
    expectedPrice: Number(formData.expectedPrice) || 6999,
    inventoryTotal: Number(formData.inventoryTotal) || 50,
    inventorySold: 0,
    limitedBatchSize: 50,
    batchClaimedCount: 12,
    currentViewersCount: 45,
    recommendedBatchSize: 500,
    breakevenUnits: 120,
    cartPurchaseRate: 18.5,
    logisticsModel: formData.logisticsModel,
    manufacturingStatus: formData.manufacturingStatus,
    targetAudience: formData.targetAudience,
    validationObjective: formData.validationObjective,
    isApprovedByAdmin: true,
    isGraduatedToMarketplace: false,
    isFeatured: false,
    isSponsored: false,
    createdAt: new Date().toISOString(),
    views: 120,
    uniqueVisitors: 95,
    waitlistCount: 25,
    preOrdersCount: 12,
    ordersCount: 12,
    totalRevenue: Number(formData.price) * 12,
    cac: 450,
    aov: Number(formData.price),
    conversionRate: 4.2,
    refundRate: 0.0,
    commissionRate: 6,
    adMetrics: {
      activePackage: formData.validationPackage,
      adSpend: VALIDATION_PACKAGE_TIERS[formData.validationPackage].adSpendAllocation,
      impressions: 12000,
      clicks: 480,
      ctr: 4.0,
      cpc: 10.4,
      cac: 450,
      roas: 2.4,
    },
    validationScore: {
      overall: 78,
      demand: 82,
      conversion: 76,
      customerSatisfaction: 90,
      unitEconomics: 75,
      fomoUrgency: 80,
    },
    recommendations: [],
    feedbackThemes: [],
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 font-sans">
      {/* Wizard Header */}
      <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 shadow-xl space-y-4 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-[#489cff] font-extrabold text-xs uppercase tracking-wider">
              Validation Lab Creator
            </span>
            <h1 className="text-3xl font-extrabold text-white">Create Startup Validation Listing</h1>
            <p className="text-sm text-gray-400">
              Test real demand with Zero-Inventory pre-orders & Meta Ads before investing in tooling or inventory.
            </p>
          </div>
          <span className="text-sm font-extrabold text-gray-400">Step {currentStep} of 5</span>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {['1. Startup Info', '2. Stage & Inventory', '3. Logistics', '4. Meta Ads Pack', '5. Launch Lab'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isDone = currentStep > stepNum;
            return (
              <div
                key={label}
                onClick={() => setCurrentStep(stepNum)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#489cff] text-white border-[#489cff] shadow-lg shadow-blue-500/20'
                    : isDone
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-white/5 text-gray-400 border-white/10'
                }`}
              >
                <div className="text-[10px] font-bold uppercase">Step {stepNum}</div>
                <div className="text-xs font-bold truncate">{label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Startup Model & Business Stage */}
      {currentStep === 1 && (
        <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 space-y-6 shadow-xl text-white">
          <h2 className="text-xl font-extrabold text-white">1. Brand & Business Stage</h2>

          {/* Business Stage Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Current Startup Stage
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { key: 'idea', label: 'Idea Stage', desc: 'Concept & wireframes only' },
                { key: 'prototype', label: 'Prototype Stage', desc: '3D mockup / working sample' },
                { key: 'low_inventory', label: 'Low/Zero Inventory', desc: 'Micro-run (10-50 units)' },
              ].map((st) => (
                <div
                  key={st.key}
                  onClick={() => updateField('businessStage', st.key)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                    formData.businessStage === st.key
                      ? 'border-[#489cff] bg-blue-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{st.label}</div>
                  <div className="text-[11px] text-gray-400">{st.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {STARTUP_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                onClick={() => updateField('startupType', cat.key)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  formData.startupType === cat.key
                    ? 'border-[#489cff] bg-blue-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-white">{cat.label}</span>
                  {formData.startupType === cat.key && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Product Title *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Company / Brand Name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-300 mb-1">Tagline / Core Value Hook *</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </div>

          {/* Micro-Landing Page URL Slug Preview */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="w-4 h-4 text-[#489cff]" />
              <span>Public Micro-Landing URL:</span>
            </div>
            <div className="font-mono text-[#489cff] font-bold">venturely.io/v/{slug}</div>
          </div>
        </div>
      )}

      {/* Step 2: Zero Inventory Mode & Pricing */}
      {currentStep === 2 && (
        <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 space-y-6 shadow-xl text-white">
          <h2 className="text-xl font-extrabold text-white">2. Zero-Inventory Mode & Pre-Order Price</h2>

          {/* Inventory Mode Radio */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400">
              Inventory Strategy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => updateField('inventoryMode', 'zero')}
                className={`p-4 rounded-2xl border cursor-pointer space-y-1 ${
                  formData.inventoryMode === 'zero'
                    ? 'border-[#489cff] bg-blue-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400'
                }`}
              >
                <div className="font-bold text-xs text-white">Zero Inventory (Recommended)</div>
                <div className="text-[11px] text-gray-400">Pre-order reservation & VIP waitlist test only</div>
              </div>

              <div
                onClick={() => updateField('inventoryMode', 'limited')}
                className={`p-4 rounded-2xl border cursor-pointer space-y-1 ${
                  formData.inventoryMode === 'limited'
                    ? 'border-[#489cff] bg-blue-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400'
                }`}
              >
                <div className="font-bold text-xs text-white">Limited Batch (10-50 units)</div>
                <div className="text-[11px] text-gray-400">Micro prototype run ready to ship</div>
              </div>

              <div
                onClick={() => updateField('inventoryMode', 'full')}
                className={`p-4 rounded-2xl border cursor-pointer space-y-1 ${
                  formData.inventoryMode === 'full'
                    ? 'border-[#489cff] bg-blue-500/20 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400'
                }`}
              >
                <div className="font-bold text-xs text-white">Full Scale Inventory</div>
                <div className="text-[11px] text-gray-400">100+ units in warehouse</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Validation Test Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => updateField('price', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Expected Retail Price (₹) *</label>
              <input
                type="number"
                value={formData.expectedPrice}
                onChange={(e) => updateField('expectedPrice', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Test Batch Cap (Units) *</label>
              <input
                type="number"
                value={formData.inventoryTotal}
                onChange={(e) => updateField('inventoryTotal', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Problem Being Solved *</label>
              <textarea
                rows={2}
                value={formData.problem}
                onChange={(e) => updateField('problem', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Solution & Key Specs *</label>
              <textarea
                rows={2}
                value={formData.solution}
                onChange={(e) => updateField('solution', e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-white/15 text-white text-xs focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Logistics Setup */}
      {currentStep === 3 && (
        <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 space-y-6 shadow-xl text-white">
          <h2 className="text-xl font-extrabold text-white">3. Logistics & Fulfillment Model</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => updateField('logisticsModel', 'SELF_FULFILLED')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                formData.logisticsModel === 'SELF_FULFILLED'
                  ? 'border-[#489cff] bg-blue-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-gray-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-white text-base">Merchant Self-Fulfillment</h4>
                {formData.logisticsModel === 'SELF_FULFILLED' && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                You pack and ship directly using your own courier (Shiprocket, Delhivery, etc.). Zero platform logistics fee.
              </p>
              <div className="text-xs font-bold text-emerald-400">₹0 Extra Platform Shipping Fee</div>
            </div>

            <div
              onClick={() => updateField('logisticsModel', 'VENTURELY_SUPPORTED')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                formData.logisticsModel === 'VENTURELY_SUPPORTED'
                  ? 'border-[#489cff] bg-blue-500/20 text-white'
                  : 'border-white/10 bg-white/5 text-gray-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-white text-base">Shiprocket Partner Logistics</h4>
                {formData.logisticsModel === 'VENTURELY_SUPPORTED' && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Automated shipping label generation, courier doorstep pickup, and real-time tracking for buyers.
              </p>
              <div className="text-xs font-bold text-purple-400">Flat ₹49 Surface / ₹89 Express per unit</div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Meta Ads Package */}
      {currentStep === 4 && (
        <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 space-y-6 shadow-xl text-white">
          <h2 className="text-xl font-extrabold text-white">4. Select Meta Test Ads Package</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(VALIDATION_PACKAGE_TIERS).map((pkg) => (
              <div
                key={pkg.tier}
                onClick={() => updateField('validationPackage', pkg.tier)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                  formData.validationPackage === pkg.tier
                    ? 'border-[#489cff] bg-blue-500/20 text-white shadow-xl shadow-blue-500/10'
                    : 'border-white/10 bg-white/5 text-gray-400'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-white text-base">{pkg.packageName}</h4>
                    {formData.validationPackage === pkg.tier && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
                  </div>
                  <div className="text-2xl font-black text-white">{formatCurrency(pkg.price)}</div>
                  <div className="text-xs font-bold text-emerald-400">Ad Spend Injection: {formatCurrency(pkg.adSpendAllocation)}</div>
                  <p className="text-xs text-gray-400">Drives ~{pkg.targetVisitors} verified shoppers to your micro-landing page.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Review & Publish */}
      {currentStep === 5 && (
        <div className="bg-slate-900 border border-white/15 rounded-3xl p-8 space-y-6 shadow-xl text-white">
          <h2 className="text-xl font-extrabold text-white">5. Review & Launch Validation Campaign</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-400 uppercase">Product Card Preview</h3>
              <ProductCard product={previewProduct} />
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-extrabold text-white text-lg">Validation Campaign Summary</h3>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex justify-between"><span>Startup Stage:</span><strong className="text-white">{formData.businessStage.toUpperCase()}</strong></div>
                  <div className="flex justify-between"><span>Inventory Mode:</span><strong className="text-emerald-400">{formData.inventoryMode.toUpperCase()}</strong></div>
                  <div className="flex justify-between"><span>Public URL:</span><strong className="font-mono text-[#489cff]">venturely.io/v/{slug}</strong></div>
                  <div className="flex justify-between"><span>Meta Ad Package:</span><strong className="text-purple-400">{VALIDATION_PACKAGE_TIERS[formData.validationPackage].packageName}</strong></div>
                  <div className="flex justify-between"><span>Ad Credit Budget:</span><strong className="text-emerald-400">{formatCurrency(VALIDATION_PACKAGE_TIERS[formData.validationPackage].adSpendAllocation)}</strong></div>
                  <div className="flex justify-between"><span>Marketplace Fee:</span><strong className="text-[#489cff]">5–7% Commission on Launch</strong></div>
                </div>
              </div>

              <button
                onClick={handlePublish}
                className="w-full py-4 rounded-2xl bg-[#489cff] hover:bg-blue-600 font-extrabold text-white text-sm shadow-xl shadow-blue-500/25 transition-all cursor-pointer"
              >
                Launch Validation Lab ({formatCurrency(VALIDATION_PACKAGE_TIERS[formData.validationPackage].price)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex justify-between items-center">
        {currentStep > 1 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-5 py-2.5 rounded-xl border border-white/20 font-bold text-xs text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {currentStep < 5 && (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="px-6 py-2.5 rounded-xl bg-[#489cff] hover:bg-blue-600 font-bold text-xs text-white flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
