import React from 'react';
import type { InvestmentOption } from '../types';
import { mockOptions } from '../data/options';
import { HelpCircle, Award, Compass, TrendingUp } from 'lucide-react';

interface InvestmentChoiceProps {
  onSelect: (option: InvestmentOption) => void;
  onOpenGlossary: (term: string) => void;
}

export const InvestmentChoice: React.FC<InvestmentChoiceProps> = ({ onSelect, onOpenGlossary }) => {
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Low':
        return 'text-indigo-700 bg-indigo-50 border-indigo-100';
      default:
        return 'text-rose-700 bg-rose-50 border-rose-100';
    }
  };

  const getAssetIcon = (id: string) => {
    if (id.includes('bond')) return <Award className="w-5 h-5 text-emerald-500" />;
    if (id.includes('index')) return <Compass className="w-5 h-5 text-indigo-500" />;
    return <TrendingUp className="w-5 h-5 text-pink-500" />;
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 animate-slide-up space-y-6">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-50 text-brand-indigo tracking-wider border border-indigo-100/40">
          Step 2 of 5
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
          Choose an Investment to Explore
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          Select one of the three options below to see how it works and visualize your potential outcomes.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {mockOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => onSelect(option)}
            className="bg-white p-6 rounded-3xl border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer glow-indigo group flex flex-col justify-between"
          >
            <div className="space-y-5">
              
              {/* Header block of card */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                    {getAssetIcon(option.id)}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight group-hover:text-brand-indigo transition-colors flex items-center">
                      {option.name}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenGlossary(option.name);
                        }}
                        className="inline-flex items-center justify-center p-0.5 text-brand-indigo hover:text-brand-indigo-dark shrink-0 cursor-pointer ml-1.5"
                        title={`Click to define ${option.name}`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </h3>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Mock Option</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center">
                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase border tracking-wider ${getRiskColor(option.risk)}`}>
                    {option.risk} Risk
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGlossary('Risk');
                    }}
                    className="inline-flex items-center justify-center p-0.5 text-brand-indigo hover:text-brand-indigo-dark shrink-0 cursor-pointer ml-1"
                    title="Define Risk"
                  >
                    <HelpCircle className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Suitability Banner (Recommended For) */}
              <div className="p-3 bg-brand-indigo/[0.03] border border-brand-indigo/10 rounded-2xl text-[11px] text-slate-650 font-semibold leading-relaxed">
                <span className="block text-brand-indigo text-[8.5px] uppercase font-black tracking-wider mb-0.5">Recommended For</span>
                {option.recommendedFor}
              </div>

              {/* Grid of Key Metrics */}
              <div className="grid grid-cols-2 gap-3 py-2 px-3.5 bg-slate-50 rounded-2xl border border-slate-150/40 text-[11px] leading-relaxed text-slate-600">
                
                {/* Potential Gain */}
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-extrabold text-[8.5px] uppercase tracking-wider flex items-center">
                    Potential Gain
                  </span>
                  <span className="font-extrabold text-emerald-600 block">+{option.gainMin}% to +{option.gainMax}%</span>
                </div>

                {/* Potential Loss */}
                <div className="space-y-0.5">
                  <span className="text-slate-400 font-extrabold text-[8.5px] uppercase tracking-wider flex items-center">
                    Potential Loss
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGlossary('Potential Loss');
                      }}
                      className="inline-flex items-center justify-center text-brand-indigo hover:text-brand-indigo-dark shrink-0 cursor-pointer ml-1"
                      title="Define Potential Loss"
                    >
                      <HelpCircle className="w-3 h-3" />
                    </button>
                  </span>
                  <span className="font-extrabold text-rose-600 block">-{option.lossMin}% to -{option.lossMax}%</span>
                </div>

                {/* Holding Period */}
                <div className="col-span-2 border-t border-slate-200/50 pt-2 space-y-0.5">
                  <span className="text-slate-400 font-extrabold text-[8.5px] uppercase tracking-wider flex items-center">
                    Holding Period
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenGlossary('Holding Period');
                      }}
                      className="inline-flex items-center justify-center text-brand-indigo hover:text-brand-indigo-dark shrink-0 cursor-pointer ml-1"
                      title="Define Holding Period"
                    >
                      <HelpCircle className="w-3 h-3" />
                    </button>
                  </span>
                  <span className="font-black text-slate-800 block">{option.holdingPeriod}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-brand-indigo w-full">
              <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Explore this option
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InvestmentChoice;
