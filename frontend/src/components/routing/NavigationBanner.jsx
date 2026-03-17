import React from 'react';
import { Crosshair, X, ArrowUp, CornerUpLeft, CornerUpRight, MapPin } from 'lucide-react';

export default function NavigationBanner({ routeInstructions, activeStep, setActiveStep, clearRoute }) {
  if (routeInstructions.length === 0) return null;

  const getInstructionIcon = (type) => {
    if (!type) return <ArrowUp size={32} />;
    const t = type.toLowerCase();
    if (t.includes('left')) return <CornerUpLeft size={32} />;
    if (t.includes('right')) return <CornerUpRight size={32} />;
    if (t.includes('destination')) return <MapPin size={32} />;
    return <ArrowUp size={32} />;
  }

  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[2500] w-[90%] max-w-sm bg-green-600 text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in-down">
      <div className="p-4 flex items-center space-x-4">
        <div className="bg-green-500 p-3 rounded-full text-white">
          {getInstructionIcon(routeInstructions[activeStep].type)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold leading-tight">{routeInstructions[activeStep].text}</h2>
          <p className="text-green-200 text-sm font-semibold mt-1">
            {routeInstructions[activeStep].distance} meters
          </p>
        </div>
      </div>
      
      <div className="bg-green-700 px-4 py-3 flex justify-between items-center text-sm font-bold">
        <button 
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)} 
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 bg-green-800'}`}
        >
          &laquo; Prev
        </button>
        
        <span className="flex items-center">
          Step {activeStep + 1} of {routeInstructions.length} 
          <span className="text-[10px] text-green-300 ml-1 flex items-center">
            <Crosshair size={10} className="mr-1 animate-pulse" /> Auto
          </span>
        </span>

        <button 
          disabled={activeStep === routeInstructions.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)} 
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeStep === routeInstructions.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 bg-green-800'}`}
        >
          Next &raquo;
        </button>
      </div>

      <button onClick={clearRoute} className="absolute top-3 right-3 text-white/70 hover:text-white bg-green-800 rounded-full p-1 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}