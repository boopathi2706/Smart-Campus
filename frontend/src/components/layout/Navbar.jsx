// src/components/layout/Navbar.jsx
import React from 'react';
import { Map as MapIcon, Menu, Route } from 'lucide-react';

export default function Navbar({ isCategoriesOpen, setIsCategoriesOpen, isRoutingOpen, setIsRoutingOpen }) {
  return (
    <nav className="h-16 bg-white shadow-sm flex items-center justify-between px-6 z-[2000] border-b border-gray-200 relative">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg shadow-md">
          <MapIcon size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-gray-800 text-lg leading-tight">SECE Navigator</h1>
          <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Smart Campus Map</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={() => { setIsCategoriesOpen(!isCategoriesOpen); setIsRoutingOpen(false); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${isCategoriesOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <Menu size={16} />
          <span className="hidden sm:inline">Legend</span>
        </button>
        
        <button 
          onClick={() => { setIsRoutingOpen(!isRoutingOpen); setIsCategoriesOpen(false); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${isRoutingOpen ? 'bg-indigo-100 text-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          <Route size={16} />
          <span className="hidden sm:inline">Directions</span>
        </button>
      </div>
    </nav>
  );
}

// src/components/layout/Footer.jsx
