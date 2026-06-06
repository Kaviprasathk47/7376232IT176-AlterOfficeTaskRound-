import React, { useState } from 'react';
import { Compass, DollarSign, ShieldAlert, LineChart, LogOut, ArrowRight, ArrowLeft } from 'lucide-react';

interface WalkthroughProps {
  beginnerMode: boolean;
  onClose: () => void;
}

export const Walkthrough: React.FC<WalkthroughProps> = ({ beginnerMode, onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      number: 1,
      title: 'Step 1: Choose Investment Category',
      icon: <Compass className="w-8 h-8 text-brand-indigo" />,
      explanation: 'Browse the available asset classes. Check the risk badges and study the possible loss metrics before selecting. Never pick an asset just because of high expected return.',
      scenario: 'Example: You select the S&P 500 Index Fund to get moderate growth spread across 500 major US companies rather than picking a single stock.',
      tip: 'Look for the risk badge: Conservative, Moderate, or Aggressive.',
    },
    {
      number: 2,
      title: 'Step 2: Set Amount & Run Simulator',
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
      explanation: 'Enter the amount you wish to practice with. Adjust the budget slider to see positive growth scenarios (+25%), stable scenarios (+8%), and negative downturn scenarios (-30%) over a 5-year period.',
      scenario: 'Example: Setting a $1,000 practice amount on a Technology Fund shows you could grow to $1,500, but in a crash, you could plunge to $600 (-$400 loss).',
      tip: 'The worst-case scenario is highlighted in red. Focus on this risk first.',
    },
    {
      number: 3,
      title: 'Step 3: Readiness Check & Confirmation',
      icon: <ShieldAlert className="w-8 h-8 text-brand-rose" />,
      explanation: 'Pass the readiness gate by acknowledging the risks. Confirm that gains are not guaranteed, losses can and will happen during recessions, and that this uses mock money.',
      scenario: 'Example: You check all 4 readiness boxes, acknowledging that you understand you could lose part of your $1,000 principal before the mock system locks your buy.',
      tip: 'Only confirm when you feel comfortable with the potential loss value.',
    },
    {
      number: 4,
      title: 'Step 4: Track Performance on Dashboard',
      icon: <LineChart className="w-8 h-8 text-brand-indigo" />,
      explanation: 'Navigate to your dashboard to monitor total holdings. Review charts showing your asset allocation (donuts) and your historical growth paths (line charts). Check your average Portfolio Risk Score.',
      scenario: 'Example: Your dashboard shows $1,000 invested. After a simulated market fluctuation, your value moves to $1,030 (+3% gain). Your portfolio risk score is 55/100.',
      tip: 'A balanced portfolio should keep the risk score below 60/100.',
    },
    {
      number: 5,
      title: 'Step 5: Withdraw Funds or Let Compound',
      icon: <LogOut className="w-8 h-8 text-brand-amber" />,
      explanation: 'Realize your gains or accept losses by selling (withdrawing) mock assets. The funds are returned as cash back into your available balance, ready to practice with other categories.',
      scenario: 'Example: You click the trash/sell button on your Tech holdings after a simulated gain, locking in a $50 gain. Your cash balance increases from $9,000 to $10,050.',
      tip: 'Withdrawals simulate closing a trade to protect remaining capital or book gains.',
    },
  ];

  const currentStepData = steps[activeStep - 1];

  const handleNext = () => {
    if (activeStep < 5) {
      setActiveStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-slate-100">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-indigo/10 text-brand-indigo">
          Interactive Walkthrough
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          How Investment Simulation Works
        </h1>
        <p className="text-slate-500 text-xs max-w-md mx-auto">
          Follow the 5-step lifecycle of capital allocation to understand the rules before playing with virtual cash.
        </p>
      </div>

      {/* Steper indicator dots */}
      <div className="flex justify-between items-center max-w-md mx-auto">
        {steps.map((s) => (
          <button
            key={s.number}
            onClick={() => setActiveStep(s.number)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
              activeStep === s.number
                ? 'bg-brand-indigo border-brand-indigo text-white shadow-sm scale-110'
                : activeStep > s.number
                ? 'bg-brand-indigo/10 border-brand-indigo/20 text-brand-indigo'
                : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
            }`}
          >
            {s.number}
          </button>
        ))}
      </div>

      {/* Step Card Visual */}
      <div className="glass-panel p-6 sm:p-8 border border-slate-100 glow-indigo flex flex-col items-center text-center space-y-5 animate-fade-in relative min-h-[300px] justify-between">
        
        {/* Step Icon */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          {currentStepData.icon}
        </div>

        {/* Step Text */}
        <div className="space-y-2.5 max-w-lg">
          <h2 className="text-lg sm:text-xl font-black text-slate-900">{currentStepData.title}</h2>
          <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-normal">
            {currentStepData.explanation}
          </p>
          
          {/* Example scenario panel */}
          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-left text-xs text-slate-600 font-semibold space-y-1">
            <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Example Scenario:</span>
            <p className="font-medium">{currentStepData.scenario}</p>
          </div>

          {/* Beginner Mode Toggle inline helper */}
          {beginnerMode && (
            <div className="p-2.5 bg-brand-indigo/5 border border-brand-indigo/15 text-brand-indigo rounded-xl text-left text-[11px] leading-relaxed animate-fade-in">
              💡 <strong>Pro Coach Tip:</strong> {currentStepData.tip}
            </div>
          )}
        </div>

        {/* Controls inside card */}
        <div className="flex justify-between items-center w-full pt-4 border-t border-slate-100">
          <button
            onClick={handleBack}
            disabled={activeStep === 1}
            className={`flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
              activeStep === 1
                ? 'text-slate-300 cursor-not-allowed'
                : 'text-slate-505 hover:text-slate-900 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <span className="text-[10px] text-slate-405 font-bold uppercase">
            Step {activeStep} of 5
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-1 text-xs font-bold px-4 py-2 bg-brand-indigo hover:bg-brand-indigo-dark text-white rounded-xl cursor-pointer transition-all active:scale-95"
          >
            {activeStep === 5 ? 'Finish Walkthrough' : 'Next Step'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-400 hover:text-brand-indigo underline transition-colors cursor-pointer"
        >
          Skip / Exit Walkthrough
        </button>
      </div>
    </div>
  );
};
export default Walkthrough;
