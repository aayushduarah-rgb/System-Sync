import React from 'react';
import { CheckIcon } from './IconComponents';

interface SubscriptionPageProps {
  onProceedToPayment: () => void;
  onBack: () => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onProceedToPayment, onBack }) => {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center animate-fade-in-up">
        <div className="w-full max-w-lg">
             <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg">
                &larr; Back to Checker
            </button>
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-8 border border-cyan-500 shadow-2xl shadow-cyan-500/20">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-2">Upgrade to SystemSync Pro</h1>
                    <p className="text-gray-300">Unlock unlimited compatibility checks and support future development.</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6 transition-all hover:scale-[1.02] hover:bg-gray-800/70">
                    <div className="flex justify-between items-baseline">
                        <h2 className="text-xl font-semibold text-white">Pro Plan</h2>
                        <p className="text-3xl font-bold text-cyan-400">₹59 <span className="text-lg font-normal text-gray-400">/ month</span></p>
                    </div>
                    <ul className="mt-4 space-y-2 text-gray-300">
                        <li className="flex items-center gap-3">
                            <CheckIcon className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                            <span>Unlimited compatibility checks</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckIcon className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                            <span>AI-powered game search</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckIcon className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                            <span>Priority access to new features</span>
                        </li>
                    </ul>
                </div>
                
                <button
                    onClick={onProceedToPayment}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                    Proceed to Payment
                </button>
                <p className="text-xs text-gray-500 mt-4 text-center">
                    This is a project-based demonstration. You will be taken to a mock payment screen.
                </p>
            </div>
        </div>
    </div>
  );
};
