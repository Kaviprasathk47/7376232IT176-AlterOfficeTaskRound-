import React from 'react';
import type { Investment, RiskProfile } from '../types';
import { Explainable } from './Explainable';
import { mockInvestments } from '../data/investments';
import { ArrowRight, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

interface InvestmentExplorerProps {
  userRiskProfile: RiskProfile;
  onSelectInvestment: (investment: Investment) => void;
  beginnerMode: boolean;
}

export const InvestmentExplorer: React.FC<InvestmentExplorerProps> = ({
  userRiskProfile,
  onSelectInvestment,
  beginnerMode,
}) => {
  const getRiskBadge = (risk: RiskProfile) => {
    switch (risk) {
      case 'Conservative':
        return 'bg-emerald-50 text-emerald-800 border-emerald-100';
      case 'Moderate':
        return 'bg-brand-amber-light/15 text-brand-amber-dark border-brand-amber-light/30';
      case 'Aggressive':
        return 'bg-brand-rose/10 text-brand-rose border-brand-rose/25';
    }
  };

  const getMatchStatus = (investmentRisk: RiskProfile) => {
    if (userRiskProfile === 'Conservative' && investmentRisk !== 'Conservative') {
      return {
        text: 'Higher risk than your profile',
        color: 'text-brand-rose bg-brand-rose/5 border-brand-rose/20',
        icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-bounce" />,
      };
    }
    if (userRiskProfile === 'Moderate' && investmentRisk === 'Aggressive') {
      return {
        text: 'Higher risk than your profile',
        color: 'text-brand-rose bg-brand-rose/5 border-brand-rose/20',
        icon: <AlertTriangle className="w-3.5 h-3.5 shrink-0 animate-bounce" />,
      };
    }
    if (userRiskProfile === 'Aggressive' && investmentRisk === 'Conservative') {
      return {
        text: 'Lower risk than your profile',
        color: 'text-slate-500 bg-slate-50 border-slate-200',
        icon: <HelpCircle className="w-3.5 h-3.5 shrink-0" />,
      };
    }
    return {
      text: 'Perfect fit for your profile',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-250',
      icon: <ShieldCheck className="w-3.5 h-3.5 shrink-0" />,
    };
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-slide-up">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Investment Categories
        </h1>
        <p className="text-slate-600 mt-2 text-sm max-w-2xl">
          Click an investment to open the educational guide. Study the {' '}
          <strong className="text-brand-rose">potential downside</strong> before making any simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockInvestments.map((investment) => {
          const match = getMatchStatus(investment.riskLevel);
          return (
            <div
              key={investment.id}
              onClick={() => onSelectInvestment(investment)}
              className="glass-panel p-6 border border-slate-100 hover:border-brand-indigo/35 hover:scale-[1.01] hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer glow-indigo group"
            >
              <div className="space-y-4">
                {/* Header: Name and Risk */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {investment.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-indigo transition-colors mt-0.5">
                      {investment.name}
                    </h2>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold border ${getRiskBadge(investment.riskLevel)}`}>
                    {investment.riskLevel}
                  </span>
                </div>

                {/* Match indicator */}
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold w-fit ${match.color}`}>
                  {match.icon}
                  {match.text}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {investment.description}
                  </p>
                  {beginnerMode && (
                    <p className="text-xs text-brand-indigo bg-brand-indigo/5 p-2.5 rounded-xl border border-brand-indigo/10 leading-normal animate-fade-in font-medium italic">
                      ℹ️ <strong>Educational Note:</strong> {investment.name === 'Government Bonds' && 'You are lending money to the government in exchange for safe interest payments.'}
                      {investment.name === 'Index Funds' && 'You are spreading your money across the 500 largest US companies to track general economy.'}
                      {investment.name === 'Technology Funds' && 'You are investing in tech giants (AI, software). Prone to fast growth but high instability.'}
                      {investment.name === 'Growth Stocks' && 'You are buying stakes in single companies hoping they grow. High returns, but if they fail, you lose all.'}
                    </p>
                  )}
                </div>

                {/* Metrics: Profit vs LOSS */}
                <div className="grid grid-cols-2 gap-4 py-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="text-center border-r border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                      <Explainable
                        term="Return Potential"
                        tooltip="Return Potential describes the estimated range of growth (profit) your investment might generate per year."
                        beginnerMode={beginnerMode}
                        inlineExplanation="Estimated yearly profit range"
                      />
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-700">
                      +{investment.returnMin}% to +{investment.returnMax}%
                    </span>
                  </div>
                  <div className="text-center px-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                      <Explainable
                        term="Possible Loss Range"
                        tooltip="Possible Loss Range represents how much of your original money you could lose in a worst-case market crash."
                        beginnerMode={beginnerMode}
                        inlineExplanation="Percentage of your money at risk in a market crash"
                      />
                    </span>
                    {/* The possible loss range is displayed in larger, bold, red format for risk emphasis */}
                    <span className="text-base sm:text-lg font-extrabold text-brand-rose block">
                      {investment.lossMax === 0 ? '0.0%' : `-${investment.lossMin}% to -${investment.lossMax}%`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-indigo group-hover:translate-x-1 transition-transform w-fit self-end">
                <span>Learn Details & Simulate</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default InvestmentExplorer;
