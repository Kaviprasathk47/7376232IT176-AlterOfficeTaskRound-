import React, { useState } from 'react';
import type { Investment } from '../types';
import { ShieldAlert, Check, ArrowLeft, ShieldCheck } from 'lucide-react';

interface ReadinessCheckProps {
  investment: Investment;
  amount: number;
  beginnerMode: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

export const ReadinessCheck: React.FC<ReadinessCheckProps> = ({
  investment,
  amount,
  beginnerMode,
  onBack,
  onConfirm,
}) => {
  const [checks, setChecks] = useState({
    loss: false,
    gains: false,
    risk: false,
    mock: false,
  });

  const allChecked = checks.loss && checks.gains && checks.risk && checks.mock;

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const worstLossPercentage = investment.lossMax;
  const worstLossAmount = amount * (worstLossPercentage / 100);
  const remainingCash = amount - worstLossAmount;

  return (
    <div className="max-w-xl mx-auto py-8 px-4 animate-slide-up">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Simulator
      </button>

      <div className="glass-panel p-6 sm:p-8 space-y-6 border border-slate-100 glow-rose">
        {/* Warning Icon & Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-brand-rose/10 rounded-full flex items-center justify-center text-brand-rose">
            <ShieldAlert className="w-6 h-6 shrink-0" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Readiness Check</h1>
          <p className="text-slate-500 text-xs">Verify your understanding of risks before proceeding</p>
        </div>

        {/* Transaction Summary Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150 space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center font-medium">
            <span className="text-slate-500">Asset Category:</span>
            <span className="font-bold text-slate-800">{investment.name}</span>
          </div>
          <div className="flex justify-between items-center font-medium">
            <span className="text-slate-500">Allocation Amount:</span>
            <span className="font-bold text-slate-850">${amount.toLocaleString()}</span>
          </div>

          {/* Core Danger Detail */}
          <div className="p-3 bg-brand-rose/10 border border-brand-rose/20 rounded-xl space-y-1.5 text-brand-rose">
            <div className="flex justify-between items-center font-extrabold uppercase text-[10px] tracking-wider">
              <span>Potential Maximum Loss</span>
              <span>{worstLossPercentage}%</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs text-brand-rose">Worst-Case Loss Amount:</span>
              <span className="text-base font-black">-${worstLossAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 border-t border-brand-rose/20 pt-1.5 mt-1">
              <span>Remaining balance if market crashes:</span>
              <span>${remainingCash.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
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
                I understand investments can lose value
              </span>
              {beginnerMode && (
                <p className="text-[10px] text-slate-500 leading-normal animate-fade-in">
                  Stock prices go up and down. Recession drops are normal and you could lose real capital.
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
                <p className="text-[10px] text-slate-500 leading-normal animate-fade-in">
                  Past returns do not guarantee future performance. An asset that grew last year can crash next year.
                </p>
              )}
            </div>
          </div>

          {/* Checklist Item 3 */}
          <div
            onClick={() => toggleCheck('risk')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
              checks.risk ? 'border-brand-rose/30 bg-brand-rose/[0.01]' : 'border-slate-200 hover:bg-slate-50 bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                checks.risk ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {checks.risk && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-805 select-none block">
                I understand the risk level ({investment.riskLevel})
              </span>
              {beginnerMode && (
                <p className="text-[10px] text-slate-500 leading-normal animate-fade-in">
                  This asset carries a <strong>{investment.riskLevel}</strong> rating, meaning it is prone to corresponding volatility.
                </p>
              )}
            </div>
          </div>

          {/* Checklist Item 4 */}
          <div
            onClick={() => toggleCheck('mock')}
            className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all duration-200 ${
              checks.mock ? 'border-brand-rose/30 bg-brand-rose/[0.01]' : 'border-slate-200 hover:bg-slate-50 bg-white'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                checks.mock ? 'bg-brand-rose border-brand-rose text-white' : 'border-slate-300 bg-white'
              }`}
            >
              {checks.mock && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-extrabold text-slate-805 select-none block">
                I understand this simulation uses mock data
              </span>
              {beginnerMode && (
                <p className="text-[10px] text-slate-500 leading-normal animate-fade-in">
                  No real money is deposited, and no actual order is sent to the financial markets.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onBack}
            className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={!allChecked}
            onClick={onConfirm}
            className={`w-full sm:w-2/3 py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              allChecked
                ? 'bg-brand-rose hover:bg-brand-rose-dark active:scale-[0.98] cursor-pointer shadow-md shadow-brand-rose/20'
                : 'bg-slate-300 opacity-40 cursor-not-allowed'
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
export default ReadinessCheck;
