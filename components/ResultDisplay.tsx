import React from 'react';
import type { CompatibilityReport, Software, SystemSpecs } from '../types';
import { CheckIcon, CrossIcon } from './IconComponents';

interface ResultDisplayProps {
  result: CompatibilityReport;
  software: Software;
  userSpecs: SystemSpecs;
}

const RequirementCard: React.FC<{ title: string, specs: SystemSpecs }> = ({ title, specs }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg transition-all hover:bg-gray-800/80 hover:scale-[1.02]">
        <h4 className="font-semibold text-lg mb-2 text-cyan-400">{title}</h4>
        <ul className="text-sm space-y-1 text-gray-300 font-sans">
            <li><strong>CPU:</strong> {specs.cpu}</li>
            <li><strong>GPU:</strong> {specs.gpu}</li>
            <li><strong>RAM:</strong> {specs.ram}</li>
            <li><strong>OS:</strong> {specs.os}</li>
        </ul>
    </div>
);

const ComponentCheckItem: React.FC<{ label: string; meets: boolean; details: string }> = ({ label, meets, details }) => (
    <div className="flex items-start space-x-3 font-sans">
        {meets ? <CheckIcon className="text-green-400 mt-1 flex-shrink-0" /> : <CrossIcon className="text-red-400 mt-1 flex-shrink-0" />}
        <div>
            <span className="font-semibold">{label}:</span> {meets ? <span className="text-green-400">Pass</span> : <span className="text-red-400">Fail</span>}
            <p className="text-xs text-gray-400">{details}</p>
        </div>
    </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, software, userSpecs }) => {
  const { isCompatible, estimatedPerformance, analysis, componentCheck } = result;

  return (
    <section id="result" className="bg-gray-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-gray-700 animate-fade-in-up">
        
        {/* Result Summary */}
        <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2 text-white">Compatibility Report for <span className="text-cyan-400">{software.name}</span></h3>
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className={`py-2 px-6 rounded-lg font-bold text-xl ${isCompatible ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                    {isCompatible ? 'Fully Compatible' : 'Compatibility Issues'}
                </div>
                <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-400">{estimatedPerformance}</div>
                    <div className="text-sm uppercase tracking-wider text-gray-300">Est. Performance</div>
                </div>
            </div>
             <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-center font-sans">{analysis}</p>
        </div>

        {/* Detailed Report */}
        <div>
            <div className="bg-gray-800/50 p-4 rounded-lg mb-6 max-w-3xl mx-auto">
                <h4 className="font-semibold text-lg mb-3 text-cyan-400 text-center">Component Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
                    <ComponentCheckItem label="CPU" meets={componentCheck.cpu.meetsRecommended} details={componentCheck.cpu.details} />
                    <ComponentCheckItem label="GPU" meets={componentCheck.gpu.meetsRecommended} details={componentCheck.gpu.details} />
                    <ComponentCheckItem label="RAM" meets={componentCheck.ram.meetsRecommended} details={componentCheck.ram.details} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                <RequirementCard title="Your Specs" specs={userSpecs} />
                <RequirementCard title="Recommended" specs={software.recReqs} />
                <RequirementCard title="Minimum" specs={software.minReqs} />
            </div>
        </div>
    </section>
  );
};