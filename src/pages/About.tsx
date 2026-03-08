import { motion } from "framer-motion";
import { BarChart3, Brain, Layers, Zap, Shield, Globe, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Combines technical indicators and fundamental data to generate actionable investment insights for Indian equities." },
  { icon: Layers, title: "MCP Architecture", desc: "Model Context Protocol tool layer provides modular, extensible data fetching — swap data sources without changing analysis logic." },
  { icon: BarChart3, title: "Technical Indicators", desc: "RSI, 50/200 day moving averages, MACD signals, and trend detection computed from historical OHLC data." },
  { icon: Shield, title: "Tax Optimization", desc: "STCG/LTCG calculation, tax-loss harvesting suggestions, and Section 80C/80D deduction recommendations." },
  { icon: Zap, title: "Real-time Data", desc: "Integrates with Zerodha Kite API for live market prices, historical data, and instrument lookups." },
  { icon: Globe, title: "Indian Market Focus", desc: "Purpose-built for NSE/BSE listed stocks with Indian tax rules, sector benchmarks, and rupee-denominated analysis." },
];

const architecture = [
  { label: "Frontend", desc: "React + TypeScript", color: "hsl(var(--primary))" },
  { label: "FastAPI", desc: "Python Backend", color: "hsl(var(--bullish))" },
  { label: "MCP Layer", desc: "Tool Registry", color: "hsl(var(--warning))" },
  { label: "Kite API", desc: "Market Data", color: "hsl(var(--bearish))" },
  { label: "Analysis", desc: "TA + FA Engine", color: "hsl(var(--info))" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Hero */}
      <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <span className="badge-info gap-1.5 text-sm px-4 py-1.5 mb-6 inline-flex">
          <BarChart3 className="h-3.5 w-3.5" /> About InvestAI
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-4">
          AI-Assisted{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
            Investment Advisor
          </span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          An AI-powered stock research and analysis platform for Indian equities. Built with MCP (Model Context Protocol) architecture, integrating Zerodha Kite data for real-time market intelligence.
        </p>
      </motion.div>

      {/* Architecture Flow */}
      <motion.div
        className="card-elevated p-8 mb-12"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold text-foreground mb-6 text-center">System Architecture</h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {architecture.map((item, i) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border bg-muted/30">
                <span className="text-sm font-bold" style={{ color: item.color }}>{item.label}</span>
                <span className="text-[10px] text-muted-foreground">{item.desc}</span>
              </div>
              {i < architecture.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            className="card-elevated p-6 group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileHover={{ y: -3 }}
          >
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-4 transition-transform group-hover:scale-110">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech stack */}
      <motion.div
        className="card-elevated p-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-foreground mb-4">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {["React", "TypeScript", "FastAPI", "Python", "Zerodha Kite", "Pandas", "TA-Lib", "Tailwind CSS", "Framer Motion"].map(t => (
            <span key={t} className="px-3 py-1.5 rounded-lg bg-muted text-xs font-mono font-medium text-foreground">{t}</span>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Built for university demonstration · Educational purposes only · AI can make mistakes, verify important information
        </p>
      </motion.div>
    </div>
  </div>
);

export default About;
