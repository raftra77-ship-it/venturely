import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1628' }} className="text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b" style={{ borderColor: 'rgba(30,43,66,0.4)' }}>
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#489cff] text-white flex items-center justify-center font-bold text-lg">
                V
              </div>
              <span className="font-bold text-white text-xl">Venturely</span>
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed">
              Try innovative startup products before they scale. Get 6 trial points, sample real products, and earn 100% cashback on feedback.
            </p>
          </div>

          {/* For Founders */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white">For Founders</h4>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><Link href="/founder/new" className="hover:text-white transition-colors no-underline">Validate Your Product</Link></li>
              <li><Link href="/founder/dashboard" className="hover:text-white transition-colors no-underline">Founder Dashboard</Link></li>
              <li><Link href="/#portals" className="hover:text-white transition-colors no-underline">Stage Pipeline</Link></li>
              <li><Link href="/founder/dashboard" className="hover:text-white transition-colors no-underline">Trial Analytics</Link></li>
            </ul>
          </div>

          {/* For Customers */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white">For Customers</h4>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li><Link href="/marketplace" className="hover:text-white transition-colors no-underline">Discover Trial Products</Link></li>
              <li><Link href="/marketplace" className="hover:text-white transition-colors no-underline">Full-Size Shop</Link></li>
              <li><Link href="/customer/dashboard" className="hover:text-white transition-colors no-underline">My Orders & Trials</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors no-underline">How Trials Work</Link></li>
            </ul>
          </div>

          {/* Guarantee */}
          <div className="space-y-3">
            <h4 className="text-[14px] font-semibold text-white">Platform Guarantee</h4>
            <ul className="space-y-2 text-[12px] text-gray-400">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#b9fff5] shrink-0" /> 100% Authentic Products</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#b9fff5] shrink-0" /> Transparent Validation Scoring</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#b9fff5] shrink-0" /> 100% Cashback on Feedback</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#b9fff5] shrink-0" /> Verified Reviews Only</li>
            </ul>
          </div>
        </div>

        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[12px] text-gray-500 gap-3">
          <p>© {new Date().getFullYear()} Venturely Inc. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[12px]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Security & Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
