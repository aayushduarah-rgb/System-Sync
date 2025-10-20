import React from 'react';

interface HeaderProps {
  freeChecksLeft: number;
  onShowAbout: () => void;
  onShowSubscription: () => void;
}

export const Header: React.FC<HeaderProps> = ({ freeChecksLeft, onShowAbout, onShowSubscription }) => {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-700">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter">
        <span className="text-cyan-400">System</span>
        <span className="text-white">Sync</span>
      </h1>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onShowSubscription} 
          className="text-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Subscription
        </button>
        <button 
          onClick={onShowAbout} 
          className="text-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          About
        </button>
        <div className="text-sm bg-gray-800 border border-gray-700 rounded-full px-4 py-2">
            Free Checks: <span className="font-bold text-cyan-400">{freeChecksLeft}</span>
        </div>
      </div>
    </header>
  );
};