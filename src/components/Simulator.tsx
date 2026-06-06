import React, { useState } from 'react';
import type { Investment } from '../types';
import { Explainable } from './Explainable';
import { ArrowLeft, AlertTriangle, TrendingUp, Info } from 'lucide-react';

interface SimulatorProps {
  investment: Investment;
  availableBalance: number;
  beginnerMode: boolean;
  onBack: () => void;
  onContinue: (amount: number) => void;
}

export const Simulator: React.FC<SimulatorProps> = ({
  investment,
  availableBalance,
  beginnerMode,
  onBack,
  onContinue,
}) => {
  const [amount, setAmount] = useState<number>(Math.min(1000, availableBalance));
  const [hoveredYear, setHoveredYear] = useState<number>(5);

  // Parse rates
  const rMin = investment.returnMin;
  const rMax = investment.returnMax;
  const lMax = investment.lossMax;

  const bestRate = rMax / 100;
  const expectedRate = ((rMin + rMax) / 2) / 100;
  const worstRate = -lMax / 100;

  // Compound projections
  const getValuesForYear = (year: number) => {
    return {
      best: amount * Math.pow(1 + bestRate, year),
      expected: amount * Math.pow(1 + expectedRate, year),
      worst: amount * Math.pow(1 + worstRate, year),
    };
  };

  const years = [0, 1, 2, 3, 4, 5];
  const chartData = years.map((y) => ({
    year: y,
    ...getValuesForYear(y),
  }));

  const activeData = chartData[hoveredYear];
  const potentialLoss = amount - activeData.worst;
  const potentialProfit = activeData.best - amount;

  // SVG parameters
  const width = 500;
  const height = 250;
  const padding = 45;

  const allValues = chartData.flatMap((d) => [d.best, d.expected, d.worst]);
  const maxValue = Math.max(...allValues, amount * 1.25);
  const minValue = Math.min(...allValues, amount * 0.45);
  const valueRange = maxValue - minValue;

  const getX = (year: number) => padding + (year / 5) * (width - padding * 2);
  const getY = (val: number) => {
    const scaled = (val - minValue) / valueRange;
    return height - padding - scaled * (height - padding * 2);
  };

  const bestPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.best)}`).join(' ');
  const expectedPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.expected)}`).join(' ');
  const worstPath = chartData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.worst)}`).join(' ');

  const handleAmountChange = (val: number) => {
    if (isNaN(val)) return;
    const cleanVal = Math.max(0, Math.min(val, availableBalance));
    setAmount(cleanVal);
  };

  const handleNext = () => {
    if (amount <= 0 || amount > availableBalance) return;
    onContinue(amount);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-slide-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learning Guide
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 border border-slate-100 space-y-4 glow-indigo">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-indigo/10 text-brand-indigo">
                {investment.category}
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-2">{investment.name}</h1>
              <p className="text-xs text-slate-400 mt-1">
                Selected for Simulation
              </p>
            </div>
            <p className="text-slate-650 text-xs leading-relaxed border-t border-slate-100 pt-4">
              {investment.description}
            </p>
          </div>

          <div className="glass-panel p-6 border border-slate-100 space-y-4 glow-indigo">
            <h3 className="font-bold text-slate-900 text-sm">Amount to Simulate</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">Enter Practice Amount:</span>
                <span className="text-slate-400 font-medium">Available: ${availableBalance.toLocaleString()}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 font-bold focus:ring-2 focus:ring-brand-indigo/20 focus:border-brand-indigo focus:outline-none"
                />
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="10"
                max={availableBalance}
                step="10"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-indigo"
              />
              <div className="flex justify-between text-[10px] text-slate-450 font-bold">
                <span>$10</span>
                <span>$5,000</span>
                <span>${availableBalance.toLocaleString()} (Max)</span>
              </div>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 5000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  disabled={preset > availableBalance}
                  onClick={() => setAmount(preset)}
                  className={`py-1.5 px-1 rounded-lg border text-xs font-semibold transition-all ${
                    preset > availableBalance
                      ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed'
                      : amount === preset
                      ? 'border-brand-indigo bg-brand-indigo/5 text-brand-indigo shadow-sm font-bold'
                      : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Outcomes Projections */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* V2 Scenarios */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Projected 5-Year Market Scenarios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Positive Scenario */}
              <div className="glass-panel p-4 border border-slate-150 bg-emerald-50/[0.02] flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    Positive Scenario
                  </span>
                  <span className="text-xl font-bold text-slate-800 block mt-1">
                    ${activeData.best.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold block mt-2">
                  Growth: +{((activeData.best - amount) / amount * 100).toFixed(0)}%
                </span>
              </div>

              {/* Stable Scenario */}
              <div className="glass-panel p-4 border border-slate-150 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    Stable Scenario
                  </span>
                  <span className="text-xl font-bold text-slate-850 block mt-1">
                    ${activeData.expected.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <span className="text-[10px] text-brand-indigo font-bold block mt-2">
                  Growth: +{((activeData.expected - amount) / amount * 100).toFixed(0)}%
                </span>
              </div>

              {/* Negative Scenario (Visual Heavy) */}
              <div className="glass-panel p-4 border-2 border-brand-rose bg-brand-rose/[0.04] flex flex-col justify-between relative overflow-hidden glow-rose animate-pulse">
                <div className="absolute right-1.5 top-1.5 text-brand-rose">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-extrabold text-brand-rose block tracking-wider">
                    Negative Scenario
                  </span>
                  <span className="text-xl font-black text-brand-rose block mt-1">
                    ${activeData.worst.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <span className="text-[10px] text-brand-rose font-black block mt-2">
                  Loss: -{((amount - activeData.worst) / amount * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          {/* Gain vs Loss (Loss more prominent) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Potential Gain */}
            <div className="glass-panel p-4 border border-slate-100 bg-emerald-50/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  <Explainable
                    term="Potential Gain"
                    tooltip="Potential Gain is the simulated dollar value added to your balance under ideal market growth conditions."
                    beginnerMode={beginnerMode}
                    inlineExplanation="Possible growth profit value"
                  />
                </span>
                <span className="text-xl font-bold text-emerald-600 block mt-1">
                  +${potentialProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <TrendingUp className="w-6 h-6 text-emerald-500 opacity-60" />
            </div>

            {/* Potential Loss (Heavy Prominent Red styling) */}
            <div className="p-4 rounded-2xl border-2 border-brand-rose bg-brand-rose/10 flex justify-between items-center glow-rose text-brand-rose">
              <div>
                <span className="text-[10px] uppercase font-extrabold block tracking-wider">
                  <Explainable
                    term="Potential Loss"
                    tooltip="Potential Loss is the simulated dollar value subtracted from your original balance under severe recession or failure conditions."
                    beginnerMode={beginnerMode}
                    inlineExplanation="Critical: Capital at risk under crash conditions"
                    highlight={true}
                  />
                </span>
                <span className="text-2xl font-black block mt-1 text-brand-rose-dark">
                  -${potentialLoss.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <AlertTriangle className="w-7 h-7 text-brand-rose shrink-0" />
            </div>
          </div>

          {/* What does this mean explanation box */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-650 leading-relaxed font-normal space-y-1">
            <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-indigo" />
              What does this mean? ⓘ
            </span>
            <p className="text-[11px] leading-relaxed text-slate-550">
              This simulator calculates compound annual rates over 5 years. A stable scenario assumes average historical indexes. A negative scenario simulates a major recession or crash. All outcomes are simulated estimations designed to teach risk tolerance.
            </p>
          </div>

          {/* SVG Line Chart */}
          <div className="glass-panel p-6 border border-slate-100 space-y-4 glow-indigo">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Compounding Volatility Chart</h3>
                <p className="text-xs text-slate-500">Compound paths under three economic scenarios</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 font-semibold">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setHoveredYear(y)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-all cursor-pointer ${
                      hoveredYear === y ? 'bg-white text-slate-800 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Yr {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
                {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                  const val = minValue + r * valueRange;
                  const y = getY(val);
                  return (
                    <g key={i} className="opacity-45">
                      <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#e2e8f0" strokeDasharray="4" />
                      <text x={padding - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#94a3b8" fontWeight="bold">
                        ${Math.round(val).toLocaleString()}
                      </text>
                    </g>
                  );
                })}

                {years.map((y) => (
                  <text key={y} x={getX(y)} y={height - padding + 18} textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="bold">
                    Yr {y}
                  </text>
                ))}

                <path d={bestPath} fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-70" />
                <path d={expectedPath} fill="none" stroke="#6366f1" strokeWidth="1.5" className="opacity-75" />
                <path d={worstPath} fill="none" stroke="#f43f5e" strokeWidth="3" className="opacity-100" />

                <line x1={getX(hoveredYear)} y1={padding - 10} x2={getX(hoveredYear)} y2={height - padding} stroke="#94a3b8" strokeDasharray="2 2" />
                <circle cx={getX(hoveredYear)} cy={getY(activeData.best)} r="4" fill="#10b981" />
                <circle cx={getX(hoveredYear)} cy={getY(activeData.expected)} r="4" fill="#6366f1" />
                <circle cx={getX(hoveredYear)} cy={getY(activeData.worst)} r="5.5" fill="#f43f5e" />
              </svg>

              <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-500 pt-3 border-t border-slate-50">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 border-t-2 border-emerald-500 border-dashed inline-block"></span>Positive Scenario</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-brand-indigo inline-block"></span>Stable Scenario</span>
                <span className="flex items-center gap-1.5 text-brand-rose"><span className="w-3 h-1 bg-brand-rose inline-block rounded-full"></span>Negative (Worst-Case)</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={onBack}
              className="py-3 px-6 rounded-xl border border-slate-200 text-slate-650 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={amount <= 0 || amount > availableBalance}
              onClick={handleNext}
              className={`py-3 px-8 rounded-xl text-white font-semibold text-sm flex items-center gap-2 transition-all ${
                amount <= 0 || amount > availableBalance
                  ? 'bg-slate-300 cursor-not-allowed opacity-50'
                  : 'bg-brand-indigo hover:bg-brand-indigo-dark active:scale-[0.98] cursor-pointer glow-indigo'
              }`}
            >
              Understand Risk & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Simulator;
