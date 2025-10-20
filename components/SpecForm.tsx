import React, { useState } from 'react';
import type { SystemSpecs } from '../types';

interface SpecFormProps {
  onSubmit: (specs: SystemSpecs) => void;
  isLoading: boolean;
}

export const SpecForm: React.FC<SpecFormProps> = ({ onSubmit, isLoading }) => {
  const [specs, setSpecs] = useState<SystemSpecs>({
    cpu: 'Intel Core i5-9600K',
    gpu: 'NVIDIA GeForce RTX 2070',
    ram: '16 GB',
    os: 'Windows 10 64-bit',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecs((prevSpecs) => ({ ...prevSpecs, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(specs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-white">2. Enter Your Specs</h3>
      <div>
        <label htmlFor="cpu" className="block text-sm font-medium text-gray-400 mb-1">CPU</label>
        <input
          type="text"
          name="cpu"
          id="cpu"
          value={specs.cpu}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., Intel Core i7-9700K"
          required
        />
      </div>
      <div>
        <label htmlFor="gpu" className="block text-sm font-medium text-gray-400 mb-1">GPU</label>
        <input
          type="text"
          name="gpu"
          id="gpu"
          value={specs.gpu}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., NVIDIA GeForce RTX 3080"
          required
        />
      </div>
      <div>
        <label htmlFor="ram" className="block text-sm font-medium text-gray-400 mb-1">RAM</label>
        <input
          type="text"
          name="ram"
          id="ram"
          value={specs.ram}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., 16 GB"
          required
        />
      </div>
      <div>
        <label htmlFor="os" className="block text-sm font-medium text-gray-400 mb-1">Operating System</label>
        <input
          type="text"
          name="os"
          id="os"
          value={specs.os}
          onChange={handleChange}
          className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500 transition"
          placeholder="e.g., Windows 11"
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
      >
        {isLoading ? 'Analyzing...' : 'Check Compatibility'}
      </button>
    </form>
  );
};