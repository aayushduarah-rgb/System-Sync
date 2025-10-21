import React, { useState } from 'react';
import type { Software } from '../types';
import { SearchIcon } from './IconComponents';

interface SoftwareSelectorProps {
  softwareList: Software[];
  selectedSoftware: Software | null;
  onSelectSoftware: (software: Software) => void;
  onSearchSoftware: (query: string) => void;
  isSearching: boolean;
  isSoftwareSearched: boolean;
  onClearSearch: () => void;
}

const PLACEHOLDER_IMAGE = 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export const SoftwareSelector: React.FC<SoftwareSelectorProps> = ({ softwareList, selectedSoftware, onSelectSoftware, onSearchSoftware, isSearching, isSoftwareSearched, onClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSoftware(searchQuery.trim());
    }
  };
  
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-xl font-semibold mb-4 text-white">1. Select Software</h3>
      
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4 relative">
         <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="w-5 h-5" />
          </div>
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., Elden Ring or Adobe Photoshop"
          className="flex-grow bg-gray-800 border border-gray-600 rounded-md pl-10 pr-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition font-sans"
        />
        <button type="submit" disabled={isSearching} className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:bg-gray-600 disabled:scale-100">
          {isSearching ? '...' : 'Find'}
        </button>
      </form>

      {isSoftwareSearched && (
        <button onClick={onClearSearch} className="text-sm text-cyan-400 hover:text-cyan-300 mb-2 transition-colors">
            &larr; Clear Search & View Defaults
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[350px] overflow-y-auto pr-2">
        {softwareList.map((software, index) => (
          <div
            key={software.id}
            onClick={() => onSelectSoftware(software)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 h-fit group animate-fade-in-up ${
              selectedSoftware?.id === software.id ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20' : 'border-gray-700 hover:border-cyan-600 hover:-translate-y-1'
            }`}
             style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="w-full aspect-video bg-gray-800/50">
              {software.posterUrl && software.posterUrl !== 'NO_IMAGE' ? (
                <img 
                  src={software.posterUrl} 
                  alt={software.name} 
                  className="w-full aspect-video object-cover bg-gray-700 transition-transform duration-300 group-hover:scale-105" 
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                />
              ) : (
                <div className="w-full aspect-video skeleton-loader flex items-center justify-center p-4">
                  <span className="text-center text-gray-400 font-semibold font-sans">{software.name}</span>
                </div>
              )}
            </div>
            <div className="p-3 bg-gray-800">
              <h4 className="font-semibold truncate text-sm">{software.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};