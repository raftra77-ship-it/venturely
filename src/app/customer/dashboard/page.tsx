import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard';

export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CustomerDashboard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
