import React from 'react';
import { X, Navigation } from 'lucide-react';

export default function LocationPopup({ selectedLocation, routeInstructions, categoryConfig, setSelectedLocation, startNavigation }) {
  if (!selectedLocation || routeInstructions.length > 0) return null;

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000] animate-fade-in-up">
      <div className="bg-gray-900/95 backdrop-blur-md px-6 py-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] min-w-[280px] border-t-4" style={{ borderColor: categoryConfig[selectedLocation.category].color || '#a855f7' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-800 border border-gray-700 px-2 py-1 rounded-md" style={{ color: categoryConfig[selectedLocation.category].color || '#a855f7' }}>
            {categoryConfig[selectedLocation.category].emoji} {selectedLocation.category}
          </span>
          <button onClick={() => setSelectedLocation(null)} className="text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700 p-1 rounded-full transition-colors"><X size={16} /></button>
        </div>
        <h3 className="text-white font-extrabold text-xl leading-tight mb-3">{selectedLocation.name}</h3>
        {selectedLocation.floorInfo && (
  <p className="text-purple-300 text-xs font-semibold mb-3">
    📍 {selectedLocation.floorInfo}
  </p>
)}
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => startNavigation(selectedLocation.id)}
            className="flex-1 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
          >
            <Navigation size={16} className="mr-2" /> Start Navigation
          </button>
        </div>
      </div>
    </div>
  );
}