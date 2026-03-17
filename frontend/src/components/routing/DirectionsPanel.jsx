// src/components/routing/DirectionsPanel.jsx
import React from 'react';
import { Navigation, X, ArrowDownUp } from 'lucide-react';
import { seceLocations, categoryConfig } from '../../constants/campusData';

export default function DirectionsPanel({ isRoutingOpen, setIsRoutingOpen, fromId, setFromId, toId, setToId, clearRoute, routeInstructions }) {
  if (!isRoutingOpen || routeInstructions.length > 0) return null;

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-fade-in-up">
      <div className="px-5 py-4 bg-indigo-600 text-white flex items-center justify-between shadow-md">
        <h2 className="font-bold text-sm tracking-wide flex items-center"><Navigation className="w-4 h-4 mr-2"/> Route Planner</h2>
        <button onClick={() => setIsRoutingOpen(false)} className="text-white/80 hover:text-white"><X size={18}/></button>
      </div>
      <div className="p-5 flex flex-col space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Starting Point</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={fromId} onChange={(e) => setFromId(e.target.value)}>
            <option value="">Select starting point...</option>
            <option value="current">📍 My Current Location</option>
            <optgroup label="Campus Locations">
              {seceLocations.map(loc => <option key={`from-${loc.id}`} value={loc.id}>{categoryConfig[loc.category]?.emoji} {loc.name}</option>)}
            </optgroup>
          </select>
        </div>
        <div className="flex justify-center -my-3 relative z-10">
          <button onClick={() => { const temp = fromId; setFromId(toId); setToId(temp); }} className="bg-white border border-gray-200 p-2 rounded-full shadow hover:text-indigo-600 transition-all"><ArrowDownUp className="w-4 h-4" /></button>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Destination</label>
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={toId} onChange={(e) => setToId(e.target.value)}>
            <option value="">Select destination...</option>
            <option value="current">📍 My Current Location</option>
            <optgroup label="Campus Locations">
              {seceLocations.map(loc => <option key={`to-${loc.id}`} value={loc.id}>{categoryConfig[loc.category]?.emoji} {loc.name}</option>)}
            </optgroup>
          </select>
        </div>
        {(fromId || toId) && (
          <button onClick={clearRoute} className="mt-2 w-full py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100">Clear Route</button>
        )}
      </div>
    </div>
  );
}

// src/components/routing/NavigationBanner.jsx
