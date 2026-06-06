export type RiskProfile = 'Very Low' | 'Low' | 'Medium';

export interface InvestmentOption {
  id: string;
  name: string;
  risk: RiskProfile;
  gainMin: number;
  gainMax: number;
  lossMin: number;
  lossMax: number;
  holdingPeriod: string;
  description: string;
  whyChoose: string;
  recommendedFor: string;
}

export interface UserProfile {
  savingsAmount: number;
  selectedOptionId?: string;
  investedAmount?: number;
}
