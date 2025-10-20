import React, { useState } from 'react';
import type { Game } from '../types';

interface GameSelectorProps {
  games: Game[];
  selectedGame: Game | null;
  onSelectGame: (game: Game) => void;
  onSearchGame: (query: string) => void;
  isSearching: boolean;
  isGameSearched: boolean;
  onClearSearch: () => void;
}

const PLACEHOLDER_IMAGE = 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export const GameSelector: React.FC<GameSelectorProps> = ({ games, selectedGame, onSelectGame, onSearchGame, isSearching, isGameSearched, onClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchGame(searchQuery.trim());
    }
  };
  
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-xl font-semibold mb-4 text-white">1. Select or Search for a Game</h3>
      
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., Baldur's Gate 3"
          className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
        />
        <button type="submit" disabled={isSearching} className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:bg-gray-600 disabled:scale-100">
          {isSearching ? '...' : 'Search'}
        </button>
      </form>

      {isGameSearched && (
        <button onClick={onClearSearch} className="text-sm text-cyan-400 hover:text-cyan-300 mb-2 transition-colors">
            &larr; Clear Search & View Defaults
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[350px] overflow-y-auto pr-2">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => onSelectGame(game)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 h-fit group ${
              selectedGame?.id === game.id ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20' : 'border-gray-700 hover:border-cyan-600 hover:-translate-y-1'
            }`}
          >
            <img 
              src={game.posterUrl} 
              alt={game.name} 
              className="w-full aspect-video object-cover bg-gray-700 transition-transform duration-300 group-hover:scale-105" 
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER_IMAGE; }}
            />
            <div className="p-3 bg-gray-800">
              <h4 className="font-semibold truncate text-sm">{game.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
