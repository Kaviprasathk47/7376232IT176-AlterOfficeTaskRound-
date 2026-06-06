import { useState } from 'react';
import type { UserProfile, PortfolioItem, Stock } from './types';
import { Navbar } from './components/Navbar';
import { Welcome } from './components/Welcome';
import { UserSetup } from './components/UserSetup';
import { PracticeMode } from './components/PracticeMode';
import { Dashboard } from './components/Dashboard';
import { StockExplorer } from './components/StockExplorer';
import { StockDetail } from './components/StockDetail';
import { InvestmentConfirmation } from './components/InvestmentConfirmation';
import { Insights } from './components/Insights';
import { Play, Info } from 'lucide-react';

function App() {
  // Initialize state from LocalStorage
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('investwise_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [isJourneyDone, setIsJourneyDone] = useState<boolean>(() => {
    return localStorage.getItem('investwise_journey_completed') === 'true';
  });

  const [currentScreen, setCurrentScreen] = useState<string>(() => {
    const saved = localStorage.getItem('investwise_profile');
    const journeyCompleted = localStorage.getItem('investwise_journey_completed') === 'true';
    if (saved) {
      const parsed = JSON.parse(saved) as UserProfile;
      if (parsed.simulationCompleted || journeyCompleted) {
        return 'dashboard';
      }
      return 'practice';
    }
    return 'welcome';
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('investwise_portfolio');
    return saved ? JSON.parse(saved) : [];
  });

  const [availableBalance, setAvailableBalance] = useState<number>(() => {
    const savedProfile = localStorage.getItem('investwise_profile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile) as UserProfile;
      const savedPortfolio = localStorage.getItem('investwise_portfolio');
      const holdings = savedPortfolio ? (JSON.parse(savedPortfolio) as PortfolioItem[]) : [];
      const totalInvested = holdings.reduce((sum, item) => sum + item.amountInvested, 0);
      return parsedProfile.savingsAmount - totalInvested;
    }
    return 10000;
  });

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [marketShiftsCount, setMarketShiftsCount] = useState<number>(0);
  const [beginnerMode, setBeginnerMode] = useState<boolean>(true); // Default to true for target age range

  const handleUserSetupComplete = (profile: UserProfile, startPractice: boolean) => {
    // profile has simulationCompleted = false initially
    const initialProfile = { ...profile, simulationCompleted: !startPractice };
    setUserProfile(initialProfile);
    localStorage.setItem('investwise_profile', JSON.stringify(initialProfile));
    
    // Reset balance to the savingsAmount chosen
    setAvailableBalance(profile.savingsAmount);
    setPortfolio([]);
    localStorage.setItem('investwise_portfolio', JSON.stringify([]));

    if (startPractice) {
      setCurrentScreen('practice');
    } else {
      // Skipped simulation: mark profile and journey completed
      const updatedProfile = { ...initialProfile, simulationCompleted: true };
      setUserProfile(updatedProfile);
      localStorage.setItem('investwise_profile', JSON.stringify(updatedProfile));
      localStorage.setItem('investwise_journey_completed', 'true');
      setIsJourneyDone(true);
      setCurrentScreen('dashboard');
    }
  };

  const handlePracticeComplete = () => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, simulationCompleted: true };
      setUserProfile(updatedProfile);
      localStorage.setItem('investwise_profile', JSON.stringify(updatedProfile));
    }
    localStorage.setItem('investwise_journey_completed', 'true');
    setIsJourneyDone(true);
    setCurrentScreen('dashboard');
  };

  const handleSelectStock = (stock: Stock) => {
    setSelectedStock(stock);
    setCurrentScreen('detail');
  };

  const handleProceedToConfirmation = (amount: number) => {
    setInvestmentAmount(amount);
    setCurrentScreen('confirmation');
  };

  const handleConfirmInvestment = () => {
    if (!selectedStock || investmentAmount <= 0) return;

    // Add new asset purchase to mock portfolio
    const newHolding: PortfolioItem = {
      id: `${selectedStock.id}-${Date.now()}`,
      stockId: selectedStock.id,
      stockName: selectedStock.name,
      amountInvested: investmentAmount,
      riskLevel: selectedStock.riskLevel,
      purchaseDate: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      mockPerformance: 0,
    };

    const updatedPortfolio = [...portfolio, newHolding];
    const newBalance = availableBalance - investmentAmount;

    setPortfolio(updatedPortfolio);
    setAvailableBalance(newBalance);
    localStorage.setItem('investwise_portfolio', JSON.stringify(updatedPortfolio));
    
    // Clear temporary states
    setSelectedStock(null);
    setInvestmentAmount(0);
    setCurrentScreen('dashboard');
  };

  const handleSellHolding = (holdingId: string) => {
    const holding = portfolio.find((item) => item.id === holdingId);
    if (!holding) return;

    // Calculate current simulated value
    const realizedValue = holding.amountInvested * (1 + holding.mockPerformance / 100);
    const updatedPortfolio = portfolio.filter((item) => item.id !== holdingId);
    const newBalance = availableBalance + realizedValue;

    setPortfolio(updatedPortfolio);
    setAvailableBalance(newBalance);
    localStorage.setItem('investwise_portfolio', JSON.stringify(updatedPortfolio));
  };

  const handleResetPortfolio = () => {
    setPortfolio([]);
    const initialSavings = userProfile ? userProfile.savingsAmount : 10000;
    setAvailableBalance(initialSavings);
    setMarketShiftsCount(0);
    localStorage.setItem('investwise_portfolio', JSON.stringify([]));
    setCurrentScreen('explorer');
  };

  const handleRedoOnboarding = () => {
    localStorage.removeItem('investwise_profile');
    localStorage.removeItem('investwise_portfolio');
    localStorage.removeItem('investwise_journey_completed');
    setUserProfile(null);
    setPortfolio([]);
    setAvailableBalance(10000);
    setMarketShiftsCount(0);
    setIsJourneyDone(false);
    setCurrentScreen('welcome');
  };

  // Educational Tool: Simulate market fluctuations
  const handleSimulateMarketShift = () => {
    const updated = portfolio.map((item) => {
      let maxChange = 1.5; // low risk conservative bonds
      if (item.riskLevel === 'Moderate') maxChange = 5;
      if (item.riskLevel === 'Aggressive') {
        maxChange = item.stockId === 'zomato' || item.stockId === 'tata-motors' ? 18 : 12;
      }

      const shift = (Math.random() * 2 - 1) * maxChange;
      let newPerformance = item.mockPerformance + shift;

      // Caps to simulate absolute extremes
      newPerformance = Math.max(-80, Math.min(newPerformance, 120));

      return {
        ...item,
        mockPerformance: newPerformance,
      };
    });

    setPortfolio(updated);
    localStorage.setItem('investwise_portfolio', JSON.stringify(updated));
    setMarketShiftsCount((prev) => prev + 1);
  };

  const portfolioCurrentValue = portfolio.reduce((sum, item) => {
    const multiplier = 1 + (item.mockPerformance / 100);
    return sum + (item.amountInvested * multiplier);
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Dynamic Header Navbar */}
      <Navbar
        currentScreen={currentScreen}
        userProfile={userProfile}
        availableBalance={availableBalance}
        beginnerMode={beginnerMode}
        onToggleBeginnerMode={() => setBeginnerMode(!beginnerMode)}
        onNavigate={(screen) => {
          if (!userProfile) return;
          setCurrentScreen(screen);
        }}
      />

      {/* Main Educational Application Body */}
      <main className="flex-1 pb-16">
        {/* Welcome Screen (Page 1) */}
        {currentScreen === 'welcome' && (
          <Welcome onStart={() => setCurrentScreen('setup')} />
        )}

        {/* User Setup Profile Screen (Page 2) */}
        {currentScreen === 'setup' && (
          <UserSetup onComplete={handleUserSetupComplete} />
        )}

        {/* Volatility Simulation Practice Mode (Page 7) */}
        {currentScreen === 'practice' && userProfile && (
          <PracticeMode
            savingsAmount={userProfile.savingsAmount}
            onComplete={handlePracticeComplete}
            beginnerMode={beginnerMode}
          />
        )}

        {/* Portfolio Dashboard (Page 3) */}
        {currentScreen === 'dashboard' && userProfile && (
          <div className="space-y-6">
            {/* Volatility Simulator Control */}
            {portfolio.length > 0 && (
              <div className="max-w-3xl mx-auto px-4 mt-6">
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
              userProfile={userProfile}
              beginnerMode={beginnerMode}
              onSellHolding={handleSellHolding}
              onResetPortfolio={handleResetPortfolio}
              onNavigate={(screen) => setCurrentScreen(screen)}
            />

            {/* Profile Reset Box */}
            <div className="max-w-3xl mx-auto px-4 text-center">
              <button
                onClick={handleRedoOnboarding}
                className="text-xs font-semibold text-slate-400 hover:text-brand-indigo transition-colors underline cursor-pointer"
              >
                Change Onboarding Answers & Redo Risk Assessment
              </button>
            </div>
          </div>
        )}

        {/* Investment Explorer (Page 4) */}
        {currentScreen === 'explorer' && userProfile && (
          <StockExplorer
            onSelectStock={handleSelectStock}
            beginnerMode={beginnerMode}
          />
        )}

        {/* Stock Detail View (Page 5) */}
        {currentScreen === 'detail' && selectedStock && userProfile && (
          <StockDetail
            stock={selectedStock}
            availableBalance={availableBalance}
            beginnerMode={beginnerMode}
            onBack={() => setCurrentScreen('explorer')}
            onProceed={handleProceedToConfirmation}
          />
        )}

        {/* Investment Confirmation (Page 6) */}
        {currentScreen === 'confirmation' && selectedStock && userProfile && (
          <InvestmentConfirmation
            stock={selectedStock}
            amount={investmentAmount}
            availableBalance={availableBalance}
            portfolioCurrentValue={portfolioCurrentValue}
            beginnerMode={beginnerMode}
            onBack={() => setCurrentScreen('detail')}
            onConfirm={handleConfirmInvestment}
          />
        )}

        {/* Portfolio Coach Insights */}
        {currentScreen === 'insights' && userProfile && (
          <Insights
            portfolio={portfolio}
            userRiskProfile={userProfile.goal === 'Learn Investing' ? 'Conservative' : userProfile.goal === 'Wealth Growth' ? 'Aggressive' : 'Moderate'}
            beginnerMode={beginnerMode}
            onNavigateToExplore={() => setCurrentScreen('explorer')}
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
