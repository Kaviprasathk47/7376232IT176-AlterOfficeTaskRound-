import React, { useState } from 'react';
import type { Investment } from '../types';
import { ArrowLeft, ShieldAlert, Check } from 'lucide-react';

interface ConfirmationProps {
  investment: Investment;
  amount: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  investment,
  amount,
  onBack,
  onConfirm,
}) => {
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  // Compute maximum loss
  const maxLossPercentage = investment.lossMax;
  const maxLossAmount = amount * (maxLossPercentage / 100);
  const remainingPrincipal = amount - maxLossAmount;

  return (
    <div className="max-w-xl mx-auto py-8 px-4 animate-slide-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-505 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Simulator
      </button>

      <div className="glass-panel p-6 sm:p-8 space-y-6 border border-slate-100 glow-rose">
        {/* Warning Icon & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Confirm Capital Allocation</h1>
          <p className="text-slate-500 text-xs">Review the potential downside before confirming</p>
        </div>

        {/* Investment Details Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200/60 text-sm">
            <span className="text-slate-500 font-semibold">Selected Fund:</span>
            <span className="font-bold text-slate-800">{investment.name}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-slate-200/60 text-sm">
            <span className="text-slate-500 font-semibold">Practice Amount:</span>
            <span className="font-extrabold text-brand-indigo">${amount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pb-3 border-b border-slate-200/60 text-sm">
            <span className="text-slate-500 font-semibold">Risk Class:</span>
            <span className="font-bold text-brand-amber-dark">{investment.riskLevel}</span>
          </div>

          {/* Worst-Case Warning in bold */}
          <div className="p-3 bg-brand-rose/10 border border-brand-rose/20 rounded-xl space-y-1">
            <div className="flex justify-between items-center text-xs font-extrabold text-brand-rose-dark uppercase tracking-wider">
              <span>Potential Maximum Loss</span>
              <span>{maxLossPercentage}%</span>
            </div>
            <div className="flex justify-between items-end mt-1">
              <span className="text-xs text-brand-rose font-medium">You could lose:</span>
              <span className="text-lg font-black text-brand-rose">-${maxLossAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-end border-t border-brand-rose/20 pt-1.5 mt-1.5 text-[11px] font-bold text-slate-600">
              <span>Remaining balance after crash:</span>
              <span>${remainingPrincipal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Acknowledgement Checkbox */}
        <div
          onClick={() => setAcknowledged(!acknowledged)}
          className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
            acknowledged
              ? 'border-brand-rose/30 bg-brand-rose/[0.01]'
              : 'border-slate-200 hover:bg-slate-50 bg-white'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              acknowledged ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
            }`}
          >
            {acknowledged && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-extrabold text-slate-800 cursor-pointer select-none">
              I understand that investments can lose value.
            </label>
            <p className="text-[11px] text-slate-550 leading-relaxed cursor-pointer select-none">
              I acknowledge that past performance is not a guarantee of future returns, and in a market crash, I could lose up to <strong>${maxLossAmount.toLocaleString()}</strong> of my virtual funds.
            </p>
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
            disabled={!acknowledged}
            onClick={onConfirm}
            className={`w-full sm:w-2/3 py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              acknowledged
                ? 'bg-brand-rose hover:bg-brand-rose-dark active:scale-[0.98] cursor-pointer shadow-sm shadow-brand-rose/20'
                : 'bg-slate-350 opacity-40 cursor-not-allowed'
            }`}
          >
            Confirm Mock Investment
          </button>
        </div>
      </div>
    </div>
  );
};
