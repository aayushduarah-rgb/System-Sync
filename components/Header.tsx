import React from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  freeChecksLeft: number;
  onShowAbout: () => void;
  onShowSubscription: () => void;
  onShowDownload: () => void;
  onGoHome: () => void;
  currentUser: string | null;
  onLogout: () => void;
}

const UNLIMITED_CHECKS = 9999;

export const Header: React.FC<HeaderProps> = ({ freeChecksLeft, onShowAbout, onShowSubscription, onShowDownload, onGoHome, currentUser, onLogout }) => {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-gray-700">
      <button onClick={onGoHome} className="cursor-pointer" aria-label="Go to homepage">
        <Logo className="h-8 w-auto" />
      </button>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onShowDownload} 
          className="text-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Download
        </button>
        {currentUser ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-300">Welcome, <span className="font-bold text-white">{currentUser}</span></span>
             <button 
              onClick={onLogout} 
              className="text-sm text-cyan-400 hover:text-white transition-all duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
           <button 
            onClick={onShowSubscription} 
            className="text-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Subscription
          </button>
        )}
        <button 
          onClick={onShowAbout} 
          className="text-sm text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          About
        </button>
        <div className="text-sm bg-gray-800 border border-gray-700 rounded-full px-4 py-2">
            Checks: <span className="font-bold text-cyan-400">{freeChecksLeft >= UNLIMITED_CHECKS ? 'PRO' : freeChecksLeft}</span>
        </div>
      </div>
    </header>
  );
};