import React from 'react';
import type { Investment } from '../types';
import { mockInvestments } from '../data/investments';
import { ArrowRight, ShieldAlert, Award, Compass, TrendingUp } from 'lucide-react';

interface InvestmentExplorerProps {
  onSelectInvestment: (investment: Investment) => void;
  beginnerMode: boolean;
}

export const InvestmentExplorer: React.FC<InvestmentExplorerProps> = ({
  onSelectInvestment,
  beginnerMode,
}) => {
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Conservative':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Moderate':
        return 'text-indigo-700 bg-indigo-50 border-indigo-100';
      default:
        return 'text-rose-700 bg-rose-50 border-rose-100';
    }
  };

  const getAssetIcon = (id: string) => {
    switch (id) {
      case 'gov-bonds':
        return <Award className="w-6 h-6 text-emerald-500" />;
      case 'index-fund':
        return <Compass className="w-6 h-6 text-indigo-500" />;
      case 'tech-fund':
        return <TrendingUp className="w-6 h-6 text-pink-500" />;
      default:
        return <ShieldAlert className="w-6 h-6 text-rose-500" />;
    }
  };

  const getCardBorder = (risk: string) => {
    switch (risk) {
      case 'Conservative':
        return 'hover:border-emerald-300';
      case 'Moderate':
        return 'hover:border-indigo-300';
      default:
        return 'hover:border-rose-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-slide-up space-y-8">
      {/* Visual Priority: 1 Hero Element */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-indigo-50 text-brand-indigo tracking-wider border border-indigo-100/40">
          Discovery Mode
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
          Choose a Practice Asset
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed">
          Select any investment category to learn about its risks, benefits, and how its value changes.
        </p>
      </div>

      {/* Visual Priority: 2 Supporting Elements (Grid of Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockInvestments.slice(0, 4).map((investment) => (
          <div
            key={investment.id}
            onClick={() => onSelectInvestment(investment)}
            className={`glass-panel p-6 border border-slate-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer glow-indigo group ${getCardBorder(investment.riskLevel)}`}
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                  {getAssetIcon(investment.id)}
                </div>
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border uppercase tracking-wider ${getRiskBadgeColor(investment.riskLevel)}`}>
                  {investment.riskLevel}
                </span>
              </div>

              {/* Title & One-line Explanation */}
              <div className="space-y-1">
                <h2 className="text-lg font-black text-slate-900 group-hover:text-brand-indigo transition-colors">
                  {investment.name}
                </h2>
                <p className="text-slate-500 text-xs leading-relaxed font-normal">
                  {investment.description}
                </p>
              </div>
            </div>

            {/* Action prompt */}
            <div className="mt-6 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-brand-indigo w-full">
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Learn about this asset
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Coach Hint (if beginner mode active) */}
      {beginnerMode && (
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 flex items-start gap-3.5 max-w-2xl mx-auto">
          <div className="text-xl">💡</div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">Coach Lesson: Understanding Assets</h4>
            <p className="text-xs text-slate-500 leading-normal">
              <strong>Fixed Income (Bonds)</strong> are stable loans paying slow interest. 
              <strong>Equities (Stocks/Funds)</strong> buy fractional business shares, allowing fast growth but deep recessions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default InvestmentExplorer;
