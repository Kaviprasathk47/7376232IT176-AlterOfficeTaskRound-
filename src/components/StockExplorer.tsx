import React from 'react';
import type { Stock } from '../types';
import { mockStocks } from '../data/stocks';
import { Explainable } from './Explainable';
import { ArrowRight, Award, Compass, TrendingUp, ShieldAlert } from 'lucide-react';

interface StockExplorerProps {
  onSelectStock: (stock: Stock) => void;
  beginnerMode: boolean;
}

export const StockExplorer: React.FC<StockExplorerProps> = ({
  onSelectStock,
  beginnerMode,
}) => {
  const getRiskColor = (risk: string) => {
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
    if (id.includes('bond')) return <Award className="w-5 h-5 text-emerald-500" />;
    if (id.includes('index') || id.includes('etf')) return <Compass className="w-5 h-5 text-indigo-500" />;
    if (id.includes('tata') || id.includes('zomato')) return <TrendingUp className="w-5 h-5 text-pink-500" />;
    return <ShieldAlert className="w-5 h-5 text-rose-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      
      {/* Header Visual Priority: 1 Hero Element */}
      <div className="text-center sm:text-left space-y-2">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-50 text-brand-indigo tracking-wider border border-indigo-100/40">
          Page 4 of 7
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
          Explore Investment Opportunities
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Select an asset card below to see projected growth curves, key risks, and simulated outcomes.
        </p>
      </div>

      {/* Visual Priority: 2 Supporting Elements (List of Stock Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {mockStocks.map((stock) => {
          const isUp = stock.change >= 0;

          return (
            <div
              key={stock.id}
              onClick={() => onSelectStock(stock)}
              className="glass-panel p-5 border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer glow-indigo group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                      {getAssetIcon(stock.id)}
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-slate-900 leading-tight group-hover:text-brand-indigo transition-colors">
                        {stock.name}
                      </h2>
                      <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">₹{stock.price} / share</span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase border tracking-wider ${getRiskColor(stock.riskLevel)}`}>
                      {stock.riskLevel}
                    </span>
                    <span className={`text-[10px] font-extrabold flex items-center ${isUp ? 'text-emerald-600' : 'text-brand-rose'}`}>
                      {isUp ? '+' : ''}{stock.change.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Grid of Key Metrics */}
                <div className="grid grid-cols-2 gap-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-150/40 text-[10px] leading-relaxed text-slate-600">
                  <div>
                    <span className="text-slate-400 font-extrabold text-[8px] uppercase block tracking-wider">Min Investment</span>
                    <span className="font-black text-slate-800">₹{stock.minInvestment}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-extrabold text-[8px] uppercase block tracking-wider">Holding Period</span>
                    <span className="font-black text-slate-800">{stock.holdingPeriod}</span>
                  </div>
                  <div className="border-t border-slate-200/50 pt-1.5">
                    <span className="text-slate-400 font-extrabold text-[8px] uppercase block tracking-wider">Expected Return</span>
                    <span className="font-extrabold text-emerald-600">+{stock.returnMin}% to +{stock.returnMax}%</span>
                  </div>
                  <div className="border-t border-slate-200/50 pt-1.5">
                    <span className="text-slate-400 font-extrabold text-[8px] uppercase block tracking-wider">Potential Loss</span>
                    <span className="font-extrabold text-brand-rose">-{stock.lossMin}% to -{stock.lossMax}%</span>
                  </div>
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-brand-indigo w-full">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  View investment detail & projection
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Beginner Mode Educational Alert */}
      {beginnerMode && (
        <div className="bg-brand-indigo/5 p-4 rounded-2xl border border-brand-indigo/15 text-center space-y-2 max-w-xl mx-auto">
          <p className="text-xs text-brand-indigo leading-relaxed font-semibold">
            💡 Coach Hint: Look at the <strong>Recommended Holding Period</strong>. Defensive bonds are short (3+ years) while volatile growth shares require longer (5+ years) to survive downturn cycles.
          </p>
        </div>
      )}
    </div>
  );
};
export default StockExplorer;
