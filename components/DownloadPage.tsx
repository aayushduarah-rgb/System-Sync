import React from 'react';
import { WindowsIcon, AndroidIcon } from './IconComponents';

interface DownloadPageProps {
  onBack: () => void;
  onInstall: () => void;
  isInstallable: boolean;
}

const DownloadCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onDownload: () => void; disabled: boolean }> = ({ title, description, icon, onDownload, disabled }) => {
    return (
        <button
            onClick={onDownload}
            disabled={disabled}
            className={`
                bg-gray-800 border border-gray-700 rounded-lg p-6 text-left w-full transition-all duration-300
                flex items-center space-x-6
                ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-cyan-900/50 hover:border-cyan-700 hover:scale-105'
                }
            `}
        >
            <div className="text-cyan-400">{icon}</div>
            <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-gray-400 mt-1">{description}</p>
            </div>
        </button>
    );
};


export const DownloadPage: React.FC<DownloadPageProps> = ({ onBack, onInstall, isInstallable }) => {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl animate-fade-in flex flex-col min-h-screen justify-center">
      <div>
        <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg">
          &larr; Back to Checker
        </button>
        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 border border-gray-700 shadow-lg shadow-cyan-500/10">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2 text-center">Download SystemSync</h1>
          <p className="text-gray-400 leading-relaxed mb-8 text-center">
            Install our Progressive Web App (PWA) on your device for a fast, offline-ready experience.
          </p>

          <div className="space-y-6">
            <DownloadCard
                title="For Windows"
                description="Pin to your taskbar or start menu for easy access."
                icon={<WindowsIcon className="w-12 h-12" />}
                onDownload={onInstall}
                disabled={!isInstallable}
            />
            <DownloadCard
                title="For Android"
                description="Add to your home screen and use like a native app."
                icon={<AndroidIcon className="w-12 h-12" />}
                onDownload={onInstall}
                disabled={!isInstallable}
            />
          </div>

          {!isInstallable && (
            <p className="text-center text-yellow-400 bg-yellow-900/50 p-4 rounded-md mt-8">
                App installation is not available on this browser, or it might already be installed. Try using Chrome or Edge on desktop, or Chrome on Android.
            </p>
          )}

        </div>
      </div>
    </div>
  );
};