import React from 'react';
import { DownloadIcon } from './IconComponents';

interface InstallButtonProps {
    isVisible: boolean;
    onClick: () => void;
}

export const InstallButton: React.FC<InstallButtonProps> = ({ isVisible, onClick }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <button
            onClick={onClick}
            title="Install SystemSync App"
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30
                       hover:bg-cyan-500 hover:scale-110 active:scale-100 transition-all duration-300 ease-in-out
                       animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
        >
            <DownloadIcon className="w-8 h-8" />
        </button>
    );
};