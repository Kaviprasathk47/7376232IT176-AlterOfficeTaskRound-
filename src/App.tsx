import { useState } from 'react';
import type { UserProfile, PortfolioItem, Investment } from './types';
import { Navbar } from './components/Navbar';
import { Onboarding } from './components/Onboarding';
import { InvestmentExplorer } from './components/InvestmentExplorer';
import { UnderstandAsset } from './components/UnderstandAsset';
import { Walkthrough } from './components/Walkthrough';
import { Simulator } from './components/Simulator';
import { ReadinessCheck } from './components/ReadinessCheck';
import { Dashboard } from './components/Dashboard';
import { Insights } from './components/Insights';
import { Play, Info } from 'lucide-react';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentScreen, setCurrentScreen] = useState<string>('onboarding');
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [availableBalance, setAvailableBalance] = useState<number>(10000);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [marketShiftsCount, setMarketShiftsCount] = useState<number>(0);
  const [beginnerMode, setBeginnerMode] = useState<boolean>(true); // Default to true for target age range

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAvailableBalance(10000); // Reset practice account balance
    setPortfolio([]); // Reset holdings
    setCurrentScreen('explorer');
  };

  const handleSelectInvestment = (investment: Investment) => {
    setSelectedInvestment(investment);
    setCurrentScreen('understand'); // Transition to Page 3 first
  };

  const handleConfirmInvestment = () => {
    if (!selectedInvestment || investmentAmount <= 0) return;

    // Add new asset purchase to mock portfolio
    const newHolding: PortfolioItem = {
      id: `${selectedInvestment.id}-${Date.now()}`,
      investmentId: selectedInvestment.id,
      investmentName: selectedInvestment.name,
      amountInvested: investmentAmount,
      riskLevel: selectedInvestment.riskLevel,
      purchaseDate: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      mockPerformance: 0,
    };

    setPortfolio((prev) => [...prev, newHolding]);
    setAvailableBalance((prev) => prev - investmentAmount);
    
    // Clear temporary states
    setSelectedInvestment(null);
    setInvestmentAmount(0);
    setCurrentScreen('dashboard');
  };

  const handleSellHolding = (holdingId: string) => {
    const holding = portfolio.find((item) => item.id === holdingId);
    if (!holding) return;

    // Calculate current simulated value
    const realizedValue = holding.amountInvested * (1 + holding.mockPerformance / 100);
    
    setAvailableBalance((prev) => prev + realizedValue);
    setPortfolio((prev) => prev.filter((item) => item.id !== holdingId));
  };

  const handleResetPortfolio = () => {
    setPortfolio([]);
    setAvailableBalance(10000);
    setMarketShiftsCount(0);
    setCurrentScreen('explorer');
  };

  const handleRedoOnboarding = () => {
    setUserProfile(null);
    setPortfolio([]);
    setAvailableBalance(10000);
    setMarketShiftsCount(0);
    setCurrentScreen('onboarding');
  };

  // Educational Tool: Simulate market fluctuations
  const handleSimulateMarketShift = () => {
    setPortfolio((prev) =>
      prev.map((item) => {
        let maxChange = 1.5; // low risk conservative bonds
        if (item.riskLevel === 'Moderate') maxChange = 5;
        if (item.riskLevel === 'Aggressive') {
          maxChange = item.investmentId === 'growth-stocks' ? 18 : 12;
        }

        const shift = (Math.random() * 2 - 1) * maxChange;
        let newPerformance = item.mockPerformance + shift;

        // Caps to simulate absolute extremes
        newPerformance = Math.max(-80, Math.min(newPerformance, 120));

        return {
          ...item,
          mockPerformance: newPerformance,
        };
      })
    );
    setMarketShiftsCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Dynamic Header Navbar */}
      <Navbar
        currentScreen={currentScreen}
        userProfile={userProfile}
        availableBalance={availableBalance}
        beginnerMode={beginnerMode}
        onToggleBeginnerMode={() => setBeginnerMode(!beginnerMode)}
        onNavigate={setCurrentScreen}
      />

      {/* Main Educational Application Body */}
      <main className="flex-1 pb-16">
        {/* Onboarding Screen */}
        {currentScreen === 'onboarding' && (
          <Onboarding 
            onComplete={handleOnboardingComplete} 
            beginnerMode={beginnerMode} 
          />
        )}

        {/* Investment Explorer (Discovery) */}
        {currentScreen === 'explorer' && userProfile && (
          <InvestmentExplorer
            userRiskProfile={userProfile.riskProfile}
            onSelectInvestment={handleSelectInvestment}
            beginnerMode={beginnerMode}
          />
        )}

        {/* Understand Before Investing Detail page */}
        {currentScreen === 'understand' && selectedInvestment && userProfile && (
          <UnderstandAsset
            investment={selectedInvestment}
            beginnerMode={beginnerMode}
            onBack={() => setCurrentScreen('explorer')}
            onContinue={() => setCurrentScreen('simulator')}
            onGoToWalkthrough={() => setCurrentScreen('walkthrough')}
          />
        )}

        {/* 5-Step Journey Walkthrough */}
        {currentScreen === 'walkthrough' && (
          <Walkthrough 
            beginnerMode={beginnerMode} 
            onClose={() => setCurrentScreen('explorer')} 
          />
        )}

        {/* Investment Simulator */}
        {currentScreen === 'simulator' && selectedInvestment && userProfile && (
          <Simulator
            investment={selectedInvestment}
            availableBalance={availableBalance}
            beginnerMode={beginnerMode}
            onBack={() => setCurrentScreen('understand')}
            onContinue={(amount) => {
              setInvestmentAmount(amount);
              setCurrentScreen('readiness');
            }}
          />
        )}

        {/* Readiness Checklist Check */}
        {currentScreen === 'readiness' && selectedInvestment && (
          <ReadinessCheck
            investment={selectedInvestment}
            amount={investmentAmount}
            beginnerMode={beginnerMode}
            onBack={() => setCurrentScreen('simulator')}
            onConfirm={handleConfirmInvestment}
          />
        )}

        {/* Portfolio Dashboard */}
        {currentScreen === 'dashboard' && userProfile && (
          <div className="space-y-6">
            {/* Volatility Simulator Control */}
            {portfolio.length > 0 && (
              <div className="max-w-6xl mx-auto px-4 mt-6">
                <div className="p-4 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/15 text-brand-indigo flex flex-col sm:flex-row items-center justify-between gap-4 glow-indigo">
                  <div className="flex items-center gap-2.5 text-center sm:text-left">
                    <Info className="w-5 h-5 text-brand-indigo shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800">Learn Tool: Market Volatility Simulator</h4>
                      <p className="text-xs text-slate-505">
                        Click the button to simulate economic fluctuations. Watch how different risk assets swing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase">
                      Shifts: {marketShiftsCount}
                    </span>
                    <button
                      onClick={handleSimulateMarketShift}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-indigo hover:bg-brand-indigo-dark text-white text-xs font-bold transition-all active:scale-95 shadow-sm shadow-brand-indigo/15 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Simulate Market Fluctuation
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Dashboard
              portfolio={portfolio}
              availableBalance={availableBalance}
              beginnerMode={beginnerMode}
              onSellHolding={handleSellHolding}
              onResetPortfolio={handleResetPortfolio}
            />

            {/* Profile Reset Box */}
            <div className="max-w-6xl mx-auto px-4 text-center">
              <button
                onClick={handleRedoOnboarding}
                className="text-xs font-semibold text-slate-400 hover:text-brand-indigo transition-colors underline cursor-pointer"
              >
                Change Onboarding Answers & Redo Risk Assessment
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Insights */}
        {currentScreen === 'insights' && userProfile && (
          <Insights
            portfolio={portfolio}
            userRiskProfile={userProfile.riskProfile}
            beginnerMode={beginnerMode}
          />
        )}
      </main>

      {/* Modern, minimalist footer */}
      <footer className="py-6 border-t border-slate-100 bg-white text-center text-xs text-slate-400 font-semibold space-y-1">
        <p>© 2026 InvestWise Investment Learning Platform.</p>
        <p className="max-w-md mx-auto text-[10px] leading-relaxed text-slate-400 font-normal px-4">
          Disclaimer: This is a purely educational tool. All capital balances, asset holdings, and market charts are simulated mock data. No real trading activity, deposits, or order executions are supported.
        </p>
      </footer>
    </div>
  );
}

export default App;
