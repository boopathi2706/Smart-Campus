import React from 'react';
import { Compass } from 'lucide-react';

export default function CompassWidget({ compassHeading }) {
  return (
    <div className="absolute top-4 left-4 z-[1000] bg-gray-900/90 backdrop-blur border border-gray-700 p-2 rounded-full shadow-lg flex items-center justify-center flex-col text-gray-300 w-12 h-12">
      <Compass 
        size={24} 
        className="text-purple-500" 
        style={{ transform: `rotate(${-compassHeading}deg)`, transition: 'transform 0.1s ease-out' }} 
      />
      <span className="text-[9px] font-bold mt-0.5">N</span>
    </div>
  );
}