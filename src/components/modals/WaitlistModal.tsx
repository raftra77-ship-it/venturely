'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { addWaitlistEntry } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { X, Users, CheckCircle2, Sparkles, Flame, Copy } from 'lucide-react';

interface WaitlistModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ product, isOpen, onClose }: WaitlistModalProps) {
  const { showToast } = useRole();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [willingness, setWillingness] = useState(product.price);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const entry = addWaitlistEntry({
      productId: product.id,
      productName: product.name,
      customerEmail: email,
      customerName: name,
      willingnessToPay: Number(willingness),
      feedbackNote: feedback,
    });

    setReferralCode(entry.referralCode);
    setSubmitted(true);
    showToast(`Joined VIP waitlist for ${product.name}! Referral code generated.`);
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
            <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>VIP Referral Waitlist</span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-black">Join {product.name} VIP Access</h3>
              <p className="text-gray-500 text-xs mt-1">
                Lock in early pricing. Invite 3 founders or friends using your referral code to skip 150 spots in line!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Willingness to Pay (₹)</label>
                <input
                  type="number"
                  value={willingness}
                  onChange={(e) => setWillingness(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Feature Wish or Feedback (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="What feature would make this an instant buy for you?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#489cff]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 font-bold">
                {product.waitlistCount || 25} founders on waitlist
              </span>
              <button
                type="submit"
                className="smytten-btn px-6 py-2.5 bg-[#0f1628] hover:bg-black text-white font-extrabold text-xs shadow-md"
              >
                Join VIP Waitlist
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-black">You&apos;re on the VIP Waitlist!</h3>
            <p className="text-gray-600 text-xs max-w-sm mx-auto leading-relaxed">
              Your VIP Referral Code is <strong className="text-black bg-purple-50 px-2 py-1 rounded-md">{referralCode}</strong>. Share with 3 friends to boost your rank!
            </p>
            <button
              onClick={onClose}
              className="smytten-btn px-6 py-2.5 bg-[#0f1628] hover:bg-black text-white text-xs font-bold"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
