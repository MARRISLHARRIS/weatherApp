'use client';
// import Card from '@/components/Card';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Temperature from '@/components/Temperature';
import WindSpeed from '@/components/WindSpeed';
import React from 'react';

export default function Home() {
  const [dataChanged, setDataChanged] = React.useState(false);
  return (
    <main className="flex flex-col w-full">
      <Navbar dataChanged={dataChanged} setDataChanged={setDataChanged} />
      <Header dataChanged={dataChanged} />
      <WindSpeed />
      <Temperature />
    </main>
  );
}
