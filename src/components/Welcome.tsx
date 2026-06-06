import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-8 px-4 animate-slide-up max-w-4xl mx-auto">
      {/* Visual Priority: 1 Hero Element */}
      <div className="text-center space-y-6 max-w-xl">
        <div className="relative mx-auto w-28 h-28 flex items-center justify-center bg-brand-indigo/5 rounded-full mb-2">
          <svg className="w-16 h-16 text-brand-indigo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shieldGradWelcome" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#4f46e5" fillOpacity="0.05" />
            <path d="M50 15L25 25V50C25 68 39 80 50 85C61 80 75 68 75 50V25L50 15Z" fill="url(#shieldGradWelcome)" />
            <path d="M50 35C50 35 44 45 44 52C44 55.3 46.7 58 50 58C53.3 58 56 55.3 56 52C56 45 50 35 50 35Z" fill="white" />
            <circle cx="50" cy="52" r="3" fill="#34d399" />
          </svg>
          <div className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-sm">₹</div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
          InvestWise
        </h1>
        
        <p className="text-lg sm:text-xl font-extrabold text-brand-indigo tracking-wider">
          "Invest with confidence, not assumptions."
        </p>

        <p className="text-slate-500 text-sm leading-relaxed font-normal max-w-sm mx-auto">
          A beginner-friendly investment platform that helps you understand investments before committing money.
        </p>
      </div>

      {/* Visual Priority: 2 Supporting Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mt-8">
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-1">
          <span className="block font-black text-slate-800 text-sm">Interactive Simulations</span>
          <span className="block text-xs text-slate-450 font-normal leading-relaxed">
            Practice market drops and gains risk-free before making financial decisions.
          </span>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-center space-y-1">
          <span className="block font-black text-slate-800 text-sm">Jargon-Free Analysis</span>
          <span className="block text-xs text-slate-450 font-normal leading-relaxed">
            Understand expectations, volatility ranges, and holding rules immediately.
          </span>
        </div>
      </div>

      {/* Visual Priority: 3 Primary Action */}
      <button
        onClick={onStart}
        className="w-full max-w-xl mt-8 py-4 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-indigo/15 active:scale-[0.99] cursor-pointer"
      >
        Start Journey
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default Welcome;
