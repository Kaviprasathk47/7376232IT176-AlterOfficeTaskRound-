import type { Investment } from '../types';

export const mockInvestments: Investment[] = [
  {
    id: 'gov-bonds',
    name: 'Government Bonds',
    riskLevel: 'Conservative',
    returnMin: 3,
    returnMax: 5,
    lossMin: 0,
    lossMax: 1.5,
    description: 'Loans to the government. Extremely safe, but growth is slower and might not beat inflation.',
    longDescription: 'Government Bond Funds pool money to buy debt securities issued by stable governments. Because governments rarely fail to pay their debts, these are some of the safest investments available. However, because they are so safe, they pay low interest rates. In years with high inflation, your purchasing power might actually decrease even though you did not lose your principal.',
    category: 'Fixed Income',
    assetType: 'Bonds',
    whatIsIt: 'Government bonds are like loans you make to a country\'s government. In return, the government promises to pay you a fixed rate of interest over a set period and return your original cash at the end.',
    whyInvest: 'People invest in government bonds to protect their savings from stock market volatility and to receive a reliable, predictable stream of interest payments.',
    riskExplanation: 'While stable governments rarely fail to pay back debt, the main threat is Inflation Risk. If inflation rises higher than your interest rate, your money loses purchasing power over time.',
    suitableInvestor: 'Best for conservative savers, first-time investors who prioritize safety over high returns, or people who will need their money back soon.',
    advantages: [
      'Extremely safe with near-zero chance of losing your original money.',
      'Guaranteed, reliable interest payments.',
      'Protects your cash during stock market recessions and volatility.'
    ],
    disadvantages: [
      'Very low returns that may fail to beat rising prices of goods (inflation).',
      'Lower potential for exponential growth over long periods.',
      'Locked up for fixed periods unless sold early, which can carry minor fees.'
    ]
  },
  {
    id: 'index-fund',
    name: 'Index Funds',
    riskLevel: 'Moderate',
    returnMin: 6,
    returnMax: 11,
    lossMin: 5,
    lossMax: 18,
    description: 'Invests in the top 500 largest US companies. Matches overall market growth with moderate volatility.',
    longDescription: 'An Index Fund tracks a market index like the S&P 500, spreading your money across hundreds of established public corporations (like Apple, Microsoft, and Amazon). This diversification means you are not reliant on a single company. While index funds have historically grown over long periods, they will drop when the general economy experiences recessions, commonly losing 10% to 20% in bad years.',
    category: 'Equities',
    assetType: 'Stocks',
    whatIsIt: 'An Index Fund pools money from many investors to buy stocks in a large predefined list of companies—in this case, the top 500 largest public corporations in the US (like Apple, Google, and Nvidia).',
    whyInvest: 'It allows you to own a small slice of hundreds of successful companies simultaneously, meaning you don\'t have to gamble on picking individual stock winners.',
    riskExplanation: 'While diversified, index funds move with the general economy. If the stock market drops during a recession, the value of your index fund will drop along with it, leading to temporary losses.',
    suitableInvestor: 'Suitable for moderate investors who want steady growth over 5+ years and are comfortable with moderate, temporary ups and downs.',
    advantages: [
      'Spreads risk across hundreds of major companies automatically (diversification).',
      'Historically beats inflation and generates solid wealth over long periods.',
      'Extremely low management fees compared to actively managed funds.'
    ],
    disadvantages: [
      'Your balance will drop during general market recessions (economic risk).',
      'Cannot beat the market averages—you only match it.',
      'Not designed for quick, short-term profits.'
    ]
  },
  {
    id: 'tech-fund',
    name: 'Technology Funds',
    riskLevel: 'Aggressive',
    returnMin: 10,
    returnMax: 24,
    lossMin: 15,
    lossMax: 42,
    description: 'Invests in high-growth companies (AI, cloud, tech). High profit potential but prone to sharp drops.',
    longDescription: 'Technology Growth Funds focus on fast-growing companies in sectors like AI, software, and semiconductor chips. These companies reinvest their profits rather than paying dividends, driving high capital appreciation during market booms. However, tech stocks are highly volatile, highly valued, and sensitive to economic trends, regulatory changes, and shifts in interest rates, which can trigger quick, severe sell-offs.',
    category: 'Growth Sector',
    assetType: 'Stocks',
    whatIsIt: 'A Technology Fund is a collection of stocks focused exclusively on fast-growing tech industries, including Artificial Intelligence, software development, cloud computing, and hardware manufacturers.',
    whyInvest: 'Investors seek higher returns by investing in the fastest-growing and most innovative sector of the modern global economy.',
    riskExplanation: 'Tech stocks are highly sensitive to investor sentiment, changes in government interest rates, and regulatory laws, which can trigger sudden, sharp sell-offs.',
    suitableInvestor: 'Best for aggressive investors with a long time horizon (10+ years) who can tolerate seeing their balance drop during tech corrections.',
    advantages: [
      'Access to rapid, high-growth potential from sector leaders.',
      'Exposure to ground-breaking technologies like AI and blockchain.',
      'Reinvests earnings to fuel fast expansion rather than paying small dividends.'
    ],
    disadvantages: [
      'High volatility with frequent, sudden drops in value.',
      'Vulnerable to specific tech sector crashes (like the dot-com bubble).',
      'Stocks are often priced very high relative to their actual current earnings.'
    ]
  },
  {
    id: 'growth-stocks',
    name: 'Growth Stocks',
    riskLevel: 'Aggressive',
    returnMin: 12,
    returnMax: 38,
    lossMin: 25,
    lossMax: 65,
    description: 'Individual high-growth company shares. Outsized profit potential, but extreme risk of losing capital.',
    longDescription: 'Growth stocks represent ownership in individual companies that are expected to grow their sales and profits much faster than the average business. While successful growth stocks can double or triple in value, individual businesses face high failure rates, product failures, or competitive disruption, meaning you can lose a significant portion of your investment if the company falters.',
    category: 'Individual Equities',
    assetType: 'Stocks',
    whatIsIt: 'Buying individual growth stocks means purchasing shares in specific companies that are expanding sales and profits at a rapid rate (such as early-stage electric vehicle makers or biotech firms).',
    whyInvest: 'Investors hope to buy the next big corporate giant early, aiming to multiply their initial money several times over.',
    riskExplanation: 'Because you are investing in a single business rather than a diversified group, you face extreme Concentration Risk. If that specific company fails, your investment can vanish.',
    suitableInvestor: 'Only suitable for aggressive, risk-tolerant individuals who have extra cash they are comfortable losing entirely in search of high returns.',
    advantages: [
      'Outsized, unlimited profit potential if the chosen company succeeds.',
      'Direct ownership of disruptive, exciting businesses you believe in.',
      'Highly liquid; can be sold in seconds on the stock exchange.'
    ],
    disadvantages: [
      'Extreme concentration risk; no safety net of other stocks.',
      'High failure rates; many hyped companies crash and never recover.',
      'High volatility driven by market rumors, quarterly earnings reports, and news.'
    ]
  }
];
