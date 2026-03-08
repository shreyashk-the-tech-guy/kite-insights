import { useState } from "react";
import { Search, ArrowRight, Sparkles, TrendingUp, TrendingDown, BarChart3, Brain, PieChart, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { analyzeStock, availableStocks, type StockAnalysis } from "@/lib/mockApi";
import { useToast } from "@/hooks/use-toast";
import AnalysisResult from "@/components/AnalysisResult";
import MarketTicker from "@/components/MarketTicker";

const suggestedPrompts = [
  "Analyze RELIANCE stock fundamentals",
  "Is TCS a good buy right now?",
  "Compare INFY vs WIPRO",
  "What's the trend for HDFCBANK?",
];

const Index = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StockAnalysis | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (input?: string) => {
    const raw = input || query;
    // Extract stock symbol from natural language
    const symbol = extractSymbol(raw);
    if (!symbol) {
      toast({ title: "Enter a stock symbol", description: `Try: ${availableStocks.slice(0, 5).join(", ")}`, variant: "destructive" });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeStock(symbol);
      setResult(data);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const extractSymbol = (input: string): string | null => {
    const upper = input.toUpperCase().trim();
    // Direct match
    if (availableStocks.includes(upper)) return upper;
    // Search within text
    for (const s of availableStocks) {
      if (upper.includes(s)) return s;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <MarketTicker />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: "hsl(221 83% 53% / 0.3)" }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: "hsl(262 83% 58% / 0.2)" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-info gap-1.5 text-sm px-4 py-1.5 mb-6 inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              MCP-Powered Analysis Engine
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight mt-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Be a{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Pro Investor
            </span>
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            className="mt-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}
              className="relative"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask anything about stocks, portfolio, analysis and more..."
                className="search-input-hero placeholder:text-muted-foreground"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-30 transition-all"
                style={{ background: "var(--gradient-primary)" }}
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>

            {/* Suggested prompts */}
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {suggestedPrompts.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => { setQuery(prompt); handleAnalyze(prompt); }}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Quick stock buttons */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {availableStocks.map(s => (
              <button
                key={s}
                onClick={() => { setQuery(s); handleAnalyze(s); }}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg border bg-card text-foreground text-xs font-mono font-medium hover:border-primary hover:text-primary transition-all disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border">
              <div className="h-5 w-5 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
              <span className="text-sm font-medium text-muted-foreground">Analyzing via MCP tools…</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 pb-16"
          >
            <AnalysisResult data={result} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      {!result && !loading && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6" />}
              title="Technical Analysis"
              desc="RSI, Moving Averages, MACD and trend detection powered by real-time data."
              color="hsl(var(--primary))"
            />
            <FeatureCard
              icon={<PieChart className="h-6 w-6" />}
              title="Fundamental Analysis"
              desc="P/E ratios, ROE, sector comparisons and valuation signals for informed decisions."
              color="hsl(var(--bullish))"
            />
            <FeatureCard
              icon={<Brain className="h-6 w-6" />}
              title="AI Recommendations"
              desc="Combined technical & fundamental signals generate actionable investment insights."
              color="hsl(var(--warning))"
            />
          </div>
        </section>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) => (
  <motion.div
    className="card-elevated p-6 group cursor-default"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    transition={{ duration: 0.3 }}
  >
    <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${color}15`, color }}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
  </motion.div>
);

export default Index;
