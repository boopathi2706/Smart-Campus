import React, { useState } from 'react';
import { Globe, Map as MapIcon, Crosshair } from 'lucide-react';

export default function MapControls({ mapType, setMapType, snapToUserLocation, isLocating, userLocation }) {
  return (
    <div className="absolute bottom-8 right-6 z-[1000] flex flex-col space-y-3">
      <button onClick={() => setMapType(mapType === 'street' ? 'satellite' : 'street')} className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all hover:scale-105 group" title={mapType === 'street' ? "Switch to Satellite" : "Switch to Map view"}>
        {mapType === 'street' ? <Globe className="w-5 h-5 text-gray-700 group-hover:text-blue-600" /> : <MapIcon className="w-5 h-5 text-gray-700 group-hover:text-blue-600" />}
      </button>
      <button onClick={snapToUserLocation} className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all hover:scale-105 ${isLocating ? 'animate-pulse' : ''}`} title="Locate Me">
        <Crosshair className={`w-5 h-5 ${userLocation ? 'text-blue-600' : 'text-gray-500'}`} />
      </button>
    </div>
  );
}