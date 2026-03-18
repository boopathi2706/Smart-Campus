import React from 'react';
import { MapPin } from 'lucide-react';

export default function Footer({ locationCount }) {
  return (
    <footer className="h-10 bg-black border-t border-gray-800 flex items-center justify-between px-6 z-[2000] text-[11px] text-gray-500 font-medium">
      <p>&copy; 2026 SECE College Navigation</p>
      <div className="flex space-x-4">
        <span className="flex items-center text-purple-400/80"><MapPin size={12} className="mr-1"/> {locationCount} Locations</span>
        <span>Designed for Smart Campus</span>
      </div>
    </footer>
  );
}