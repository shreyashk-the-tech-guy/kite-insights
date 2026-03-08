import { motion } from "framer-motion";
import { Search, Eye, TrendingUp, Star, LayoutGrid, List, ChevronDown } from "lucide-react";
import { useState } from "react";

interface ThemeBucket {
  title: string;
  description: string;
  views: string;
  trending: boolean;
  companies: number;
  sampleStocks: string[];
  updatedAt: string;
  icon: string;
}

const buckets: ThemeBucket[] = [
  {
    title: "Artificial Intelligence (AI)",
    description: "Companies that develop AI models, platforms, or AI-driven products and services which analyze data, automate tasks, or deliver decision support across industries.",
    views: "3.8k",
    trending: true,
    companies: 182,
    sampleStocks: ["HCLTECH", "INFY", "TCS"],
    updatedAt: "March 1, 2026",
    icon: "🤖",
  },
  {
    title: "Capacity Expansion",
    description: "Companies investing heavily in expanding manufacturing capacity, building new plants, or scaling production facilities to meet growing demand.",
    views: "4.1k",
    trending: true,
    companies: 1064,
    sampleStocks: ["ADANIPORTS", "GRASIM", "JSWSTEEL"],
    updatedAt: "March 5, 2026",
    icon: "🏭",
  },
  {
    title: "Solar Energy",
    description: "Companies involved in solar power generation, manufacturing solar panels, or providing solar energy solutions for residential, commercial, and industrial use.",
    views: "3.8k",
    trending: true,
    companies: 89,
    sampleStocks: ["NTPC", "WAAREEENER", "CESC"],
    updatedAt: "February 28, 2026",
    icon: "☀️",
  },
  {
    title: "Strategic Partnerships",
    description: "Companies that have formed significant strategic alliances, joint ventures, or partnerships to expand market reach, share technology, or co-develop products.",
    views: "3.6k",
    trending: true,
    companies: 901,
    sampleStocks: ["COALINDIA", "GRASIM", "NESTLEIND"],
    updatedAt: "March 3, 2026",
    icon: "🤝",
  },
  {
    title: "Electric Vehicles (EV)",
    description: "Companies manufacturing electric vehicles, EV components, charging infrastructure, or providing related technology and services for the growing EV ecosystem.",
    views: "2.7k",
    trending: false,
    companies: 91,
    sampleStocks: ["BAJAJ-AUTO", "HEROMOTOCO", "TATAMOTORS"],
    updatedAt: "February 25, 2026",
    icon: "⚡",
  },
  {
    title: "3D Printing",
    description: "Companies whose primary business is industrial additive manufacturing, including selling 3D printers, materials, or large-scale printing services.",
    views: "2.6k",
    trending: true,
    companies: 5,
    sampleStocks: ["BASILIC", "DIGIKORE", "PHANTOMFX"],
    updatedAt: "February 19, 2026",
    icon: "🖨️",
  },
  {
    title: "VFX and Animation",
    description: "Companies specializing in visual effects, animation production, motion capture, and digital content creation for film, television, and gaming industries.",
    views: "3.3k",
    trending: false,
    companies: 5,
    sampleStocks: ["BASILIC", "DIGIKORE", "PHANTOMFX"],
    updatedAt: "March 2, 2026",
    icon: "🎬",
  },
  {
    title: "5G Technology",
    description: "Companies involved in building 5G network equipment or infrastructure, or in creating 5G-enabled products and services that support faster wireless connectivity.",
    views: "1.9k",
    trending: false,
    companies: 14,
    sampleStocks: ["BHARTIARTL", "RELIANCE", "HCLTECH"],
    updatedAt: "February 15, 2026",
    icon: "📡",
  },
  {
    title: "Battery Technology",
    description: "Companies that design, develop, or manufacture battery cells, modules, or full energy storage systems, or that operate large-scale battery production facilities.",
    views: "1.6k",
    trending: false,
    companies: 38,
    sampleStocks: ["EXIDEIND", "AMARAJABAT", "TABORAELE"],
    updatedAt: "February 22, 2026",
    icon: "🔋",
  },
  {
    title: "Major Contract Wins",
    description: "Companies that have recently won significant contracts or orders, indicating strong future revenue visibility and business momentum.",
    views: "2.1k",
    trending: false,
    companies: 383,
    sampleStocks: ["LT", "BEL", "HAL"],
    updatedAt: "March 6, 2026",
    icon: "📋",
  },
  {
    title: "Mergers & Acquisitions",
    description: "Companies involved in recent mergers, acquisitions, or takeover activities that could reshape their market position and competitive landscape.",
    views: "1.8k",
    trending: false,
    companies: 479,
    sampleStocks: ["ADANIENT", "RELIANCE", "TATACOMM"],
    updatedAt: "March 4, 2026",
    icon: "🔄",
  },
  {
    title: "Space Technology",
    description: "Companies engaged in satellite manufacturing, launch services, space exploration technology, or providing space-based data and communication services.",
    views: "1.4k",
    trending: false,
    companies: 17,
    sampleStocks: ["HAL", "BEL", "CENTUMELE"],
    updatedAt: "February 20, 2026",
    icon: "🚀",
  },
  {
    title: "Agriculture Technology",
    description: "Companies that offer technology for farming — such as precision sensors, automation, analytics, or smart irrigation systems — that help farmers increase yields.",
    views: "1.3k",
    trending: false,
    companies: 20,
    sampleStocks: ["UPL", "PI", "RALLIS"],
    updatedAt: "February 26, 2026",
    icon: "🌾",
  },
  {
    title: "Blockchain Technology",
    description: "Companies developing or leveraging blockchain and distributed ledger technology for applications in finance, supply chain, and digital identity.",
    views: "1.1k",
    trending: false,
    companies: 8,
    sampleStocks: ["INFY", "TCS", "WIPRO"],
    updatedAt: "February 18, 2026",
    icon: "⛓️",
  },
  {
    title: "Excellent Order Book",
    description: "Companies with outstanding order books that indicate strong future revenue and sustained demand across infrastructure, defense, and industrial sectors.",
    views: "2.3k",
    trending: false,
    companies: 446,
    sampleStocks: ["LT", "BEL", "BHEL"],
    updatedAt: "March 7, 2026",
    icon: "📒",
  },
  {
    title: "Biotechnology",
    description: "Companies engaged in discovering, developing, or commercializing biological drugs, therapies, or diagnostic tests through lab work, clinical trials, and regulatory review.",
    views: "1.2k",
    trending: false,
    companies: 33,
    sampleStocks: ["BIOCON", "DIVISLAB", "LALPATHLAB"],
    updatedAt: "March 6, 2026",
    icon: "🧬",
  },
];

const Discovery = () => {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [bucketType, setBucketType] = useState("All");

  const filtered = buckets.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">
            Trending Stock Market Discoveries
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore investment themes, sectors, and emerging trends across the Indian stock market
          </p>
        </motion.div>

        {/* Search & Controls */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or description"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-card border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-card border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <select
                value={bucketType}
                onChange={e => setBucketType(e.target.value)}
                className="appearance-none h-11 pl-4 pr-10 rounded-xl bg-card border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
              >
                <option value="All">Bucket Type</option>
                <option value="Trending">Trending</option>
                <option value="Technology">Technology</option>
                <option value="Energy">Energy</option>
                <option value="Corporate">Corporate</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </motion.div>

        {/* Bucket Cards Grid */}
        <div className={viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          : "flex flex-col gap-4"
        }>
          {filtered.map((bucket, i) => (
            <motion.div
              key={bucket.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group card-elevated p-5 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top row: views + trending */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-3 w-3" />
                      {bucket.views} views
                    </span>
                    {bucket.trending && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-bullish bg-bullish/10 px-2 py-0.5 rounded-full">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  <button className="h-8 w-8 rounded-full bg-warning/20 text-warning flex items-center justify-center hover:bg-warning/30 transition-colors">
                    <Star className="h-4 w-4" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {bucket.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                  {bucket.description}
                </p>
              </div>

              {/* Bottom section */}
              <div className="mt-5">
                {/* Updated date */}
                <div className="flex items-center gap-1.5 text-xs mb-3">
                  <span className="h-2 w-2 rounded-full bg-bullish animate-pulse" />
                  <span className="text-bullish font-medium">Updated at {bucket.updatedAt}</span>
                </div>

                {/* Company avatars + count */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {bucket.sampleStocks.slice(0, 3).map((stock, j) => (
                      <div
                        key={stock}
                        className="h-7 w-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[9px] font-bold text-foreground"
                        title={stock}
                      >
                        {stock.slice(0, 2)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {bucket.companies} companies
                  </span>
                </div>
              </div>

              {/* Decorative icon */}
              <div className="absolute bottom-4 right-4 text-4xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                {bucket.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No discoveries match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Discovery;
