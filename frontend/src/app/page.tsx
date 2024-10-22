// import Card from '@/components/Card';
import Header from '@/components/Header';
// import Navbar from '@/components/Navbar';
import Temperature from '@/components/Temperature';
import WindSpeed from '@/components/WindSpeed';
import React from 'react';

export default function Home({ dataChanged }: { dataChanged: boolean }) {
  return (
    <main className="flex flex-col w-full">
      <Header dataChanged={dataChanged} />
      <WindSpeed />
      <Temperature />
      <div className="w-full flex items-center justify-center p-4 font-semibold text-center">
        <h1>
          Made with ✨ by{' '}
          <a href="https://github.com/thekavikumar">thekavikumar</a>
        </h1>
      </div>
    </main>
  );
}
