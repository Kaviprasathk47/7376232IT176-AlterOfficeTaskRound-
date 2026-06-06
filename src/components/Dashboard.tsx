import React, { useState } from 'react';
import type { PortfolioItem, RiskProfile } from '../types';
import { Explainable } from './Explainable';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Trash2, HelpCircle, BarChart3, LineChart, Plus } from 'lucide-react';

interface DashboardProps {
  portfolio: PortfolioItem[];
  availableBalance: number;
  beginnerMode: boolean;
  onSellHolding: (holdingId: string) => void;
  onResetPortfolio: () => void;
  onNavigateToExplore: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  portfolio,
  availableBalance,
  beginnerMode,
  onSellHolding,
  onResetPortfolio,
  onNavigateToExplore,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // 1. Portfolio Calculations
  const totalInvested = portfolio.reduce((sum, item) => sum + item.amountInvested, 0);
  
  const portfolioCurrentValue = portfolio.reduce((sum, item) => {
    const multiplier = 1 + (item.mockPerformance / 100);
    return sum + (item.amountInvested * multiplier);
  }, 0);

  const totalPortfolioValue = availableBalance + portfolioCurrentValue;
  const netGainLoss = portfolioCurrentValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (netGainLoss / totalInvested) * 100 : 0;

  // 2. Risk Score (Weighted average)
  const getNumericRisk = (risk: RiskProfile) => {
    if (risk === 'Conservative') return 20;
    if (risk === 'Moderate') return 55;
    return 90;
  };

  const weightedRiskScore = totalInvested > 0
    ? portfolio.reduce((sum, item) => sum + (item.amountInvested * getNumericRisk(item.riskLevel)), 0) / totalInvested
    : 0;

  const getRiskLabel = (score: number) => {
    if (score === 0) return 'Cash Portfolio (Safe)';
    if (score <= 35) return 'Conservative';
    if (score <= 65) return 'Moderate';
    return 'Aggressive';
  };

  const getRiskLabelColor = (score: number) => {
    if (score === 0) return 'text-slate-500 bg-slate-50 border-slate-100';
    if (score <= 35) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score <= 65) return 'text-brand-amber-dark bg-brand-amber-light/10 border-brand-amber-light/30';
    return 'text-brand-rose bg-brand-rose/5 border-brand-rose/20';
  };

  // 3. Line Chart (6-Month Historical Balance)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const basePerformanceHistory = [0, -0.015, 0.02, -0.008, 0.035, gainLossPercentage / 100];
  
  const historyData = basePerformanceHistory.map((perfFactor, index) => {
    const factor = index === 5 ? (gainLossPercentage / 100) : perfFactor * (weightedRiskScore / 50);
    const value = availableBalance + totalInvested * (1 + factor);
    return {
      month: months[index],
      value: totalInvested > 0 ? value : 10000,
    };
  });

  const lineChartWidth = 500;
  const lineChartHeight = 200;
  const lineChartPadding = 45;

  const allHistoryValues = historyData.map((d) => d.value);
  const maxHistoryValue = Math.max(...allHistoryValues, 10100);
  const minHistoryValue = Math.min(...allHistoryValues, 9900);
  const historyRange = maxHistoryValue - minHistoryValue || 1000;

  const getLineX = (index: number) => 
    lineChartPadding + (index / 5) * (lineChartWidth - lineChartPadding * 2);
  
  const getLineY = (val: number) => {
    const scaled = (val - minHistoryValue) / historyRange;
    return lineChartHeight - lineChartPadding - scaled * (lineChartHeight - lineChartPadding * 2);
  };

  const historyPoints = historyData.map((d, i) => `${getLineX(i)},${getLineY(d.value)}`).join(' ');
  const historyPath = `M ${historyPoints}`;
  const areaPath = totalInvested > 0
    ? `${historyPath} L ${getLineX(5)} ${lineChartHeight - lineChartPadding} L ${getLineX(0)} ${lineChartHeight - lineChartPadding} Z`
    : '';

  // 4. Bar Chart Calculations (Asset Class values side-by-side)
  const allocation = {
    Cash: availableBalance,
    Bonds: portfolio.filter(p => p.riskLevel === 'Conservative').reduce((s, i) => s + i.amountInvested * (1 + i.mockPerformance / 100), 0),
    Stocks: portfolio.filter(p => p.riskLevel === 'Moderate').reduce((s, i) => s + i.amountInvested * (1 + i.mockPerformance / 100), 0),
    Alternative: portfolio.filter(p => p.riskLevel === 'Aggressive').reduce((s, i) => s + i.amountInvested * (1 + i.mockPerformance / 100), 0),
  };

  const barChartWidth = 320;
  const barChartHeight = 200;
  const barChartPadding = 40;

  const barData = [
    { label: 'Cash', value: allocation.Cash, color: '#94a3b8' },
    { label: 'Bonds', value: allocation.Bonds, color: '#10b981' },
    { label: 'Stocks', value: allocation.Stocks, color: '#6366f1' },
    { label: 'Alt', value: allocation.Alternative, color: '#f43f5e' },
  ];

  const maxBarValue = Math.max(...barData.map(d => d.value), 1000);
  const getBarHeight = (val: number) => {
    const chartAreaHeight = barChartHeight - barChartPadding * 2;
    return (val / maxBarValue) * chartAreaHeight;
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-slide-up space-y-8">
      {/* Top Value Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-brand-indigo/15 rounded-full blur-3xl -z-0"></div>

        <div className="space-y-1 text-center sm:text-left z-10">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            <Explainable
              term="Portfolio"
              tooltip="A portfolio is the total collection of all your financial investments and cash balances grouped together in one account."
              beginnerMode={beginnerMode}
              inlineExplanation="Your total investment basket value"
            />
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            ₹{totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
            <span className="text-slate-400">Net Profit / Loss:</span>
            <span className={`font-bold flex items-center gap-0.5 ${netGainLoss >= 0 ? 'text-emerald-400' : 'text-rose-450'}`}>
              {netGainLoss >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 animate-pulse" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              ₹{Math.abs(netGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({gainLossPercentage.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* Portfolio Reset / Allocate */}
        <div className="z-10 flex gap-2">
          <button
            onClick={onNavigateToExplore}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold transition-all shadow-md shadow-brand-indigo/15 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Allocate Practice Cash
          </button>
          <button
            onClick={onResetPortfolio}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-750 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Invested */}
        <div className="glass-panel p-5 border border-slate-100 glow-indigo">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1 block">
            <Explainable
              term="Total Invested"
              tooltip="Total Invested is the total amount of money you have allocated to asset classes. It does not include unallocated cash."
              beginnerMode={beginnerMode}
              inlineExplanation="Virtual money put into investments"
            />
          </span>
          <span className="text-xl font-bold text-slate-850 block mt-1">
            ₹{totalInvested.toLocaleString()}
          </span>
        </div>

        {/* Metric 2: Cash Balance */}
        <div className="glass-panel p-5 border border-slate-100 glow-indigo">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1 block">
            <Explainable
              term="Cash Balance"
              tooltip="Cash Balance is your unallocated virtual money ready to be invested or held safely."
              beginnerMode={beginnerMode}
              inlineExplanation="Safe uninvested virtual money"
            />
          </span>
          <span className="text-xl font-bold text-slate-855 block mt-1">
            ₹{availableBalance.toLocaleString()}
          </span>
        </div>

        {/* Metric 3: Return Potential */}
        <div className="glass-panel p-5 border border-slate-100 glow-indigo">
          <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1 block">
            <Explainable
              term="Return Potential"
              tooltip="Return Potential describes the estimated range of growth (profit) your investment might generate per year."
              beginnerMode={beginnerMode}
              inlineExplanation="Estimated yearly returns"
            />
          </span>
          <span className={`text-xl font-extrabold block mt-1 ${netGainLoss >= 0 ? 'text-emerald-600' : 'text-brand-rose'}`}>
            {netGainLoss >= 0 ? '+' : ''}₹{netGainLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        {/* Metric 4: Risk Score */}
        <div className="glass-panel p-5 border border-slate-100 glow-indigo flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1 block">
              <Explainable
                term="Risk Level"
                tooltip="Risk describes how much an investment's value can rise or fall over time."
                beginnerMode={beginnerMode}
                inlineExplanation="Weighted index of portfolio swings"
              />
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-slate-800">
                {totalInvested > 0 ? Math.round(weightedRiskScore) : 0}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/ 105</span>
            </div>
          </div>
          {totalInvested > 0 ? (
            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border w-fit mt-1 text-center ${getRiskLabelColor(weightedRiskScore)}`}>
              {getRiskLabel(weightedRiskScore)} Risk
            </span>
          ) : (
            <span className="text-[9px] font-bold text-slate-400 mt-1">Cash Allocation (Safe)</span>
          )}
        </div>
      </div>

      {/* SVG Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Line Chart */}
        <div className="lg:col-span-7 glass-panel p-6 border border-slate-100 glow-indigo flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <LineChart className="w-4 h-4 text-brand-indigo" />
              Portfolio Growth History
            </h3>
            <p className="text-xs text-slate-550">Historical path tracking over the last 6 months</p>
          </div>

          <div className="relative w-full mt-4">
            <svg viewBox={`0 0 ${lineChartWidth} ${lineChartHeight}`} className="w-full h-auto overflow-visible">
              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const val = minHistoryValue + r * historyRange;
                const y = getLineY(val);
                return (
                  <g key={i} className="opacity-40">
                    <line x1={lineChartPadding} y1={y} x2={lineChartWidth - lineChartPadding} y2={y} stroke="#f1f5f9" strokeWidth="1.5" />
                    <text x={lineChartPadding - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontWeight="bold">
                      ₹{Math.round(val).toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {historyData.map((d, i) => (
                <text key={i} x={getLineX(i)} y={lineChartHeight - lineChartPadding + 18} textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontWeight="black">
                  {d.month}
                </text>
              ))}

              {totalInvested > 0 && <path d={areaPath} fill="url(#history-gradient-v3)" opacity="0.1" />}
              <path d={historyPath} fill="none" stroke={netGainLoss >= 0 ? '#10b981' : '#f43f5e'} strokeWidth="2.5" strokeLinecap="round" />

              {historyData.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={getLineX(i)}
                    cy={getLineY(d.value)}
                    r="4"
                    fill="white"
                    stroke={netGainLoss >= 0 ? '#10b981' : '#f43f5e'}
                    strokeWidth="2"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint === i && (
                    <g>
                      <rect x={getLineX(i) - 45} y={getLineY(d.value) - 32} width="90" height="20" rx="4" fill="#1e293b" />
                      <text x={getLineX(i)} y={getLineY(d.value) - 19} textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                        ₹{Math.round(d.value).toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              ))}

              <defs>
                <linearGradient id="history-gradient-v3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={netGainLoss >= 0 ? '#10b981' : '#f43f5e'} />
                  <stop offset="100%" stopColor={netGainLoss >= 0 ? '#10b981' : '#f43f5e'} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Bar Chart comparing values */}
        <div className="lg:col-span-5 glass-panel p-6 border border-slate-100 glow-indigo flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-brand-indigo" />
              Category Value comparison
            </h3>
            <p className="text-xs text-slate-550">Practice assets split by risk categories</p>
          </div>

          <div className="relative w-full mt-4 flex justify-center">
            <svg viewBox={`0 0 ${barChartWidth} ${barChartHeight}`} className="w-full h-auto overflow-visible">
              {[0, 0.5, 1].map((r, i) => {
                const val = r * maxBarValue;
                const chartAreaHeight = barChartHeight - barChartPadding * 2;
                const y = barChartHeight - barChartPadding - r * chartAreaHeight;
                return (
                  <g key={i} className="opacity-45">
                    <line x1={barChartPadding} y1={y} x2={barChartWidth - barChartPadding} y2={y} stroke="#f1f5f9" strokeWidth="1.5" />
                    <text x={barChartPadding - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontWeight="bold">
                      ₹{Math.round(val).toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {barData.map((d, i) => {
                const chartAreaWidth = barChartWidth - barChartPadding * 2;
                const colWidth = 35;
                const spacing = (chartAreaWidth - colWidth * 4) / 3;
                const x = barChartPadding + i * (colWidth + spacing);
                const barH = getBarHeight(d.value);
                const y = barChartHeight - barChartPadding - barH;

                return (
                  <g key={i}>
                    <rect x={x} y={y} width={colWidth} height={Math.max(barH, 3)} fill={d.color} rx="4" />
                    <text x={x + colWidth / 2} y={barChartHeight - barChartPadding + 15} textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontWeight="bold">
                      {d.label}
                    </text>
                    {d.value > 0 && (
                      <text x={x + colWidth / 2} y={y - 6} textAnchor="middle" fontSize="8.5" fill="#64748b" fontWeight="black">
                        ₹{Math.round(d.value).toLocaleString()}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* active holdings */}
      <div className="glass-panel p-6 border border-slate-100 glow-indigo">
        <h3 className="text-base font-bold text-slate-905 mb-4">Current Asset Allocations</h3>

        {portfolio.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            No virtual assets allocated yet. Navigate to "Explore Categories" to allocate practice cash.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Investment Category</th>
                  <th className="pb-3 text-center">Risk Level</th>
                  <th className="pb-3 text-right">Invested Value</th>
                  <th className="pb-3 text-right">Current Value</th>
                  <th className="pb-3 text-right">Total Gain/Loss</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {portfolio.map((item) => {
                  const currentItemValue = item.amountInvested * (1 + item.mockPerformance / 100);
                  const isPositive = item.mockPerformance >= 0;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-bold text-slate-800">{item.investmentName}</td>
                      <td className="py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black border uppercase tracking-wider ${getRiskLabelColor(getNumericRisk(item.riskLevel))}`}>
                          {item.riskLevel}
                        </span>
                      </td>
                      <td className="py-4 text-right font-medium text-slate-600">
                        ₹{item.amountInvested.toLocaleString()}
                      </td>
                      <td className="py-4 text-right font-extrabold text-slate-905">
                        ₹{currentItemValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 text-right font-black ${isPositive ? 'text-emerald-600' : 'text-brand-rose'}`}>
                        {isPositive ? '+' : ''}{item.mockPerformance.toFixed(2)}%
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => onSellHolding(item.id)}
                          className="p-2 text-slate-400 hover:text-brand-rose rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                          title="Withdraw funds back into Cash balance"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
