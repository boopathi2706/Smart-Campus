import React from 'react';
import { Globe, Map as MapIcon, Crosshair } from 'lucide-react';

export default function MapControls({ mapType, setMapType, snapToUserLocation, isLocating, userLocation }) {
  return (
    <div className="absolute bottom-8 right-6 z-[1000] flex flex-col space-y-3">
      <button onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')} className="bg-gray-900 border border-gray-700 p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:bg-gray-800 transition-all hover:scale-105 group" title={mapType === 'street' ? "Switch to Satellite" : "Switch to Map view"}>
        {mapType === 'street' ? <Globe className="w-5 h-5 text-gray-400 group-hover:text-purple-400" /> : <MapIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-400" />}
      </button>
      <button onClick={snapToUserLocation} className={`bg-gray-900 border border-gray-700 p-3 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:bg-gray-800 transition-all hover:scale-105 ${isLocating ? 'animate-pulse' : ''}`} title="Locate Me">
        <Crosshair className={`w-5 h-5 ${userLocation ? 'text-purple-500' : 'text-gray-400'}`} />
      </button>
    </div>
  );
}