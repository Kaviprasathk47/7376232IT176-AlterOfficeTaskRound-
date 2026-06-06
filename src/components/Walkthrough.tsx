import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, TrendingUp, TrendingDown, Award, Compass } from 'lucide-react';

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

  return (
    <div className="max-w-xl mx-auto py-8 px-4 animate-slide-up">
      {/* Visual Header */}
      <div className="text-center space-y-2 mb-6">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-brand-indigo/10 text-brand-indigo tracking-wider">
          One-Time Guided Coach Journey
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your First Investment Journey</h1>
        <p className="text-slate-500 text-xs max-w-sm mx-auto">
          Experience the complete lifecycle of an asset in 5 steps to understand returns and volatility.
        </p>
      </div>

      {/* Visual Stepper Card Panel */}
      <div className="glass-panel p-6 sm:p-8 border border-slate-100 glow-indigo flex flex-col justify-between min-h-[350px]">
        
        {/* Step 1: Choose category */}
        {journeyStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-indigo/10 rounded-xl text-brand-indigo">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Step 1 of 5</span>
                <h3 className="font-extrabold text-slate-900 text-sm">Choose Your Investment Category</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal">
              Before investing, you must select an asset category. Let\'s pick a moderate S&P 500 Index Fund, which bundles the top 500 US companies.
            </p>

            {/* Target Selectable Card */}
            <div className="p-4 rounded-2xl border-2 border-brand-indigo bg-brand-indigo/5 cursor-pointer">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-900">S&P 500 Index Fund</span>
                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold border border-brand-amber text-brand-amber-dark bg-brand-amber-light/10">Moderate</span>
              </div>
              <span className="block text-[11px] text-slate-500 mt-1">Invests in the 500 largest US companies.</span>
            </div>

            {beginnerMode && (
              <p className="text-[10px] text-brand-indigo font-medium bg-brand-indigo/5 p-2.5 rounded-xl border border-brand-indigo/10 leading-normal italic">
                💡 <strong>Coach Tip:</strong> Index funds are diversified, meaning one single company failing will not wipe out your savings.
              </p>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setJourneyStep(2)}
                className="py-2.5 px-5 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98]"
              >
                Choose S&P 500 Fund
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Invest Mock ₹1000 */}
        {journeyStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Step 2 of 5</span>
                <h3 className="font-extrabold text-slate-900 text-sm">Invest Practice Capital</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal">
              You decide how much cash to allocate. Let\'s practice by allocating a mock ₹1,000 into the S&P 500 Index Fund.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Allocation Amount:</span>
              <span className="font-extrabold text-slate-900">₹1,000</span>
            </div>

            {beginnerMode && (
              <p className="text-[10px] text-slate-500 italic">
                ℹ️ Placing ₹1,000 here means ₹1,000 is moved from Cash into the Index Fund.
              </p>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setJourneyStep(1)}
                className="text-xs font-bold text-slate-400 hover:text-slate-950 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setJourneyStep(3)}
                className="py-2.5 px-5 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98]"
              >
                Confirm ₹1,000 Investment
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Market goes UP */}
        {journeyStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl animate-bounce">
                <TrendingUp className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Step 3 of 5</span>
                <h3 className="font-extrabold text-slate-900 text-sm">Market Booms (Upward Cycle)</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal">
              Good news! The general economy expands, corporate earnings increase, and index stock values climb.
            </p>

            {/* Performance metric */}
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex justify-between items-center">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Portfolio Value</span>
                <span className="text-2xl font-black text-emerald-600">₹1,150</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Simulated Return</span>
                <span className="text-sm font-bold text-emerald-650">+₹150 (+15%)</span>
              </div>
            </div>

            {beginnerMode && (
              <p className="text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl leading-normal italic">
                📈 <strong>Gain Achieved:</strong> Your ₹1,000 investment has generated a simulated profit of ₹150.
              </p>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setJourneyStep(2)}
                className="text-xs font-bold text-slate-400 hover:text-slate-950 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setJourneyStep(4)}
                className="py-2.5 px-5 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98]"
              >
                Next (Market Changes)
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Market goes DOWN */}
        {journeyStep === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-rose/10 text-brand-rose rounded-xl">
                <TrendingDown className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Step 4 of 5</span>
                <h3 className="font-extrabold text-slate-900 text-sm">Recession Hits (Downward Cycle)</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal">
              Market cycles change. High interest rates or general recessions hit corporate sales, and stock prices plunge.
            </p>

            {/* Downward metric (Visual Heavy Red) */}
            <div className="p-4 rounded-2xl border-2 border-brand-rose bg-brand-rose/10 flex justify-between items-center glow-rose text-brand-rose">
              <div>
                <span className="text-[9px] uppercase font-extrabold block tracking-wider">Portfolio Value</span>
                <span className="text-2xl font-black text-brand-rose-dark">₹850</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase font-bold block tracking-wider">Simulated Return</span>
                <span className="text-sm font-bold text-brand-rose-dark">-₹150 (-15%)</span>
              </div>
            </div>

            {beginnerMode && (
              <p className="text-[10px] text-brand-rose bg-brand-rose/5 border border-brand-rose/15 p-2.5 rounded-xl leading-normal italic">
                ⚠️ <strong>Downside Realized:</strong> Volatility means your principal value can drop. Your ₹1,000 is now valued at only ₹850.
              </p>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setJourneyStep(3)}
                className="text-xs font-bold text-slate-400 hover:text-slate-950 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setJourneyStep(5)}
                className="py-2.5 px-5 bg-brand-rose hover:bg-brand-rose-dark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98]"
              >
                View Final Lesson
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Summary Lessons */}
        {journeyStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-indigo/10 rounded-xl text-brand-indigo">
                <Award className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Step 5 of 5</span>
                <h3 className="font-extrabold text-slate-900 text-sm">Visual Journey Summary</h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-605 leading-relaxed font-normal">
              You have experienced both profit (Market Goes Up) and loss (Market Goes Down) mock scenarios.
            </p>

            <div className="p-4 rounded-2xl border border-slate-150 bg-slate-50 text-center space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-405 block tracking-wider">Final Coaching Lesson</span>
              <p className="text-sm font-extrabold text-slate-800 leading-snug">
                Investments can increase or decrease in value. Risk and returns are always connected.
              </p>
            </div>

            {beginnerMode && (
              <p className="text-[10px] text-brand-indigo leading-relaxed text-center">
                Now that you completed this guided cycle, your practice dashboard will unlock. Build your custom diversified portfolio risk-free.
              </p>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={() => setJourneyStep(4)}
                className="text-xs font-bold text-slate-400 hover:text-slate-950 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={handleFinish}
                className="py-2.5 px-6 bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-md shadow-brand-indigo/15"
              >
                Finish Journey & Open Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Walkthrough;
