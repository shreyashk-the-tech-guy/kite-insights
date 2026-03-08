// Mock API layer — simulates the FastAPI + MCP tool layer for demo purposes.
// When the real backend is running, replace fetch calls to use localhost:8000.

interface TechnicalAnalysis {
  rsi: number;
  ma50: number;
  ma200: number;
  trend: "Bullish" | "Bearish" | "Neutral";
  moving_average_signal: string;
}

interface FundamentalAnalysis {
  pe_ratio: number;
  sector_pe: number;
  roe: number;
  valuation: string;
}

export interface StockAnalysis {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  technical_analysis: TechnicalAnalysis;
  fundamental_analysis: FundamentalAnalysis;
  recommendation: string;
}

const stockData: Record<string, { price: number; pe: number; sector_pe: number; roe: number }> = {
  RELIANCE: { price: 2850, pe: 28, sector_pe: 24, roe: 18 },
  TCS: { price: 3920, pe: 32, sector_pe: 28, roe: 40 },
  INFY: { price: 1580, pe: 26, sector_pe: 28, roe: 32 },
  HDFCBANK: { price: 1620, pe: 20, sector_pe: 22, roe: 16 },
  WIPRO: { price: 480, pe: 22, sector_pe: 28, roe: 15 },
  ICICIBANK: { price: 1050, pe: 18, sector_pe: 22, roe: 15 },
  SBIN: { price: 625, pe: 10, sector_pe: 12, roe: 14 },
  TATAMOTORS: { price: 720, pe: 8, sector_pe: 15, roe: 22 },
  BAJFINANCE: { price: 7200, pe: 35, sector_pe: 28, roe: 20 },
  ITC: { price: 445, pe: 25, sector_pe: 30, roe: 28 },
};

function generateTechnicalAnalysis(price: number): TechnicalAnalysis {
  const rsi = Math.round(30 + Math.random() * 50);
  const ma50 = Math.round(price * (0.92 + Math.random() * 0.12));
  const ma200 = Math.round(price * (0.85 + Math.random() * 0.15));
  
  let trend: "Bullish" | "Bearish" | "Neutral";
  if (price > ma50 && rsi > 45) trend = "Bullish";
  else if (price < ma50 && rsi < 45) trend = "Bearish";
  else trend = "Neutral";

  const moving_average_signal = price > ma50 ? "Above 50 MA" : "Below 50 MA";

  return { rsi, ma50, ma200, trend, moving_average_signal };
}

function generateFundamentalAnalysis(pe: number, sector_pe: number, roe: number): FundamentalAnalysis {
  let valuation: string;
  const diff = pe - sector_pe;
  if (diff > 5) valuation = "Overvalued";
  else if (diff > 0) valuation = "Slightly Overvalued";
  else if (diff > -3) valuation = "Fairly Valued";
  else valuation = "Undervalued";

  return { pe_ratio: pe, sector_pe, roe, valuation };
}

function generateRecommendation(tech: TechnicalAnalysis, fund: FundamentalAnalysis): string {
  if (tech.trend === "Bullish" && (fund.valuation === "Fairly Valued" || fund.valuation === "Undervalued")) {
    return "Strong Buy — Bullish momentum with attractive valuation. Good entry point for medium-term investors.";
  }
  if (tech.trend === "Bullish" && fund.valuation === "Slightly Overvalued") {
    return "Hold — Stock showing bullish momentum but trading slightly above sector valuation. Wait for dips.";
  }
  if (tech.trend === "Bullish" && fund.valuation === "Overvalued") {
    return "Caution — Strong price action but expensive valuation. Consider partial profit booking.";
  }
  if (tech.trend === "Bearish") {
    return "Avoid — Bearish trend detected. Wait for reversal signals before entering.";
  }
  return "Neutral — No strong directional signal. Monitor for breakout or breakdown.";
}

export async function analyzeStock(symbol: string): Promise<StockAnalysis> {
  // Simulate API latency
  await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

  const upper = symbol.toUpperCase();
  const data = stockData[upper];
  if (!data) {
    throw new Error(`Stock "${upper}" not found. Try: ${Object.keys(stockData).join(", ")}`);
  }

  const priceVariation = data.price * (0.97 + Math.random() * 0.06);
  const price = Math.round(priceVariation);
  const change = Math.round((price - data.price) * 100) / 100;
  const changePercent = Math.round((change / data.price) * 10000) / 100;

  const technical_analysis = generateTechnicalAnalysis(price);
  const fundamental_analysis = generateFundamentalAnalysis(data.pe, data.sector_pe, data.roe);
  const recommendation = generateRecommendation(technical_analysis, fundamental_analysis);

  return { symbol: upper, price, change, changePercent, technical_analysis, fundamental_analysis, recommendation };
}

export const availableStocks = Object.keys(stockData);
