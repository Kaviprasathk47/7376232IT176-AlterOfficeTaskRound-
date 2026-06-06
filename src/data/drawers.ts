export interface TermExplanation {
  title: string;
  definition: string;
  whyItMatters: string;
  example: string;
}

export const termDefinitions: Record<string, TermExplanation> = {
  'Risk Level': {
    title: 'What is Risk?',
    definition: 'Risk describes how much an investment\'s value can rise or fall over time. Higher risk offers higher reward potential but introduces a higher chance of permanent loss.',
    whyItMatters: 'Knowing your risk limits stops you from panic-selling if your balance declines during a normal market downturn.',
    example: 'A ₹1,000 conservative investment might change slightly to ₹1,030 or ₹980. An aggressive ₹1,000 investment could surge to ₹1,500 or crash to ₹500.'
  },
  'Return Potential': {
    title: 'What is Return Potential?',
    definition: 'Return Potential is the estimated range of growth (profit) your investment might generate per year, based on historical market trends.',
    whyItMatters: 'It helps you project how your savings might compound over years. Returns are never guaranteed, especially in stocks.',
    example: 'An Index Fund with a 10% average return means a ₹1,000 investment could grow to ₹1,100 in a typical year, though some years it might lose value.'
  },
  'Portfolio': {
    title: 'What is a Portfolio?',
    definition: 'A portfolio is simply the total collection of all your financial investments and cash balances grouped together in one account.',
    whyItMatters: 'You should evaluate your overall portfolio return and risk, rather than worrying about any single investment going up or down.',
    example: 'If you hold ₹5,000 in bonds, ₹3,000 in index funds, and ₹2,000 in cash, your total portfolio value is ₹10,000, split across 3 different baskets.'
  },
  'Diversification': {
    title: 'What is Diversification?',
    definition: 'Diversification means spreading your money across different investments instead of putting all your cash into one asset.',
    whyItMatters: 'It acts as insurance. If one company fails or one sector crashes, your other holdings cushion the fall.',
    example: 'If you invest ₹1,000 in one company and it goes bankrupt, you lose ₹1,000. If you invest ₹1,000 across a 500-company Index Fund, one bankruptcy has almost zero impact.'
  },
  'Index Fund': {
    title: 'What is an Index Fund?',
    definition: 'An Index Fund tracks a stock market index—like the S&P 500. It bundles shares of hundreds of established companies together in a single basket.',
    whyItMatters: 'It allows you to own a slice of the general economy easily, without needing to select or research individual company winners.',
    example: 'Instead of choosing whether Apple or Nvidia will grow faster, you buy an Index Fund that automatically owns both, plus 498 other giants.'
  },
  'Growth Stock': {
    title: 'What is a Growth Stock?',
    definition: 'A growth stock is a share of ownership in an individual company expected to expand its sales and earnings much faster than average businesses.',
    whyItMatters: 'They offer high upside during market booms but carry heavy downside risks since they have no track record of stable payouts.',
    example: 'Buying shares of an early-stage electric vehicle or biotech firm. If they succeed, your money multiplies; if they run out of cash, it goes to zero.'
  },
  'Volatility': {
    title: 'What is Volatility?',
    definition: 'Volatility measures how fast and how drastically an asset\'s price swings up and down over short cycles.',
    whyItMatters: 'High volatility means your balance rides a roller-coaster, which can trigger stress. Low volatility is a slow, steady climb.',
    example: 'Bonds change by less than 1% weekly. Technology stocks are highly volatile and can surge or plunge 15% in a single week.'
  },
  'Bonds': {
    title: 'What are Government Bonds?',
    definition: 'A bond is a loan you make to a government. In return, they promise to pay you back at a specific date, plus regular interest.',
    whyItMatters: 'Bonds act as a defensive shield in your portfolio. They are highly secure and preserve your cash during stock crashes.',
    example: 'Lending ₹1,000 to the government at a 4% yearly interest rate guarantees you get ₹1,040 at the end of the year.'
  },
  'Inflation Risk': {
    title: 'What is Inflation Risk?',
    definition: 'Inflation risk is the danger that general store prices rise faster than your savings grow, reducing your money\'s buying power.',
    whyItMatters: 'Keeping all your money in cash or low-interest savings accounts protects nominal value but loses real value over long horizons.',
    example: 'If a grocery basket costing ₹1,000 today rises to ₹1,050 next year due to inflation, you need at least a 5% return to buy the same food.'
  }
};
