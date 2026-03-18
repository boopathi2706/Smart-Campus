import React, { useEffect } from 'react';
import { Crosshair, X, ArrowUp, CornerUpLeft, CornerUpRight, MapPin } from 'lucide-react';

export default function NavigationBanner({ routeInstructions, activeStep, setActiveStep, clearRoute, seceLocations, toId }) {
  
  // --- TEXT-TO-SPEECH (TTS) & FLOOR INFO LOGIC ---
  useEffect(() => {
    if (routeInstructions.length > 0 && routeInstructions[activeStep] && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Stop current speech
      
      const { text, distance } = routeInstructions[activeStep];
      let speechText = "";
      
      // If navigating, speak instruction and distance
      if (distance > 0 && activeStep !== routeInstructions.length - 1) {
        speechText = `${text}. Continue for ${distance} meters.`;
      } 
      // If final step, announce arrival and floor info!
      else if (activeStep === routeInstructions.length - 1) {
        speechText = `You have reached your destination. ${text}.`;
        
        // Find destination in the database and append floorInfo if it exists
        const destination = seceLocations?.find(loc => loc.id === toId);
        if (destination && destination.floorInfo) {
          speechText += ` Please proceed to the ${destination.floorInfo}.`;
        }
      }
      
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(speechText));
    }
  }, [activeStep, routeInstructions, seceLocations, toId]);

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
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[2500] w-[90%] max-w-sm bg-gray-900 border border-purple-500/50 text-white rounded-2xl shadow-[0_10px_30px_rgba(147,51,234,0.3)] overflow-hidden flex flex-col animate-fade-in-down">
      <div className="p-4 flex items-center space-x-4">
        <div className="bg-purple-600/20 border border-purple-500 p-3 rounded-full text-purple-400 shadow-inner">
          {getInstructionIcon(routeInstructions[activeStep].type)}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold leading-tight">{routeInstructions[activeStep].text}</h2>
          <p className="text-purple-300 text-sm font-semibold mt-1">
            {routeInstructions[activeStep].distance} meters
          </p>
        </div>
      </div>
      
      <div className="bg-black px-4 py-3 flex justify-between items-center text-sm font-bold border-t border-gray-800">
        <button 
          disabled={activeStep === 0}
          onClick={() => setActiveStep(prev => prev - 1)} 
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-800 bg-gray-900 border border-gray-700 text-purple-300'}`}
        >
          &laquo; Prev
        </button>
        
        <span className="flex items-center text-gray-400">
          Step {activeStep + 1} of {routeInstructions.length} 
          <span className="text-[10px] text-purple-400 ml-2 flex items-center bg-purple-900/30 px-2 py-0.5 rounded-full border border-purple-500/20">
            <Crosshair size={10} className="mr-1 animate-pulse" /> Auto
          </span>
        </span>

        <button 
          disabled={activeStep === routeInstructions.length - 1}
          onClick={() => setActiveStep(prev => prev + 1)} 
          className={`px-3 py-1.5 rounded-lg transition-colors ${activeStep === routeInstructions.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-800 bg-gray-900 border border-gray-700 text-purple-300'}`}
        >
          Next &raquo;
        </button>
      </div>

      <button onClick={clearRoute} className="absolute top-3 right-3 text-gray-500 hover:text-white bg-gray-800 rounded-full p-1 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
}