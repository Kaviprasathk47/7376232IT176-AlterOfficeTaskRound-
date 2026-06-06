import React, { useState } from 'react';
import type { UserProfile, InvestmentGoal } from '../types';
import { ArrowRight, ArrowLeft, ShieldAlert, GraduationCap, Compass, BookOpen } from 'lucide-react';

interface UserSetupProps {
  onComplete: (profile: UserProfile, startPractice: boolean) => void;
}

export const UserSetup: React.FC<UserSetupProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [savings, setSavings] = useState<number>(10000);
  const [goal, setGoal] = useState<InvestmentGoal>('Learn Investing');
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const presets = [5000, 10000, 25000, 50000];

  const handleNext = () => {
    setStep(2);
  };

  const handleSelectPath = (startPractice: boolean) => {
    if (!startPractice) {
      setShowWarning(true);
    } else {
      onComplete({ savingsAmount: savings, goal, simulationCompleted: false }, true);
    }
  };

  const handleConfirmSkip = () => {
    onComplete({ savingsAmount: savings, goal, simulationCompleted: false }, false);
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-6 px-4 animate-slide-up max-w-4xl mx-auto">
      
      {/* Page header */}
      <div className="text-center space-y-2 mb-6 max-w-md">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-50 text-brand-indigo tracking-wider border border-indigo-100/40">
          Step 2 of 7
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Set Up Your Profile</h1>
      </div>

      {step === 1 ? (
        /* Setup Step 1: Input mock savings & goals */
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 glow-indigo">
          <div className="space-y-4">
            {/* Savings Preset Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-black text-slate-800">
                Select Your Mock Savings Amount
              </label>
              <div className="grid grid-cols-4 gap-2">
                {presets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSavings(amt)}
                    className={`py-3 px-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                      savings === amt
                        ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo ring-2 ring-brand-indigo/10'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-650'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-450 leading-relaxed">
                This mock wallet will be used for practice trading allocations.
              </p>
            </div>

            {/* Goal Selector */}
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-black text-slate-800">
                What is your main Investment Goal?
              </label>
              <div className="space-y-2.5">
                {[
                  { value: 'Learn Investing' as InvestmentGoal, label: 'Learn Investing', desc: 'I want to build my risk confidence and learn basic jargon.', icon: <GraduationCap className="w-5 h-5" /> },
                  { value: 'Wealth Growth' as InvestmentGoal, label: 'Wealth Growth', desc: 'Focus on higher risk, growth-oriented mock portfolios.', icon: <Compass className="w-5 h-5" /> },
                  { value: 'Long-Term Savings' as InvestmentGoal, label: 'Long-Term Savings', desc: 'Seek steady return projections over longer compounding periods.', icon: <BookOpen className="w-5 h-5" /> }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setGoal(item.value)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
                      goal === item.value
                        ? 'border-brand-indigo bg-brand-indigo/5 ring-2 ring-brand-indigo/10'
                        : 'border-slate-200 hover:bg-slate-50 bg-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${goal === item.value ? 'bg-brand-indigo/10 text-brand-indigo' : 'bg-slate-100 text-slate-500'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="block text-sm font-black text-slate-900 leading-none mb-1">{item.label}</span>
                      <span className="block text-[11px] text-slate-400 font-normal leading-relaxed">{item.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-150 text-[10px] text-slate-450 leading-normal text-center space-y-1">
            <span className="block font-black text-slate-800 uppercase tracking-wider">🔒 Security Guarantee</span>
            <p>
              InvestWise is an educational tool. We will never ask for bank credentials, account numbers, or real financials. Your savings are used only for simulation and portfolio planning.
            </p>
          </div>

          {/* Continue button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-4 bg-brand-indigo hover:bg-brand-indigo-dark text-white font-bold rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-brand-indigo/15 transition-all cursor-pointer"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : !showWarning ? (
        /* Path choice screen */
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 glow-indigo text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">Choose Your Path</h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
              How would you like to experience the platform today?
            </p>
          </div>

          <div className="space-y-3.5">
            {/* Path A */}
            <button
              onClick={() => handleSelectPath(true)}
              className="w-full p-5 rounded-2xl border-2 border-brand-indigo bg-brand-indigo/5 text-left flex items-start gap-4 transition-all hover:scale-[1.01] shadow-xs cursor-pointer group"
            >
              <div className="p-3 bg-brand-indigo text-white rounded-xl group-hover:rotate-12 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="block text-sm font-black text-slate-900">Practice Journey</span>
                  <span className="px-2 py-0.5 rounded-full text-[8.5px] font-extrabold uppercase bg-brand-indigo text-white">Recommended</span>
                </div>
                <span className="block text-xs text-slate-450 font-normal leading-relaxed">
                  Experience a short automated market fluctuation simulation before investing.
                </span>
              </div>
            </button>

            {/* Path B */}
            <button
              onClick={() => handleSelectPath(false)}
              className="w-full p-5 rounded-2xl border border-slate-200 bg-white text-left flex items-start gap-4 transition-all hover:bg-slate-50 cursor-pointer"
            >
              <div className="p-3 bg-slate-100 text-slate-500 rounded-xl">
                <ArrowRight className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-sm font-black text-slate-900">Skip to Investment Mode</span>
                <span className="block text-xs text-slate-450 font-normal leading-relaxed">
                  Bypass volatility simulation and go directly to asset explorer allocations.
                </span>
              </div>
            </button>
          </div>

          <button
            onClick={() => setStep(1)}
            className="text-xs font-bold text-slate-400 hover:text-slate-950 transition-colors flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Setup Details
          </button>
        </div>
      ) : (
        /* Warning screen when skipping */
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 glow-rose text-center animate-slide-up">
          <div className="mx-auto w-12 h-12 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900 leading-tight">Proceed Without Simulation?</h2>
            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
              You will enter investment mode without experiencing a market fluctuation simulation.
            </p>
          </div>

          {/* Checklist of what they miss */}
          <div className="bg-rose-50/50 border border-brand-rose/10 rounded-2xl p-4 text-left space-y-2 text-xs">
            <span className="block font-black text-rose-800 text-[10px] uppercase tracking-wider">Potentially Missed Lessons:</span>
            <div className="space-y-1.5 text-slate-600 font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-brand-rose font-bold">✗</span>
                <span>Market volatility understanding</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-rose font-bold">✗</span>
                <span>Loss awareness and drawing drawdown lines</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-rose font-bold">✗</span>
                <span>Simulated risk exposure demonstration</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowWarning(false)}
              className="flex-1 py-3 border border-slate-200 text-slate-650 hover:bg-slate-50 font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirmSkip}
              className="flex-1 py-3 bg-brand-rose hover:bg-brand-rose-dark text-white font-bold rounded-xl text-xs cursor-pointer transition-colors shadow-md shadow-brand-rose/15"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default UserSetup;
