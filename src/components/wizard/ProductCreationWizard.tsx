'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { ProductStage, StartupCategory, LogisticsModel, ValidationPackageTier } from '@/types';
import { PRODUCT_CATEGORIES, STARTUP_CATEGORIES, VALIDATION_PACKAGE_TIERS, LOGISTICS_OPTIONS } from '@/lib/constants';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Rocket, ShieldCheck, Truck, Megaphone, Box } from 'lucide-react';
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

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg = VALIDATION_PACKAGE_TIERS[formData.validationPackage];
    const created = addProduct({
      ...formData,
      name: formData.productName,
      slug: formData.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      images: [formData.imageUrl],
      inventorySold: 0,
      isApprovedByAdmin: true,
      isGraduatedToMarketplace: false,
      isFeatured: true,
      isSponsored: false,
      logisticsModel: formData.logisticsModel,
      shippingEstimateDays: formData.logisticsModel === 'VENTURELY_SUPPORTED' ? '3-4 Business Days' : 'Merchant Direct Delivery',
      shippingFee: formData.logisticsModel === 'VENTURELY_SUPPORTED' ? 49 : 0,
    });

    setActiveProductId(created.id);
    refreshProducts();
    showToast(`Startup "${created.name}" published for validation campaign!`);
    router.push('/founder/dashboard');
  };

  const previewProduct: any = {
    id: 'preview_temp',
    name: formData.productName || 'Untitled Startup',
    slug: 'preview',
    tagline: formData.tagline || 'Revolutionary new product',
    description: formData.description,
    problem: formData.problem,
    solution: formData.solution,
    category: formData.category,
    startupType: formData.startupType,
    stage: formData.stage,
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
      adSpend: pkgAdSpend(formData.validationPackage),
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

  function pkgAdSpend(tier: ValidationPackageTier) {
    return VALIDATION_PACKAGE_TIERS[tier].adSpendAllocation;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Wizard Header */}
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-[#489cff] font-bold text-xs uppercase tracking-wider">
              Startup Campaign Creator
            </span>
            <h1 className="text-3xl font-extrabold text-black">Launch Validation Campaign</h1>
            <p className="text-sm text-gray-500">Target real customer audience, measure cart purchase rates & lock in batch pre-orders.</p>
          </div>
          <span className="text-sm font-extrabold text-gray-400">Step {currentStep} of 5</span>
        </div>

        {/* Step Indicator */}
        <div className="grid grid-cols-5 gap-2 pt-2">
          {['Startup Model', 'Prototype Stage', 'Logistics Setup', 'Ad Package', 'Review & Launch'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = currentStep === stepNum;
            const isDone = currentStep > stepNum;
            return (
              <div
                key={label}
                onClick={() => setCurrentStep(stepNum)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0f1628] text-white border-[#0f1628] shadow-md'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                <div className="text-[10px] font-bold uppercase">Step {stepNum}</div>
                <div className="text-xs font-bold truncate">{label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Startup Model */}
      {currentStep === 1 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-black">1. Select Startup Business Model</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STARTUP_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                onClick={() => updateField('startupType', cat.key)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                  formData.startupType === cat.key
                    ? 'border-[#489cff] bg-blue-50/40 ring-2 ring-[#489cff]/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${cat.badge}`}>{cat.label}</span>
                  {formData.startupType === cat.key && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Product / Startup Name *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => updateField('productName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company / Brand Name *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Tagline / Problem Statement *</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => updateField('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Prototype & Inventory Stage */}
      {currentStep === 2 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-black">2. Inventory & Prototype Stage</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Initial Validation Inventory (Units) *</label>
              <input
                type="number"
                value={formData.inventoryTotal}
                onChange={(e) => updateField('inventoryTotal', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
              <span className="text-[11px] text-gray-400">e.g. 50 units for limited batch</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Validation Pre-Order Price (₹) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => updateField('price', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Expected Retail Price (₹) *</label>
              <input
                type="number"
                value={formData.expectedPrice}
                onChange={(e) => updateField('expectedPrice', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Manufacturing & Prototype Status *</label>
              <input
                type="text"
                value={formData.manufacturingStatus}
                onChange={(e) => updateField('manufacturingStatus', e.target.value)}
                placeholder="e.g. 3D Printed Prototype assembled — 50 units micro-run"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description *</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Logistics Setup */}
      {currentStep === 3 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-black">3. Fulfillment & Logistics Preference</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => updateField('logisticsModel', 'SELF_FULFILLED')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                formData.logisticsModel === 'SELF_FULFILLED'
                  ? 'border-[#489cff] bg-blue-50/40 ring-2 ring-[#489cff]/20'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-black text-base">Merchant Self-Fulfillment</h4>
                {formData.logisticsModel === 'SELF_FULFILLED' && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                You pack and ship directly using your own courier account. No platform logistics charge.
              </p>
              <div className="text-xs font-bold text-emerald-600">₹0 Extra Platform Shipping Fee</div>
            </div>

            <div
              onClick={() => updateField('logisticsModel', 'VENTURELY_SUPPORTED')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                formData.logisticsModel === 'VENTURELY_SUPPORTED'
                  ? 'border-[#489cff] bg-blue-50/40 ring-2 ring-[#489cff]/20'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-black text-base">Venturely Platform Logistics</h4>
                {formData.logisticsModel === 'VENTURELY_SUPPORTED' && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Use Venturely integrated dispatch. Automated shipping label generation, pickup scheduling & tracking.
              </p>
              <div className="text-xs font-bold text-purple-700">Flat ₹49 Surface / ₹89 Express per unit</div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Managed Validation Ad Package */}
      {currentStep === 4 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-black">4. Select Validation Ad Package</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(VALIDATION_PACKAGE_TIERS).map((pkg) => (
              <div
                key={pkg.tier}
                onClick={() => updateField('validationPackage', pkg.tier)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all space-y-4 flex flex-col justify-between ${
                  formData.validationPackage === pkg.tier
                    ? 'border-[#489cff] bg-blue-50/40 ring-2 ring-[#489cff]/20'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-black text-base">{pkg.packageName}</h4>
                    {formData.validationPackage === pkg.tier && <CheckCircle2 className="w-5 h-5 text-[#489cff]" />}
                  </div>
                  <div className="text-2xl font-extrabold text-black">{formatCurrency(pkg.price)}</div>
                  <div className="text-xs font-bold text-emerald-600">Ad Spend Credit: {formatCurrency(pkg.adSpendAllocation)}</div>
                  <p className="text-xs text-gray-600">Targeting ~{pkg.targetVisitors} live visitor impressions.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Review & Launch */}
      {currentStep === 5 && (
        <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-black">5. Review & Launch Campaign</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-700 uppercase">Card Preview on Platform</h3>
              <ProductCard product={previewProduct} />
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-extrabold text-black text-lg">Validation Campaign Details</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-700"><span>Startup Model:</span><strong className="text-black">{formData.startupType}</strong></div>
                  <div className="flex justify-between text-gray-700"><span>Logistics Option:</span><strong className="text-black">{formData.logisticsModel}</strong></div>
                  <div className="flex justify-between text-gray-700"><span>Validation Package:</span><strong className="text-purple-700 font-extrabold">{VALIDATION_PACKAGE_TIERS[formData.validationPackage].packageName}</strong></div>
                  <div className="flex justify-between text-gray-700"><span>Ad Credit Budget:</span><strong className="text-emerald-600">{formatCurrency(VALIDATION_PACKAGE_TIERS[formData.validationPackage].adSpendAllocation)}</strong></div>
                  <div className="flex justify-between text-gray-700"><span>Marketplace Commission:</span><strong className="text-[#489cff]">5–7% Commission After Graduation</strong></div>
                </div>
              </div>

              <button
                onClick={handlePublish}
                className="smytten-btn w-full justify-center py-3.5 bg-[#489cff] hover:bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-500/20"
              >
                Confirm & Launch Campaign ({formatCurrency(VALIDATION_PACKAGE_TIERS[formData.validationPackage].price)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wizard Footer Controls */}
      <div className="flex justify-between items-center">
        {currentStep > 1 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {currentStep < 5 && (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="px-6 py-2.5 rounded-xl bg-[#0f1628] hover:bg-black font-bold text-xs text-white flex items-center gap-2 cursor-pointer shadow-md"
          >
            Next Step <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
