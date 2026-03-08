"""
Fundamental Analysis module.
Uses static data for demo; can be extended with free APIs.
"""

FUNDAMENTAL_DATA = {
    "RELIANCE": {"pe": 28, "sector_pe": 24, "roe": 18, "sector": "Oil & Gas"},
    "TCS": {"pe": 32, "sector_pe": 28, "roe": 40, "sector": "IT Services"},
    "INFY": {"pe": 26, "sector_pe": 28, "roe": 32, "sector": "IT Services"},
    "HDFCBANK": {"pe": 20, "sector_pe": 22, "roe": 16, "sector": "Banking"},
    "WIPRO": {"pe": 22, "sector_pe": 28, "roe": 15, "sector": "IT Services"},
    "ICICIBANK": {"pe": 18, "sector_pe": 22, "roe": 15, "sector": "Banking"},
    "SBIN": {"pe": 10, "sector_pe": 12, "roe": 14, "sector": "Banking"},
    "TATAMOTORS": {"pe": 8, "sector_pe": 15, "roe": 22, "sector": "Automobile"},
    "BAJFINANCE": {"pe": 35, "sector_pe": 28, "roe": 20, "sector": "Finance"},
    "ITC": {"pe": 25, "sector_pe": 30, "roe": 28, "sector": "FMCG"},
}


def run_fundamental_analysis(symbol: str) -> dict:
    """Run fundamental analysis for a given stock symbol."""
    symbol = symbol.upper()
    data = FUNDAMENTAL_DATA.get(symbol)
    if not data:
        return {
            "pe_ratio": 0,
            "sector_pe": 0,
            "roe": 0,
            "valuation": "Data not available",
        }

    pe = data["pe"]
    sector_pe = data["sector_pe"]
    diff = pe - sector_pe

    if diff > 5:
        valuation = "Overvalued"
    elif diff > 0:
        valuation = "Slightly Overvalued"
    elif diff > -3:
        valuation = "Fairly Valued"
    else:
        valuation = "Undervalued"

    return {
        "pe_ratio": pe,
        "sector_pe": sector_pe,
        "roe": data["roe"],
        "valuation": valuation,
    }
