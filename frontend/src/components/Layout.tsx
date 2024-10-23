'use client';
// app/layout.tsx or components/Layout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import { useStore } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { dataChanged, setDataChanged } = useStore();

  return (
    <main className="flex flex-col w-full">
      <Navbar dataChanged={dataChanged} setDataChanged={setDataChanged} />
      {children}
    </main>
  );
}
