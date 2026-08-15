'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { createOrder } from '@/lib/data';
import { formatCurrency } from '@/lib/format';
import { useRole } from '@/context/RoleContext';
import { X, ShoppingCart, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const { showToast } = useRole();
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [orderNum, setOrderNum] = useState('');

  if (!isOpen) return null;

  const totalAmount = product.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return;

    const order = createOrder({
      productId: product.id,
      productName: product.name,
      customerName: name,
      customerEmail: email,
      shippingAddress: address,
      amount: totalAmount,
      quantity,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    });

    setOrderNum(order.orderNumber);
    setSubmitted(true);
    showToast(`Order ${order.orderNumber} confirmed for ${product.name}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span>{product.stage === '2_PROTOTYPE' || product.stage === '3_MVP' ? 'Reserve Pre-Order Unit' : 'Checkout & Order'}</span>
            </div>

            {/* Product Summary Row */}
            <div className="flex gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200 items-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-md border border-slate-200"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{product.name}</h4>
                <p className="text-xs text-slate-500 font-mono">₹{formatCurrency(product.price)} per unit</p>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  {product.stage === '4_EARLY_PRODUCT' ? `Limited inventory: ${product.inventoryTotal - product.inventorySold} remaining` : 'Direct Founder Fulfilment'}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address (Order Confirmation) *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Shipping Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Building No, Street, City, State, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="text-xs font-medium text-slate-700">Quantity</label>
                <div className="flex items-center gap-2 border border-slate-300 rounded-lg px-2 py-1 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-sm text-slate-700 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="font-mono text-sm font-semibold px-2">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-sm text-slate-700 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Total calculation */}
            <div className="pt-3 border-t border-slate-200 space-y-1 text-sm">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Subtotal ({quantity} item)</span>
                <span>₹{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Shipping & Validation Handling</span>
                <span className="text-emerald-700 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 text-base pt-1">
                <span>Total Payment</span>
                <span className="text-blue-600">₹{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Buyer Protection Guarantee</span>
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-md"
              >
                Complete Payment & Order
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest font-bold">Order Confirmed</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{orderNum}</h3>
            </div>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Thank you, <strong>{name}</strong>! Your order for <strong>{product.name}</strong> has been logged. You will receive fulfillment updates as the founder processes batch shipment.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
