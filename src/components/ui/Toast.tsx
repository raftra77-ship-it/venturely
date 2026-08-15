'use client';

import React from 'react';
import { useRole } from '@/context/RoleContext';
import { CheckCircle2, X } from 'lucide-react';

export function Toast() {
  const { toastMessage } = useRole();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-xl border border-slate-800 transition-all transform animate-in fade-in slide-in-from-bottom-2">
      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
}
