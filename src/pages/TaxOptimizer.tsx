import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingDown, Shield, Brain, ArrowRight, IndianRupee, Wallet } from "lucide-react";
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <motion.span
            className="badge-info gap-1.5 text-sm px-4 py-1.5 mb-6 inline-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Calculator className="h-3.5 w-3.5" />
            AI Tax Agent
          </motion.span>

          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Tax Optimization{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Agent
            </span>
          </motion.h1>

          <motion.p
            className="mt-3 text-base text-muted-foreground max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Analyze STCG/LTCG tax liability, discover tax-loss harvesting opportunities, and maximize Section 80C/80D deductions.
          </motion.p>

          <motion.button
            onClick={handleOptimize}
            disabled={loading}
            className="mt-8 h-12 px-8 rounded-xl text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-all inline-flex items-center gap-2"
            style={{ background: "var(--gradient-primary)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing…
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Run Tax Analysis
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Invested" value={`₹${(result.breakdown.totalInvested / 1000).toFixed(0)}K`} icon={<Wallet className="h-4 w-4" />} />
                <StatCard label="Current" value={`₹${(result.breakdown.currentValue / 1000).toFixed(0)}K`} icon={<IndianRupee className="h-4 w-4" />} color={result.breakdown.totalGain >= 0 ? "bullish" : "bearish"} />
                <StatCard label="Total Gain" value={`₹${result.breakdown.totalGain.toLocaleString()}`} icon={<TrendingDown className="h-4 w-4" />} color={result.breakdown.totalGain >= 0 ? "bullish" : "bearish"} />
                <StatCard label="Tax Liability" value={`₹${result.breakdown.totalTax.toLocaleString()}`} icon={<Calculator className="h-4 w-4" />} color="bearish" />
              </div>

              {/* Holdings Table */}
              <div className="card-elevated overflow-hidden">
                <div className="p-5 border-b">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-primary" />
                    Portfolio Holdings
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th>Stock</th><th className="text-right">Qty</th><th className="text-right">Buy</th>
                        <th className="text-right">CMP</th><th className="text-right">P&L</th>
                        <th className="text-right">Period</th><th className="text-right">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.holdings.map(h => (
                        <tr key={h.symbol}>
                          <td className="font-mono font-semibold">{h.symbol}</td>
                          <td className="text-right font-mono">{h.quantity}</td>
                          <td className="text-right font-mono">₹{h.buyPrice}</td>
                          <td className="text-right font-mono">₹{h.currentPrice}</td>
                          <td className={`text-right font-mono font-semibold ${h.gain >= 0 ? "text-bullish" : "text-bearish"}`}>
                            {h.gain >= 0 ? "+" : ""}₹{h.gain.toLocaleString()}
                          </td>
                          <td className="text-right font-mono text-muted-foreground">{h.holdingPeriod}m</td>
                          <td className="text-right">
                            <span className={h.isLongTerm ? "badge-bullish" : "badge-neutral"}>{h.taxCategory}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax + Harvesting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card-elevated p-6 space-y-4">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-primary" />
                    Tax Breakdown
                  </h3>
                  <TaxRow label="STCG @ 15%" gain={result.breakdown.stcgAmount} tax={result.breakdown.stcgTax} />
                  <TaxRow label="LTCG @ 10% (>₹1L)" gain={result.breakdown.ltcgAmount} tax={result.breakdown.ltcgTax} />
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>Total Tax</span>
                    <span className="font-mono text-bearish">₹{result.breakdown.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Effective Rate</span>
                    <span className="font-mono">{result.breakdown.effectiveTaxRate}%</span>
                  </div>
                </div>

                <div className="card-elevated p-6 space-y-4">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-bearish" />
                    Tax-Loss Harvesting
                  </h3>
                  {result.harvesting.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No losses to harvest.</p>
                  ) : result.harvesting.map(h => (
                    <div key={h.symbol} className="p-3 rounded-lg bg-muted/50 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-semibold text-sm">{h.symbol}</span>
                        <span className="badge-bearish">−₹{h.loss.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{h.action}</p>
                      <p className="text-xs text-bullish font-semibold">Save ₹{h.potentialSaving.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deductions */}
              <div className="card-elevated p-6">
                <h3 className="text-base font-semibold flex items-center gap-2 mb-4">
                  <Shield className="h-4 w-4 text-primary" />
                  Tax Deduction Suggestions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.deductions.map(d => (
                    <div key={d.section} className="p-4 rounded-xl bg-muted/40 space-y-1.5 border border-transparent hover:border-primary/20 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-primary">Sec {d.section}</span>
                        <span className="text-xs font-mono text-muted-foreground">₹{d.maxLimit.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{d.description}</p>
                      <p className="text-xs text-foreground flex items-center gap-1">
                        <ArrowRight className="h-3 w-3 text-primary" />{d.relevance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Advice */}
              <div className="card-elevated p-6 border-l-4 border-l-primary">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--warning) / 0.1)", color: "hsl(var(--warning))" }}>
                    <Brain className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold">AI Tax Optimization Advice</h3>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{result.aiAdvice}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color?: string }) => (
  <div className="card-elevated p-4">
    <div className="flex items-center gap-2 mb-2 text-muted-foreground">{icon}<span className="stat-label">{label}</span></div>
    <p className={`stat-value text-xl ${color === "bullish" ? "text-bullish" : color === "bearish" ? "text-bearish" : "text-foreground"}`}>{value}</p>
  </div>
);

const TaxRow = ({ label, gain, tax }: { label: string; gain: number; tax: number }) => (
  <div className="flex justify-between items-center text-sm">
    <div>
      <span className="text-muted-foreground">{label}</span>
      <span className="text-xs text-muted-foreground ml-1.5 font-mono">(₹{gain.toLocaleString()})</span>
    </div>
    <span className="font-mono font-semibold">₹{tax.toLocaleString()}</span>
  </div>
);

export default TaxOptimizer;
