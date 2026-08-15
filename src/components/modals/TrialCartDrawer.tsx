'use client';

import React, { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { createOrder } from '@/lib/data';
import { X, Gift, Trash2, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export function TrialCartDrawer() {
  const {
    trialCart,
    userTrialPoints,
    maxTrialPoints,
    removeFromTrialCart,
    clearTrialCart,
    isTrialDrawerOpen,
    setIsTrialDrawerOpen,
    showToast,
  } = useRole();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isTrialDrawerOpen) return null;

  const shippingFee = 199;

  const handleOrderTrialPack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address || trialCart.length === 0) return;

    trialCart.forEach((item) => {
      createOrder({
        productId: item.product.id,
        productName: item.product.name,
        customerName: name,
        customerEmail: email,
        shippingAddress: address,
        amount: shippingFee / trialCart.length,
        quantity: 1,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        isTrialOrder: true,
        trialPointsSpent: item.pointsCost,
      });
    });

    setOrderComplete(true);
    showToast('Trial Pack ordered! 100% Cashback unlocked upon feedback.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" onClick={() => setIsTrialDrawerOpen(false)}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" onClick={(e) => e.stopPropagation()}>
        <div className="w-screen max-w-md bg-white flex flex-col justify-between animate-slideInRight shadow-2xl">
          {/* Header — Smytten mint green accent */}
          <div className="p-5 border-b border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#b9fff5' }}>
                  <Gift className="w-4 h-4 text-[#0f1628]" />
                </div>
                <h3 className="font-bold text-[16px] text-black">Your Trial Pack</h3>
              </div>
              <button onClick={() => setIsTrialDrawerOpen(false)} className="text-gray-400 hover:text-black p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 6-Point Dot Progress */}
            <div className="flex items-center gap-2">
              {Array.from({ length: maxTrialPoints }).map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border"
                  style={{
                    background: i < (maxTrialPoints - userTrialPoints) ? '#489cff' : '#f3f4f6',
                    color: i < (maxTrialPoints - userTrialPoints) ? '#fff' : '#9ca3af',
                    borderColor: i < (maxTrialPoints - userTrialPoints) ? '#489cff' : '#e5e7eb',
                  }}
                >
                  {i + 1}
                </div>
              ))}
              <span className="text-[12px] text-gray-500 ml-2">{userTrialPoints} points left</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {!orderComplete ? (
              !isCheckoutStep ? (
                <>
                  {trialCart.length > 0 ? (
                    <div className="space-y-3">
                      {trialCart.map(({ product, pointsCost }) => (
                        <div key={product.id} className="smytten-card p-3 flex items-center gap-3">
                          <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-xl" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-black text-[13px] truncate">{product.name}</h4>
                            <p className="text-[11px] text-gray-500 truncate">{product.trialSizeDescription || 'Trial Pack'}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: '#b9fff5', color: '#0f1628' }}>
                              {pointsCost} Point{pointsCost > 1 ? 's' : ''}
                            </span>
                          </div>
                          <button onClick={() => removeFromTrialCart(product.id)} className="text-gray-300 hover:text-red-500 p-1 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* Cashback Banner */}
                      <div className="p-3.5 rounded-2xl space-y-1" style={{ background: '#b9fff5' }}>
                        <div className="flex items-center gap-1.5 font-bold text-[13px] text-[#0f1628]">
                          <Sparkles className="w-4 h-4" /> 100% Cashback Guarantee
                        </div>
                        <p className="text-[11px] text-gray-700 leading-relaxed">
                          Submit feedback after trying your samples to earn full cashback towards full-sized purchases!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center space-y-3">
                      <Gift className="w-12 h-12 text-gray-200 mx-auto" />
                      <h4 className="font-bold text-black text-[15px]">Your Trial Pack is Empty</h4>
                      <p className="text-[12px] text-gray-500 max-w-xs mx-auto">
                        Browse products and click "Add to Trial" to spend your 6 trial points!
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <form onSubmit={handleOrderTrialPack} className="space-y-3">
                  <h4 className="font-bold text-black text-[14px] border-b border-gray-100 pb-2">Shipping Information</h4>
                  <div>
                    <label className="block font-medium text-gray-700 text-[12px] mb-1">Full Name *</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#489cff]" />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 text-[12px] mb-1">Email *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#489cff]" />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 text-[12px] mb-1">Delivery Address *</label>
                    <textarea rows={2} required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full address"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#489cff]" />
                  </div>

                  <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[12px]">
                    <div className="flex justify-between text-gray-600"><span>Sample Product Cost:</span><span className="text-green-600 font-bold">FREE</span></div>
                    <div className="flex justify-between text-gray-600"><span>Shipping & Packaging:</span><span>₹{shippingFee}</span></div>
                    <div className="flex justify-between font-bold text-black text-[13px] border-t pt-1.5"><span>Total:</span><span className="text-[#489cff]">₹{shippingFee}</span></div>
                  </div>

                  <button type="submit" className="smytten-btn w-full justify-center mt-2">
                    Confirm & Ship Trial Pack (₹{shippingFee})
                  </button>
                </form>
              )
            ) : (
              <div className="py-14 text-center space-y-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: '#b9fff5' }}>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-black">Trial Pack Dispatched!</h3>
                <p className="text-[13px] text-gray-500 max-w-xs mx-auto">
                  Your samples are being prepared. Expect delivery in 3–5 business days.
                </p>
                <button onClick={() => { clearTrialCart(); setIsCheckoutStep(false); setOrderComplete(false); setIsTrialDrawerOpen(false); }}
                  className="smytten-btn">Done & Close</button>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {trialCart.length > 0 && !orderComplete && (
            <div className="p-5 border-t border-gray-100 bg-[#f9fafb] space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-gray-500">Trial Samples:</span>
                <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-gray-500">Shipping:</span>
                <span className="font-bold text-black">₹{shippingFee}</span>
              </div>

              {!isCheckoutStep ? (
                <button onClick={() => setIsCheckoutStep(true)} className="smytten-btn w-full justify-center">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={() => setIsCheckoutStep(false)} className="w-full py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-[13px] hover:bg-gray-50 cursor-pointer">
                  Back to Selection
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
