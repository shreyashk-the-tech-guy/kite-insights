import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface TickerItem {
  symbol: string;
  price: number;
  change: number;
}

const tickerData: TickerItem[] = [
  { symbol: "NIFTY 50", price: 24250, change: 0.45 },
  { symbol: "SENSEX", price: 79800, change: 0.38 },
  { symbol: "BANKNIFTY", price: 51500, change: -0.22 },
  { symbol: "RELIANCE", price: 2850, change: 1.2 },
  { symbol: "TCS", price: 3920, change: -0.5 },
  { symbol: "INFY", price: 1580, change: 0.8 },
  { symbol: "HDFCBANK", price: 1620, change: 0.3 },
  { symbol: "ITC", price: 445, change: 1.5 },
  { symbol: "SBIN", price: 625, change: -0.7 },
  { symbol: "TATAMOTORS", price: 720, change: 2.1 },
];

const MarketTicker = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev - 0.5);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const items = [...tickerData, ...tickerData]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-b bg-muted/30 h-9 flex items-center">
      <div
        className="flex items-center gap-8 whitespace-nowrap"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {items.map((item, i) => (
          <div key={`${item.symbol}-${i}`} className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-foreground">{item.symbol}</span>
            <span className="font-mono text-foreground">₹{item.price.toLocaleString()}</span>
            <span className={`flex items-center gap-0.5 font-mono font-medium ${item.change >= 0 ? "text-bullish" : "text-bearish"}`}>
              {item.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {item.change >= 0 ? "+" : ""}{item.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
