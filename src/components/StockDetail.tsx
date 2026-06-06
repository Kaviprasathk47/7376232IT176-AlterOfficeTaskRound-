import React, { useState } from 'react';
import type { Stock } from '../types';
import { Explainable } from './Explainable';
import { ArrowLeft, ArrowRight, ShieldAlert, Sparkles, TrendingUp, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockDetailProps {
  stock: Stock;
  availableBalance: number;
  beginnerMode: boolean;
  onBack: () => void;
  onProceed: (amount: number) => void;
}

export const StockDetail: React.FC<StockDetailProps> = ({
  stock,
  availableBalance,
  beginnerMode,
  onBack,
  onProceed,
}) => {
  const [calcAmount, setCalcAmount] = useState<number>(stock.minInvestment);
  const [years, setYears] = useState<1 | 3 | 5>(5);

  const avgReturn = (stock.returnMin + stock.returnMax) / 2;

  // Generate projection coordinates
  const generateChartData = () => {
    const data = [];
    const bestRate = stock.returnMax / 100;
    const expRate = avgReturn / 100;
    // Compounding worst rate so it drops in Year 1 then stays flat or declines slowly
    const worstRate = -stock.lossMax / 100 / years; 

    for (let i = 0; i <= years; i++) {
      data.push({
        name: `Yr ${i}`,
        'Best Case': Math.round(calcAmount * Math.pow(1 + bestRate, i)),
        'Expected Case': Math.round(calcAmount * Math.pow(1 + expRate, i)),
        'Worst Case': Math.round(calcAmount * Math.pow(1 + worstRate, i)),
      });
    }
    return data;
  };

  const chartData = generateChartData();

  // Final values
  const finalBest = chartData[chartData.length - 1]['Best Case'];
  const finalExpected = chartData[chartData.length - 1]['Expected Case'];
  const finalWorst = chartData[chartData.length - 1]['Worst Case'];
  const potentialLossAmt = calcAmount - finalWorst;

  const handleProceed = () => {
    if (calcAmount < stock.minInvestment || calcAmount > availableBalance) return;
    onProceed(calcAmount);
  };

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

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      
      {/* Back CTA */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Explorer
      </button>

      {/* Visual Priority: 1 Hero Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-white/10 text-brand-indigo-light border border-white/5 tracking-wider uppercase">
              Asset Profile (Page 5 of 7)
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{stock.name}</h1>
            <span className="block text-xs text-slate-400 font-semibold">Price per share: ₹{stock.price}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-xl text-xs font-black border uppercase tracking-wider ${getRiskBadgeColor(stock.riskLevel)}`}>
              {stock.riskLevel} Risk
            </span>
          </div>
        </div>

        {/* Quick parameters bar */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-slate-800 text-[10px] leading-relaxed text-slate-400">
          <div>
            <span className="text-[8px] uppercase tracking-wider block font-extrabold text-slate-500">Expected Growth</span>
            <span className="font-extrabold text-white">+{stock.returnMin}% to +{stock.returnMax}%</span>
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider block font-extrabold text-slate-500">Max Loss Risk</span>
            <span className="font-extrabold text-brand-rose">-{stock.lossMax}%</span>
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider block font-extrabold text-slate-500">Holding Period</span>
            <span className="font-extrabold text-white">{stock.holdingPeriod}</span>
          </div>
        </div>
      </div>

      {/* Visual Priority: 2 Supporting Elements (Interactive Graph & Calculator) */}
      <div className="glass-panel p-6 border border-slate-100 glow-indigo space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-4">
          <div className="space-y-0.5">
            <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-brand-indigo" />
              Growth Visualization Projections
            </h3>
            <p className="text-[11px] text-slate-450">Simulated growth values based on entered practice amount</p>
          </div>

          {/* Timeframe selector */}
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-[10px] font-black shrink-0">
            {([1, 3, 5] as const).map((y) => (
              <button
                key={y}
                onClick={() => setYears(y)}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  years === y ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {y} Year{y > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Projections Line Chart */}
        <div className="h-56 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} fontWeight="bold" />
              <YAxis stroke="#94a3b8" fontSize={9} fontWeight="bold" tickFormatter={(v) => `₹${v}`} />
              <Tooltip formatter={(value) => `₹${value}`} labelStyle={{ fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="Best Case" stroke="#10b981" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Expected Case" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line type="monotone" dataKey="Worst Case" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Calculator */}
      <div className="glass-panel p-5 border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-805 text-xs sm:text-sm uppercase tracking-wider">
          Investment Calculator
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
              <span>Enter Practice Amount (₹):</span>
              <span>Min Investment: ₹{stock.minInvestment}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-xs">₹</span>
              <input
                type="number"
                value={calcAmount === 0 ? '' : calcAmount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setCalcAmount(Math.max(0, Math.min(val, availableBalance)));
                }}
                className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold focus:ring-2 focus:ring-brand-indigo/25 focus:outline-none text-xs"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 text-[10px] text-slate-450 leading-relaxed">
            <span className="block font-black text-slate-700">Available Wallet Balance: ₹{availableBalance.toLocaleString()}</span>
            <p>Modify amount above. Visual projections on the graph will update dynamically.</p>
          </div>
        </div>
      </div>

      {/* Scenario Comparison (Equal Weight display of Gains and Losses) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Best Case */}
        <div className="bg-emerald-50 border border-emerald-150 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[9px] uppercase font-black tracking-wider text-emerald-700">Best Case Scenario</span>
          <span className="block text-lg font-black text-emerald-600">₹{finalBest.toLocaleString()}</span>
          <span className="block text-[10px] text-slate-500 font-normal">
            Gain of +₹{(finalBest - calcAmount).toLocaleString()}
          </span>
        </div>

        {/* Expected Case */}
        <div className="bg-indigo-50 border border-indigo-150 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[9px] uppercase font-black tracking-wider text-indigo-700">Expected Case</span>
          <span className="block text-lg font-black text-indigo-600">₹{finalExpected.toLocaleString()}</span>
          <span className="block text-[10px] text-slate-500 font-normal">
            Growth of +₹{(finalExpected - calcAmount).toLocaleString()}
          </span>
        </div>

        {/* Worst Case */}
        <div className="bg-rose-50 border border-rose-150 rounded-2xl p-4 text-center space-y-1">
          <span className="text-[9px] uppercase font-black tracking-wider text-rose-700">Worst Case Scenario</span>
          <span className="block text-lg font-black text-rose-600">₹{finalWorst.toLocaleString()}</span>
          <span className="block text-[10px] text-rose-800 font-bold">
            Potential Loss of -₹{potentialLossAmt.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Dynamic Jargon Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Why Invest */}
        <div className="glass-panel p-5 border border-slate-100 shadow-sm space-y-2">
          <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-indigo" />
            Why People Invest
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            {stock.whyInvest}
          </p>
        </div>

        {/* Key Risks */}
        <div className="glass-panel p-5 border border-slate-100 shadow-sm space-y-2">
          <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-brand-rose" />
            Key Risks & Drawdowns
          </h4>
          <p className="text-xs text-slate-605 leading-relaxed font-normal">
            {stock.keyRisks}
          </p>
        </div>
      </div>

      {/* Visual Priority: 3 Primary Action */}
      <button
        disabled={calcAmount < stock.minInvestment || calcAmount > availableBalance}
        onClick={handleProceed}
        className={`w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2 transition-all ${
          calcAmount < stock.minInvestment || calcAmount > availableBalance
            ? 'bg-slate-205 text-slate-400 cursor-not-allowed opacity-50'
            : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.98] cursor-pointer shadow-md shadow-brand-indigo/15'
        }`}
      >
        Proceed to Invest (₹{calcAmount.toLocaleString()})
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Beginner Mode Educational tips */}
      {beginnerMode && (
        <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex items-start gap-3 text-xs leading-normal">
          <Info className="w-5 h-5 text-brand-indigo shrink-0" />
          <p className="text-slate-550 font-normal">
            💡 Coach Tip: Notice the Worst Case Projection line. For high-risk assets like Zomato, the drop line falls far below your initial investment principal. Ensure you are comfortable with this drawdown before clicking Proceed.
          </p>
        </div>
      )}
    </div>
  );
};
export default StockDetail;
