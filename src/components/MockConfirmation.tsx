import React, { useState } from 'react';
import type { InvestmentOption } from '../types';
import { ArrowLeft, Check, ShieldAlert, ShieldCheck } from 'lucide-react';

interface MockConfirmationProps {
  option: InvestmentOption;
  amount: number;
  onBack: () => void;
  onConfirm: () => void;
}

export const MockConfirmation: React.FC<MockConfirmationProps> = ({
  option,
  amount,
  onBack,
  onConfirm
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const maxGainAmt = Math.round(amount * (option.gainMax / 100));
  const maxLossAmt = Math.round(amount * (option.lossMax / 100));

  return (
    <div className="max-w-xl mx-auto py-6 px-4 animate-slide-up">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Modify Decision Details
      </button>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-lg space-y-6 glow-rose">
        
        {/* Warning Icon & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
            <ShieldAlert className="w-6 h-6 shrink-0" />
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Confirm Mock Investment</h1>
          <p className="text-slate-500 text-xs">Review the potential downside before confirming</p>
        </div>

        {/* Investment Details Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 space-y-3.5 text-xs sm:text-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Selected Fund:</span>
            <span className="font-bold text-slate-805">{option.name}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Mock Practice Amount:</span>
            <span className="font-extrabold text-brand-indigo">₹{amount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Potential Gain:</span>
            <span className="font-extrabold text-emerald-600">Up to ₹{maxGainAmt.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
            <span className="text-slate-500 font-semibold">Potential Loss:</span>
            <span className="font-extrabold text-brand-rose">Up to ₹{maxLossAmt.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-semibold">Holding Period:</span>
            <span className="font-bold text-slate-800">{option.holdingPeriod}</span>
          </div>
        </div>

        {/* Acknowledgement Checkbox */}
        <div
          onClick={() => setChecked(!checked)}
          className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
            checked
              ? 'border-brand-rose/30 bg-brand-rose/[0.01]'
              : 'border-slate-200 hover:bg-slate-50 bg-white'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checked ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
            }`}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
          <div className="space-y-1">
            <label className="text-xs sm:text-sm font-extrabold text-slate-800 cursor-pointer select-none block">
              I understand that investments can lose value.
            </label>
            <p className="text-[10px] text-slate-500 leading-normal select-none">
              I acknowledge that this is a simulated transaction. In a real market decline, I could lose up to <strong>₹{maxLossAmt.toLocaleString()}</strong> of my allocated principal.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onBack}
            className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-655 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={!checked}
            onClick={onConfirm}
            className={`w-full sm:w-2/3 py-3 px-4 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              checked
                ? 'bg-brand-rose hover:bg-brand-rose-dark active:scale-[0.98] cursor-pointer shadow-sm shadow-brand-rose/20'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Make Mock Investment
          </button>
        </div>
      </div>
    </div>
  );
};
export default MockConfirmation;
