import React from 'react';
import { ArrowRight, Wallet } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-8 px-4 animate-slide-up max-w-4xl mx-auto text-center">
      {/* Visual Priority: 1 Hero Element */}
      <div className="space-y-6 max-w-xl">
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-indigo-50 rounded-full mb-2 border border-indigo-100/50">
          <svg className="w-12 h-12 text-brand-indigo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="absolute top-0 right-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs text-white font-black shadow-sm">₹</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Your First Investment Starts Here
        </h1>
        
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          See what could happen to your money before making your first investment decision.
        </p>
      </div>

      {/* Arun Persona Setup Block */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mt-8 w-full max-w-md space-y-4 text-left glow-indigo">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100/40">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Your Mock Starting Savings</span>
            <span className="block text-2xl font-black text-slate-900">₹3,000</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 text-[11px] text-slate-500 leading-normal flex items-start gap-2">
          <span className="text-base">💡</span>
          <p>
            This mock balance is used exclusively to simulate your first investment choices and show potential outcomes safely.
          </p>
        </div>
      </div>

      {/* Action */}
      <button
        onClick={onStart}
        className="w-full max-w-md mt-6 py-4 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-indigo/15 active:scale-[0.99] cursor-pointer"
      >
        Start
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default Welcome;
