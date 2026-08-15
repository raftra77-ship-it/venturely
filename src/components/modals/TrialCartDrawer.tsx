'use client';

import React, { useState } from 'react';
import { useRole } from '@/context/RoleContext';
import { addOrder } from '@/lib/data';
import { formatCurrency } from '@/lib/format';
import { X, ShoppingBag, Trash2, CheckCircle2, Sparkles, ArrowRight, Truck, ShieldCheck, Flame } from 'lucide-react';

export function TrialCartDrawer() {
  const {
    validationCart,
    removeFromValidationCart,
    clearValidationCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    showToast,
  } = useRole();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState('');

  if (!isCartDrawerOpen) return null;

  const totalItemAmount = validationCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const estimatedShipping = validationCart.some(i => i.product.logisticsModel === 'VENTURELY_SUPPORTED') ? 49 : 0;
  const grandTotal = totalItemAmount + estimatedShipping;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || (validationCart.some(i => i.product.startupType === 'D2C') && !address) || validationCart.length === 0) return;

    let lastOrderNum = '';
    validationCart.forEach((item) => {
      const order = addOrder({
        productId: item.product.id,
        productName: item.product.name,
        customerName: name,
        customerEmail: email,
        shippingAddress: address || 'Digital Access Account',
        amount: item.product.price * item.quantity,
        quantity: item.quantity,
        logisticsModel: item.product.logisticsModel,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        isPreOrder: true,
      });
      lastOrderNum = order.orderNumber;
    });

    setConfirmedOrderNumber(lastOrderNum);
    setOrderComplete(true);
    showToast('Validation Pre-Order confirmed! Founder notified.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn" onClick={() => setIsCartDrawerOpen(false)}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" onClick={(e) => e.stopPropagation()}>
        <div className="w-screen max-w-md bg-white flex flex-col justify-between animate-slideInRight shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0f1628] text-white flex items-center justify-center font-bold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[16px] text-black">Validation Pre-Order Cart</h3>
                  <p className="text-[11px] text-gray-500">Direct Founder Prototype & Micro-Batch Reserve</p>
                </div>
              </div>
              <button onClick={() => setIsCartDrawerOpen(false)} className="text-gray-400 hover:text-black p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {!orderComplete ? (
              !isCheckoutStep ? (
                <>
                  {validationCart.length > 0 ? (
                    <div className="space-y-3">
                      {validationCart.map(({ product, quantity }) => (
                        <div key={product.id} className="smytten-card p-3.5 flex items-center gap-3">
                          <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0f1628] text-white">
                                {product.startupType}
                              </span>
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                                {product.batchClaimedCount}/{product.limitedBatchSize} Slots Filled
                              </span>
                            </div>
                            <h4 className="font-bold text-black text-[13px] truncate">{product.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-extrabold text-[#489cff] text-[14px]">
                                {formatCurrency(product.price * quantity)}
                              </span>
                              <span className="text-[11px] text-gray-400">Qty: {quantity}</span>
                            </div>
                          </div>
                          <button onClick={() => removeFromValidationCart(product.id)} className="text-gray-300 hover:text-red-500 p-1.5 cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}

                      {/* FOMO Urgency Card */}
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[13px] text-amber-900">
                          <Flame className="w-4 h-4 text-amber-600 animate-pulse" /> Price-Lock Guarantee
                        </div>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          Your reservation price is locked in for this pre-order. Price increases after batch production completes.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-16 text-center space-y-3">
                      <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto" />
                      <h4 className="font-bold text-black text-[15px]">Your Validation Cart is Empty</h4>
                      <p className="text-[12px] text-gray-500 max-w-xs mx-auto">
                        Explore startup prototypes, SaaS demos, and physical D2C micro-batches to reserve early access!
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                  <h4 className="font-bold text-black text-[14px] border-b border-gray-100 pb-2">Buyer Contact & Fulfillment</h4>
                  <div>
                    <label className="block font-medium text-gray-700 text-[12px] mb-1">Full Name *</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Kabir Sharma"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#489cff]" />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 text-[12px] mb-1">Email Address *</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kabir@example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#489cff]" />
                  </div>
                  
                  {validationCart.some(i => i.product.startupType === 'D2C') && (
                    <div>
                      <label className="block font-medium text-gray-700 text-[12px] mb-1">Physical Shipping Address *</label>
                      <textarea rows={2} required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House, street, city, pin code..."
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-[13px] focus:outline-none focus:border-[#489cff]" />
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[12px]">
                    <div className="flex justify-between text-gray-600"><span>Subtotal:</span><span>{formatCurrency(totalItemAmount)}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Estimated Shipping:</span><span>{estimatedShipping > 0 ? formatCurrency(estimatedShipping) : 'FREE'}</span></div>
                    <div className="flex justify-between font-extrabold text-black text-[14px] border-t pt-1.5"><span>Total Pre-Order:</span><span className="text-[#489cff]">{formatCurrency(grandTotal)}</span></div>
                  </div>

                  <button type="submit" className="smytten-btn w-full justify-center mt-2">
                    Confirm Validation Order ({formatCurrency(grandTotal)})
                  </button>
                </form>
              )
            ) : (
              <div className="py-14 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-black">Pre-Order Confirmed!</h3>
                <p className="text-[13px] text-gray-600 max-w-xs mx-auto">
                  Your reservation order <span className="font-bold text-black">#{confirmedOrderNumber}</span> is locked.
                </p>
                <div className="p-3 bg-emerald-50 rounded-xl text-[12px] text-emerald-800 font-medium max-w-xs mx-auto">
                  Cart Purchase Rate analytics updated for founder. You will receive dispatch updates via email.
                </div>
                <button onClick={() => { clearValidationCart(); setIsCheckoutStep(false); setOrderComplete(false); setIsCartDrawerOpen(false); }}
                  className="smytten-btn">Done & Close</button>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {validationCart.length > 0 && !orderComplete && (
            <div className="p-5 border-t border-gray-100 bg-[#f9fafb] space-y-3">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-gray-500">Cart Total:</span>
                <span className="font-extrabold text-black text-[15px]">{formatCurrency(grandTotal)}</span>
              </div>

              {!isCheckoutStep ? (
                <button onClick={() => setIsCheckoutStep(true)} className="smytten-btn w-full justify-center">
                  Proceed to Reserve ({formatCurrency(grandTotal)}) <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={() => setIsCheckoutStep(false)} className="w-full py-2.5 rounded-full border border-gray-300 text-gray-700 font-semibold text-[13px] hover:bg-gray-50 cursor-pointer">
                  Back to Cart
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
