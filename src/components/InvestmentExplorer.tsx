import React from 'react';
import type { Investment } from '../types';
import { Explainable } from './Explainable';
import { mockInvestments } from '../data/investments';
import { ArrowRight } from 'lucide-react';

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
        return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'Moderate':
        return 'text-brand-amber-dark bg-brand-amber-light/10 border-brand-amber-light/30';
      default:
        return 'text-brand-rose bg-brand-rose/5 border-brand-rose/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Explore Investment Categories
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
          Learn about different asset baskets before you allocate practice cash. Click on any category to view its benefits, risks, and behavior.
        </p>
      </div>

      {/* Discovery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockInvestments.map((investment) => (
          <div
            key={investment.id}
            onClick={() => onSelectInvestment(investment)}
            className="glass-panel p-5 border border-slate-150 hover:border-brand-indigo/35 hover:scale-[1.01] hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer glow-indigo group"
          >
            <div className="space-y-3">
              {/* Category Header */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  {investment.category}
                </span>
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black border uppercase tracking-wider ${getRiskBadgeColor(investment.riskLevel)}`}>
                  {investment.riskLevel}
                </span>
              </div>

              {/* Asset Title */}
              <h2 className="text-lg font-black text-slate-900 group-hover:text-brand-indigo transition-colors">
                {investment.name}
              </h2>

              {/* Description */}
              <p className="text-slate-505 text-xs leading-relaxed font-normal">
                {investment.description}
              </p>

              {/* V2 Metric Ratios */}
              <div className="grid grid-cols-2 gap-3 py-2 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs mt-2">
                <div className="border-r border-slate-150">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">
                    <Explainable
                      term="Return Potential"
                      tooltip="Return Potential describes the estimated range of growth (profit) your investment might generate per year."
                      beginnerMode={beginnerMode}
                      inlineExplanation="Yearly profit estimate"
                    />
                  </span>
                  <span className="font-bold text-slate-700">
                    +{investment.returnMin}% to +{investment.returnMax}%
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">
                    <Explainable
                      term="Risk Level"
                      tooltip="Risk describes how much an investment's value can rise or fall over time."
                      beginnerMode={beginnerMode}
                      inlineExplanation="Potential loss level"
                    />
                  </span>
                  <span className="font-extrabold text-brand-rose">
                    -{investment.lossMax}% max
                  </span>
                </div>
              </div>
            </div>

            {/* Prompt Actions */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-indigo group-hover:translate-x-1 transition-transform w-fit self-end">
              <span>View details & behavior</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InvestmentExplorer;
