import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Search, Menu, X, Activity, BarChart3, Calculator, TrendingUp, Compass, Info } from "lucide-react";

const navItems = [
  { path: "/", label: "Ask AI", icon: Activity },
  { path: "/market", label: "Market Pulse", icon: TrendingUp },
  { path: "/discovery", label: "Discovery", icon: Compass },
  { path: "/tax", label: "Tax Optimizer", icon: Calculator },
  { path: "/about", label: "About", icon: Info },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <BarChart3 className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground hidden sm:block">InvestAI</span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anything"
                className="w-full h-9 pl-9 pr-16 rounded-lg bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-background border text-muted-foreground">
                Ctrl+K
              </kbd>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={pathname === item.path ? "nav-link-active" : "nav-link"}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="h-9 px-4 rounded-lg text-sm font-medium text-primary-foreground transition-all hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
              Login
            </button>
            <button
              className="lg:hidden h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-card px-4 py-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
