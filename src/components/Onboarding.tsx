import React, { useState } from 'react';
import type { ExperienceChoice, UserProfile } from '../types';
import { Explainable } from './Explainable';
import { GraduationCap, Compass, BookOpen, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  beginnerMode: boolean;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, beginnerMode }) => {
  const [choice, setChoice] = useState<ExperienceChoice | null>(null);

  const handleContinue = () => {
    if (!choice) return;

    localStorage.setItem('investwise_onboarding_completed', choice);

    onComplete({
      experienceType: choice,
      riskProfile: choice === 'I want to learn investing'
        ? 'Conservative'
        : choice === 'I want to start investing'
        ? 'Moderate'
        : 'Aggressive'
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-6 px-4 animate-slide-up max-w-4xl mx-auto">
      {/* Visual Priority: 1 Hero Element */}
      <div className="text-center space-y-4 mb-8 max-w-lg">
        {/* Friendly SVG Illustration */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center bg-brand-indigo/5 rounded-full mb-2">
          <svg className="w-20 h-20 text-brand-indigo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="#4f46e5" fillOpacity="0.05" />
            <path d="M50 15L25 25V50C25 68 39 80 50 85C61 80 75 68 75 50V25L50 15Z" fill="url(#shieldGrad)" />
            <path d="M50 35C50 35 44 45 44 52C44 55.3 46.7 58 50 58C53.3 58 56 55.3 56 52C56 45 50 35 50 35Z" fill="white" />
            <path d="M42 42C46 42 49 46 49 50" stroke="#a7f3d0" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="52" r="3" fill="#34d399" />
          </svg>
          <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] text-white font-black shadow-sm">₹</div>
          <div className="absolute bottom-2 left-1 w-6 h-6 bg-slate-100 text-brand-indigo rounded-full flex items-center justify-center text-[11px] font-black shadow-xs">ⓘ</div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-none">
          Hi, I'm your <span className="text-brand-indigo">InvestWise</span> Coach
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed font-normal">
          Let's build your investing confidence together without the jargon.
          No real money is ever at risk.
        </p>
      </div>

      {/* Visual Priority: 2 Supporting Elements */}
      <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 glow-indigo">
        <div className="space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-extrabold text-slate-900">
            What describes your investing goal?
          </h2>
          {beginnerMode && (
            <p className="text-xs text-brand-indigo font-medium bg-brand-indigo/5 py-1.5 px-3 rounded-lg inline-block">
              💡 Coach Tip: Choose based on your comfort level. This helps me tailor my suggestions.
            </p>
          )}
        </div>

        {/* Large Answer Cards */}
        <div className="space-y-3.5">
          {/* Card 1 */}
          <button
            type="button"
            onClick={() => setChoice('I want to learn investing')}
            className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
              choice === 'I want to learn investing'
                ? 'border-brand-indigo bg-brand-indigo/5 ring-2 ring-brand-indigo/10 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${choice === 'I want to learn investing' ? 'bg-brand-indigo/10 text-brand-indigo' : 'bg-slate-100 text-slate-500'}`}>
              <GraduationCap className="w-6 h-6 shrink-0" />
            </div>
            <div className="space-y-0.5">
              <span className="block text-sm font-black text-slate-900">I want to learn the basics</span>
              <span className="block text-xs text-slate-450 font-normal leading-relaxed">
                Brand new. I want to understand what risk and diversification mean.
              </span>
            </div>
          </button>

          {/* Card 2 */}
          <button
            type="button"
            onClick={() => setChoice('I want to start investing')}
            className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
              choice === 'I want to start investing'
                ? 'border-brand-indigo bg-brand-indigo/5 ring-2 ring-brand-indigo/10 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${choice === 'I want to start investing' ? 'bg-brand-indigo/10 text-brand-indigo' : 'bg-slate-100 text-slate-500'}`}>
              <Compass className="w-6 h-6 shrink-0" />
            </div>
            <div className="space-y-0.5">
              <span className="block text-sm font-black text-slate-900">I want to practice allocation</span>
              <span className="block text-xs text-slate-450 font-normal leading-relaxed">
                Ready to play with mock funds and test how market drops feel.
              </span>
            </div>
          </button>

          {/* Card 3 */}
          <button
            type="button"
            onClick={() => setChoice('I know the basics')}
            className={`w-full p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
              choice === 'I know the basics'
                ? 'border-brand-indigo bg-brand-indigo/5 ring-2 ring-brand-indigo/10 shadow-sm'
                : 'border-slate-200 bg-white hover:bg-slate-50'
            }`}
          >
            <div className={`p-3 rounded-xl transition-colors ${choice === 'I know the basics' ? 'bg-brand-indigo/10 text-brand-indigo' : 'bg-slate-100 text-slate-500'}`}>
              <BookOpen className="w-6 h-6 shrink-0" />
            </div>
            <div className="space-y-0.5">
              <span className="block text-sm font-black text-slate-900">I want a smart risk audit</span>
              <span className="block text-xs text-slate-450 font-normal leading-relaxed">
                I understand stocks, but want to see how my portfolio risk is rated.
              </span>
            </div>
          </button>
        </div>

        {/* Explainable glossary line */}
        <div className="pt-2 border-t border-slate-100 text-center">
          <p className="text-slate-450 text-[11px] font-normal leading-relaxed">
            All coaching operates on simulated <Explainable term="Risk Level" beginnerMode={beginnerMode} inlineExplanation="potential for price swings" highlight={true} /> settings.
          </p>
        </div>

        {/* Visual Priority: 3 Primary Action */}
        <button
          type="button"
          disabled={!choice}
          onClick={handleContinue}
          className={`w-full py-4 px-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all ${
            !choice
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
              : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.99] cursor-pointer shadow-md shadow-brand-indigo/15'
          }`}
        >
          Let's Begin
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default Onboarding;
