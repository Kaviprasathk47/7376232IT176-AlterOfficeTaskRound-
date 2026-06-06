export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export type InvestmentGoal = 'Learn Investing' | 'Wealth Growth' | 'Long-Term Savings';

export interface UserProfile {
  savingsAmount: number;
  goal: InvestmentGoal;
  simulationCompleted: boolean;
}

export interface Stock {
  id: string;
  name: string;
  price: number;
  change: number; // Daily change %
  riskLevel: RiskProfile;
  minInvestment: number;
  returnMin: number;
  returnMax: number;
  lossMin: number;
  lossMax: number;
  holdingPeriod: string;
  description: string;
  whyInvest: string;
  keyRisks: string;
}

export interface PortfolioItem {
  id: string;
  stockId: string;
  stockName: string;
  amountInvested: number;
  riskLevel: RiskProfile;
  purchaseDate: string;
  mockPerformance: number; // simulated % gain or loss
}
