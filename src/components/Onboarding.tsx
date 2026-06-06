import React, { useState } from 'react';
import type { UserProfile, RiskProfile, InvestmentGoal } from '../types';
import { Explainable } from './Explainable';
import { Shield, Info, AlertTriangle, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  beginnerMode: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, beginnerMode }) => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [goal, setGoal] = useState<InvestmentGoal | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(100);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [customRiskProfile, setCustomRiskProfile] = useState<RiskProfile | null>(null);

  // Simple risk assessor algorithm
  const calculateDefaultRiskProfile = (): RiskProfile => {
    if (isFirstTime === true) {
      if (goal === 'Grow Wealth') return 'Moderate';
      return 'Conservative';
    } else {
      if (goal === 'Grow Wealth') return 'Aggressive';
      if (goal === 'Save Money') return 'Conservative';
      return 'Moderate';
    }
  };

  const generatedRisk = calculateDefaultRiskProfile();
  const activeRisk = customRiskProfile || generatedRisk;

  const handleCalculateProfile = () => {
    if (isFirstTime === null || goal === null) return;
    setShowResult(true);
  };

  const handleFinish = () => {
    onComplete({
      isFirstTime: isFirstTime ?? true,
      goal: goal ?? 'Learn',
      monthlyAmount,
      riskProfile: activeRisk,
    });
  };

  const getRiskExplanation = (profile: RiskProfile) => {
    switch (profile) {
      case 'Conservative':
        return {
          title: 'Conservative Investor',
          tooltip: 'A Conservative Investor prefers safety and principal protection over high returns, accepting lower growth to prevent capital loss.',
          description: 'You prioritize protecting your money over quick growth. You want to avoid big drops, which is great for learning the basics. However, you should know that low-return investments might lose value in real terms if they do not keep up with inflation (rising prices).',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          badgeColor: 'bg-emerald-100 text-emerald-800',
          lossAlert: 'Expect very minor fluctuations (usually under 2% loss potential).'
        };
      case 'Moderate':
        return {
          title: 'Moderate Investor',
          tooltip: 'A Moderate Investor balances risk and return by holding a mix of growth assets (stocks) and defensive assets (bonds).',
          description: 'You want a balance. You are willing to accept some short-term ups and downs in your balance in exchange for better long-term growth. This is the path of classic broad index funds, which track the general economy.',
          color: 'text-brand-amber-dark bg-brand-amber-light/10 border-brand-amber/20',
          badgeColor: 'bg-brand-amber-light/20 text-brand-amber-dark',
          lossAlert: 'Be prepared for occasional drops of 10% to 20% during standard economic downturns.'
        };
      case 'Aggressive':
        return {
          title: 'Aggressive Investor',
          tooltip: 'An Aggressive Investor seeks maximum growth and is comfortable with massive short-term value swings, accepting high risk of capital loss.',
          description: 'You seek maximum growth and are willing to take major risks. You are comfortable with your balance dropping significantly in the short term, hoping for higher returns later. This level is typical for individual stock or startup investing.',
          color: 'text-brand-rose bg-brand-rose/5 border-brand-rose/20',
          badgeColor: 'bg-brand-rose/10 text-brand-rose',
          lossAlert: 'CRITICAL: You must be comfortable seeing your investments drop by 40% to 80%! High rewards come with massive, very real possibilities of capital loss.'
        };
    }
  };

  const riskInfo = getRiskExplanation(activeRisk);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-slide-up">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Welcome to <span className="text-brand-indigo">InvestWise</span>
        </h1>
        <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
          Learn how to protect your capital and navigate risk before investing real money. Build confidence risk-free with a virtual $10,000 balance.
        </p>
      </div>

      {!showResult ? (
        <div className="glass-panel p-6 sm:p-8 space-y-8 glow-indigo">
          {/* Question 1 */}
          <div className="space-y-3">
            <label className="text-base font-semibold text-slate-900 block">
              1. Are you a{' '}
              <Explainable
                term="First-time Investor"
                tooltip="A first-time investor is someone who has never purchased stocks, bonds, or mutual funds before."
                beginnerMode={beginnerMode}
                inlineExplanation="Someone new to stock and bond markets"
                highlight={true}
              />
              ?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsFirstTime(true)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  isFirstTime === true
                    ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo shadow-sm font-bold'
                    : 'border-slate-200 bg-white text-slate-755 hover:bg-slate-50'
                }`}
              >
                Yes, completely new
              </button>
              <button
                type="button"
                onClick={() => setIsFirstTime(false)}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  isFirstTime === false
                    ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo shadow-sm font-bold'
                    : 'border-slate-200 bg-white text-slate-755 hover:bg-slate-50'
                }`}
              >
                No, I have some experience
              </button>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3">
            <label className="text-base font-semibold text-slate-900 block">
              2. What is your primary{' '}
              <Explainable
                term="Investment Goal"
                tooltip="An investment goal is the target outcome you want from placing your money in assets, which defines the level of risk you should take."
                beginnerMode={beginnerMode}
                inlineExplanation="Your financial target or reason for saving"
                highlight={true}
              />
              ?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['Learn', 'Save Money', 'Grow Wealth'] as InvestmentGoal[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                    goal === g
                      ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo shadow-sm font-bold'
                      : 'border-slate-200 bg-white text-slate-755 hover:bg-slate-50'
                  }`}
                >
                  {g === 'Learn' && '📚 Learn Basics'}
                  {g === 'Save Money' && '🛡️ Save Money'}
                  {g === 'Grow Wealth' && '📈 Grow Wealth'}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-base font-semibold text-slate-900">
                3.{' '}
                <Explainable
                  term="Monthly Budget"
                  tooltip="The monthly budget is the portion of your regular income that you choose to allocate to investing rather than spending."
                  beginnerMode={beginnerMode}
                  inlineExplanation="The monthly money you can afford to invest"
                  highlight={true}
                />
              </label>
              <span className="text-lg font-bold text-brand-indigo">${monthlyAmount} / month</span>
            </div>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-indigo focus:outline-none"
            />
            <div className="flex justify-between text-xs text-slate-400 px-1 font-semibold">
              <span>$10</span>
              <span>$500</span>
              <span>$1000</span>
            </div>
          </div>

          <button
            type="button"
            disabled={isFirstTime === null || goal === null}
            onClick={handleCalculateProfile}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${
              isFirstTime === null || goal === null
                ? 'bg-slate-300 cursor-not-allowed opacity-50'
                : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.98] cursor-pointer'
            }`}
          >
            Calculate Risk Profile
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-8 space-y-6 animate-fade-in glow-indigo">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-brand-indigo/10 rounded-xl text-brand-indigo">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Investment Risk Profile</h2>
              <p className="text-xs text-slate-500">Calculated based on your experience and goals</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${riskInfo.color} space-y-3`}>
            <div className="flex justify-between items-center flex-wrap gap-2">
              <Explainable
                term={riskInfo.title}
                tooltip={riskInfo.tooltip}
                beginnerMode={beginnerMode}
                inlineExplanation="Computed profile describing your risk behavior"
                highlight={true}
              />
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${riskInfo.badgeColor}`}>
                {activeRisk}
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-95">{riskInfo.description}</p>
            
            <div className="flex items-start gap-2 pt-2 border-t border-slate-200/40 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 animate-pulse" />
              <span>{riskInfo.lossAlert}</span>
            </div>
          </div>

          {/* Educational Toggle */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              Want to adjust your profile to see other levels?
            </h4>
            <p className="text-xs text-slate-650">
              Education requires exploring choices. Manually adjust your profile below to see how different risk limits impact investment results.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(['Conservative', 'Moderate', 'Aggressive'] as RiskProfile[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setCustomRiskProfile(r)}
                  className={`py-2 px-1 text-xs rounded-xl border font-bold transition-all ${
                    activeRisk === r
                      ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setShowResult(false);
                setCustomRiskProfile(null);
              }}
              className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-650 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Back to Answers
            </button>
            <button
              type="button"
              onClick={handleFinish}
              className="w-full sm:w-2/3 py-3 px-4 rounded-xl bg-brand-indigo hover:bg-brand-indigo-dark text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Confirm Profile & Start Learning
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
