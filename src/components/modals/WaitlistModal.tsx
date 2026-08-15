'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { joinWaitlist } from '@/lib/data';
import { useRole } from '@/context/RoleContext';
import { X, Users, CheckCircle2, Sparkles } from 'lucide-react';

interface WaitlistModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ product, isOpen, onClose }: WaitlistModalProps) {
  const { showToast } = useRole();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [persona, setPersona] = useState('Early Adopter');
  const [willingness, setWillingness] = useState(product.price);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    joinWaitlist({
      productId: product.id,
      productName: product.name,
      customerEmail: email,
      customerName: name,
      customerPersona: persona,
      willingnessToPay: Number(willingness),
      feedbackNote: feedback,
    });

    setSubmitted(true);
    showToast(`Successfully joined waitlist for ${product.name}!`);
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
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Validation Stage Interest</span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">Join {product.name} Waitlist</h3>
              <p className="text-slate-600 text-xs mt-1">
                Help validate demand before full manufacturing. Early supporters receive priority launch pricing.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Alex Mercer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Your Customer Persona</label>
                  <select
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="Early Adopter">Early Adopter</option>
                    <option value="Professional / Executive">Professional / Executive</option>
                    <option value="Creator / Designer">Creator / Designer</option>
                    <option value="Student / Hobbyist">Student / Hobbyist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Target Willingness to Pay</label>
                  <input
                    type="number"
                    value={willingness}
                    onChange={(e) => setWillingness(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Feature Suggestion or Feedback (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="What feature would make this an instant buy for you?"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {product.waitlistCount} backers currently on waitlist
              </span>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-slate-900 text-white font-medium text-sm hover:bg-blue-600 transition-colors shadow-sm"
              >
                Confirm Priority Access
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">You&apos;re on the List!</h3>
            <p className="text-slate-600 text-sm max-w-sm mx-auto">
              Thank you for supporting <strong>{product.name}</strong>. Your feedback has been recorded into the founder&apos;s validation telemetry dashboard.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
