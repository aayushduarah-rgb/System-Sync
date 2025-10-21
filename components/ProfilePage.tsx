import React from 'react';

interface ProfilePageProps {
  username: string;
  onContinue: () => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ username, onContinue, onLogout }) => {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center animate-fade-in-up">
      <div className="w-full max-w-lg text-center">
        <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-8 border border-cyan-500 shadow-2xl shadow-cyan-500/20">
          <h1 className="text-4xl font-black text-cyan-400 mb-4">Welcome, {username}!</h1>
          <p className="text-gray-300 text-lg mb-6 font-sans">You're all set to start checking.</p>
          <div className="bg-gray-800/50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-400 font-sans">
              A welcome message has been sent to your email. (This is a simulation for project demonstration purposes).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContinue}
              className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Start Checking
            </button>
            <button
              onClick={onLogout}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-md transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};