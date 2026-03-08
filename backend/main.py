from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from mcp_server import call_tool
from technical_analysis import run_technical_analysis
from fundamental_analysis import run_fundamental_analysis

app = FastAPI(title="AI Investment Advisor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def generate_recommendation(tech: dict, fund: dict) -> str:
    trend = tech.get("trend", "Neutral")
    valuation = fund.get("valuation", "Unknown")

    if trend == "Bullish" and valuation in ("Fairly Valued", "Undervalued"):
        return "Strong Buy — Bullish momentum with attractive valuation."
    if trend == "Bullish" and valuation == "Slightly Overvalued":
        return "Hold — Bullish momentum but slightly expensive valuation."
    if trend == "Bullish" and valuation == "Overvalued":
        return "Caution — Strong price action but expensive valuation."
    if trend == "Bearish":
        return "Avoid — Bearish trend detected. Wait for reversal signals."
    return "Neutral — No strong directional signal. Monitor for breakout."


@app.get("/analyze")
def analyze(symbol: str = Query(..., description="NSE stock symbol")):
    # Step 1: Fetch data via MCP tool layer
    price = call_tool("get_stock_price", symbol=symbol)
    historical = call_tool("get_historical_data", symbol=symbol)

    # Step 2: Run analysis
    tech = run_technical_analysis(historical, price)
    fund = run_fundamental_analysis(symbol)

    # Step 3: Generate recommendation
    recommendation = generate_recommendation(tech, fund)

    return {
        "symbol": symbol.upper(),
        "price": price,
        "technical_analysis": {
            "trend": tech["trend"],
            "rsi": tech["rsi"],
            "moving_average_signal": tech["moving_average_signal"],
        },
        "fundamental_analysis": {
            "pe_ratio": fund["pe_ratio"],
            "sector_pe": fund["sector_pe"],
            "roe": fund["roe"],
            "valuation": fund["valuation"],
        },
        "recommendation": recommendation,
    }
