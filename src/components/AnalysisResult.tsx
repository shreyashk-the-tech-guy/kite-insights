import { TrendingUp, TrendingDown, BarChart3, PieChart, Brain } from "lucide-react";
import { motion } from "framer-motion";
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
  if (valuation.includes("Under") || valuation === "Fairly Valued") return <span className="badge-bullish">{valuation}</span>;
  if (valuation.includes("Over")) return <span className="badge-bearish">{valuation}</span>;
  return <span className="badge-neutral">{valuation}</span>;
};

const AnalysisResult = ({ data }: Props) => {
  const isPositive = data.change >= 0;

  return (
    <div className="space-y-5">
      {/* Header Card */}
      <motion.div
        className="card-elevated p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-foreground">{data.symbol}</h2>
            <TrendBadge trend={data.technical_analysis.trend} />
          </div>
          <p className="text-muted-foreground text-sm mt-1">NSE · Indian Equity · Live</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-bold text-foreground">₹{data.price.toLocaleString()}</p>
          <p className={`flex items-center justify-end gap-1 text-sm font-mono font-semibold ${isPositive ? "text-bullish" : "text-bearish"}`}>
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isPositive ? "+" : ""}{data.change} ({data.changePercent}%)
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Technical */}
        <motion.div
          className="card-elevated p-6 space-y-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold">Technical Analysis</h3>
          </div>

          {/* RSI Gauge */}
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">RSI (14)</span>
              <span className="font-mono font-semibold">{data.technical_analysis.rsi}</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${data.technical_analysis.rsi}%`,
                  background: data.technical_analysis.rsi > 70
                    ? "hsl(var(--bearish))" : data.technical_analysis.rsi < 30
                    ? "hsl(var(--bullish))" : "hsl(var(--primary))",
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Oversold</span><span>Neutral</span><span>Overbought</span>
            </div>
          </div>

          <DataRow label="50-day MA" value={`₹${data.technical_analysis.ma50.toLocaleString()}`} />
          <DataRow label="200-day MA" value={`₹${data.technical_analysis.ma200.toLocaleString()}`} />
          <DataRow label="Signal" value={data.technical_analysis.moving_average_signal} highlight />
        </motion.div>

        {/* Fundamental */}
        <motion.div
          className="card-elevated p-6 space-y-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--bullish) / 0.1)", color: "hsl(var(--bullish))" }}>
              <PieChart className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold">Fundamental Analysis</h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Valuation</span>
            <ValuationBadge valuation={data.fundamental_analysis.valuation} />
          </div>
          <DataRow label="P/E Ratio" value={`${data.fundamental_analysis.pe_ratio}x`} />
          <DataRow label="Sector P/E" value={`${data.fundamental_analysis.sector_pe}x`} />
          <DataRow label="ROE" value={`${data.fundamental_analysis.roe}%`} />

          {/* PE bar comparison */}
          <div className="pt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Stock P/E vs Sector P/E</span>
            </div>
            <div className="flex gap-2 items-end h-8">
              <div className="flex-1 rounded-md flex items-center justify-center text-xs font-mono font-medium text-primary-foreground" style={{ background: "hsl(var(--primary))", height: `${Math.min(100, (data.fundamental_analysis.pe_ratio / 40) * 100)}%` }}>
                {data.fundamental_analysis.pe_ratio}x
              </div>
              <div className="flex-1 rounded-md flex items-center justify-center text-xs font-mono font-medium text-muted-foreground bg-secondary" style={{ height: `${Math.min(100, (data.fundamental_analysis.sector_pe / 40) * 100)}%` }}>
                {data.fundamental_analysis.sector_pe}x
              </div>
            </div>
            <div className="flex gap-2 text-[10px] text-muted-foreground mt-1">
              <span className="flex-1 text-center">Stock</span>
              <span className="flex-1 text-center">Sector</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Recommendation */}
      <motion.div
        className="card-elevated p-6 border-l-4 border-l-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--warning) / 0.1)", color: "hsl(var(--warning))" }}>
            <Brain className="h-4 w-4" />
          </div>
          <h3 className="text-base font-semibold">AI Recommendation</h3>
        </div>
        <p className="text-foreground leading-relaxed text-sm">{data.recommendation}</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="pulse-dot bg-bullish" />
          Generated via MCP Tool Layer · Zerodha Kite Integration
        </div>
      </motion.div>
    </div>
  );
};

const DataRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={`font-mono font-medium ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
  </div>
);

export default AnalysisResult;
