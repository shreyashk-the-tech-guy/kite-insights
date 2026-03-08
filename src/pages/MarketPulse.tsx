import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";

const indices = [
  { name: "NIFTY 50", value: 24250, change: 0.45, points: 108 },
  { name: "SENSEX", value: 79800, change: 0.38, points: 302 },
  { name: "BANK NIFTY", value: 51500, change: -0.22, points: -113 },
  { name: "NIFTY IT", value: 38200, change: 1.1, points: 420 },
];

const topGainers = [
  { symbol: "TATAMOTORS", price: 720, change: 3.2 },
  { symbol: "ITC", price: 445, change: 2.8 },
  { symbol: "BAJFINANCE", price: 7200, change: 2.1 },
  { symbol: "RELIANCE", price: 2850, change: 1.5 },
  { symbol: "HDFCBANK", price: 1620, change: 1.2 },
];

const topLosers = [
  { symbol: "WIPRO", price: 480, change: -2.1 },
  { symbol: "INFY", price: 1580, change: -1.8 },
  { symbol: "TCS", price: 3920, change: -1.2 },
  { symbol: "SBIN", price: 625, change: -0.9 },
  { symbol: "ICICIBANK", price: 1050, change: -0.5 },
];

const sectorPerformance = [
  { name: "IT Services", change: 1.8 },
  { name: "Banking", change: 0.5 },
  { name: "FMCG", change: 1.2 },
  { name: "Auto", change: 2.5 },
  { name: "Pharma", change: -0.8 },
  { name: "Oil & Gas", change: 0.3 },
  { name: "Metals", change: -1.2 },
  { name: "Realty", change: 3.1 },
];

const MarketPulse = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">Market Pulse</h1>
        <p className="text-sm text-muted-foreground mt-1">Live market overview · NSE · BSE</p>
      </motion.div>

      {/* Index Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {indices.map((idx, i) => (
          <motion.div
            key={idx.name}
            className="card-elevated p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="text-xs font-medium text-muted-foreground">{idx.name}</p>
            <p className="text-xl font-mono font-bold text-foreground mt-1">{idx.value.toLocaleString()}</p>
            <p className={`flex items-center gap-1 text-xs font-mono font-semibold mt-1 ${idx.change >= 0 ? "text-bullish" : "text-bearish"}`}>
              {idx.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {idx.change >= 0 ? "+" : ""}{idx.points} ({idx.change}%)
            </p>
          </motion.div>
        ))}
      </div>

      {/* Gainers & Losers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <motion.div
          className="card-elevated overflow-hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-4 border-b flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-bullish" />
            <h3 className="text-sm font-semibold">Top Gainers</h3>
          </div>
          <table className="w-full data-table">
            <thead><tr><th>Stock</th><th className="text-right">Price</th><th className="text-right">Change</th></tr></thead>
            <tbody>
              {topGainers.map(s => (
                <tr key={s.symbol}>
                  <td className="font-mono font-semibold text-sm">{s.symbol}</td>
                  <td className="text-right font-mono text-sm">₹{s.price}</td>
                  <td className="text-right"><span className="badge-bullish">+{s.change}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          className="card-elevated overflow-hidden"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="p-4 border-b flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-bearish" />
            <h3 className="text-sm font-semibold">Top Losers</h3>
          </div>
          <table className="w-full data-table">
            <thead><tr><th>Stock</th><th className="text-right">Price</th><th className="text-right">Change</th></tr></thead>
            <tbody>
              {topLosers.map(s => (
                <tr key={s.symbol}>
                  <td className="font-mono font-semibold text-sm">{s.symbol}</td>
                  <td className="text-right font-mono text-sm">₹{s.price}</td>
                  <td className="text-right"><span className="badge-bearish">{s.change}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Sector Performance */}
      <motion.div
        className="card-elevated p-6 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="text-base font-semibold">Sector Performance</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sectorPerformance.map(s => (
            <div key={s.name} className="p-3 rounded-xl bg-muted/40 border border-transparent hover:border-primary/20 transition-colors">
              <p className="text-xs text-muted-foreground font-medium">{s.name}</p>
              <p className={`text-lg font-mono font-bold mt-1 ${s.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                {s.change >= 0 ? "+" : ""}{s.change}%
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default MarketPulse;
