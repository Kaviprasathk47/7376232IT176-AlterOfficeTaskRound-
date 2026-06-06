export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export type InvestmentGoal = 'Learn' | 'Save Money' | 'Grow Wealth';

export interface UserProfile {
  isFirstTime: boolean;
  goal: InvestmentGoal;
  monthlyAmount: number;
  riskProfile: RiskProfile;
}

export type AssetType = 'Bonds' | 'Stocks' | 'Alternative' | 'Mixed';

export interface Investment {
  id: string;
  name: string;
  riskLevel: RiskProfile;
  returnMin: number; // percentage, e.g. 3 for 3%
  returnMax: number; // percentage, e.g. 5 for 5%
  lossMin: number; // percentage of maximum potential loss, e.g. 0
  lossMax: number; // percentage of maximum potential loss, e.g. 1
  description: string;
  longDescription: string;
  category: string;
  assetType: AssetType;

  // New V2 Educational Fields for Page 3
  whatIsIt: string;
  whyInvest: string;
  riskExplanation: string;
  suitableInvestor: string;
  advantages: string[];
  disadvantages: string[];
}

export interface PortfolioItem {
  id: string; // unique instance ID
  investmentId: string;
  investmentName: string;
  amountInvested: number;
  riskLevel: RiskProfile;
  purchaseDate: string;
  mockPerformance: number; // current simulated % gain or loss, e.g., +2.4 or -12.5
}
