import React from 'react';
import type { UserProfile } from '../types';
import { Compass, LayoutDashboard, BrainCircuit, Shield, HelpCircle, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentScreen: string;
  userProfile: UserProfile | null;
  availableBalance: number;
  beginnerMode: boolean;
  onToggleBeginnerMode: () => void;
  onNavigate: (screen: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  userProfile,
  availableBalance,
  beginnerMode,
  onToggleBeginnerMode,
  onNavigate,
}) => {
  const isJourneyDone = localStorage.getItem('investwise_journey_completed') === 'true';
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => userProfile && onNavigate('explorer')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="p-2 bg-brand-indigo/10 text-brand-indigo rounded-xl group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-black text-lg text-slate-900 tracking-tight">
            Invest<span className="text-brand-indigo">Wise</span>
          </span>
        </div>

        {/* Tab Navigation (only active if user completed onboarding) */}
        {userProfile && (
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-150 rounded-xl p-1 text-xs">
            <button
              onClick={() => onNavigate('explorer')}
              className={`flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                currentScreen === 'explorer' || currentScreen === 'understand' || currentScreen === 'simulator' || currentScreen === 'readiness'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Explore
            </button>
            {!isJourneyDone && (
              <button
                onClick={() => onNavigate('walkthrough')}
                className={`flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                  currentScreen === 'walkthrough'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Journey Guide
              </button>
            )}
            {isJourneyDone && (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                    currentScreen === 'dashboard'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('insights')}
                  className={`flex items-center gap-1.5 px-3 py-2 font-bold rounded-lg transition-all cursor-pointer ${
                    currentScreen === 'insights'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  Coach Insights
                </button>
              </>
            )}
          </nav>
        )}

        {/* Right Info: Beginner Toggle + Balance */}
        <div className="flex items-center gap-3">
          {/* Beginner Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-xl px-2.5 py-1.5">
            <span className="text-[10px] font-black text-slate-500 uppercase select-none hidden sm:inline">
              Beginner Mode
            </span>
            <button
              onClick={onToggleBeginnerMode}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer focus:outline-none ${
                beginnerMode ? 'bg-brand-indigo' : 'bg-slate-300'
              }`}
              title="Toggle additional inline definitions and guide cards"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                  beginnerMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {userProfile ? (
            <div className="text-right shrink-0">
              <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest leading-none">
                Practice Cash
              </span>
              <span className="text-sm font-black text-slate-800">
                ₹{availableBalance.toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-400 font-extrabold uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              Education Mode
            </div>
          )}
        </div>
      </div>

      {/* Mobile Tab Navigation */}
      {userProfile && (
        <div className="md:hidden flex border-t border-slate-100 bg-white text-[10px] font-bold">
          <button
            onClick={() => onNavigate('explorer')}
            className={`flex-1 py-3 flex flex-col items-center gap-0.5 cursor-pointer ${
              currentScreen === 'explorer' || currentScreen === 'understand' || currentScreen === 'simulator' || currentScreen === 'readiness'
                ? 'text-brand-indigo'
                : 'text-slate-400'
            }`}
          >
            <Compass className="w-4 h-4" />
            Explore
          </button>
          {!isJourneyDone && (
            <button
              onClick={() => onNavigate('walkthrough')}
              className={`flex-1 py-3 flex flex-col items-center gap-0.5 cursor-pointer ${
                currentScreen === 'walkthrough' ? 'text-brand-indigo' : 'text-slate-400'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Guide
            </button>
          )}
          {isJourneyDone && (
            <>
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex-1 py-3 flex flex-col items-center gap-0.5 cursor-pointer ${
                  currentScreen === 'dashboard' ? 'text-brand-indigo' : 'text-slate-400'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('insights')}
                className={`flex-1 py-3 flex flex-col items-center gap-0.5 cursor-pointer ${
                  currentScreen === 'insights' ? 'text-brand-indigo' : 'text-slate-400'
                }`}
              >
                <BrainCircuit className="w-4 h-4" />
                Insights
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
export default Navbar;
