import React from 'react';
import type { Investment } from '../types';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

interface UnderstandAssetProps {
  investment: Investment;
  beginnerMode: boolean;
  onBack: () => void;
  onContinue: () => void;
  onGoToWalkthrough: () => void;
}

export const UnderstandAsset: React.FC<UnderstandAssetProps> = ({
  investment,
  beginnerMode,
  onBack,
  onContinue,
  onGoToWalkthrough,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-4 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explorer
      </button>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-slate-100">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-indigo/10 text-brand-indigo">
            Category Learning Guide
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Understand {investment.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Always learn the rules and mechanics of an asset before allocating practice capital.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600">
          Risk Class: <span className="font-extrabold text-brand-indigo">{investment.riskLevel}</span>
        </span>
      </div>

      {/* Main Educational Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* What is it? */}
        <div className="glass-panel p-5 border border-slate-100 space-y-2.5 glow-indigo">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-brand-indigo" />
            1. What is it?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {investment.whatIsIt}
          </p>
          {beginnerMode && (
            <p className="text-[11px] text-brand-indigo bg-brand-indigo/5 p-2 rounded-lg leading-relaxed italic">
              💡 <strong>Key takeaway:</strong> Think of this asset as a tool to accomplish a goal. It behaves differently than saving cash in a regular bank account.
            </p>
          )}
        </div>

        {/* Why invest? */}
        <div className="glass-panel p-5 border border-slate-100 space-y-2.5 glow-indigo">
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-indigo" />
            2. Why do people invest in it?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {investment.whyInvest}
          </p>
        </div>

        {/* Risk Explanation (Highlighted Red) */}
        <div className="glass-panel p-5 border border-brand-rose/25 bg-brand-rose/[0.01] space-y-2.5 glow-rose">
          <h3 className="font-extrabold text-brand-rose text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            3. Risk Explanation
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
            {investment.riskExplanation}
          </p>
          {beginnerMode && (
            <div className="text-[11px] text-brand-rose-dark bg-brand-rose/5 p-2.5 rounded-xl border border-brand-rose/10 leading-normal">
              <strong>Risk Alert:</strong> In a worst-case scenario, you could lose up to <strong>{investment.lossMax}%</strong> of your savings here. Make sure you can sleep at night with this downside.
            </div>
          )}
        </div>

        {/* Suitable investor type */}
        <div className="glass-panel p-5 border border-brand-amber-light/35 bg-brand-amber-light/[0.01] space-y-2.5">
          <h3 className="font-extrabold text-brand-amber-dark text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-amber" />
            4. Suitable Investor Type
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {investment.suitableInvestor}
          </p>
        </div>
      </div>

      {/* Advantages vs Disadvantages Grid */}
      <div className="glass-panel p-6 border border-slate-100 glow-indigo space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm">5. Advantages vs Disadvantages</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Advantages */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Advantages / Pros
            </h4>
            <ul className="space-y-2">
              {investment.advantages.map((adv, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-500 font-bold mt-0.5">•</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-brand-rose uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              Disadvantages / Cons
            </h4>
            <ul className="space-y-2">
              {investment.disadvantages.map((dis, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                  <span className="text-brand-rose font-bold mt-0.5">•</span>
                  <span>{dis}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Walkthrough Callout */}
      <div className="p-4 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/15 text-brand-indigo flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="font-extrabold text-xs text-slate-800">New to the investment journey?</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Read our step-by-step interactive walkthrough to understand how investments work.
          </p>
        </div>
        <button
          onClick={onGoToWalkthrough}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-brand-indigo text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0"
        >
          View 5-Step Journey Walkthrough
        </button>
      </div>

      {/* Page Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          onClick={onBack}
          className="py-3 px-6 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Back to Explorer
        </button>
        <button
          onClick={onContinue}
          className="py-3 px-8 rounded-xl bg-brand-indigo hover:bg-brand-indigo-dark text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-[0.98] cursor-pointer glow-indigo"
        >
          Continue to simulator
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default UnderstandAsset;
