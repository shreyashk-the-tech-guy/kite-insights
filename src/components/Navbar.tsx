import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  Search, Menu, X, BarChart3, Activity, TrendingUp, Compass, Calculator, Info,
  LayoutDashboard, Briefcase, ChevronDown, Sun, Moon, Monitor,
  User, Settings, Bookmark, LogOut, Filter, Globe, Building2, FileText, Newspaper, PieChart, BarChart
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const mainNav = [
  { path: "/", label: "Ask AI", icon: Activity },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/portfolio", label: "Portfolio", icon: Briefcase },
  { path: "/discovery", label: "Discovery", icon: Compass },
];

const toolkitSections = [
  {
    title: "Screeners",
    items: [
      { label: "Stock Screener", icon: Filter, path: "/discovery" },
      { label: "Index Screener", icon: Globe, path: "/market" },
      { label: "ETF Screener", icon: PieChart, path: "/discovery" },
      { label: "IPO Screener", icon: FileText, path: "/discovery" },
    ],
  },
  {
    title: "Market Pulse",
    items: [
      { label: "Market", icon: Globe, path: "/market" },
      { label: "FII DII Activity", icon: Building2, path: "/market" },
      { label: "Upcoming Earnings", icon: BarChart, path: "/market" },
      { label: "Corporate Actions", icon: FileText, path: "/market" },
    ],
  },
  {
    title: "Deep Dive",
    items: [
      { label: "Earnings Summary", icon: BarChart3, path: "/market" },
      { label: "All Sectors", icon: PieChart, path: "/discovery" },
      { label: "Sector Analysis", icon: TrendingUp, path: "/discovery" },
      { label: "Tax Optimizer", icon: Calculator, path: "/tax" },
    ],
  },
  {
    title: "Investor's Suite",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Portfolio", icon: Briefcase, path: "/portfolio" },
      { label: "Discovery", icon: Compass, path: "/discovery" },
      { label: "About", icon: Info, path: "/about" },
    ],
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolkitOpen, setToolkitOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const toolkitRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolkitRef.current && !toolkitRef.current.contains(e.target as Node)) setToolkitOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
            {mainNav.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={pathname === item.path ? "nav-link-active" : "nav-link"}
              >
                {item.label}
              </Link>
            ))}

            {/* Toolkit Dropdown */}
            <div ref={toolkitRef} className="relative">
              <button
                onClick={() => setToolkitOpen(!toolkitOpen)}
                className={`nav-link flex items-center gap-1 ${toolkitOpen ? "text-primary" : ""}`}
              >
                Toolkit <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolkitOpen ? "rotate-180" : ""}`} />
              </button>
              {toolkitOpen && (
                <div className="absolute top-full right-0 mt-2 w-[640px] bg-card border rounded-xl shadow-xl p-6 grid grid-cols-4 gap-6 z-50">
                  {toolkitSections.map((section) => (
                    <div key={section.title}>
                      <h4 className="font-semibold text-foreground text-sm mb-3">{section.title}</h4>
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setToolkitOpen(false)}
                            className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <div className="hidden sm:flex items-center bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setTheme("system")}
                className={`p-1.5 rounded-md transition-colors ${theme === "system" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title="System"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setTheme("light")}
                className={`p-1.5 rounded-md transition-colors ${theme === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title="Light"
              >
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`p-1.5 rounded-md transition-colors ${theme === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                title="Dark"
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-9 w-9 rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm"
                style={{ background: "var(--gradient-primary)" }}
              >
                <User className="h-4 w-4" />
              </button>
              {profileOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-card border rounded-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-3 border-b border-border mb-1">
                    <p className="font-semibold text-foreground text-sm">Guest User ⭐</p>
                    <p className="text-xs text-muted-foreground">guest@investai.com</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link to="/portfolio" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Briefcase className="h-4 w-4" /> Portfolio
                  </Link>
                  <Link to="/discovery" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Bookmark className="h-4 w-4" /> Watchlists
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Settings className="h-4 w-4" /> Account
                  </button>
                  <div className="border-t border-border mt-1 pt-1">
                    {/* Mobile theme toggle */}
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="flex items-center bg-secondary rounded-lg p-0.5 sm:hidden">
                        <button onClick={() => setTheme("system")} className={`p-1.5 rounded-md ${theme === "system" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}><Monitor className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setTheme("light")} className={`p-1.5 rounded-md ${theme === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}><Sun className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setTheme("dark")} className={`p-1.5 rounded-md ${theme === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}><Moon className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-bearish hover:bg-secondary transition-colors">
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
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
          {mainNav.map(item => (
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
          <Link to="/market" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
            <TrendingUp className="h-4 w-4" /> Market Pulse
          </Link>
          <Link to="/tax" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
            <Calculator className="h-4 w-4" /> Tax Optimizer
          </Link>
          <Link to="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
            <Info className="h-4 w-4" /> About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
