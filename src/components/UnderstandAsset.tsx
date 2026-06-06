import React, { useState } from 'react';
import type { Investment } from '../types';
import { ArrowLeft, ArrowRight, BookOpen, ShieldAlert, BadgeCheck, Lightbulb, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface UnderstandAssetProps {
  investment: Investment;
  availableBalance: number;
  journeyCompleted: boolean;
  beginnerMode: boolean;
  onBack: () => void;
  onStartJourney: () => void;
  onAllocateFunds: (amount: number) => void;
}

type AccordionSection = 'what' | 'why' | 'risks' | 'example';

export const UnderstandAsset: React.FC<UnderstandAssetProps> = ({
  investment,
  availableBalance,
  journeyCompleted,
  beginnerMode,
  onBack,
  onStartJourney,
  onAllocateFunds,
}) => {
  const [activeSection, setActiveSection] = useState<AccordionSection | null>('what');
  const [amount, setAmount] = useState<number>(Math.min(1000, availableBalance));

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAllocate = () => {
    if (amount <= 0 || amount > availableBalance) return;
    onAllocateFunds(amount);
  };

  // Dynamic calculations for the example scenario section
  const exampleAmount = 1000;
  const potentialGain = exampleAmount * (investment.returnMax / 100);
  const potentialLoss = exampleAmount * (investment.lossMax / 100);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      {/* Back to Explorer */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discovery
      </button>

      {/* Visual Priority: 1 Hero Element */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-48 h-48 bg-brand-indigo/10 rounded-full blur-2xl"></div>
        <div className="space-y-2 relative z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-white/10 text-brand-indigo-light border border-white/5 tracking-wider">
            Asset Profile
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{investment.name}</h1>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-slate-400">Risk Profile:</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-white/10 text-white uppercase border border-white/10">
              {investment.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Priority: 2 Supporting Elements (Accordion & practice allocation) */}
      <div className="space-y-3">
        {/* Section 1: What is this? */}
        <div className="glass-panel border border-slate-100 overflow-hidden">
          <button
            onClick={() => toggleSection('what')}
            className="w-full flex items-center justify-between p-4 font-black text-slate-800 text-sm hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-indigo" />
              What is this investment?
            </span>
            {activeSection === 'what' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {activeSection === 'what' && (
            <div className="p-4 border-t border-slate-50 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50/20 animate-fade-in">
              {investment.whatIsIt}
            </div>
          )}
        </div>

        {/* Section 2: Why do people choose it? */}
        <div className="glass-panel border border-slate-100 overflow-hidden">
          <button
            onClick={() => toggleSection('why')}
            className="w-full flex items-center justify-between p-4 font-black text-slate-800 text-sm hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-indigo" />
              Why do people choose it?
            </span>
            {activeSection === 'why' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {activeSection === 'why' && (
            <div className="p-4 border-t border-slate-50 text-xs sm:text-sm text-slate-600 space-y-2 bg-slate-50/20 animate-fade-in">
              <p>{investment.whyInvest}</p>
              <div className="flex items-start gap-2 text-emerald-800 font-bold bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100/30">
                <BadgeCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>Benefits: {investment.potentialBenefits}</span>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Risks */}
        <div className="glass-panel border border-slate-100 overflow-hidden">
          <button
            onClick={() => toggleSection('risks')}
            className="w-full flex items-center justify-between p-4 font-black text-slate-800 text-sm hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-rose" />
              What are the key risks?
            </span>
            {activeSection === 'risks' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {activeSection === 'risks' && (
            <div className="p-4 border-t border-slate-50 text-xs sm:text-sm text-slate-600 bg-slate-50/20 animate-fade-in">
              <div className="flex items-start gap-2 text-brand-rose bg-brand-rose/5 p-3 rounded-xl border border-brand-rose/10 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{investment.potentialRisks}</span>
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Example scenario */}
        <div className="glass-panel border border-slate-100 overflow-hidden">
          <button
            onClick={() => toggleSection('example')}
            className="w-full flex items-center justify-between p-4 font-black text-slate-800 text-sm hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-brand-indigo" />
              Example return scenario
            </span>
            {activeSection === 'example' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {activeSection === 'example' && (
            <div className="p-4 border-t border-slate-50 text-xs sm:text-sm text-slate-600 space-y-3 bg-slate-50/20 animate-fade-in">
              <p>{investment.expectedBehavior}</p>
              
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 grid grid-cols-2 gap-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">If Market Rises</span>
                  <span className="text-sm font-black text-emerald-600">+₹{potentialGain.toFixed(0)}</span>
                </div>
                <div className="border-l border-slate-200">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase block">If Market Plunges</span>
                  <span className="text-sm font-black text-rose-600">-₹{potentialLoss.toFixed(0)}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center font-normal italic leading-snug">
                Based on a simulated ₹1,000 investment. Risk limits show the worst-case historical single-year drops.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Visual Priority: 3 Primary Action */}
      {!journeyCompleted ? (
        <div className="p-5 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/15 text-center space-y-4 shadow-sm">
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-slate-850">Visual Guided Journey Required</h4>
            <p className="text-slate-500 text-xs max-w-md mx-auto leading-normal">
              Before committing practice funds, let's step through a simulated market lifecycle so you can see how prices fluctuate.
            </p>
          </div>
          <button
            onClick={onStartJourney}
            className="w-full sm:w-auto px-6 py-3 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 mx-auto transition-all active:scale-[0.98] shadow-md shadow-brand-indigo/15 cursor-pointer"
          >
            Start Guided Investment Journey
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="glass-panel p-5 sm:p-6 border border-slate-100 glow-indigo space-y-4">
          <h4 className="font-extrabold text-slate-900 text-sm">Practice Fund Allocations</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Input Amount */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                <span>Enter Amount (₹):</span>
                <span>Unused Cash: ₹{availableBalance.toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs">₹</span>
                <input
                  type="number"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAmount(Math.max(0, Math.min(val, availableBalance)));
                  }}
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-2 rounded-xl border border-slate-200 text-slate-800 font-bold focus:ring-2 focus:ring-brand-indigo/25 focus:outline-none text-xs"
                />
              </div>
            </div>

            {/* Quick selector buttons */}
            <div className="space-y-1">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Presets
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[1000, 2000, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    disabled={preset > availableBalance}
                    onClick={() => setAmount(preset)}
                    className={`py-1.5 rounded-lg border text-[9px] font-bold transition-all cursor-pointer ${
                      preset > availableBalance
                        ? 'border-slate-100 bg-slate-50 text-slate-350 cursor-not-allowed'
                        : amount === preset
                        ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo'
                        : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                    }`}
                  >
                    ₹{preset >= 1000 ? `${preset/1000}k` : preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {beginnerMode && (
            <p className="text-[10px] text-slate-450 leading-relaxed italic text-center sm:text-left">
              💡 Coach Tip: Spreading cash across safe and risky assets prevents heavy drawdowns.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={onBack}
              className="py-2 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={amount <= 0 || amount > availableBalance}
              onClick={handleAllocate}
              className={`py-2 px-5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition-all ${
                amount <= 0 || amount > availableBalance
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.98] cursor-pointer shadow-md shadow-brand-indigo/15'
              }`}
            >
              Simulate Allocation (₹{amount.toLocaleString()})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UnderstandAsset;
