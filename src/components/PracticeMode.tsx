import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

interface PracticeModeProps {
  savingsAmount: number;
  onComplete: () => void;
  beginnerMode: boolean;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  savingsAmount,
  onComplete,
  beginnerMode,
}) => {
  const [simStep, setSimStep] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(savingsAmount);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [checks, setChecks] = useState({
    loss: false,
    gains: false,
    fluctuation: false,
  });

  // Progression multipliers: 1.00 -> 1.15 -> 0.92 -> 1.20 -> 0.85 -> 1.04
  const multipliers = [1.0, 1.15, 0.92, 1.2, 0.85, 1.04];

  useEffect(() => {
    if (simStep >= 5) {
      setIsAnimating(false);
      return;
    }

    const interval = setTimeout(() => {
      const nextStep = simStep + 1;
      setSimStep(nextStep);
      setCurrentValue(Math.round(savingsAmount * multipliers[nextStep]));
    }, 1000); // 1 step per second for 5 seconds total

    return () => clearTimeout(interval);
  }, [simStep, savingsAmount]);

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allChecked = checks.loss && checks.gains && checks.fluctuation;

  const handleActivate = () => {
    localStorage.setItem('investwise_journey_completed', 'true');
    onComplete();
  };

  const maxGainPct = 20;
  const maxLossPct = 15;

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-6 px-4 animate-slide-up max-w-4xl mx-auto">
      {/* Visual Badge */}
      <div className="mb-4">
        <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase bg-rose-100 text-brand-rose tracking-widest border border-rose-200 animate-pulse">
          PRACTICE MODE ACTIVE
        </span>
      </div>

      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg space-y-6 glow-indigo relative overflow-hidden">
        
        {isAnimating ? (
          /* ACTIVE ANIMATION LOOP */
          <div className="space-y-8 py-6 text-center animate-fade-in">
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                Simulating Market Volatility
              </h2>
              <p className="text-xs text-slate-500">
                Observe how quickly capital values fluctuate. No action required.
              </p>
            </div>

            {/* Giant Animated Balance Counter */}
            <div className="py-6 space-y-2">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">Mock Portfolio Balance</span>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 transition-all duration-300 transform scale-105">
                ₹{currentValue.toLocaleString()}
              </h1>
              
              {/* Dynamic Up/Down Indicators */}
              <div className="flex justify-center items-center gap-1.5 h-6">
                {simStep > 0 && multipliers[simStep] > multipliers[simStep - 1] ? (
                  <span className="text-xs font-black text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Market Rises (+{( (multipliers[simStep] - 1) * 100 ).toFixed(0)}%)
                  </span>
                ) : simStep > 0 ? (
                  <span className="text-xs font-black text-brand-rose flex items-center gap-0.5 bg-rose-50 px-2.5 py-0.5 rounded-full">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Market Declines ({( (multipliers[simStep] - 1) * 100 ).toFixed(0)}%)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-450">Initializing Wallet...</span>
                )}
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-rose transition-all duration-300"
                style={{ width: `${(simStep / 5) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-[10px] text-slate-400 font-extrabold uppercase">
              Time remaining: {5 - simStep}s
            </div>
          </div>
        ) : (
          /* SIMULATION COMPLETE SCREEN */
          <div className="space-y-6 animate-slide-up">
            
            {/* Completion Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">Simulation Complete</h2>
              <p className="text-slate-500 text-xs">
                You have witnessed how asset classes fluctuate under stress.
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-150">
              <div className="text-center space-y-0.5">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Peak Growth</span>
                <span className="text-lg font-black text-emerald-600">+{maxGainPct}%</span>
              </div>
              <div className="text-center space-y-0.5 border-l border-slate-200">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Max Drawdown</span>
                <span className="text-lg font-black text-brand-rose">-{maxLossPct}%</span>
              </div>
            </div>

            {/* Volatility Summary message */}
            <div className="p-4 bg-brand-rose/5 border border-brand-rose/10 rounded-2xl text-center">
              <p className="text-xs text-slate-650 leading-relaxed font-semibold">
                "Markets fluctuate continuously. Long-term investing helps reduce emotional decision making."
              </p>
            </div>

            {/* Readiness Checklist */}
            <div className="space-y-3">
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Investment Readiness Checklist
              </span>
              
              {[
                { key: 'loss' as const, text: 'I understand investments can lose value' },
                { key: 'gains' as const, text: 'I understand gains are not guaranteed' },
                { key: 'fluctuation' as const, text: 'I understand market fluctuations' }
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                    checks[item.key]
                      ? 'border-brand-indigo bg-brand-indigo/[0.01]'
                      : 'border-slate-200 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                      checks[item.key] ? 'bg-brand-indigo border-brand-indigo text-white' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {checks[item.key] && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-805 select-none">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Active transition button */}
            <button
              disabled={!allChecked}
              onClick={handleActivate}
              className={`w-full py-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                allChecked
                  ? 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.98] cursor-pointer shadow-md shadow-brand-indigo/15'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
              }`}
            >
              Activate Investment Mode
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default PracticeMode;
