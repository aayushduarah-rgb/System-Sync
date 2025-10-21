import React, { useState } from 'react';
import type { Plan } from '../App';

interface PaymentPageProps {
  onPaymentSuccess: () => void;
  onBack: () => void;
  plan: Plan;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onPaymentSuccess, onBack, plan }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const price = plan === 'monthly' ? 199 : 999;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
        // Simulate a successful payment
        onPaymentSuccess();
    }, 2500);
  };

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center animate-fade-in-up">
        <div className="w-full max-w-md">
             <button onClick={onBack} disabled={isProcessing} className="mb-8 text-cyan-400 hover:text-cyan-300 transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg disabled:opacity-50">
                &larr; Back to Subscription
            </button>
            <div className="bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-lg p-8 border border-gray-700 shadow-lg shadow-cyan-500/10">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-cyan-400 mb-2">Secure Payment</h1>
                    <p className="text-gray-400">Complete your purchase for SystemSync Pro ({plan}).</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-400 mb-1">Card Number</label>
                        <input type="text" id="card-number" disabled={isProcessing} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                             <label htmlFor="expiry" className="block text-sm font-medium text-gray-400 mb-1">Expiry</label>
                            <input type="text" id="expiry" disabled={isProcessing} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500" placeholder="MM / YY" />
                        </div>
                        <div className="flex-1">
                             <label htmlFor="cvc" className="block text-sm font-medium text-gray-400 mb-1">CVC</label>
                            <input type="text" id="cvc" disabled={isProcessing} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500" placeholder="123" />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="card-holder" className="block text-sm font-medium text-gray-400 mb-1">Card Holder</label>
                        <input type="text" id="card-holder" disabled={isProcessing} className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500" placeholder="Aayush Duarah" />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:bg-gray-600 disabled:scale-100 flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : `Pay ₹${price} securely`}
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};