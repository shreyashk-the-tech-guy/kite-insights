import { useState } from "react";
import { Activity } from "lucide-react";
import StockSearch from "@/components/StockSearch";
import AnalysisResult from "@/components/AnalysisResult";
import { analyzeStock, type StockAnalysis } from "@/lib/mockApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StockAnalysis | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (symbol: string) => {
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="h-4 w-4" />
            MCP-Powered Analysis Engine
          </div>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground tracking-tight">
            AI Investment<br />
            <span className="text-primary">Advisor</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Technical &amp; fundamental analysis for Indian stocks powered by Zerodha Kite data and MCP tool architecture.
          </p>
        </div>

        <StockSearch onAnalyze={handleAnalyze} loading={loading} />

        {loading && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 text-muted-foreground">
              <div className="h-5 w-5 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
              <span className="font-display">Fetching data via MCP tools…</span>
            </div>
          </div>
        )}

        {result && <AnalysisResult data={result} />}

        {/* Architecture note */}
        <div className="mt-16 text-center text-xs text-muted-foreground font-mono space-y-1">
          <p>Frontend → FastAPI → MCP Tool Layer → Zerodha Kite API → Analysis Engine</p>
          <p>Demo mode: using simulated market data</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
