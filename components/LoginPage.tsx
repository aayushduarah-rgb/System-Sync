import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login: any non-empty credentials will work
        if (username.trim() && password.trim()) {
            onLoginSuccess();
        }
    };

    return (
        <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen items-center justify-center animate-fade-in">
            <div className="w-full max-w-md">
                <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-8 border border-gray-700 shadow-lg shadow-cyan-500/10">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-cyan-400 mb-2">Login Required</h1>
                        <p className="text-gray-400">You've used all your free checks. Please login to continue.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
                                placeholder="any_username"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
                                placeholder="any_password"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};