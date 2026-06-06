import React, { useState } from 'react';
import { termDefinitions } from '../data/drawers';
import { X, HelpCircle, Lightbulb, ShieldAlert, BookOpen } from 'lucide-react';

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

  const definitionData = termDefinitions[term] || {
    title: `What is ${term}?`,
    definition: tooltip || 'Explanation not found.',
    whyItMatters: 'Understanding this helps guide allocation choices.',
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
            className={`inline-flex items-center gap-0.5 text-left font-extrabold transition-all focus:outline-none rounded hover:text-brand-indigo cursor-pointer ${
              highlight
                ? 'text-brand-indigo underline decoration-dashed underline-offset-2 decoration-brand-indigo/60'
                : 'text-slate-800'
            }`}
          >
            <span>{term}</span>
            <span className="text-brand-indigo text-[10px] font-black leading-none inline-flex items-center justify-center w-3 h-3 rounded-full bg-brand-indigo/5 hover:bg-brand-indigo/15">
              ⓘ
            </span>
          </button>
        </span>

        {/* Beginner Mode inline hint */}
        {beginnerMode && (inlineExplanation || definitionData.definition) && (
          <span className="text-[10px] text-brand-indigo font-semibold italic block mt-0.5 leading-tight opacity-90">
            ({inlineExplanation || (definitionData.definition.substring(0, 42) + '...')})
          </span>
        )}
      </span>

      {/* Slide-out Sheet Overlay */}
      {showDrawer && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end bg-slate-950/40 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowDrawer(false)}
        >
          {/* Side Sheet Panel (Responsive: Bottom Sheet on Mobile, Right Drawer on Desktop) */}
          <div
            className="drawer-panel w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-t sm:border-t-0 sm:border-l border-slate-100 rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl max-h-[85vh] sm:max-h-full sm:h-full p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-105">
                <span className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2 tracking-tight">
                  <HelpCircle className="w-5 h-5 text-brand-indigo shrink-0" />
                  {definitionData.title}
                </span>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Jargon-free bullet points */}
              <div className="space-y-5">
                {/* 1. Definition */}
                <div className="space-y-1">
                  <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-indigo" />
                    Definition
                  </h4>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-semibold">
                    {definitionData.definition}
                  </p>
                </div>

                {/* 2. Why it Matters */}
                <div className="space-y-1">
                  <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-brand-indigo" />
                    Why it matters
                  </h4>
                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-medium">
                    {definitionData.whyItMatters}
                  </p>
                </div>

                {/* 3. Real Example */}
                {definitionData.example && (
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5 text-xs text-slate-650 leading-relaxed font-normal">
                    <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-emerald-500" />
                      Real-World Example
                    </h4>
                    <p className="font-medium text-slate-600">{definitionData.example}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowDrawer(false)}
              className="w-full mt-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer active:scale-[0.99]"
            >
              Close Explanation
            </button>
          </div>
        </div>
      )}

      {/* Responsive drawer panel animation style */}
      <style>{`
        @keyframes slideUpBottom {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .drawer-panel {
          animation: slideUpBottom 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (min-width: 640px) {
          .drawer-panel {
            animation: slideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        }
      `}</style>
    </>
  );
};
export default Explainable;
