import { useState } from "react";
import { Calculator, TrendingDown, TrendingUp, Shield, Brain, ArrowRight, IndianRupee } from "lucide-react";
import { runTaxOptimization, type TaxOptimizationResult } from "@/lib/taxOptimizer";

const TaxOptimizer = () => {
  const [result, setResult] = useState<TaxOptimizationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptimize = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setResult(runTaxOptimization());
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Calculator className="h-4 w-4" />
            AI Tax Agent
          </div>
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground tracking-tight">
            Tax Optimizer<br />
            <span className="text-accent">Agent</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Analyze your portfolio for STCG/LTCG tax liability, discover tax-loss harvesting opportunities, and get Section 80C/80D suggestions.
          </p>
          <button
            onClick={handleOptimize}
            disabled={loading}
            className="mt-8 h-14 px-10 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-lg hover:opacity-90 disabled:opacity-50 transition-all inline-flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                Optimizing…
              </>
            ) : (
              <>
                <Brain className="h-5 w-5" />
                Run Tax Analysis on Sample Portfolio
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SummaryCard label="Total Invested" value={`₹${result.breakdown.totalInvested.toLocaleString()}`} />
              <SummaryCard label="Current Value" value={`₹${result.breakdown.currentValue.toLocaleString()}`} positive={result.breakdown.totalGain >= 0} />
              <SummaryCard label="Total Gain" value={`₹${result.breakdown.totalGain.toLocaleString()}`} positive={result.breakdown.totalGain >= 0} highlight />
              <SummaryCard label="Tax Liability" value={`₹${result.breakdown.totalTax.toLocaleString()}`} isNeutral />
            </div>

            {/* Holdings Table */}
            <div className="analysis-card overflow-hidden">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                Portfolio Holdings
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-left py-3 px-2 font-medium">Stock</th>
                      <th className="text-right py-3 px-2 font-medium">Qty</th>
                      <th className="text-right py-3 px-2 font-medium">Buy</th>
                      <th className="text-right py-3 px-2 font-medium">CMP</th>
                      <th className="text-right py-3 px-2 font-medium">P&L</th>
                      <th className="text-right py-3 px-2 font-medium">Holding</th>
                      <th className="text-right py-3 px-2 font-medium">Tax Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.holdings.map(h => (
                      <tr key={h.symbol} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-2 font-mono font-medium">{h.symbol}</td>
                        <td className="text-right py-3 px-2 font-mono">{h.quantity}</td>
                        <td className="text-right py-3 px-2 font-mono">₹{h.buyPrice}</td>
                        <td className="text-right py-3 px-2 font-mono">₹{h.currentPrice}</td>
                        <td className={`text-right py-3 px-2 font-mono font-medium ${h.gain >= 0 ? "text-bullish" : "text-bearish"}`}>
                          {h.gain >= 0 ? "+" : ""}₹{h.gain.toLocaleString()} ({h.gainPercent}%)
                        </td>
                        <td className="text-right py-3 px-2 font-mono">{h.holdingPeriod}m</td>
                        <td className="text-right py-3 px-2">
                          <span className={h.isLongTerm ? "badge-bullish" : "badge-neutral"}>{h.taxCategory}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tax Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="analysis-card space-y-4">
                <h3 className="text-lg font-display font-semibold flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Tax Breakdown
                </h3>
                <TaxRow label="STCG (15%)" amount={result.breakdown.stcgAmount} tax={result.breakdown.stcgTax} />
                <TaxRow label="LTCG (10% above ₹1L)" amount={result.breakdown.ltcgAmount} tax={result.breakdown.ltcgTax} />
                <div className="border-t pt-3 flex justify-between font-display font-semibold">
                  <span>Total Tax</span>
                  <span className="text-bearish font-mono">₹{result.breakdown.totalTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Effective Tax Rate</span>
                  <span className="font-mono">{result.breakdown.effectiveTaxRate}%</span>
                </div>
              </div>

              {/* Tax-Loss Harvesting */}
              <div className="analysis-card space-y-4">
                <h3 className="text-lg font-display font-semibold flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-bearish" />
                  Tax-Loss Harvesting
                </h3>
                {result.harvesting.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No loss-making holdings to harvest.</p>
                ) : (
                  result.harvesting.map(h => (
                    <div key={h.symbol} className="p-3 rounded-lg bg-muted/50 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-medium">{h.symbol}</span>
                        <span className="badge-bearish">−₹{h.loss.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{h.action}</p>
                      <p className="text-xs text-bullish font-medium">Potential saving: ₹{h.potentialSaving.toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Deductions */}
            <div className="analysis-card">
              <h3 className="text-lg font-display font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Tax Deduction Suggestions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.deductions.map(d => (
                  <div key={d.section} className="p-4 rounded-lg bg-muted/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-primary">Section {d.section}</span>
                      <span className="text-xs font-mono text-muted-foreground">Max ₹{d.maxLimit.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{d.description}</p>
                    <p className="text-xs text-foreground flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 text-accent" />
                      {d.relevance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Advice */}
            <div className="analysis-card border-l-4 border-l-accent">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-accent" />
                <h3 className="text-lg font-display font-semibold">AI Tax Optimization Advice</h3>
              </div>
              <p className="text-foreground leading-relaxed">{result.aiAdvice}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, positive, isNeutral, highlight }: { label: string; value: string; positive?: boolean; isNeutral?: boolean; highlight?: boolean }) => (
  <div className={`analysis-card text-center ${highlight ? "border-primary/30" : ""}`}>
    <p className="text-xs text-muted-foreground font-display mb-1">{label}</p>
    <p className={`text-xl font-mono font-bold ${isNeutral ? "text-bearish" : positive === undefined ? "text-foreground" : positive ? "text-bullish" : "text-bearish"}`}>
      {value}
    </p>
  </div>
);

const TaxRow = ({ label, amount, tax }: { label: string; amount: number; tax: number }) => (
  <div className="flex justify-between items-center text-sm">
    <div>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-xs text-muted-foreground ml-2 font-mono">(₹{amount.toLocaleString()})</span>
    </div>
    <span className="font-mono font-medium">₹{tax.toLocaleString()}</span>
  </div>
);

export default TaxOptimizer;
