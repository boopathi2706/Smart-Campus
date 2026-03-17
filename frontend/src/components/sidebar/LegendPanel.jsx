// src/components/sidebar/LegendPanel.jsx
import React from 'react';
import { X } from 'lucide-react';

export default function LegendPanel({ isCategoriesOpen, setIsCategoriesOpen, allCategories, categoryConfig, activeCategories, toggleCategory }) {
  if (!isCategoriesOpen) return null;

  return (
    <div className="absolute top-4 left-20 z-[1000] w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh] animate-fade-in-up">
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-gray-800 text-sm">Campus Areas</h2>
        <button onClick={() => setIsCategoriesOpen(false)} className="text-gray-400 hover:text-gray-700"><X size={18}/></button>
      </div>
      <div className="overflow-y-auto p-2 scrollbar-hide">
        {allCategories.map(category => {
          const color = categoryConfig[category].color;
          const emoji = categoryConfig[category].emoji;
          const isActive = activeCategories.includes(category);
          return (
            <label key={category} className={`flex items-center justify-between px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 mb-1 ${isActive ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center space-x-3">
                <div className="text-lg w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: isActive ? `${color}15` : '#f1f5f9' }}>
                  {emoji}
                </div>
                <span className={`text-sm ${isActive ? 'text-gray-800 font-bold' : 'text-gray-400 font-medium'}`}>{category}</span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${isActive ? 'bg-blue-500' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${isActive ? 'transform translate-x-5' : ''}`} />
              </div>
              <input type="checkbox" className="hidden" checked={isActive} onChange={() => toggleCategory(category)} />
            </label>
          );
        })}
      </div>
    </div>
  );
}