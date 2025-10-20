import React from 'react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl animate-fade-in flex flex-col min-h-screen justify-center">
      <div>
        <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg">
          &larr; Back to Checker
        </button>
        <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 border border-gray-700 shadow-lg shadow-cyan-500/10">
          <h1 className="text-3xl font-bold text-cyan-400 mb-4">About SystemSync</h1>
          <p className="text-gray-300 leading-relaxed mb-6">
            This application was created by <strong className="text-white">Aayush Duarah</strong>, a student of class 12, for a project. 
            The goal was to build a helpful tool for PC gamers and professionals to quickly check hardware compatibility for games and applications.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Using the power of Google's Gemini API, SystemSync provides a detailed analysis, performance estimations, and a simulated gameplay experience to help users make informed decisions about their hardware or potential purchases.
          </p>
        </div>
      </div>
    </div>
  );
};