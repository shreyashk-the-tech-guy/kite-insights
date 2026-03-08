/**
 * Tax Optimizer Agent — calculates Indian capital gains tax,
 * suggests tax-loss harvesting, and recommends 80C/80D deductions.
 */

export interface Holding {
  symbol: string;
  buyPrice: number;
  currentPrice: number;
  quantity: number;
  buyDate: string; // ISO date
  sector: string;
}

export interface TaxBreakdown {
  totalInvested: number;
  currentValue: number;
  totalGain: number;
  stcgAmount: number;
  ltcgAmount: number;
  stcgTax: number;
  ltcgTax: number;
  totalTax: number;
  effectiveTaxRate: number;
}

export interface HarvestingSuggestion {
  symbol: string;
  loss: number;
  potentialSaving: number;
  action: string;
}

export interface DeductionSuggestion {
  section: string;
  description: string;
  maxLimit: number;
  relevance: string;
}

export interface TaxOptimizationResult {
  holdings: HoldingAnalysis[];
  breakdown: TaxBreakdown;
  harvesting: HarvestingSuggestion[];
  deductions: DeductionSuggestion[];
  aiAdvice: string;
}

export interface HoldingAnalysis {
  symbol: string;
  buyPrice: number;
  currentPrice: number;
  quantity: number;
  investedValue: number;
  currentValue: number;
  gain: number;
  gainPercent: number;
  holdingPeriod: number; // months
  isLongTerm: boolean;
  taxCategory: "STCG" | "LTCG";
}

const STCG_RATE = 0.15; // 15% for equity
const LTCG_RATE = 0.10; // 10% above ₹1L exemption
const LTCG_EXEMPTION = 100000;

function monthsBetween(d1: Date, d2: Date): number {
  return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
}

const SAMPLE_HOLDINGS: Holding[] = [
  { symbol: "RELIANCE", buyPrice: 2400, currentPrice: 2850, quantity: 20, buyDate: "2023-06-15", sector: "Oil & Gas" },
  { symbol: "TCS", buyPrice: 3500, currentPrice: 3920, quantity: 10, buyDate: "2024-08-10", sector: "IT" },
  { symbol: "INFY", buyPrice: 1650, currentPrice: 1580, quantity: 30, buyDate: "2024-11-20", sector: "IT" },
  { symbol: "HDFCBANK", buyPrice: 1550, currentPrice: 1620, quantity: 25, buyDate: "2023-03-01", sector: "Banking" },
  { symbol: "TATAMOTORS", buyPrice: 850, currentPrice: 720, quantity: 40, buyDate: "2024-09-05", sector: "Auto" },
  { symbol: "ITC", buyPrice: 380, currentPrice: 445, quantity: 50, buyDate: "2023-01-10", sector: "FMCG" },
  { symbol: "SBIN", buyPrice: 590, currentPrice: 625, quantity: 35, buyDate: "2025-01-15", sector: "Banking" },
];

export function runTaxOptimization(holdings?: Holding[]): TaxOptimizationResult {
  const portfolio = holdings || SAMPLE_HOLDINGS;
  const now = new Date();

  const analyzed: HoldingAnalysis[] = portfolio.map(h => {
    const months = monthsBetween(new Date(h.buyDate), now);
    const isLongTerm = months >= 12;
    const investedValue = h.buyPrice * h.quantity;
    const currentValue = h.currentPrice * h.quantity;
    const gain = currentValue - investedValue;
    const gainPercent = Math.round((gain / investedValue) * 10000) / 100;

    return {
      symbol: h.symbol,
      buyPrice: h.buyPrice,
      currentPrice: h.currentPrice,
      quantity: h.quantity,
      investedValue,
      currentValue,
      gain,
      gainPercent,
      holdingPeriod: months,
      isLongTerm,
      taxCategory: isLongTerm ? "LTCG" : "STCG",
    };
  });

  // Tax calculation
  const stcgGains = analyzed.filter(h => !h.isLongTerm && h.gain > 0);
  const ltcgGains = analyzed.filter(h => h.isLongTerm && h.gain > 0);

  const stcgAmount = stcgGains.reduce((s, h) => s + h.gain, 0);
  const ltcgAmount = ltcgGains.reduce((s, h) => s + h.gain, 0);

  const stcgTax = Math.round(stcgAmount * STCG_RATE);
  const taxableLtcg = Math.max(0, ltcgAmount - LTCG_EXEMPTION);
  const ltcgTax = Math.round(taxableLtcg * LTCG_RATE);
  const totalTax = stcgTax + ltcgTax;

  const totalInvested = analyzed.reduce((s, h) => s + h.investedValue, 0);
  const currentValue = analyzed.reduce((s, h) => s + h.currentValue, 0);
  const totalGain = currentValue - totalInvested;
  const effectiveTaxRate = totalGain > 0 ? Math.round((totalTax / totalGain) * 10000) / 100 : 0;

  const breakdown: TaxBreakdown = {
    totalInvested, currentValue, totalGain,
    stcgAmount, ltcgAmount, stcgTax, ltcgTax, totalTax, effectiveTaxRate,
  };

  // Tax-loss harvesting suggestions
  const losers = analyzed.filter(h => h.gain < 0);
  const harvesting: HarvestingSuggestion[] = losers.map(h => {
    const loss = Math.abs(h.gain);
    const rate = h.isLongTerm ? LTCG_RATE : STCG_RATE;
    return {
      symbol: h.symbol,
      loss,
      potentialSaving: Math.round(loss * rate),
      action: `Sell ${h.symbol} to book ₹${loss.toLocaleString()} loss and offset ${h.taxCategory} gains`,
    };
  });

  // Deduction suggestions
  const deductions: DeductionSuggestion[] = [
    { section: "80C", description: "ELSS mutual funds, PPF, NPS Tier-I", maxLimit: 150000, relevance: "Invest in ELSS for equity exposure + tax saving" },
    { section: "80CCD(1B)", description: "Additional NPS contribution", maxLimit: 50000, relevance: "Extra ₹50K deduction over 80C limit" },
    { section: "80D", description: "Health insurance premiums", maxLimit: 75000, relevance: "Self + parents health insurance" },
    { section: "80TTA", description: "Interest on savings account", maxLimit: 10000, relevance: "Auto-deduction on savings interest" },
  ];

  // AI advice
  let aiAdvice = "";
  if (harvesting.length > 0 && totalTax > 0) {
    const totalSaving = harvesting.reduce((s, h) => s + h.potentialSaving, 0);
    aiAdvice = `You can save up to ₹${totalSaving.toLocaleString()} by harvesting losses in ${harvesting.map(h => h.symbol).join(", ")}. `;
  }
  if (stcgAmount > 0) {
    aiAdvice += `Consider holding short-term positions for 12+ months to convert ₹${stcgAmount.toLocaleString()} STCG to LTCG (taxed at 10% vs 15%). `;
  }
  if (ltcgAmount > LTCG_EXEMPTION) {
    aiAdvice += `Your LTCG exceeds ₹1L exemption. Consider staggering profit booking across financial years. `;
  }
  if (!aiAdvice) {
    aiAdvice = "Your portfolio is tax-efficient. Continue holding long-term positions for lower tax rates.";
  }
  aiAdvice += "Additionally, maximize Section 80C (₹1.5L) and 80CCD(1B) (₹50K) deductions through ELSS and NPS investments.";

  return { holdings: analyzed, breakdown, harvesting, deductions, aiAdvice };
}
