import React from 'react';
import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoaderCircle className="animate-spin text-black" />
    </div>
  );
}

export default Loading;
