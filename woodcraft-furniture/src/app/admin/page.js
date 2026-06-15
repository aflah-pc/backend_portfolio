"use client";

import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-brand-walnut-dark text-brand-walnut dark:text-white">
      <AdminDashboard isPage={true} isOpen={true} />
    </main>
  );
}
