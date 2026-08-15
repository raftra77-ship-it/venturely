'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { AuthPortalModal } from '../modals/AuthPortalModal';
import { TrialCartDrawer } from '../modals/TrialCartDrawer';
import {
  Search,
  Heart,
  Gift,
  User,
  ShoppingBag,
  Rocket,
  ShieldAlert,
  Menu,
  X,
  PlusCircle,
} from 'lucide-react';

type NavTab = 'trial' | 'shop' | 'founders' | 'admin';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { userTrialPoints, maxTrialPoints, trialCart, setIsTrialDrawerOpen, role, setRole, showToast } = useRole();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveTab = (): NavTab => {
    if (pathname === '/founder/dashboard' || pathname === '/founder/new') return 'founders';
    if (pathname === '/admin/dashboard') return 'admin';
    if (pathname === '/marketplace') return 'shop';
    return 'trial';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab: NavTab) => {
    switch (tab) {
      case 'trial':
        router.push('/');
        break;
      case 'shop':
        router.push('/marketplace');
        break;
      case 'founders':
        setRole('FOUNDER');
        router.push('/founder/dashboard');
        break;
      case 'admin':
        setRole('ADMIN');
        router.push('/admin/dashboard');
        break;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-[999] bg-white w-full">
        {/* Top Row: Logo | Search | Icons */}
        <div className="px-6 pt-3.5 pb-0 flex items-center gap-4" style={{ boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.12)' }}>
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-fit mb-3.5">
            <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#0f1628] text-white flex items-center justify-center font-extrabold text-lg">
                V
              </div>
              <div className="flex flex-col leading-[1.05]">
                <span className="font-bold text-black text-[15px]">Venturely</span>
                <span className="text-[10px] text-gray-500 font-normal">Trial & Discovery</span>
              </div>
            </Link>
          </div>

          {/* Center Search Bar — Smytten style */}
          <div className="flex-1 flex items-center justify-center min-w-[260px] mb-3.5 max-lg:hidden">
            <form onSubmit={handleSearch} className="w-full max-w-[520px]">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search startups, products, categories..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#489cff] focus:bg-white placeholder:text-gray-400"
                />
              </div>
            </form>
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-3 mb-3.5">
            {/* Trial Points Badge — Smytten mint green */}
            <button
              onClick={() => setIsTrialDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-t-2xl no-underline cursor-pointer mb-[-9px]"
              style={{ background: '#b9fff5', boxShadow: '0px 1px 3px -2px rgba(0,0,0,0.14), 0px 1px 1px 0px rgba(0,0,0,0.04)' }}
            >
              <Gift className="w-4 h-4 text-[#0f1628]" />
              <span className="font-bold text-[13px] text-[#0f1628] ml-0.5">{userTrialPoints} Points</span>
              {trialCart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#489cff] text-white text-[10px] flex items-center justify-center font-bold">
                  {trialCart.length}
                </span>
              )}
            </button>

            <button className="w-8 h-8 min-w-7 min-h-7 cursor-pointer flex items-center justify-center" title="Wishlist">
              <Heart className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={() => setIsTrialDrawerOpen(true)}
              className="w-8 h-8 min-w-7 min-h-7 cursor-pointer flex items-center justify-center relative"
              title="Trial Cart"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700" />
              {trialCart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#489cff] text-white text-[9px] flex items-center justify-center font-bold">
                  {trialCart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-8 h-8 min-w-7 min-h-7 cursor-pointer flex items-center justify-center"
              title="My Account"
            >
              <User className="w-6 h-6 text-gray-700" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 cursor-pointer flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom Row: Smytten-style Tab Switcher */}
        <div className="flex items-center justify-between rounded-b-2xl overflow-hidden" style={{ boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.2)', marginTop: '-1px', zIndex: -1 }}>
          <div className="flex items-center w-full">
            {/* Trial Tab */}
            <button
              onClick={() => handleTabClick('trial')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === 'trial'
                  ? 'text-[#0f1628] border-[#489cff] bg-[#b9fff5]/30'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-50'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>Trial</span>
            </button>

            {/* Shop / Marketplace Tab */}
            <button
              onClick={() => handleTabClick('shop')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === 'shop'
                  ? 'text-[#0f1628] border-[#489cff] bg-[#b9fff5]/30'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop</span>
            </button>

            {/* Founders Tab */}
            <button
              onClick={() => handleTabClick('founders')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === 'founders'
                  ? 'text-[#0f1628] border-[#489cff] bg-[#b9fff5]/30'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-50'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>Founders</span>
            </button>

            {/* Admin Tab */}
            <button
              onClick={() => handleTabClick('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === 'admin'
                  ? 'text-[#0f1628] border-[#489cff] bg-[#b9fff5]/30'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-50'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin</span>
            </button>

            {/* Validate Product CTA */}
            <div className="px-4 hidden lg:flex">
              <Link
                href="/founder/new"
                className="smytten-btn text-[13px] py-2 px-4 flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Validate Product</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 py-2 bg-white border-b border-gray-100">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search startups, products..."
                className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#489cff]"
              />
            </div>
          </form>
        </div>
      </header>

      <AuthPortalModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <TrialCartDrawer />
    </>
  );
}
