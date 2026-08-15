'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { addOrder } from '@/lib/data';
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

    const order = addOrder({
      productId: product.id,
      productName: product.name,
      customerName: name,
      customerEmail: email,
      shippingAddress: address,
      amount: totalAmount,
      quantity,
      logisticsModel: product.logisticsModel || 'VENTURELY_SUPPORTED',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      isPreOrder: true,
    });

    setOrderNum(order.orderNumber);
    setSubmitted(true);
    showToast(`Validation pre-order ${order.orderNumber} confirmed for ${product.name}!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 text-black font-extrabold text-lg">
              <ShoppingCart className="w-5 h-5 text-[#489cff]" />
              <span>Reserve Validation Pre-Order</span>
            </div>

            {/* Product Summary Row */}
            <div className="flex gap-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-200 items-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-14 h-14 object-cover rounded-xl border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-black text-sm truncate">{product.name}</h4>
                <p className="text-xs text-gray-500">{formatCurrency(product.price)} per unit</p>
                <div className="text-[11px] text-emerald-700 font-bold mt-0.5">
                  Micro-Batch Slot Price Locked
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Shipping Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Street, City, Pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>
            </div>

            {/* Total calculation */}
            <div className="pt-3 border-t border-gray-100 space-y-1 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({quantity} item):</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Fulfillment Handling:</span>
                <span className="text-emerald-600 font-bold">Standard Rate</span>
              </div>
              <div className="flex justify-between font-extrabold text-black text-base pt-1">
                <span>Total Payment:</span>
                <span className="text-[#489cff]">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Buyer Protection</span>
              </div>
              <button
                type="submit"
                className="smytten-btn px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md"
              >
                Confirm Pre-Order ({formatCurrency(totalAmount)})
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Pre-Order Confirmed</span>
              <h3 className="text-2xl font-extrabold text-black mt-1">#{orderNum}</h3>
            </div>
            <p className="text-gray-600 text-xs max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>! Your reservation for <strong>{product.name}</strong> has been logged into the founder's validation dashboard.
            </p>
            <button
              onClick={onClose}
              className="smytten-btn px-6 py-2.5 bg-[#0f1628] hover:bg-black text-white text-xs font-bold"
            >
              Done & Return
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
