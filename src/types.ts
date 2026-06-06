export type RiskProfile = 'Conservative' | 'Moderate' | 'Aggressive';

export type ExperienceChoice = 'I want to learn investing' | 'I want to start investing' | 'I know the basics';

export interface UserProfile {
  experienceType: ExperienceChoice;
  riskProfile: RiskProfile;
}

export type AssetType = 'Bonds' | 'Stocks' | 'Alternative' | 'Mixed';

export interface Investment {
  id: string;
  name: string;
  riskLevel: RiskProfile;
  returnMin: number;
  returnMax: number;
  lossMin: number;
  lossMax: number;
  description: string;
  longDescription: string;
  category: string;
  assetType: AssetType;

  // Educational Fields for V3 Detail Page
  whatIsIt: string;
  whyInvest: string;
  potentialBenefits: string;
  potentialRisks: string;
  expectedBehavior: string;
}

export interface PortfolioItem {
  id: string;
  investmentId: string;
  investmentName: string;
  amountInvested: number;
  riskLevel: RiskProfile;
  purchaseDate: string;
  mockPerformance: number; // simulated % gain or loss
}
