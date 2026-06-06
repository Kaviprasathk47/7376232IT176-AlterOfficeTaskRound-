import React from 'react';
import { X, HelpCircle, ShieldAlert, Sparkles, Clock, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  term: string | null;
  onClose: () => void;
}

export const glossaryDefinitions: Record<string, { title: string; definition: string; icon: React.ReactNode }> = {
  'Risk': {
    title: 'What is Risk?',
    definition: 'Risk describes the possibility that an investment may lose value. Higher risk investments may provide higher returns but can also produce larger losses.',
    icon: <ShieldAlert className="w-5 h-5 text-rose-500" />
  },
  'Potential Loss': {
    title: 'What is Potential Loss?',
    definition: 'Potential Loss shows the range of money you could lose in a worst-case scenario. It is crucial to understand this number before making decisions so you are never caught off guard.',
    icon: <ShieldAlert className="w-5 h-5 text-red-500" />
  },
  'Holding Period': {
    title: 'What is a Holding Period?',
    definition: 'The recommended length of time to keep your money invested. Spreading your investment over this period helps you survive short-term market declines and builds wealth through compounding.',
    icon: <Clock className="w-5 h-5 text-brand-indigo" />
  },
  'Index Fund': {
    title: 'What is an Index Fund?',
    definition: 'A type of mutual fund or ETF that tracks a market index (like the Nifty 50). It automatically buys shares in many of the country\'s largest companies to give you automatic diversification.',
    icon: <BookOpen className="w-5 h-5 text-indigo-500" />
  },
  'Technology Fund': {
    title: 'What is a Technology Fund?',
    definition: 'A focused fund that invests specifically in high-growth technology companies. It carries potential for higher growth, but has higher fluctuations when the tech sector swings.',
    icon: <Sparkles className="w-5 h-5 text-pink-500" />
  },
  'Government Bond': {
    title: 'What is a Government Bond?',
    definition: 'A highly secure contract where you loan money to the government. In exchange, the government pays you regular fixed interest. Sovereign backing means risk of losing capital is extremely low.',
    icon: <HelpCircle className="w-5 h-5 text-emerald-500" />
  }
};

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ term, onClose }) => {
  if (!term) return null;

  const data = glossaryDefinitions[term] || {
    title: `Explanation: ${term}`,
    definition: 'Explanation not found.',
    icon: <HelpCircle className="w-5 h-5 text-brand-indigo" />
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 relative text-left animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-50 rounded-xl shrink-0">
              {data.icon}
            </div>
            <h3 className="font-black text-sm sm:text-base text-slate-900 tracking-tight">{data.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
          {data.definition}
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer active:scale-[0.99]"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
export default GlossaryModal;
