import type { InvestmentOption } from '../types';

export const mockOptions: InvestmentOption[] = [
  {
    id: 'government-bond',
    name: 'Government Bond',
    risk: 'Very Low',
    gainMin: 5,
    gainMax: 7,
    lossMin: 1,
    lossMax: 3,
    holdingPeriod: '1–3 Years',
    recommendedFor: 'Recommended for investors prioritizing capital preservation.',
    description: 'A debt security issued by the government to support state spending, carrying sovereign backing.',
    whyChoose: 'High safety of principal, regular fixed returns, and minimal risk of capital loss.'
  },
  {
    id: 'index-fund',
    name: 'Index Fund',
    risk: 'Low',
    gainMin: 8,
    gainMax: 12,
    lossMin: 2,
    lossMax: 5,
    holdingPeriod: '3–5 Years',
    recommendedFor: 'Recommended for first-time investors seeking lower risk.',
    description: 'A diversified fund that tracks a market index, like the Nifty 50, automatically investing in the top companies in India.',
    whyChoose: 'Broad diversification and steady, market-average growth with lower overall volatility.'
  },
  {
    id: 'technology-fund',
    name: 'Technology Fund',
    risk: 'Medium',
    gainMin: 12,
    gainMax: 18,
    lossMin: 5,
    lossMax: 15,
    holdingPeriod: '5+ Years',
    recommendedFor: 'Recommended for investors comfortable with larger fluctuations.',
    description: 'A collection of technology-focused companies combined into a single investment.',
    whyChoose: 'Potential for higher long-term growth driven by technological innovation and market expansion.'
  }
];
