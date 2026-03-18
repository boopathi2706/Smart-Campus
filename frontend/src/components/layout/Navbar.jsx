import React from 'react';
import { Map as MapIcon, Menu, Route } from 'lucide-react';

export default function Navbar({ isCategoriesOpen, setIsCategoriesOpen, isRoutingOpen, setIsRoutingOpen }) {
  return (
    <nav className="h-16 bg-black shadow-md flex items-center justify-between px-6 z-[2000] border-b border-purple-900/50 relative">
      <div className="flex items-center space-x-3">
        <div className="bg-purple-600/20 border border-purple-500/30 p-2 rounded-lg shadow-md">
          <MapIcon size={20} className="text-purple-400" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg leading-tight">SECE Smart Navigator</h1>
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Live Campus Map</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={() => { setIsCategoriesOpen(!isCategoriesOpen); setIsRoutingOpen(false); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${isCategoriesOpen ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'}`}
        >
          <Menu size={16} />
          <span className="hidden sm:inline">Legend</span>
        </button>
        
        <button 
          onClick={() => { setIsRoutingOpen(!isRoutingOpen); setIsCategoriesOpen(false); }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${isRoutingOpen ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]'}`}
        >
          <Route size={16} />
          <span className="hidden sm:inline">Directions</span>
        </button>
      </div>
    </nav>
  );
}