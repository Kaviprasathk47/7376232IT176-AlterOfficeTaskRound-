import React, { useState, useRef, useEffect } from 'react';
import { X, HelpCircle } from 'lucide-react';

interface ExplainableProps {
  term: string | React.ReactNode;
  tooltip: string;
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
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Check if device supports hover (desktop vs mobile)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setShowModal(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setShowTooltip(false);
    }
  };

  return (
    <>
      <span className="inline-flex flex-col">
        <span className="inline-flex items-center gap-1 flex-wrap">
          <button
            ref={triggerRef}
            type="button"
            onClick={handleInteraction}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`inline-flex items-center gap-0.5 text-left font-bold transition-all focus:outline-none rounded hover:text-brand-indigo cursor-pointer ${
              highlight ? 'text-brand-indigo underline decoration-dashed underline-offset-2 decoration-brand-indigo/60' : 'text-slate-900'
            }`}
          >
            <span>{term}</span>
            <span className="text-brand-indigo text-[10px] sm:text-xs font-bold leading-none inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-brand-indigo/5 hover:bg-brand-indigo/15">
              ⓘ
            </span>
          </button>

          {/* Desktop Hover Tooltip Bubble */}
          {!isMobile && showTooltip && (
            <span className="absolute z-50 w-64 p-3 text-xs leading-relaxed text-white bg-slate-900 rounded-xl shadow-lg border border-slate-800 -translate-y-full -translate-x-1/4 -mt-2 animate-fade-in block font-normal">
              <span className="font-bold text-brand-indigo-light block mb-0.5">
                {typeof term === 'string' ? term : 'Explanation'}
              </span>
              {tooltip}
              {/* Tooltip triangle */}
              <span className="absolute bottom-0 left-1/4 -mb-1 w-2.5 h-2.5 bg-slate-900 border-r border-b border-slate-800 rotate-45 transform translate-x-1/2"></span>
            </span>
          )}
        </span>

        {/* Beginner Mode: Auto Inline Helper */}
        {beginnerMode && (inlineExplanation || tooltip) && (
          <span className="text-[10px] text-brand-indigo font-medium italic block mt-0.5 leading-tight opacity-90 animate-fade-in">
            ({inlineExplanation || tooltip})
          </span>
        )}
      </span>

      {/* Mobile Tap Explanation Modal */}
      {isMobile && showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex flex-col space-y-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-brand-indigo" />
                {typeof term === 'string' ? term : 'Term Explanation'}
              </span>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-950 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {tooltip}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Explainable;
