import React, { useState } from 'react';
import { CheckIcon } from './IconComponents';
import type { Plan } from '../App';

interface SubscriptionPageProps {
  onProceedToPayment: (plan: Plan) => void;
  onBack: () => void;
}

const PlanCard: React.FC<{ title: string; price: string; period: string; isSelected: boolean; onSelect: () => void; tag?: string }> = ({ title, price, period, isSelected, onSelect, tag }) => (
    <div
        onClick={onSelect}
        className={`relative bg-gray-800 border-2 rounded-lg p-6 cursor-pointer transition-all duration-300 transform ${
            isSelected ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/20' : 'border-gray-700 hover:border-cyan-600'
        }`}
    >
        {tag && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">{tag}</div>}
        <div className="flex justify-between items-baseline">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="text-3xl font-bold text-cyan-400">₹{price}<span className="text-lg font-normal text-gray-400">/{period}</span></p>
        </div>
    </div>
);


export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onProceedToPayment, onBack }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('monthly');

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center animate-fade-in-up">
        <div className="w-full max-w-lg">
             <button onClick={onBack} className="mb-8 text-cyan-400 hover:text-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg">
                &larr; Back to Checker
            </button>
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-8 border border-cyan-500 shadow-2xl shadow-cyan-500/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-2">Upgrade to SystemSync Pro</h1>
                    <p className="text-gray-300">Unlock unlimited compatibility checks and support future development.</p>
                </div>

                <div className="space-y-6 mb-8">
                   <PlanCard title="Monthly Plan" price="199" period="mo" isSelected={selectedPlan === 'monthly'} onSelect={() => setSelectedPlan('monthly')} />
                   <PlanCard title="Yearly Plan" price="999" period="yr" isSelected={selectedPlan === 'yearly'} onSelect={() => setSelectedPlan('yearly')} tag="Save 40%" />
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4 mb-8">
                  <ul className="space-y-2 text-gray-300 text-center text-sm">
                      <li className="flex items-center justify-center gap-3">
                          <CheckIcon className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                          <span>Unlimited compatibility checks</span>
                      </li>
                      <li className="flex items-center justify-center gap-3">
                          <CheckIcon className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                          <span>AI-powered game search</span>
                      </li>
                      <li className="flex items-center justify-center gap-3">
                          <CheckIcon className="text-cyan-400 w-5 h-5 flex-shrink-0" />
                          <span>Priority access to new features</span>
                      </li>
                  </ul>
                </div>
                
                <button
                    onClick={() => onProceedToPayment(selectedPlan)}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 animate-pulse-slow"
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