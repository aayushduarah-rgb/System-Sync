import React from 'react';
import type { Game } from '../types';

interface SearchResultsModalProps {
  results: Game[];
  onSelect: (game: Game) => void;
  onClose: () => void;
}

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({ results, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-2">Did you mean...</h2>
          <p className="text-gray-400 mb-4">Your search returned multiple results. Please select the correct game.</p>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {results.map((game) => (
              <button
                key={game.id}
                onClick={() => onSelect(game)}
                className="w-full text-left p-3 bg-gray-800 hover:bg-cyan-900/50 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {game.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};