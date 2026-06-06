import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface WalkthroughProps {
  beginnerMode: boolean;
  onComplete: () => void;
}

export const Walkthrough: React.FC<WalkthroughProps> = ({ beginnerMode, onComplete }) => {
  const [journeyStep, setJourneyStep] = useState<number>(1);

  const handleFinish = () => {
    localStorage.setItem('investwise_journey_completed', 'true');
    onComplete();
  };

  const stepsList = [
    { label: 'Choose Asset', num: 1 },
    { label: 'Invest ₹1k', num: 2 },
    { label: 'Market Rises', num: 3 },
    { label: 'Market Drops', num: 4 },
    { label: 'Summary', num: 5 }
  ];

  return (
    <div className="max-w-xl mx-auto py-8 px-4 animate-slide-up">
      {/* Visual Priority: 1 Hero Element (Duolingo-style horizontal timeline) */}
      <div className="mb-8 relative flex items-center justify-between">
        {/* Gray connecting line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-10 rounded-full"></div>
        {/* Active colored progress line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-indigo -z-10 rounded-full transition-all duration-300"
          style={{ width: `${((journeyStep - 1) / 4) * 100}%` }}
        ></div>

        {stepsList.map((step) => {
          const isActive = journeyStep === step.num;
          const isCompleted = journeyStep > step.num;

          return (
            <div key={step.num} className="flex flex-col items-center gap-1.5 z-10">
              <button
                type="button"
                disabled={step.num > journeyStep}
                onClick={() => setJourneyStep(step.num)}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  isCompleted
                    ? 'bg-brand-indigo text-white shadow-sm'
                    : isActive
                    ? 'bg-white text-brand-indigo ring-4 ring-brand-indigo/15 border-2 border-brand-indigo shadow-md'
                    : 'bg-white text-slate-400 border border-slate-200'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.num}
              </button>
              <span className={`text-[8.5px] uppercase font-bold tracking-wider hidden sm:block ${isActive ? 'text-slate-900 font-extrabold' : 'text-slate-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Visual Priority: 2 Supporting Elements (Illustration + Step details card) */}
      <div className="glass-panel p-6 sm:p-8 border border-slate-100 glow-indigo flex flex-col justify-between min-h-[380px] rounded-3xl">
        
        {/* Step 1: Choose category */}
        {journeyStep === 1 && (
          <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              {/* Illustration */}
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-brand-indigo/5 rounded-full">
                <svg className="w-14 h-14 text-brand-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Step 1 of 5</span>
                <h3 className="font-black text-slate-900 text-lg leading-tight">Choose Your Investment</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
                First, you select a basket of companies to invest in. We will pick the S&P 500 Index Fund which groups 500 of the largest corporations.
              </p>
            </div>

            {beginnerMode && (
              <p className="text-[10px] text-brand-indigo font-semibold bg-brand-indigo/5 p-2 rounded-xl text-center leading-normal italic">
                💡 Coach Hint: Index funds help you diversify, ensuring a single company failing won't wipe you out.
              </p>
            )}

            <button
              onClick={() => setJourneyStep(2)}
              className="w-full mt-4 py-3 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-indigo/15"
            >
              Choose S&P 500 Fund
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Invest Mock ₹1000 */}
        {journeyStep === 2 && (
          <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              {/* Illustration */}
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-emerald-50 rounded-full">
                <svg className="w-14 h-14 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Step 2 of 5</span>
                <h3 className="font-black text-slate-900 text-lg leading-tight">Invest Practice Capital</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
                To test the market lifecycle, you will commit ₹1,000 of virtual practice capital. No real savings are ever at risk.
              </p>

              <div className="p-3 bg-slate-50 border border-slate-150 rounded-2xl flex justify-between items-center text-xs w-48 mx-auto font-black text-slate-800">
                <span>Allocation:</span>
                <span className="text-brand-indigo">₹1,000</span>
              </div>
            </div>

            <button
              onClick={() => setJourneyStep(3)}
              className="w-full mt-4 py-3 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-indigo/15"
            >
              Confirm ₹1,000 Practice Invest
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 3: Market goes UP */}
        {journeyStep === 3 && (
          <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              {/* Illustration */}
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full">
                <svg className="w-12 h-12 text-emerald-600 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Step 3 of 5</span>
                <h3 className="font-black text-emerald-700 text-lg leading-tight">Economic Growth Cycle</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
                Good economic news causes corporate earnings to climb. Your index fund value rises by 15%, growing to ₹1,150.
              </p>

              <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-2xl flex justify-between items-center text-xs w-48 mx-auto font-black">
                <span className="text-emerald-700">Practice Value:</span>
                <span className="text-emerald-600">₹1,150</span>
              </div>
            </div>

            <button
              onClick={() => setJourneyStep(4)}
              className="w-full mt-4 py-3 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-indigo/15"
            >
              See What Happens Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 4: Market goes DOWN */}
        {journeyStep === 4 && (
          <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              {/* Illustration */}
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-rose-50 text-brand-rose rounded-full">
                <svg className="w-12 h-12 text-brand-rose" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                  <polyline points="17 18 23 18 23 12" />
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Step 4 of 5</span>
                <h3 className="font-black text-rose-700 text-lg leading-tight">Economic Decline Cycle</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
                An economic recession triggers drops in stock prices. Your simulated investment falls 15%, dropping back to ₹850.
              </p>

              <div className="p-3 bg-rose-50 border border-rose-150 rounded-2xl flex justify-between items-center text-xs w-48 mx-auto font-black">
                <span className="text-rose-750">Practice Value:</span>
                <span className="text-brand-rose">₹850</span>
              </div>
            </div>

            <button
              onClick={() => setJourneyStep(5)}
              className="w-full mt-4 py-3 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-indigo/15"
            >
              See Final Lesson
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 5: Summary Lessons */}
        {journeyStep === 5 && (
          <div className="space-y-6 flex-1 flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              {/* Illustration */}
              <div className="mx-auto w-24 h-24 flex items-center justify-center bg-brand-indigo/5 rounded-full">
                <svg className="w-14 h-14 text-brand-indigo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>

              <div className="text-center space-y-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Step 5 of 5</span>
                <h3 className="font-black text-slate-900 text-lg leading-tight">Timeline Summary</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 text-center leading-relaxed">
                You have completed a full market lifecycle of growth and loss. Investments fluctuate, and risk is always connected to return potential.
              </p>

              {beginnerMode && (
                <div className="p-3 bg-brand-indigo/5 rounded-xl text-[10px] text-brand-indigo text-center leading-snug">
                  🎉 Ready! Your practice account balance is now ready for custom allocations.
                </div>
              )}
            </div>

            <button
              onClick={handleFinish}
              className="w-full mt-4 py-3.5 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-brand-indigo/15"
            >
              Finish & Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Walkthrough;
