import React, { useState } from 'react';
import type { Investment } from '../types';
import { ArrowLeft, ArrowRight, HelpCircle, BookOpen, ShieldAlert, BadgeCheck, Lightbulb } from 'lucide-react';

interface UnderstandAssetProps {
  investment: Investment;
  availableBalance: number;
  journeyCompleted: boolean;
  beginnerMode: boolean;
  onBack: () => void;
  onStartJourney: () => void;
  onAllocateFunds: (amount: number) => void;
}

export const UnderstandAsset: React.FC<UnderstandAssetProps> = ({
  investment,
  availableBalance,
  journeyCompleted,
  beginnerMode,
  onBack,
  onStartJourney,
  onAllocateFunds,
}) => {
  const [amount, setAmount] = useState<number>(Math.min(1000, availableBalance));

  const handleAllocate = () => {
    if (amount <= 0 || amount > availableBalance) return;
    onAllocateFunds(amount);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      {/* Back to Explorer */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Discovery
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-brand-indigo/10 text-brand-indigo tracking-wider">
            Investment Detail Profile
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{investment.name}</h1>
        </div>
        <span className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-605">
          Risk Class: <span className="font-extrabold text-brand-indigo">{investment.riskLevel}</span>
        </span>
      </div>

      {/* Simplified Educational Guide Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* What is this investment? */}
        <div className="glass-panel p-5 border border-slate-150 space-y-2.5">
          <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-indigo shrink-0" />
            What is this investment?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {investment.whatIsIt}
          </p>
        </div>

        {/* Why choose it? */}
        <div className="glass-panel p-5 border border-slate-150 space-y-2.5">
          <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-indigo shrink-0" />
            Why do people choose it?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {investment.whyInvest}
          </p>
        </div>

        {/* Benefits */}
        <div className="glass-panel p-5 border border-slate-150 bg-emerald-50/[0.01] space-y-2.5">
          <h3 className="font-extrabold text-emerald-700 text-xs sm:text-sm flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            Potential Benefits
          </h3>
          <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-normal">
            {investment.potentialBenefits}
          </p>
        </div>

        {/* Risks */}
        <div className="glass-panel p-5 border border-brand-rose/20 bg-brand-rose/[0.01] space-y-2.5">
          <h3 className="font-extrabold text-brand-rose text-xs sm:text-sm flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            Potential Risks
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
            {investment.potentialRisks}
          </p>
        </div>

        {/* Expected Behavior */}
        <div className="glass-panel p-5 border border-slate-150 md:col-span-2 space-y-2.5">
          <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-brand-indigo shrink-0" />
            Expected Investment Behavior
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {investment.expectedBehavior}
          </p>
          {beginnerMode && (
            <p className="text-[10px] text-brand-indigo font-semibold bg-brand-indigo/5 p-2 rounded-lg leading-normal italic mt-1">
              💡 Coach Tip: Expected behavior shows how this asset reacts to different economic cycles. Low risk grows slowly, high risk swings wildly.
            </p>
          )}
        </div>
      </div>

      {/* Dynamic Actions Block */}
      {!journeyCompleted ? (
        /* Incomplete Journey mode: Force visual journey walkthrough */
        <div className="p-5 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/15 space-y-4 glow-indigo text-center">
          <div className="space-y-1">
            <h4 className="font-black text-sm text-slate-800">Visual Guided Journey Required</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed max-w-md mx-auto">
              Before simulating portfolio allocations, our personal investment coach walks you through the 5 steps of investing to build your risk confidence.
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
        /* Journey Completed mode: Allow custom fund practice allocations */
        <div className="glass-panel p-6 border border-slate-100 glow-indigo space-y-5">
          <h4 className="font-extrabold text-slate-900 text-sm">Practice Fund Allocations</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Input Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-400">
                <span>Enter Allocation (₹):</span>
                <span>Available Cash: ₹{availableBalance.toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold">₹</span>
                <input
                  type="number"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAmount(Math.max(0, Math.min(val, availableBalance)));
                  }}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-205 text-slate-800 font-bold focus:ring-2 focus:ring-brand-indigo/25 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Quick selector buttons */}
            <div className="space-y-2">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Quick Select
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {[1000, 2000, 5000, 10000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    disabled={preset > availableBalance}
                    onClick={() => setAmount(preset)}
                    className={`py-1.5 px-0.5 rounded-lg border text-[10px] font-bold transition-all ${
                      preset > availableBalance
                        ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
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

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={onBack}
              className="py-2.5 px-5 rounded-xl border border-slate-200 text-slate-650 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={amount <= 0 || amount > availableBalance}
              onClick={handleAllocate}
              className={`py-2.5 px-6 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 transition-all ${
                amount <= 0 || amount > availableBalance
                  ? 'bg-slate-300 cursor-not-allowed opacity-50'
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
