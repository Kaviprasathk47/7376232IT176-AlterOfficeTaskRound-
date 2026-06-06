import React from 'react';
import type { PortfolioItem, RiskProfile } from '../types';
import { Explainable } from './Explainable';
import { AlertCircle, AlertTriangle, Lightbulb, BookOpen } from 'lucide-react';

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
  const totalInvested = portfolio.reduce((s, i) => s + i.amountInvested, 0);

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

  // Concentration
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

  const alerts = [];

  // 1. Risk Profile Mismatch Alert
  const isMismatched = 
    (userRiskProfile === 'Conservative' && (aggressiveInvested > 0 || moderateInvested > 0)) ||
    (userRiskProfile === 'Moderate' && aggressiveInvested > (totalInvested * 0.45));

  if (totalInvested > 0 && isMismatched) {
    alerts.push({
      id: 'profile-mismatch',
      title: 'Risk Profile Mismatch',
      message: `You have allocated practice cash to assets that carry higher risk than your selected onboarding profile (${userRiskProfile}). Consider rebalancing into conservative bonds to reduce potential drawdowns.`,
      color: 'bg-rose-50 border-rose-100 text-rose-800',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
      drawerTerm: 'Risk Level',
    });
  }

  // 2. Category Concentration Alert
  if (maxCategoryRatio >= 65) {
    alerts.push({
      id: 'concentration',
      title: 'High Asset Concentration',
      message: `Most of your investments are in one category: "${maxCategoryName}" (${maxCategoryRatio.toFixed(0)}%). Consider adding another type of investment to spread your risk.`,
      color: 'bg-rose-50 border-rose-100 text-rose-800',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
      drawerTerm: 'Diversification',
    });
  }

  // 3. High Portfolio Risk Alert
  if (weightedRiskScore >= 70) {
    alerts.push({
      id: 'high-risk',
      title: 'High Portfolio Volatility',
      message: `Your portfolio is heavily weighted in high-risk categories. During a downturn, your balance could plunge quickly. Balancing with low-risk bonds will cushion potential drops.`,
      color: 'bg-rose-50 border-rose-100 text-rose-800',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
      drawerTerm: 'Volatility',
    });
  }

  // 4. No Low-Risk Assets Alert
  if (totalInvested > 0 && conservativeInvested === 0) {
    alerts.push({
      id: 'no-safety',
      title: 'No Defensive Cushion',
      message: 'You do not hold any defensive assets. Adding government bonds acts as an insurance policy that pays steady interest and protects your capital.',
      color: 'bg-amber-50 border-amber-100 text-amber-800',
      icon: <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />,
      drawerTerm: 'Bonds',
    });
  }

  // 5. Diversification recommendation
  if (portfolio.length === 1 && totalInvested > 0) {
    alerts.push({
      id: 'diversify-tip',
      title: 'Diversification Tip',
      message: 'Spreading your funds across different baskets protects your balance. Consider selecting another category to diversify.',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-800',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />,
      drawerTerm: 'Diversification',
    });
  }

  if (alerts.length === 0 && portfolio.length > 0) {
    alerts.push({
      id: 'healthy',
      title: 'Portfolio is Balanced',
      message: 'Great job! Your portfolio is well-balanced. You have successfully spread your allocations across safe and growth categories to protect your mock capital.',
      color: 'bg-emerald-50 border-emerald-100 text-emerald-800',
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />,
      drawerTerm: 'Portfolio',
    });
  }

  return (
    <div className="max-w-xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      {/* Visual Priority: 1 Hero Element */}
      <div className="text-center sm:text-left space-y-1 mb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Smart Coach Insights</h1>
        <p className="text-slate-500 text-xs leading-relaxed font-normal">
          Simple recommendations from your personal coach to balance your practice portfolio.
        </p>
      </div>

      {/* Visual Priority: 2 Supporting Elements (Conversational Alert list) */}
      <div className="space-y-4">
        {portfolio.length === 0 ? (
          <div className="glass-panel p-6 border border-slate-100 text-center text-slate-450 text-xs">
            Allocate practice cash on the Explorer page to generate coaching insights.
          </div>
        ) : (
          <div className="space-y-3.5">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-5 rounded-2xl border flex flex-col gap-3 shadow-xs ${alert.color}`}>
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">{alert.icon}</div>
                  <div className="space-y-1 flex-1">
                    <h3 className="font-extrabold text-sm leading-snug">{alert.title}</h3>
                    <p className="text-xs leading-relaxed font-semibold opacity-95">{alert.message}</p>
                  </div>
                </div>

                {/* Concept Link Drawer Trigger */}
                <div className="border-t border-slate-200/20 pt-3 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-500">Learn Concept:</span>
                  <Explainable
                    term={alert.drawerTerm}
                    beginnerMode={beginnerMode}
                    highlight={true}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Glossary cards */}
      <div className="glass-panel p-6 border border-slate-100 glow-indigo space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
          <BookOpen className="w-4 h-4 text-brand-indigo shrink-0" />
          <h3 className="font-black text-slate-800 text-xs sm:text-sm">Learn Core Concepts</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div className="space-y-1 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
            <span className="block font-black text-slate-800">🛡️ Diversification</span>
            <p className="text-slate-500 font-normal leading-relaxed">
              Spreading funds across multiple assets so one failure doesn't wipe you out.
            </p>
          </div>

          <div className="space-y-1 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
            <span className="block font-black text-slate-800">📊 Volatility</span>
            <p className="text-slate-500 font-normal leading-relaxed">
              How fast and drastically stock prices swing up and down in short periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Insights;
