import React from 'react';
import { Compass } from 'lucide-react';

export default function CompassWidget({ compassHeading }) {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white p-2 rounded-full shadow-lg border border-gray-100 flex items-center justify-center flex-col text-gray-700 w-12 h-12">
      <Compass 
        size={24} 
        className="text-red-500" 
        style={{ transform: `rotate(${-compassHeading}deg)`, transition: 'transform 0.1s ease-out' }} 
      />
      <span className="text-[9px] font-bold mt-0.5">N</span>
    </div>
  );
}