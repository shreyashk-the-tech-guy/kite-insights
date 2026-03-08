import { Link } from "react-router-dom";
import { BarChart3, Github, Twitter, Linkedin, Heart } from "lucide-react";

const footerSections = [
  {
    title: "Analysis Tools",
    links: [
      { label: "Ask AI", href: "/" },
      { label: "Stock Analysis", href: "/" },
      { label: "Tax Optimizer", href: "/tax" },
      { label: "Technical Analysis", href: "/" },
      { label: "Fundamental Analysis", href: "/" },
    ],
  },
  {
    title: "Market Pulse",
    links: [
      { label: "Market Overview", href: "/market" },
      { label: "Top Gainers", href: "/market" },
      { label: "Top Losers", href: "/market" },
      { label: "Sector Performance", href: "/market" },
      { label: "FII/DII Activity", href: "/market" },
    ],
  },
  {
    title: "Discovery",
    links: [
      { label: "Stock Screener", href: "/discovery" },
      { label: "Sector Analysis", href: "/discovery" },
      { label: "Earnings Calendar", href: "/discovery" },
      { label: "IPO Tracker", href: "/discovery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/about" },
      { label: "MCP Architecture", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms of Service", href: "/about" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t bg-muted/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Main footer */}
      <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
              <BarChart3 className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">InvestAI</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            AI-powered stock research and analysis platform for Indian equities. Technical &amp; fundamental analysis powered by MCP architecture.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Sections */}
        {footerSections.map(section => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-foreground mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p className="flex items-center gap-1">Made with <Heart className="h-3 w-3 text-bearish" /> in India · AI Investment Advisor © 2026</p>
        <p>Prices may be delayed. For educational purposes only.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
