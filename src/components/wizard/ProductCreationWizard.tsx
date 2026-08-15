'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { ProductStage } from '@/types';
import { PRODUCT_CATEGORIES, STAGES } from '@/lib/constants';
import { ProductCard } from '../product/ProductCard';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Rocket, ShieldCheck } from 'lucide-react';

export function ProductCreationWizard() {
  const router = useRouter();
  const { setActiveProductId, showToast } = useRole();
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
    stage: '0_IDEA' as ProductStage,
    price: 4999,
    expectedPrice: 4999,
    inventoryTotal: 100,
    manufacturingStatus: '3D Printed Prototype & Sensor Circuitry Tested',
    targetAudience: 'Executives, night-shift workers, & sleep enthusiasts',
    validationObjective: 'Test waitlist demand & target price acceptance',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
  });

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const created = addProduct({
      ...formData,
      images: [formData.imageUrl],
    });
    setActiveProductId(created.id);
    showToast(`Startup "${created.name}" published for validation!`);
    router.push('/founder/dashboard');
  };

  // Preview mock product object
  const previewProduct: any = {
    id: 'preview_temp',
    name: formData.productName || 'Untitled Startup',
    slug: 'preview',
    tagline: formData.tagline || 'Revolutionary new product',
    description: formData.description,
    problem: formData.problem,
    solution: formData.solution,
    category: formData.category,
    stage: formData.stage,
    founderName: formData.founderName,
    companyName: formData.companyName,
    founderEmail: formData.founderEmail,
    images: [formData.imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
    price: Number(formData.price) || 4999,
    inventoryTotal: Number(formData.inventoryTotal) || 100,
    inventorySold: 0,
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
    waitlistCount: 14,
    interestVotes: 32,
    preOrdersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    cac: 0,
    aov: Number(formData.price) || 4999,
    roas: 0,
    conversionRate: 8.5,
    refundRate: 0,
    sellThroughRate: 0,
    salesVelocityPerDay: 0,
    validationScore: { overall: 68, demand: 75, conversion: 65, customerSatisfaction: 85, unitEconomics: 60, momentum: 62 },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-blue-600 font-mono text-xs uppercase font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Startup Creation & Validation Campaign Setup</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">Submit Startup for Customer Validation</h1>
        <p className="text-xs text-slate-500 mt-1">
          Test real customer demand, measure conversion, and receive automated next-step recommendations before committing capital.
        </p>

        {/* Step Indicator */}
        <div className="grid grid-cols-5 gap-2 mt-6 pt-6 border-t border-slate-100">
          {[
            { num: 1, label: 'Founder Info' },
            { num: 2, label: 'Product Specs' },
            { num: 3, label: 'Product Stage' },
            { num: 4, label: 'Pricing & Batch' },
            { num: 5, label: 'Objective & Preview' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`cursor-pointer p-2 rounded-lg border text-xs text-center transition-all ${
                currentStep === s.num
                  ? 'border-slate-900 bg-slate-900 text-white font-bold shadow-sm'
                  : currentStep > s.num
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-medium'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <div className="font-mono text-[10px] opacity-75">Step 0{s.num}</div>
              <div className="line-clamp-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Form + Live Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b pb-2">Step 1 — Founder & Company Information</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Founder Full Name *</label>
                  <input
                    type="text"
                    value={formData.founderName}
                    onChange={(e) => updateField('founderName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Company / Entity Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Founder Email *</label>
                  <input
                    type="email"
                    value={formData.founderEmail}
                    onChange={(e) => updateField('founderEmail', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b pb-2">Step 2 — Product Information & Specs</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => updateField('productName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tagline (One-sentence hook) *</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => updateField('tagline', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                    >
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Product Image URL</label>
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => updateField('imageUrl', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={formData.problem}
                    onChange={(e) => updateField('problem', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Solution Description</label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) => updateField('solution', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b pb-2">Step 3 — Select Current Product Stage</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {(
                  [
                    '0_IDEA',
                    '1_CONCEPT',
                    '2_PROTOTYPE',
                    '3_MVP',
                    '4_EARLY_PRODUCT',
                    '5_D2C_LAUNCH',
                  ] as ProductStage[]
                ).map((stg) => {
                  const info = STAGES[stg];
                  const isSelected = formData.stage === stg;
                  return (
                    <div
                      key={stg}
                      onClick={() => updateField('stage', stg)}
                      className={`cursor-pointer p-4 rounded-xl border text-left transition-all space-y-1 ${
                        isSelected
                          ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{info.label}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {info.shortLabel}
                        </span>
                      </div>
                      <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {info.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b pb-2">Step 4 — Pricing & Production Batch</h3>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Target Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateField('price', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Initial Batch Units (Limited Launch)</label>
                    <input
                      type="number"
                      value={formData.inventoryTotal}
                      onChange={(e) => updateField('inventoryTotal', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Manufacturing & Tooling Status</label>
                  <input
                    type="text"
                    value={formData.manufacturingStatus}
                    onChange={(e) => updateField('manufacturingStatus', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Target Customer Audience Profile</label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => updateField('targetAudience', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-lg border-b pb-2">Step 5 — Select Validation Objective</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Primary Objective for this Validation Campaign</label>
                  <select
                    value={formData.validationObjective}
                    onChange={(e) => updateField('validationObjective', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none bg-white"
                  >
                    <option value="Test waitlist demand & price acceptance">Test waitlist demand & price acceptance</option>
                    <option value="Secure pre-orders for initial production run">Secure pre-orders for initial production run</option>
                    <option value="Test sell-through rate & CAC on limited inventory batch">Test sell-through rate & CAC on limited inventory batch</option>
                    <option value="Graduate validated D2C brand into Curated Marketplace">Graduate validated D2C brand into Curated Marketplace</option>
                  </select>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Ready for Controlled Exposure Launch</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Upon publishing, your product will enter the platform&apos;s validation telemetry system. Viewers will interact according to your product stage ({STAGES[formData.stage].label}).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : <div />}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-5 py-2 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-1"
              >
                <span>Continue to Step 0{currentStep + 1}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-md flex items-center gap-1.5"
              >
                <Rocket className="w-4 h-4" />
                Publish Startup Validation Campaign
              </button>
            )}
          </div>
        </div>

        {/* Live Card Preview Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase">Live Card Preview</span>
            <span className="text-[11px] font-mono text-blue-600 font-medium">Updates in real-time</span>
          </div>

          <ProductCard product={previewProduct} />

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-900">Stage Action CTA:</div>
            <p className="font-mono text-blue-600 font-semibold">{STAGES[formData.stage].actionText}</p>
            <p className="text-[11px] text-slate-500 pt-1">
              Customers viewing this product in Stage <strong>{STAGES[formData.stage].shortLabel}</strong> will trigger stage-specific customer interest events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
