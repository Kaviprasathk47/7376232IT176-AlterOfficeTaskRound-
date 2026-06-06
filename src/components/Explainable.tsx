import React, { useState } from 'react';
import { termDefinitions } from '../data/drawers';
import { X, HelpCircle, AlertCircle } from 'lucide-react';

interface ExplainableProps {
  term: string;
  tooltip?: string;
  beginnerMode: boolean;
  inlineExplanation?: string;
  highlight?: boolean;
}

export const Explainable: React.FC<ExplainableProps> = ({
  term,
  tooltip,
  beginnerMode,
  inlineExplanation,
  highlight = false,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  // Fetch from drawers data or fallback
  const definitionData = termDefinitions[term] || {
    title: `What is ${term}?`,
    definition: tooltip || 'Explanation not found.',
    example: '',
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDrawer(true);
  };

  return (
    <>
      <span className="inline-flex flex-col">
        <span className="inline-flex items-center gap-1 flex-wrap">
          <button
            type="button"
            onClick={handleOpen}
            className={`inline-flex items-center gap-0.5 text-left font-bold transition-all focus:outline-none rounded hover:text-brand-indigo cursor-pointer ${
              highlight
                ? 'text-brand-indigo underline decoration-dashed underline-offset-2 decoration-brand-indigo/60'
                : 'text-slate-905'
            }`}
          >
            <span>{term}</span>
            <span className="text-brand-indigo text-[10px] sm:text-xs font-bold leading-none inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-brand-indigo/5 hover:bg-brand-indigo/15">
              ⓘ
            </span>
          </button>
        </span>

        {/* Beginner Mode inline support */}
        {beginnerMode && (inlineExplanation || definitionData.definition) && (
          <span className="text-[10px] text-brand-indigo font-medium italic block mt-0.5 leading-tight opacity-90">
            ({inlineExplanation || (definitionData.definition.substring(0, 50) + '...')})
          </span>
        )}
      </span>

      {/* Slide-out Side Drawer Overlay */}
      {showDrawer && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowDrawer(false)}
        >
          {/* Side Drawer Panel */}
          <div
            className="w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-slide-up sm:animate-none border-l border-slate-100"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <span className="font-black text-lg text-slate-900 flex items-center gap-2 tracking-tight">
                  <HelpCircle className="w-5 h-5 text-brand-indigo" />
                  {definitionData.title}
                </span>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Definition */}
              <p className="text-slate-655 text-sm leading-relaxed font-normal">
                {definitionData.definition}
              </p>

              {/* Risk specifications if present */}
              {(definitionData.lowRiskText || definitionData.highRiskText) && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Risk Breakdown
                  </h4>
                  {definitionData.lowRiskText && (
                    <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-800 leading-normal flex gap-2">
                      <span className="font-bold">•</span>
                      <span>{definitionData.lowRiskText}</span>
                    </div>
                  )}
                  {definitionData.highRiskText && (
                    <div className="p-3 bg-brand-rose/5 border border-brand-rose/15 rounded-xl text-xs text-brand-rose-dark leading-normal flex gap-2">
                      <AlertCircle className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                      <span>{definitionData.highRiskText}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Real World Example */}
              {definitionData.example && (
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5 text-xs text-slate-650 leading-relaxed font-normal">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    Real-World Example:
                  </span>
                  <p className="font-medium">{definitionData.example}</p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <button
              onClick={() => setShowDrawer(false)}
              className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Got it, close explanation
            </button>
          </div>
        </div>
      )}

      {/* Slide in from right CSS animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
export default Explainable;
