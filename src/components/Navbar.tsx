import { Link, useLocation } from "react-router-dom";
import { Activity, Calculator } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-medium transition-all ${
      pathname === path
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
          <Activity className="h-5 w-5 text-primary" />
          AI Advisor
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/" className={linkClass("/")}>
            <BarChartIcon />
            Stock Analysis
          </Link>
          <Link to="/tax" className={linkClass("/tax")}>
            <Calculator className="h-4 w-4" />
            Tax Optimizer
          </Link>
        </div>
      </div>
    </nav>
  );
};

const BarChartIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export default Navbar;
