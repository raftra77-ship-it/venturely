'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRole } from '@/context/RoleContext';
import { UserRole } from '@/types';
import { X, Rocket, ShoppingBag, ShieldAlert, ArrowRight } from 'lucide-react';

interface AuthPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthPortalModal({ isOpen, onClose }: AuthPortalModalProps) {
  const router = useRouter();
  const { role, setRole, showToast } = useRole();

  if (!isOpen) return null;

  const handleSelectRole = (selectedRole: UserRole, targetRoute: string) => {
    setRole(selectedRole);
    showToast(`Authenticated as ${selectedRole}`);
    onClose();
    router.push(targetRoute);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-xl w-full p-7 shadow-2xl relative space-y-5 animate-fadeInUp" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-300 hover:text-black p-1 cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-black font-[Poppins,sans-serif]">Select Your Account</h2>
          <p className="text-gray-500 text-[13px]">
            Choose your role to access the dedicated workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Founder */}
          <div
            onClick={() => handleSelectRole('FOUNDER', '/founder/dashboard')}
            className={`smytten-card cursor-pointer p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow ${
              role === 'FOUNDER' ? 'ring-2 ring-[#489cff]' : ''
            }`}
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#489cff20' }}>
                <Rocket className="w-5 h-5 text-[#489cff]" />
              </div>
              <h3 className="font-bold text-black text-[14px]">Founder</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Validate ideas, distribute trials, monitor demand.
              </p>
            </div>
            <button className="smytten-btn w-full justify-center text-[12px] py-2">
              Enter <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Customer */}
          <div
            onClick={() => handleSelectRole('CUSTOMER', '/customer/dashboard')}
            className={`smytten-card cursor-pointer p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow ${
              role === 'CUSTOMER' ? 'ring-2 ring-[#10b981]' : ''
            }`}
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#10b98120' }}>
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-black text-[14px]">Customer</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Discover products, claim trials, buy full-size.
              </p>
            </div>
            <button className="smytten-btn w-full justify-center text-[12px] py-2" style={{ background: '#10b981' }}>
              Enter <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Admin */}
          <div
            onClick={() => handleSelectRole('ADMIN', '/admin/dashboard')}
            className={`smytten-card cursor-pointer p-4 space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow ${
              role === 'ADMIN' ? 'ring-2 ring-[#f59e0b]' : ''
            }`}
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#f59e0b20' }}>
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-black text-[14px]">Admin</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Moderate, approve graduations, set commissions.
              </p>
            </div>
            <button className="smytten-btn w-full justify-center text-[12px] py-2" style={{ background: '#f59e0b' }}>
              Enter <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
