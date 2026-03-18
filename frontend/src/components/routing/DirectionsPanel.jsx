import React from 'react';
import { Navigation, X, ArrowDownUp } from 'lucide-react';
import { categoryConfig } from '../../constants/campusData';

export default function DirectionsPanel({ seceLocations, isRoutingOpen, setIsRoutingOpen, fromId, setFromId, toId, setToId, clearRoute, routeInstructions }) {
  if (!isRoutingOpen || routeInstructions.length > 0) return null;

  return (
    <div className="absolute top-4 right-4 z-[1000] w-80 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-gray-700 overflow-hidden flex flex-col animate-fade-in-up">
      <div className="px-5 py-4 bg-purple-700 text-white flex items-center justify-between shadow-md">
        <h2 className="font-bold text-sm tracking-wide flex items-center"><Navigation className="w-4 h-4 mr-2"/> Route Planner</h2>
        <button onClick={() => setIsRoutingOpen(false)} className="text-purple-200 hover:text-white transition-colors"><X size={18}/></button>
      </div>
      <div className="p-5 flex flex-col space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-1.5 block tracking-wider">Starting Point</label>
          <select className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 appearance-none" value={fromId} onChange={(e) => setFromId(e.target.value)}>
            <option value="">Select starting point...</option>
            <option value="current">📍 My Current Location</option>
            <optgroup label="Campus Locations">
              {seceLocations.map(loc => <option key={`from-${loc.id}`} value={loc.id}>{categoryConfig[loc.category]?.emoji} {loc.name}</option>)}
            </optgroup>
          </select>
        </div>
        <div className="flex justify-center -my-3 relative z-10">
          <button onClick={() => { const temp = fromId; setFromId(toId); setToId(temp); }} className="bg-gray-800 border border-gray-600 p-2 rounded-full shadow-lg text-gray-300 hover:text-purple-400 hover:bg-gray-700 transition-all"><ArrowDownUp className="w-4 h-4" /></button>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase mb-1.5 block tracking-wider">Destination</label>
          <select className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500 appearance-none" value={toId} onChange={(e) => setToId(e.target.value)}>
            <option value="">Select destination...</option>
            <option value="current">📍 My Current Location</option>
            <optgroup label="Campus Locations">
              {seceLocations.map(loc => <option key={`to-${loc.id}`} value={loc.id}>{categoryConfig[loc.category]?.emoji} {loc.name}</option>)}
            </optgroup>
          </select>
        </div>
        {(fromId || toId) && (
          <button onClick={clearRoute} className="mt-2 w-full py-3 text-sm font-bold text-red-400 hover:bg-red-900/30 rounded-xl transition-colors border border-red-900/50 hover:border-red-500">Clear Route</button>
        )}
      </div>
    </div>
  );
}