import React, { useState } from 'react';
import type { PortfolioItem, RiskProfile } from '../types';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Trash2, HelpCircle, LineChart, Plus } from 'lucide-react';

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
  onSellHolding,
  onResetPortfolio,
  onNavigateToExplore,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // 1. Calculations
  const totalInvested = portfolio.reduce((sum, item) => sum + item.amountInvested, 0);
  
  const portfolioCurrentValue = portfolio.reduce((sum, item) => {
    const multiplier = 1 + (item.mockPerformance / 100);
    return sum + (item.amountInvested * multiplier);
  }, 0);

  const totalPortfolioValue = availableBalance + portfolioCurrentValue;
  const netGainLoss = portfolioCurrentValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? (netGainLoss / totalInvested) * 100 : 0;

  const getNumericRisk = (risk: RiskProfile) => {
    if (risk === 'Conservative') return 20;
    if (risk === 'Moderate') return 55;
    return 90;
  };

  const weightedRiskScore = totalInvested > 0
    ? portfolio.reduce((sum, item) => sum + (item.amountInvested * getNumericRisk(item.riskLevel)), 0) / totalInvested
    : 0;

  const getRiskLabel = (score: number) => {
    if (score === 0) return 'Cash (Safe)';
    if (score <= 35) return 'Conservative';
    if (score <= 65) return 'Moderate';
    return 'Aggressive';
  };

  // 2. Line Chart data points (6-Month Historical Balance)
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
  const lineChartHeight = 180;
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

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      
      {/* Visual Priority: 1 Hero Element (Sleek Clean Portfolio Banner) */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-sm relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="space-y-1 relative z-10">
          <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Current Portfolio Value
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1">
            ₹{totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-xs">
            <span className={`font-bold flex items-center gap-0.5 ${netGainLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {netGainLoss >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              ₹{Math.abs(netGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({gainLossPercentage.toFixed(2)}%)
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Practice Balance</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
          <button
            onClick={onNavigateToExplore}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold transition-all shadow-md shadow-brand-indigo/15 cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Allocate Practice Cash
          </button>
        </div>
      </div>

      {/* Visual Priority: 2 Supporting Elements (Secondary Stats Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
            Total Invested
          </span>
          <span className="text-sm font-black text-slate-805 mt-0.5">
            ₹{totalInvested.toLocaleString()}
          </span>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
            Unused Cash
          </span>
          <span className="text-sm font-black text-slate-805 mt-0.5">
            ₹{availableBalance.toLocaleString()}
          </span>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
            Growth Potential
          </span>
          <span className={`text-sm font-black mt-0.5 ${netGainLoss >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {netGainLoss >= 0 ? '+' : ''}₹{netGainLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">
              Risk Category
            </span>
            <span className="block text-sm font-black text-slate-805 mt-0.5">
              {getRiskLabel(weightedRiskScore)}
            </span>
          </div>
        </div>
      </div>

      {/* Simplified Single Chart (Visual History) */}
      {totalInvested > 0 && (
        <div className="glass-panel p-5 border border-slate-100 glow-indigo">
          <div className="flex justify-between items-center border-b border-slate-50 pb-3 mb-3">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-450 tracking-wider flex items-center gap-1.5">
                <LineChart className="w-3.5 h-3.5 text-brand-indigo" />
                Portfolio Performance History
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 italic">6-Month Trend</span>
          </div>

          <div className="relative w-full">
            <svg viewBox={`0 0 ${lineChartWidth} ${lineChartHeight}`} className="w-full h-auto overflow-visible">
              {[0, 0.5, 1].map((r, i) => {
                const val = minHistoryValue + r * historyRange;
                const y = getLineY(val);
                return (
                  <g key={i} className="opacity-30">
                    <line x1={lineChartPadding} y1={y} x2={lineChartWidth - lineChartPadding} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={lineChartPadding - 8} y={y + 3} textAnchor="end" fontSize="8.5" fill="#94a3b8" fontWeight="bold">
                      ₹{Math.round(val).toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {historyData.map((d, i) => (
                <text key={i} x={getLineX(i)} y={lineChartHeight - lineChartPadding + 15} textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="bold">
                  {d.month}
                </text>
              ))}

              <path d={areaPath} fill="url(#history-grad-dashboard)" opacity="0.06" />
              <path d={historyPath} fill="none" stroke={netGainLoss >= 0 ? '#10b981' : '#f43f5e'} strokeWidth="2" strokeLinecap="round" />

              {historyData.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={getLineX(i)}
                    cy={getLineY(d.value)}
                    r="3.5"
                    fill="white"
                    stroke={netGainLoss >= 0 ? '#10b981' : '#f43f5e'}
                    strokeWidth="1.5"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPoint(i)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                  {hoveredPoint === i && (
                    <g>
                      <rect x={getLineX(i) - 40} y={getLineY(d.value) - 28} width="80" height="18" rx="4" fill="#1e293b" />
                      <text x={getLineX(i)} y={getLineY(d.value) - 16} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                        ₹{Math.round(d.value).toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              ))}

              <defs>
                <linearGradient id="history-grad-dashboard" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={netGainLoss >= 0 ? '#10b981' : '#f43f5e'} />
                  <stop offset="100%" stopColor={netGainLoss >= 0 ? '#10b981' : '#f43f5e'} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}

      {/* Asset Allocations List */}
      <div className="glass-panel p-6 border border-slate-100 glow-indigo">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-50">
          <h3 className="text-sm font-black text-slate-800">Current Allocations</h3>
          <button
            onClick={onResetPortfolio}
            className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-brand-indigo cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Practice Portfolio
          </button>
        </div>

        {portfolio.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            <HelpCircle className="w-6 h-6 mx-auto mb-2 opacity-55" />
            No virtual assets allocated yet. Click "Allocate Practice Cash" to start.
          </div>
        ) : (
          <div className="space-y-3">
            {portfolio.map((item) => {
              const currentItemValue = item.amountInvested * (1 + item.mockPerformance / 100);
              const isPositive = item.mockPerformance >= 0;

              return (
                <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="block font-black text-slate-800">{item.investmentName}</span>
                    <span className="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider bg-slate-150 text-slate-500">
                      {item.riskLevel} Risk
                    </span>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <span className="block font-black text-slate-900">
                        ₹{currentItemValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className={`block text-[10px] font-bold ${isPositive ? 'text-emerald-600' : 'text-brand-rose'}`}>
                        {isPositive ? '+' : ''}{item.mockPerformance.toFixed(1)}%
                      </span>
                    </div>
                    
                    <button
                      onClick={() => onSellHolding(item.id)}
                      className="p-1.5 text-slate-400 hover:text-brand-rose rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Withdraw allocation back to cash"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
