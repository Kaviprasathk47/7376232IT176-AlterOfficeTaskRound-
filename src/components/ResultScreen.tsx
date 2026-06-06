import React, { useState } from 'react';
import type { InvestmentOption } from '../types';
import { HelpCircle, RefreshCw, Star, Wallet, CheckCircle2 } from 'lucide-react';

interface ResultScreenProps {
  option: InvestmentOption;
  amount: number;
  onRestart: () => void;
  onOpenGlossary: (term: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  option,
  amount,
  onRestart,
  onOpenGlossary
}) => {
  const [comfortSelection, setComfortSelection] = useState<string | null>(null);

  const maxGainAmt = Math.round(amount * (option.gainMax / 100));
  const maxLossAmt = Math.round(amount * (option.lossMax / 100));
  const remainingSavings = 3000 - amount;

  const handleRestart = () => {
    if (!comfortSelection) return;
    onRestart();
  };

  const surveyOptions = [
    { value: 'Not Comfortable', label: 'Not Comfortable', desc: 'The potential loss is still too high for me.' },
    { value: 'Somewhat Comfortable', label: 'Somewhat Comfortable', desc: 'I understand the risk but would start small.' },
    { value: 'Comfortable', label: 'Comfortable', desc: 'I feel ready to allocate a small portion of savings.' }
  ];

  return (
    <div className="max-w-xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      
      {/* Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 mb-2">
            <CheckCircle2 className="w-6 h-6 animate-pulse" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-white/10 text-emerald-400 border border-white/5 tracking-wider">
            Step 5 of 5
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">Your First Investment Scenario</h1>
          <p className="text-slate-400 text-xs max-w-xs mx-auto">You have successfully evaluated a simulated mock investment path.</p>
        </div>
      </div>

      {/* Scenario Breakdown Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
          Decision Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150/40">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Option Selected</span>
            <span className="text-sm font-black text-slate-800">{option.name}</span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150/40">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Mock Investment</span>
            <span className="text-sm font-black text-brand-indigo">₹{amount.toLocaleString()}</span>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
            <span className="text-[9px] uppercase font-bold text-emerald-700 block tracking-wider">Possible Gain</span>
            <span className="text-sm font-black text-emerald-600">+₹{maxGainAmt.toLocaleString()}</span>
          </div>

          <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
            <span className="text-[9px] uppercase font-bold text-red-700 block tracking-wider flex items-center">
              Possible Loss
              <button
                type="button"
                onClick={() => onOpenGlossary('Potential Loss')}
                className="inline-flex items-center justify-center text-red-700 hover:text-red-950 shrink-0 cursor-pointer ml-1"
                title="Define Potential Loss"
              >
                <HelpCircle className="w-3 h-3" />
              </button>
            </span>
            <span className="text-sm font-black text-red-600">-₹{maxLossAmt.toLocaleString()}</span>
          </div>
        </div>

        {/* Remaining Savings widget */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/40 shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Remaining Savings</span>
              <span className="text-sm font-black text-slate-800">₹{remainingSavings.toLocaleString()}</span>
            </div>
          </div>
          <span className="text-[10px] text-slate-450 font-medium italic">out of ₹3,000</span>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-slate-50 border border-slate-150/60 rounded-3xl p-5 space-y-2">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Star className="w-4 h-4 text-emerald-500 fill-emerald-500" />
          Key Takeaway
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-650 leading-relaxed font-semibold">
          Investing involves both opportunity and risk. Starting with smaller amounts can help build confidence and protect your capital while you gain experience.
        </p>
      </div>

      {/* Reflection Question survey panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 glow-indigo">
        <div className="space-y-1">
          <span className="block text-[8.5px] uppercase font-black text-brand-indigo tracking-wider">Self Reflection</span>
          <h4 className="text-xs sm:text-sm font-black text-slate-905 leading-snug">
            After seeing these possible outcomes, how comfortable would you feel investing ₹1000?
          </h4>
        </div>

        <div className="space-y-2.5">
          {surveyOptions.map((item) => (
            <button
              key={item.value}
              onClick={() => setComfortSelection(item.value)}
              className={`w-full p-4 rounded-2xl border text-left flex flex-col transition-all duration-200 cursor-pointer ${
                comfortSelection === item.value
                  ? 'border-brand-indigo bg-brand-indigo/5 ring-2 ring-brand-indigo/10'
                  : 'border-slate-200 hover:bg-slate-50 bg-white'
              }`}
            >
              <span className="block text-xs font-black text-slate-900 leading-none mb-1">{item.label}</span>
              <span className="block text-[10px] text-slate-400 font-normal leading-relaxed">{item.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Try Another Investment action */}
      <button
        onClick={handleRestart}
        disabled={!comfortSelection}
        className={`w-full py-4 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
          !comfortSelection
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
            : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.99] cursor-pointer shadow-md shadow-brand-indigo/15'
        }`}
      >
        <RefreshCw className="w-4 h-4" />
        Try Another Investment
      </button>

    </div>
  );
};
export default ResultScreen;
