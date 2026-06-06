import { useState } from 'react';
import type { InvestmentOption } from './types';
import { Welcome } from './components/Welcome';
import { InvestmentChoice } from './components/InvestmentChoice';
import { InvestmentDecision } from './components/InvestmentDecision';
import { MockConfirmation } from './components/MockConfirmation';
import { ResultScreen } from './components/ResultScreen';
import { GlossaryModal } from './components/GlossaryModal';
import { Shield } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [selectedOption, setSelectedOption] = useState<InvestmentOption | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000);
  const [glossaryTerm, setGlossaryTerm] = useState<string | null>(null);

  // Arun persona mock savings capacity
  const mockSavings = 3000;

  const handleSelectOption = (option: InvestmentOption) => {
    setSelectedOption(option);
    setCurrentScreen('decision');
  };

  const handleDecisionProceed = (amount: number) => {
    setInvestmentAmount(amount);
    setCurrentScreen('confirmation');
  };

  const handleConfirmInvestment = () => {
    setCurrentScreen('result');
  };

  const handleTryAnother = () => {
    setSelectedOption(null);
    setInvestmentAmount(1000);
    setCurrentScreen('choice');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      
      {/* Premium Minimal Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-indigo/10 text-brand-indigo rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-black text-lg text-slate-905 tracking-tight">
              FirstStep<span className="text-brand-indigo"> Invest</span>
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
              Mock Savings Account
            </span>
            <span className="text-sm font-black text-slate-805">
              ₹3,000
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pb-16 pt-4">
        {currentScreen === 'welcome' && (
          <Welcome onStart={() => setCurrentScreen('choice')} />
        )}

        {currentScreen === 'choice' && (
          <InvestmentChoice
            onSelect={handleSelectOption}
            onOpenGlossary={(term) => setGlossaryTerm(term)}
          />
        )}

        {currentScreen === 'decision' && selectedOption && (
          <InvestmentDecision
            option={selectedOption}
            availableSavings={mockSavings}
            onBack={() => setCurrentScreen('choice')}
            onProceed={handleDecisionProceed}
            onOpenGlossary={(term) => setGlossaryTerm(term)}
          />
        )}

        {currentScreen === 'confirmation' && selectedOption && (
          <MockConfirmation
            option={selectedOption}
            amount={investmentAmount}
            onBack={() => setCurrentScreen('decision')}
            onConfirm={handleConfirmInvestment}
          />
        )}

        {currentScreen === 'result' && selectedOption && (
          <ResultScreen
            option={selectedOption}
            amount={investmentAmount}
            onRestart={handleTryAnother}
            onOpenGlossary={(term) => setGlossaryTerm(term)}
          />
        )}
      </main>

      {/* Glossary Modal Overlay */}
      <GlossaryModal 
        term={glossaryTerm} 
        onClose={() => setGlossaryTerm(null)} 
      />

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-slate-100 bg-white text-center text-xs text-slate-400 font-semibold space-y-1">
        <p>© 2026 FirstStep Invest. Created for first-time investors.</p>
        <p className="max-w-md mx-auto text-[9.5px] leading-relaxed text-slate-400 font-normal px-4">
          Disclaimer: This is a purely educational prototype simulating basic investment decisions. No real money or actual stock holdings are involved.
        </p>
      </footer>
    </div>
  );
}

export default App;
