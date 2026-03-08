import { TrendingUp, TrendingDown, Minus, BarChart3, PieChart, Brain } from "lucide-react";
import type { StockAnalysis } from "@/lib/mockApi";

interface Props {
  data: StockAnalysis;
}

const TrendBadge = ({ trend }: { trend: string }) => {
  if (trend === "Bullish") return <span className="badge-bullish">● Bullish</span>;
  if (trend === "Bearish") return <span className="badge-bearish">● Bearish</span>;
  return <span className="badge-neutral">● Neutral</span>;
};

const ValuationBadge = ({ valuation }: { valuation: string }) => {
  if (valuation.includes("Under") || valuation === "Fairly Valued")
    return <span className="badge-bullish">{valuation}</span>;
  if (valuation.includes("Over"))
    return <span className="badge-bearish">{valuation}</span>;
  return <span className="badge-neutral">{valuation}</span>;
};

const RsiGauge = ({ rsi }: { rsi: number }) => {
  const color = rsi > 70 ? "text-bearish" : rsi < 30 ? "text-bullish" : "text-foreground";
  const label = rsi > 70 ? "Overbought" : rsi < 30 ? "Oversold" : "Normal";
  const pct = (rsi / 100) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">RSI</span>
        <span className={`font-mono font-medium ${color}`}>{rsi} — {label}</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: rsi > 70
              ? "hsl(var(--bearish))"
              : rsi < 30
              ? "hsl(var(--bullish))"
              : "hsl(var(--primary))",
          }}
        />
      </div>
    </div>
  );
};

const AnalysisResult = ({ data }: Props) => {
  const isPositive = data.change >= 0;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="analysis-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-foreground">{data.symbol}</h2>
          <p className="text-muted-foreground text-sm mt-1">NSE · Indian Equity</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-bold text-foreground">₹{data.price.toLocaleString()}</p>
          <p className={`flex items-center justify-end gap-1 text-sm font-mono font-medium ${isPositive ? "text-bullish" : "text-bearish"}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isPositive ? "+" : ""}{data.change} ({data.changePercent}%)
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical */}
        <div className="analysis-card space-y-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-display font-semibold">Technical Analysis</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trend</span>
            <TrendBadge trend={data.technical_analysis.trend} />
          </div>
          <RsiGauge rsi={data.technical_analysis.rsi} />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">50-day MA</span>
            <span className="font-mono">₹{data.technical_analysis.ma50.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">200-day MA</span>
            <span className="font-mono">₹{data.technical_analysis.ma200.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Signal</span>
            <span className="font-mono text-primary font-medium">{data.technical_analysis.moving_average_signal}</span>
          </div>
        </div>

        {/* Fundamental */}
        <div className="analysis-card space-y-5">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-display font-semibold">Fundamental Analysis</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Valuation</span>
            <ValuationBadge valuation={data.fundamental_analysis.valuation} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">P/E Ratio</span>
            <span className="font-mono">{data.fundamental_analysis.pe_ratio}x</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sector P/E</span>
            <span className="font-mono">{data.fundamental_analysis.sector_pe}x</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">ROE</span>
            <span className="font-mono">{data.fundamental_analysis.roe}%</span>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="analysis-card border-l-4 border-l-primary">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-display font-semibold">AI Recommendation</h3>
        </div>
        <p className="text-foreground leading-relaxed">{data.recommendation}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;
