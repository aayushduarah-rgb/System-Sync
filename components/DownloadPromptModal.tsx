import React from 'react';
import { DownloadIcon } from './IconComponents';

interface DownloadPromptModalProps {
  onConfirm: () => void;
  onClose: () => void;
}

export const DownloadPromptModal: React.FC<DownloadPromptModalProps> = ({ onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 w-full max-w-sm m-4 text-center p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <DownloadIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Install SystemSync</h2>
        <p className="text-gray-400 mb-6">
            Installing the app will provide a faster, more integrated experience, right from your desktop.
        </p>
        <div className="flex flex-col gap-3">
            <button
                onClick={onConfirm}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
                Download Now
            </button>
            <button
                onClick={onClose}
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
                Maybe Later
            </button>
        </div>
      </div>
    </div>
  );
};