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
  User,
  ShoppingBag,
  Rocket,
  ShieldAlert,
  Menu,
  X,
  PlusCircle,
  Sparkles,
  Flame,
  BarChart3,
  Layers,
} from 'lucide-react';

type NavTab = 'explore' | 'marketplace' | 'founders' | 'admin';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { validationCart, setIsCartDrawerOpen, role, setRole, showToast } = useRole();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveTab = (): NavTab => {
    if (pathname === '/founder/dashboard' || pathname === '/founder/new') return 'founders';
    if (pathname === '/admin/dashboard') return 'admin';
    if (pathname === '/marketplace') return 'marketplace';
    return 'explore';
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tab: NavTab) => {
    switch (tab) {
      case 'explore':
        router.push('/');
        break;
      case 'marketplace':
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
        {/* Top Row: Logo | Search | Actions */}
        <div className="px-6 pt-3.5 pb-3.5 flex items-center gap-4 border-b border-gray-100 shadow-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-fit">
            <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-[#0f1628] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                V
              </div>
              <div className="flex flex-col leading-[1.05]">
                <span className="font-bold text-black text-[15px] tracking-tight">Venturely</span>
                <span className="text-[10px] text-[#489cff] font-bold uppercase tracking-wider">Validation Engine</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center justify-center min-w-[260px] max-lg:hidden">
            <form onSubmit={handleSearch} className="w-full max-w-[520px]">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search D2C, SaaS, B2B startups, prototypes..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#489cff] focus:bg-white placeholder:text-gray-400"
                />
              </div>
            </form>
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-3">
            {/* Live FOMO Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[12px] font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Live Demand Engine</span>
            </div>

            {/* Validation Cart Drawer */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f1628] text-white hover:bg-black transition-colors cursor-pointer relative"
              title="Validation Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold text-[12px]">Pre-Order Cart</span>
              {validationCart.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#489cff] text-white text-[10px] flex items-center justify-center font-extrabold ml-0.5">
                  {validationCart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center transition-colors"
              title="My Account"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 cursor-pointer flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom Tab Switcher */}
        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200">
          <div className="flex items-center w-full max-w-7xl mx-auto px-4">
            {/* Explore Startups */}
            <button
              onClick={() => handleTabClick('explore')}
              className={`flex-1 lg:flex-none px-5 py-2.5 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'explore'
                  ? 'text-[#0f1628] border-[#489cff] bg-white'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#489cff]" />
              <span>Validation Ground</span>
            </button>

            {/* Public Marketplace */}
            <button
              onClick={() => handleTabClick('marketplace')}
              className={`flex-1 lg:flex-none px-5 py-2.5 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'marketplace'
                  ? 'text-[#0f1628] border-[#489cff] bg-white'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-600" />
              <span>Verified Marketplace (5-7% Fee)</span>
            </button>

            {/* Founder Hub */}
            <button
              onClick={() => handleTabClick('founders')}
              className={`flex-1 lg:flex-none px-5 py-2.5 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'founders'
                  ? 'text-[#0f1628] border-[#489cff] bg-white'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-100'
              }`}
            >
              <Rocket className="w-4 h-4 text-purple-600" />
              <span>Founder Analytics & Ads</span>
            </button>

            {/* Admin Portal */}
            <button
              onClick={() => handleTabClick('admin')}
              className={`flex-1 lg:flex-none px-5 py-2.5 text-[13px] font-semibold cursor-pointer border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'admin'
                  ? 'text-[#0f1628] border-[#489cff] bg-white'
                  : 'text-gray-500 border-transparent hover:text-black hover:bg-gray-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Admin Console</span>
            </button>

            {/* CTA */}
            <div className="ml-auto px-4 hidden lg:flex py-1.5">
              <Link
                href="/founder/new"
                className="smytten-btn text-[12px] py-1.5 px-3.5 flex items-center gap-1.5 bg-[#489cff] hover:bg-blue-600"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Launch Validation Campaign</span>
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
                placeholder="Search startups, prototypes..."
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
