import { motion } from "framer-motion";
import { Search, Filter, TrendingUp, TrendingDown, Star } from "lucide-react";
import { useState } from "react";

const allStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Oil & Gas", price: 2850, change: 1.2, pe: 28, mcap: "19.2L Cr", rating: 4 },
  { symbol: "TCS", name: "Tata Consultancy", sector: "IT Services", price: 3920, change: -0.5, pe: 32, mcap: "14.3L Cr", rating: 5 },
  { symbol: "INFY", name: "Infosys Ltd", sector: "IT Services", price: 1580, change: 0.8, pe: 26, mcap: "6.5L Cr", rating: 4 },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", price: 1620, change: 0.3, pe: 20, mcap: "12.3L Cr", rating: 5 },
  { symbol: "ICICIBANK", name: "ICICI Bank", sector: "Banking", price: 1050, change: -0.2, pe: 18, mcap: "7.4L Cr", rating: 4 },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", price: 625, change: -0.7, pe: 10, mcap: "5.6L Cr", rating: 3 },
  { symbol: "TATAMOTORS", name: "Tata Motors", sector: "Automobile", price: 720, change: 2.1, pe: 8, mcap: "2.6L Cr", rating: 4 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "Finance", price: 7200, change: 1.5, pe: 35, mcap: "4.4L Cr", rating: 4 },
  { symbol: "ITC", name: "ITC Ltd", sector: "FMCG", price: 445, change: 1.5, pe: 25, mcap: "5.5L Cr", rating: 3 },
  { symbol: "WIPRO", name: "Wipro Ltd", sector: "IT Services", price: 480, change: -1.2, pe: 22, mcap: "2.5L Cr", rating: 3 },
];

const sectors = ["All", ...Array.from(new Set(allStocks.map(s => s.sector)))];

const Discovery = () => {
  const [search, setSearch] = useState("");
  const [activeSector, setActiveSector] = useState("All");

  const filtered = allStocks.filter(s => {
    const matchSearch = s.symbol.includes(search.toUpperCase()) || s.name.toLowerCase().includes(search.toLowerCase());
    const matchSector = activeSector === "All" || s.sector === activeSector;
    return matchSearch && matchSector;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground">Discovery</h1>
          <p className="text-sm text-muted-foreground mt-1">Screen and discover Indian stocks</p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or symbol..."
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-card border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {sectors.map(s => (
              <button
                key={s}
                onClick={() => setActiveSector(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeSector === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          className="card-elevated overflow-hidden mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Stock</th><th>Sector</th><th className="text-right">Price</th>
                <th className="text-right">Change</th><th className="text-right">P/E</th>
                <th className="text-right">M.Cap</th><th className="text-right">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.symbol} className="cursor-pointer">
                  <td>
                    <div>
                      <span className="font-mono font-semibold text-sm">{s.symbol}</span>
                      <p className="text-xs text-muted-foreground">{s.name}</p>
                    </div>
                  </td>
                  <td><span className="badge-info">{s.sector}</span></td>
                  <td className="text-right font-mono text-sm font-medium">₹{s.price.toLocaleString()}</td>
                  <td className="text-right">
                    <span className={`inline-flex items-center gap-0.5 text-xs font-mono font-semibold ${s.change >= 0 ? "text-bullish" : "text-bearish"}`}>
                      {s.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {s.change >= 0 ? "+" : ""}{s.change}%
                    </span>
                  </td>
                  <td className="text-right font-mono text-sm">{s.pe}x</td>
                  <td className="text-right font-mono text-sm text-muted-foreground">{s.mcap}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < s.rating ? "text-warning fill-warning" : "text-border"}`} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-muted-foreground">No stocks match your criteria.</div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Discovery;
