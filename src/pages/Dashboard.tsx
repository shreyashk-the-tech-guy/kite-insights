import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BarChart3, ArrowUpRight, ArrowDownRight, Bookmark, Clock } from "lucide-react";

const marketStats = {
  nifty: { value: "24,450.45", change: -1.27 },
  sensex: { value: "78,918.90", change: -1.37 },
  stocksTraded: 4777,
  unchanged: 204,
  advances: 2119,
  declines: 2454,
};

const capPerformance = [
  { label: "Large Cap", pct: 29, color: "hsl(var(--bullish))" },
  { label: "Mid Cap", pct: 35, color: "hsl(var(--warning))" },
  { label: "Small Cap", pct: 38, color: "hsl(var(--warning))" },
  { label: "Micro Cap", pct: 44, color: "hsl(var(--bearish))" },
];

const timeline = [
  {
    category: "Change in Directors/KMP",
    time: "2 days ago",
    title: "YES Bank appoints Vinay M. Tonse as MD & CEO (Designate)",
    desc: "YES Bank's Board appointed Vinay Muralidhar Tonse as Managing Director & CEO (Designate) effective March 12, 2026.",
    stock: "YESBANK",
    price: 20.13,
    change: -0.49,
  },
  {
    category: "Investment in JV",
    time: "3 days ago",
    title: "Jio Financial subscribes Rs.147 crore in Reinsurance (AJRL)",
    desc: "Jio Financial subscribed 14,74,50,000 shares of Jio Reinsurance Limited for Rs.147.45 crore.",
    stock: "JIOFIN",
    price: 239.40,
    change: -1.52,
  },
  {
    category: "Quarterly Results",
    time: "4 days ago",
    title: "TCS reports strong Q4 results with 8.2% revenue growth",
    desc: "Tata Consultancy Services reported consolidated net profit of ₹12,434 crore for Q4FY26.",
    stock: "TCS",
    price: 3890.50,
    change: 2.14,
  },
];

const userStats = [
  { label: "AI Prompts", value: 0, icon: "✨" },
  { label: "Stocks Researched", value: 0, icon: "📊" },
  { label: "Stories Read", value: 0, icon: "📰" },
  { label: "Buckets Visited", value: 0, icon: "🪣" },
  { label: "Screens Created", value: 0, icon: "🖥️" },
];

const sentimentData = [
  { label: "Bullish", pct: 38, color: "hsl(var(--bullish))" },
  { label: "Bearish", pct: 41, color: "hsl(var(--bearish))" },
  { label: "Neutral", pct: 21, color: "hsl(var(--warning))" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Good morning, Investor! 👋</h1>
          <p className="text-muted-foreground mt-1">Here's your market overview for today.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Market Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1 card-flat space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">NIFTY</p>
                <p className="text-lg font-bold font-mono text-foreground">{marketStats.nifty.value}</p>
                <span className="badge-bearish text-[10px]">▼ {Math.abs(marketStats.nifty.change)}%</span>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">SENSEX</p>
                <p className="text-lg font-bold font-mono text-foreground">{marketStats.sensex.value}</p>
                <span className="badge-bearish text-[10px]">▼ {Math.abs(marketStats.sensex.change)}%</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatMini label="Stock Traded" value={marketStats.stocksTraded} icon={<ArrowUpRight className="h-4 w-4 text-primary" />} />
              <StatMini label="Unchanged" value={marketStats.unchanged} icon={<Minus className="h-4 w-4 text-muted-foreground" />} />
              <StatMini label="Advances" value={marketStats.advances} icon={<TrendingUp className="h-4 w-4 text-bullish" />} />
              <StatMini label="Declines" value={marketStats.declines} icon={<TrendingDown className="h-4 w-4 text-bearish" />} />
            </div>
          </motion.div>

          {/* Cap Performance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 card-flat">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Market Cap Performance</h3>
              <span className="text-xs text-muted-foreground">% stocks above 200 DMA</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {capPerformance.map((cap) => (
                <div key={cap.label} className="flex flex-col items-center gap-3">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke={cap.color} strokeWidth="8"
                        strokeDasharray={`${cap.pct * 2.51} ${251 - cap.pct * 2.51}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold font-mono text-foreground">{cap.pct}<span className="text-sm">%</span></span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{cap.label}</p>
                    <BarChart3 className="h-4 w-4 mx-auto mt-1 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Stats + Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card-flat flex items-center gap-4 p-5" style={{ background: "var(--gradient-primary)" }}>
            <span className="text-4xl">⭐</span>
            <div>
              <h3 className="text-lg font-bold text-primary-foreground">You're on the Free Plan</h3>
              <p className="text-sm text-primary-foreground/80">Upgrade for full access to deep data & portfolio analytics.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {userStats.map((s) => (
              <div key={s.label} className="card-flat flex flex-col items-center justify-center py-4 px-2 text-center">
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="text-2xl font-bold font-mono text-foreground">{s.value}</p>
                <span className="text-lg mt-1">{s.icon}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sentiment */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card-flat mb-8">
          <h3 className="font-semibold text-foreground mb-4">What's your view on the market currently?</h3>
          <div className="space-y-3">
            {sentimentData.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: s.color }} />
                <span className="text-sm font-medium text-foreground w-16">{s.label}</span>
                <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
                <span className="text-sm font-mono font-semibold text-foreground w-14 text-right">{s.pct}.0%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-2">Timeline <span className="text-lg">›</span></h2>
            <span className="text-sm text-muted-foreground">Top Stories</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timeline.map((item, i) => (
              <div key={i} className="card-elevated p-5 relative">
                <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-bullish" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-4">{item.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold bg-secondary px-2 py-1 rounded text-foreground">{item.stock}</span>
                    <span className="text-xs font-mono text-foreground">{item.price}</span>
                    <span className={item.change > 0 ? "badge-bullish text-[10px]" : "badge-bearish text-[10px]"}>
                      {item.change > 0 ? "▲" : "▼"} {Math.abs(item.change)}%
                    </span>
                  </div>
                  <Bookmark className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const StatMini = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <div className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between">
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-base font-bold font-mono text-foreground">{value}</p>
    </div>
    {icon}
  </div>
);

export default Dashboard;
