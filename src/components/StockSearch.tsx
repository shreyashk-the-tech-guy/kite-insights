import { useState } from "react";
import { Search } from "lucide-react";
import { availableStocks } from "@/lib/mockApi";

interface StockSearchProps {
  onAnalyze: (symbol: string) => void;
  loading: boolean;
}

const StockSearch = ({ onAnalyze, loading }: StockSearchProps) => {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim()) onAnalyze(symbol.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={symbol}
              onChange={e => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter stock symbol (e.g. RELIANCE)"
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground text-lg font-display placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !symbol.trim()}
            className="h-14 px-8 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all glow-primary"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing
              </span>
            ) : "Analyze"}
          </button>
        </div>
      </form>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {availableStocks.map(s => (
          <button
            key={s}
            onClick={() => { setSymbol(s); onAnalyze(s); }}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-mono hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StockSearch;
