import React, { useState } from 'react';
import type { PortfolioItem, RiskProfile } from '../types';
import { Explainable } from './Explainable';
import { AlertCircle, AlertTriangle, Lightbulb, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface InsightsProps {
  portfolio: PortfolioItem[];
  userRiskProfile: RiskProfile;
  beginnerMode: boolean;
}

export const Insights: React.FC<InsightsProps> = ({
  portfolio,
  userRiskProfile,
  beginnerMode,
}) => {
  const [expandedLearn, setExpandedLearn] = useState<Record<string, boolean>>({});

  const totalInvested = portfolio.reduce((s, i) => s + i.amountInvested, 0);

  // Asset breakdowns
  const conservativeInvested = portfolio.filter(p => p.riskLevel === 'Conservative').reduce((s, i) => s + i.amountInvested, 0);
  const moderateInvested = portfolio.filter(p => p.riskLevel === 'Moderate').reduce((s, i) => s + i.amountInvested, 0);
  const aggressiveInvested = portfolio.filter(p => p.riskLevel === 'Aggressive').reduce((s, i) => s + i.amountInvested, 0);

  const getNumericRisk = (risk: RiskProfile) => {
    if (risk === 'Conservative') return 20;
    if (risk === 'Moderate') return 55;
    return 90;
  };

  const weightedRiskScore = totalInvested > 0
    ? portfolio.reduce((sum, item) => sum + (item.amountInvested * getNumericRisk(item.riskLevel)), 0) / totalInvested
    : 0;

  // Concentration calculations
  const categories = portfolio.reduce((acc, item) => {
    acc[item.investmentName] = (acc[item.investmentName] || 0) + item.amountInvested;
    return acc;
  }, {} as Record<string, number>);

  let maxCategoryName = '';
  let maxCategoryRatio = 0;
  if (totalInvested > 0) {
    Object.entries(categories).forEach(([name, amt]) => {
      const ratio = (amt / totalInvested) * 100;
      if (ratio > maxCategoryRatio) {
        maxCategoryRatio = ratio;
        maxCategoryName = name;
      }
    });
  }

  // Define generated alerts
  const alerts = [];

  // 1. Risk Profile Mismatch Alert
  const isMismatched = 
    (userRiskProfile === 'Conservative' && (aggressiveInvested > 0 || moderateInvested > 0)) ||
    (userRiskProfile === 'Moderate' && aggressiveInvested > (totalInvested * 0.45));

  if (totalInvested > 0 && isMismatched) {
    alerts.push({
      id: 'profile-mismatch',
      type: 'warning',
      title: 'Risk Profile Mismatch Warning',
      message: `Your current holding allocations exceed your onboarding risk profile limit of: "${userRiskProfile}".`,
      color: 'bg-brand-rose/5 border-brand-rose/20 text-brand-rose-dark border-2 border-dashed',
      icon: <AlertTriangle className="w-5 h-5 text-brand-rose shrink-0 animate-bounce" />,
      learnText: `Your onboarding goal and background calculations selected a "${userRiskProfile}" profile, but your allocations hold volatile assets. While they can grow fast, they also expose you to deeper drawdowns than you planned for. Consider rebalancing some of your capital into safer cash or bond positions to match your comfort level.`,
    });
  }

  // 2. Category Concentration Alert
  if (maxCategoryRatio >= 65) {
    alerts.push({
      id: 'concentration',
      type: 'warning',
      title: `High Category Concentration (${maxCategoryRatio.toFixed(0)}%)`,
      message: `Over 65% of your invested capital is concentrated in one category: "${maxCategoryName}".`,
      color: 'bg-brand-rose/5 border-brand-rose/20 text-brand-rose-dark',
      icon: <AlertTriangle className="w-5 h-5 text-brand-rose shrink-0" />,
      learnText: 'Concentration risk occurs when you put too much of your money into a single asset or sector. If that sector suffers a downturn (for example, technology stocks collapsing due to new regulation), your entire portfolio takes a massive hit. Spreading allocations across index funds and bonds cushions this drop.',
    });
  }

  // 3. High Portfolio Risk Alert
  if (weightedRiskScore >= 70) {
    alerts.push({
      id: 'high-risk',
      type: 'warning',
      title: 'High Overall Portfolio Risk',
      message: `Your weighted risk index is considered high (${Math.round(weightedRiskScore)}/100).`,
      color: 'bg-brand-rose/5 border-brand-rose/20 text-brand-rose-dark',
      icon: <AlertTriangle className="w-5 h-5 text-brand-rose shrink-0" />,
      learnText: 'A high portfolio risk score indicates that you hold mostly highly volatile growth stocks or tech sectors. While this opens up massive return potentials in booming economies, it exposes you to rapid drops of up to 60% of your principal during crashes. Balancing with bonds stabilizes your balance sheet.',
    });
  }

  // 4. No Low-Risk Assets Alert
  if (totalInvested > 0 && conservativeInvested === 0) {
    alerts.push({
      id: 'no-safety',
      type: 'info',
      title: 'No Defensive Low-Risk Allocations',
      message: 'You currently hold no lower-risk investments (Government Bonds) in your portfolio.',
      color: 'bg-brand-amber-light/10 border-brand-amber-light/35 text-brand-amber-dark',
      icon: <AlertCircle className="w-5 h-5 text-brand-amber-dark shrink-0" />,
      learnText: 'Low-risk assets like government bonds provide capital protection. They pay reliable interest and do not crash with the stock market. Holding a defensive portion (e.g. 20-30%) acting as insurance makes your overall portfolio healthy and prevents panic-selling during stock downturns.',
    });
  }

  // 5. Diversification recommendation
  if (portfolio.length === 1 && totalInvested > 0) {
    alerts.push({
      id: 'diversify-tip',
      type: 'tip',
      title: 'Diversification Opportunity Available',
      message: 'Consider diversification to reduce concentration risk.',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-800',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />,
      learnText: 'Diversification means not placing all your eggs in one basket. Spreading money across government debt, market indexes, and tech companies guarantees that a failure in one company (e.g., bankruptcy) will not wipe out your total wealth.',
    });
  }

  // Empty state fallback or general healthy portfolio card
  if (alerts.length === 0 && portfolio.length > 0) {
    alerts.push({
      id: 'healthy',
      type: 'success',
      title: 'Portfolio Diversification is Balanced',
      message: 'Your mock allocations are well diversified across safe and volatile assets.',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-800',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />,
      learnText: 'Your risk score is balanced. You hold a solid ratio of defensive cash/bonds alongside growth stocks, shielding your savings from extreme crashes while allowing steady compound growth over long cycles.',
    });
  }

  const toggleExpand = (id: string) => {
    setExpandedLearn(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-slide-up space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Smart Coach Insights</h1>
        <p className="text-slate-600 text-sm mt-1">
          Personalized portfolio auditing and alerts to help you improve risk diversification.
        </p>
      </div>

      {/* Dynamic Alerts */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" />
          Active Allocations Audit
        </h2>

        {portfolio.length === 0 ? (
          <div className="glass-panel p-6 border border-slate-100 text-center text-slate-505 text-sm">
            Invest mock funds on the Explorer page to generate personalized coach alerts and concentration warnings.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {alerts.map((alert) => {
              const isExpanded = expandedLearn[alert.id] || false;
              return (
                <div key={alert.id} className={`p-5 rounded-2xl border flex flex-col gap-3 shadow-sm ${alert.color}`}>
                  <div className="flex gap-3.5 items-start">
                    {alert.icon}
                    <div className="space-y-1 flex-1">
                      <h3 className="font-extrabold text-sm sm:text-base leading-snug">{alert.title}</h3>
                      <p className="text-xs sm:text-sm leading-relaxed opacity-95">{alert.message}</p>
                    </div>
                  </div>

                  {/* V2 Learn More Toggle Button */}
                  <div className="border-t border-slate-200/30 pt-3 mt-1.5 flex justify-end">
                    <button
                      onClick={() => toggleExpand(alert.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold hover:underline cursor-pointer focus:outline-none"
                    >
                      <span>Learn More ⓘ</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expanded explanation */}
                  {isExpanded && (
                    <div className="p-3 bg-white rounded-xl text-xs text-slate-600 leading-relaxed font-normal border border-slate-100 shadow-sm mt-2 animate-fade-in">
                      <strong className="text-brand-indigo block mb-1">Coach Explanation:</strong>
                      {alert.learnText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Jargon-free Glossary */}
      <div className="glass-panel p-6 sm:p-8 border border-slate-100 glow-indigo space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
          <div className="p-2 bg-brand-indigo/10 rounded-xl text-brand-indigo">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Key Educational Glossary</h3>
            <p className="text-xs text-slate-500">Essential rules explained in plain, jargon-free English</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-extrabold text-slate-805 text-xs sm:text-sm">
              🛡️ <Explainable
                term="Diversification"
                tooltip="Diversification means spreading your cash across different asset categories (bonds, stocks, cash) so a crash in one does not wipe you out."
                beginnerMode={beginnerMode}
                inlineExplanation="Not placing all your eggs in one basket"
              />
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Spreading your cash across different investments so you are not dependent on just one. It prevents you from losing everything if a single company crashes.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-extrabold text-slate-805 text-xs sm:text-sm">
              📉 <Explainable
                term="Inflation Risk"
                tooltip="Inflation Risk is the danger that store prices rise faster than your investments grow, eroding your real savings buying power."
                beginnerMode={beginnerMode}
                inlineExplanation="Losing purchasing power to rising store prices"
              />
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              The risk that your savings lose buying power over time because prices in stores rise. Safe assets that pay low returns can fall behind inflation.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-extrabold text-slate-805 text-xs sm:text-sm">
              📊 <Explainable
                term="Volatility"
                tooltip="Volatility measures how fast and how drastically investment prices fluctuate up and down over short cycles."
                beginnerMode={beginnerMode}
                inlineExplanation="The speed and size of price swings"
              />
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              How quickly and how far stock prices swing up and down. High volatility (Tech or Stock categories) means your balance rides a roller-coaster.
            </p>
          </div>

          <div className="space-y-1.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <h4 className="font-extrabold text-slate-805 text-xs sm:text-sm">
              ⏳ <Explainable
                term="Compound Growth"
                tooltip="Compound Growth means earning returns on top of previous returns, generating accelerating growth over long time horizons."
                beginnerMode={beginnerMode}
                inlineExplanation="Earning profit on top of profit"
              />
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Earning returns on your accumulated returns. Over 10+ years, compound interest drives exponential growth, making early saving extremely powerful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Insights;
