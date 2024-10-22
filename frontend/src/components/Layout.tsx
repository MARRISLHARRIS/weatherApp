'use client';
// app/layout.tsx or components/Layout.tsx
import React from 'react';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dataChanged, setDataChanged] = React.useState(false);

  return (
    <main className="flex flex-col w-full">
      <Navbar dataChanged={dataChanged} setDataChanged={setDataChanged} />
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          dataChanged,
          setDataChanged,
        })
      )}
    </main>
  );
}
