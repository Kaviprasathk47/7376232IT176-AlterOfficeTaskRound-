import React, { useState } from 'react';
import type { InvestmentOption } from '../types';
import { ArrowLeft, ArrowRight, HelpCircle, AlertTriangle } from 'lucide-react';

interface InvestmentDecisionProps {
  option: InvestmentOption;
  availableSavings: number;
  onBack: () => void;
  onProceed: (amount: number) => void;
  onOpenGlossary: (term: string) => void;
}

export const InvestmentDecision: React.FC<InvestmentDecisionProps> = ({
  option,
  availableSavings,
  onBack,
  onProceed,
  onOpenGlossary
}) => {
  const [amount, setAmount] = useState<number>(1000);

  // Dynamic calculations based on option parameters
  const avgReturn = (option.gainMin + option.gainMax) / 2;
  
  const potentialLossAmt = Math.round(amount * (option.lossMax / 100));
  const expectedOutcomeAmt = Math.round(amount * (1 + avgReturn / 100));
  const bestCaseAmt = Math.round(amount * (1 + option.gainMax / 100));

  const handleContinue = () => {
    if (amount < 100 || amount > availableSavings) return;
    onProceed(amount);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Options
      </button>

      {/* Screen Title */}
      <div className="text-left space-y-1">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-50 text-brand-indigo tracking-wider border border-indigo-100/40">
          Step 3 of 5
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
          Review Your Decision: {option.name}
        </h1>
      </div>

      {/* Main Info Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Side: Text Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div>
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center">
                What is it?
                <button
                  type="button"
                  onClick={() => onOpenGlossary(option.name)}
                  className="inline-flex items-center justify-center text-brand-indigo hover:text-brand-indigo-dark shrink-0 cursor-pointer ml-1"
                  title="Define option"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold mt-1">
                {option.description}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                Why do people choose it?
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold mt-1">
                {option.whyChoose}
              </p>
            </div>
          </div>

          {/* Amount input controller card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              1. Enter Mock Investment Amount
            </h4>
            
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm">₹</span>
                <input
                  type="number"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAmount(Math.min(val, availableSavings));
                  }}
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-900 font-black text-sm focus:ring-2 focus:ring-brand-indigo/25 focus:outline-none"
                  min="100"
                  max={availableSavings}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 px-1">
                <span>Min: ₹100</span>
                <span>Max Savings: ₹{availableSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Calculator Outcomes (LOSS FIRST PRIORITY) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              2. Possible Outcomes
            </h4>

            <div className="space-y-3">
              {/* Prioritized Potential Loss Card (Strong Visual Red/Highlight) */}
              <div className="p-4 bg-red-50 border border-red-150 rounded-2xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-red-700 flex items-center">
                    Potential Loss
                    <button
                      type="button"
                      onClick={() => onOpenGlossary('Potential Loss')}
                      className="inline-flex items-center justify-center text-red-700 hover:text-red-950 shrink-0 cursor-pointer ml-1"
                      title="Define Potential Loss"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </span>
                  <span className="text-[9.5px] font-extrabold text-red-650 bg-red-100 px-2 py-0.5 rounded-md border border-red-200">
                    -{option.lossMax}% Max
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-red-750 font-semibold">You could lose up to:</span>
                  <span className="text-xl font-black text-red-600">-₹{potentialLossAmt.toLocaleString()}</span>
                </div>
                <div className="text-[10px] text-red-800 border-t border-red-200/50 pt-1.5 mt-1 font-bold">
                  Remaining amount in crash: <span className="font-extrabold text-red-900">₹{(amount - potentialLossAmt).toLocaleString()}</span>
                </div>
              </div>

              {/* Expected Outcome Card (Neutral Indigo) */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                    Expected Outcome
                  </span>
                  <span className="text-[9.5px] font-extrabold text-brand-indigo bg-indigo-50 px-2 py-0.5 rounded-md border border-brand-indigo/10">
                    +{avgReturn.toFixed(1)}% Avg
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-slate-500 font-semibold">Projected value:</span>
                  <span className="text-lg font-black text-slate-800">₹{expectedOutcomeAmt.toLocaleString()}</span>
                </div>
              </div>

              {/* Best Case Card (Green) */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                    Best Case
                  </span>
                  <span className="text-[9.5px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                    +{option.gainMax}% Max
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs text-emerald-750 font-semibold">Best-case value:</span>
                  <span className="text-lg font-black text-emerald-600">₹{bestCaseAmt.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Message */}
          <div className="p-3.5 bg-amber-50 border border-brand-amber/15 text-brand-amber-dark rounded-2xl flex items-start gap-2 text-[11px] leading-relaxed font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0 text-brand-amber-dark mt-0.5" />
            <p>
              This investment can both gain and lose value. Past performance does not guarantee future returns.
            </p>
          </div>
        </div>
      </div>

      {/* Continue CTA */}
      <button
        onClick={handleContinue}
        disabled={amount < 100 || amount > availableSavings}
        className={`w-full py-4 rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
          amount < 100 || amount > availableSavings
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
            : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.99] cursor-pointer shadow-md shadow-brand-indigo/15'
        }`}
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
export default InvestmentDecision;
