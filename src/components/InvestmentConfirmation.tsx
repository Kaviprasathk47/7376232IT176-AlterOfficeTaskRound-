import React, { useState } from 'react';
import type { Stock } from '../types';
import { ArrowLeft, ShieldAlert, Check, HelpCircle, ShieldCheck } from 'lucide-react';
import { Explainable } from './Explainable';

interface InvestmentConfirmationProps {
  stock: Stock;
  amount: number;
  availableBalance: number;
  portfolioCurrentValue: number;
  beginnerMode: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

export const InvestmentConfirmation: React.FC<InvestmentConfirmationProps> = ({
  stock,
  amount,
  availableBalance,
  portfolioCurrentValue,
  beginnerMode,
  onBack,
  onConfirm,
}) => {
  const [checks, setChecks] = useState({
    loss: false,
    gains: false,
    holding: false,
  });

  const totalBalance = availableBalance + portfolioCurrentValue;
  const remainingCash = availableBalance - amount;
  
  // 20% Cash Reserve Rule: remaining cash must be >= 20% of total balance
  const reserveThreshold = totalBalance * 0.20;
  const isReserveViolation = remainingCash < reserveThreshold;

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const allChecked = checks.loss && checks.gains && checks.holding;

  // Expected/Worst Case range calculations for confirmation summary
  const avgReturn = (stock.returnMin + stock.returnMax) / 2;
  const worstCaseReturn = -stock.lossMax;

  return (
    <div className="max-w-xl mx-auto py-8 px-4 animate-slide-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Stock Detail
      </button>

      <div className={`glass-panel p-6 sm:p-8 space-y-6 border border-slate-100 ${isReserveViolation ? 'glow-rose border-rose-200' : 'glow-indigo border-slate-100'}`}>
        
        {/* Warning Icon & Header */}
        <div className="text-center space-y-2">
          <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center ${isReserveViolation ? 'bg-brand-rose/10 text-brand-rose' : 'bg-brand-indigo/10 text-brand-indigo'}`}>
            {isReserveViolation ? <ShieldAlert className="w-6 h-6 shrink-0" /> : <ShieldCheck className="w-6 h-6 shrink-0" />}
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isReserveViolation ? 'Safety Guard Triggered' : 'Confirm Practice Allocation'}
          </h1>
          <p className="text-slate-500 text-xs">
            {isReserveViolation ? 'Your cash reserve is too low to proceed' : 'Review risk parameters before allocating virtual cash'}
          </p>
        </div>

        {/* Reserve Rule Warning Banner */}
        {isReserveViolation && (
          <div className="p-4 bg-rose-50 border border-brand-rose/25 rounded-2xl space-y-2">
            <span className="block font-black text-brand-rose-dark text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-brand-rose" />
              20% Cash Reserve Rule Violated
            </span>
            <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
              InvestWise enforces a strict <strong>20% Cash Reserve Safety Rule</strong>. You must retain at least 20% of your total balance (₹{reserveThreshold.toLocaleString(undefined, { maximumFractionDigits: 0 })}) as liquid cash to protect your portfolio from extreme volatility.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1.5 text-[10px] font-bold border-t border-brand-rose/10 text-slate-600">
              <div>
                <span className="block text-slate-400 font-extrabold uppercase text-[8px]">Available Cash After Invest</span>
                <span className="text-brand-rose font-black">₹{remainingCash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div>
                <span className="block text-slate-400 font-extrabold uppercase text-[8px]">Required Safety Cash (20%)</span>
                <span className="text-emerald-700 font-black">₹{reserveThreshold.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Selected Stock:</span>
            <span className="font-bold text-slate-800">{stock.name}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Investment Amount:</span>
            <span className="font-extrabold text-brand-indigo">₹{amount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Remaining Practice Cash:</span>
            <span className={`font-extrabold ${isReserveViolation ? 'text-brand-rose' : 'text-slate-700'}`}>
              ₹{remainingCash.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Risk Rating / Class:</span>
            <span className={`font-black ${stock.riskLevel === 'Aggressive' ? 'text-brand-rose' : stock.riskLevel === 'Moderate' ? 'text-brand-indigo' : 'text-emerald-600'}`}>
              {stock.riskLevel}
            </span>
          </div>

          {/* Worst-Case Warning in bold */}
          <div className="p-3 bg-brand-rose/5 border border-brand-rose/10 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-[9px] font-extrabold text-brand-rose-dark uppercase tracking-wider">
              <span>Potential Maximum Downside</span>
              <span>{stock.lossMax}%</span>
            </div>
            <div className="flex justify-between items-end mt-1">
              <span className="text-xs text-slate-550">Worst-Case Loss Amount:</span>
              <span className="text-base font-black text-brand-rose">-₹{((amount * stock.lossMax) / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
            Risk Acknowledgement Checklist
          </h3>

          {/* Checklist Item 1 */}
          <div
            onClick={() => toggleCheck('loss')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
              checks.loss ? 'border-brand-rose/30 bg-brand-rose/[0.01]' : 'border-slate-200 hover:bg-slate-50 bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                checks.loss ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {checks.loss && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-805 select-none block">
                I understand that investments can lose value
              </span>
              {beginnerMode && (
                <p className="text-[10px] text-slate-500 leading-normal">
                  In a market downturn, the value of {stock.name} could fall, resulting in a simulated loss of up to ₹{((amount * stock.lossMax) / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}.
                </p>
              )}
            </div>
          </div>

          {/* Checklist Item 2 */}
          <div
            onClick={() => toggleCheck('gains')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
              checks.gains ? 'border-brand-rose/30 bg-brand-rose/[0.01]' : 'border-slate-200 hover:bg-slate-50 bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                checks.gains ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {checks.gains && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-805 select-none block">
                I understand gains are not guaranteed
              </span>
              {beginnerMode && (
                <p className="text-[10px] text-slate-500 leading-normal">
                  The expected return rate of {stock.returnMin}% to {stock.returnMax}% is an average estimate. Past performance does not guarantee future results.
                </p>
              )}
            </div>
          </div>

          {/* Checklist Item 3 */}
          <div
            onClick={() => toggleCheck('holding')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
              checks.holding ? 'border-brand-rose/30 bg-brand-rose/[0.01]' : 'border-slate-200 hover:bg-slate-50 bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                checks.holding ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {checks.holding && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-805 select-none block">
                I agree to the recommended holding period
              </span>
              {beginnerMode && (
                <p className="text-[10px] text-slate-500 leading-normal">
                  To give this asset standard time to grow and survive short-term market drops, I understand it is best to hold it for at least <strong>{stock.holdingPeriod}</strong>.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onBack}
            className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-655 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Modify Amount
          </button>
          <button
            disabled={!allChecked || isReserveViolation}
            onClick={onConfirm}
            className={`w-full sm:w-2/3 py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              allChecked && !isReserveViolation
                ? 'bg-brand-rose hover:bg-brand-rose-dark active:scale-[0.98] cursor-pointer shadow-sm shadow-brand-rose/20'
                : 'bg-slate-350 opacity-40 cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Acknowledge Risks & Invest
          </button>
        </div>
      </div>
    </div>
  );
};
export default InvestmentConfirmation;
