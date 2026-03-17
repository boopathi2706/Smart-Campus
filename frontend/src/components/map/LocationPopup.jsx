import React from 'react';
import { X, Navigation } from 'lucide-react';

export default function LocationPopup({ selectedLocation, routeInstructions, categoryConfig, setSelectedLocation, startNavigation }) {
  if (!selectedLocation || routeInstructions.length > 0) return null;

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[1000] animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-md px-6 py-5 rounded-2xl shadow-2xl min-w-[280px] border-t-4" style={{ borderColor: categoryConfig[selectedLocation.category].color }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest bg-gray-100 px-2 py-1 rounded-md" style={{ color: categoryConfig[selectedLocation.category].color }}>
            {categoryConfig[selectedLocation.category].emoji} {selectedLocation.category}
          </span>
          <button onClick={() => setSelectedLocation(null)} className="text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-200 p-1 rounded-full"><X size={16} /></button>
        </div>
        <h3 className="text-gray-900 font-extrabold text-xl leading-tight mb-3">{selectedLocation.name}</h3>
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => startNavigation(selectedLocation.id)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center transition-all shadow-md"
          >
            <Navigation size={16} className="mr-2" /> Start Navigation
          </button>
        </div>
      </div>
    </div>
  );
}