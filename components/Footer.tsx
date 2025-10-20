import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-16 border-t border-gray-800">
      <p className="text-sm text-gray-500">
        Version 1.0.1
      </p>
      <p className="text-sm text-gray-400 mt-1">
        Made with <span className="text-red-500">❤️</span> by Aayush and Gemini
      </p>
    </footer>
  );
};