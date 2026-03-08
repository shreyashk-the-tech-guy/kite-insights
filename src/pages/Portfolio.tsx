import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, ChevronRight } from "lucide-react";

const comparisonData = [
  {
    title: "PE Ratio",
    items: [
      { label: "Your Portfolio", value: 27.0, maxWidth: 80 },
      { label: "Benchmark", value: 25.09, maxWidth: 65 },
    ],
  },
  {
    title: "Volatility",
    items: [
      { label: "Your Portfolio", value: 1.78, maxWidth: 85 },
      { label: "Benchmark", value: 1.0, maxWidth: 50 },
    ],
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/dashboard" className="hover:text-foreground">Investor's Suite</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-primary font-medium">Portfolio</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Comparison Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
        >
          {comparisonData.map((card) => (
            <div key={card.title} className="card-elevated p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-foreground mb-5">{card.title}</h3>
              <div className="space-y-4">
                {card.items.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div
                      className="h-10 rounded-lg flex items-center px-3 text-sm font-medium text-primary-foreground"
                      style={{
                        width: `${item.maxWidth}%`,
                        background: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.4)",
                      }}
                    >
                      {item.label}
                    </div>
                    <span className="text-sm font-mono font-semibold text-foreground">{item.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Connect CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Connect your portfolio and start asking questions to AI.</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">Link your brokerage account to get personalized insights, tax optimization, and AI-powered analysis.</p>
          <button
            className="h-12 px-8 rounded-xl text-base font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-105"
            style={{ background: "var(--gradient-primary)" }}
          >
            Upgrade & Connect
          </button>
        </motion.div>

        {/* Holdings placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 card-flat p-8 text-center"
        >
          <p className="text-muted-foreground text-sm">Your holdings, sector allocation, and P&L will appear here once your portfolio is connected.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
