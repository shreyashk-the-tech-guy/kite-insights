"""
Zerodha Kite API integration tools.
Requires KITE_API_KEY and KITE_ACCESS_TOKEN environment variables.
"""
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

# Try importing kiteconnect; fall back to mock if not available
try:
    from kiteconnect import KiteConnect

    kite = KiteConnect(api_key=os.getenv("KITE_API_KEY", ""))
    kite.set_access_token(os.getenv("KITE_ACCESS_TOKEN", ""))
    USE_MOCK = False
except Exception:
    USE_MOCK = True

# Mock data for demo when Kite is not configured
MOCK_PRICES = {
    "RELIANCE": 2850, "TCS": 3920, "INFY": 1580,
    "HDFCBANK": 1620, "WIPRO": 480, "ICICIBANK": 1050,
    "SBIN": 625, "TATAMOTORS": 720, "BAJFINANCE": 7200, "ITC": 445,
}


def get_stock_price(symbol: str) -> float:
    """Fetch current stock price."""
    symbol = symbol.upper()
    if USE_MOCK:
        if symbol not in MOCK_PRICES:
            raise ValueError(f"Symbol {symbol} not found")
        return MOCK_PRICES[symbol]

    instrument = f"NSE:{symbol}"
    ltp_data = kite.ltp(instrument)
    return ltp_data[instrument]["last_price"]


def get_historical_data(symbol: str, days: int = 100) -> list[dict]:
    """Fetch historical OHLC data for the last N days."""
    symbol = symbol.upper()
    if USE_MOCK:
        import random
        base = MOCK_PRICES.get(symbol, 1000)
        data = []
        for i in range(days):
            price = base * (0.9 + random.random() * 0.2)
            data.append({
                "date": (datetime.now() - timedelta(days=days - i)).isoformat(),
                "open": round(price, 2),
                "high": round(price * 1.02, 2),
                "low": round(price * 0.98, 2),
                "close": round(price * (0.99 + random.random() * 0.02), 2),
                "volume": random.randint(100000, 5000000),
            })
        return data

    instrument_token = _get_instrument_token(symbol)
    to_date = datetime.now()
    from_date = to_date - timedelta(days=days)
    return kite.historical_data(instrument_token, from_date, to_date, "day")


def _get_instrument_token(symbol: str) -> int:
    """Look up instrument token for a symbol."""
    instruments = kite.instruments("NSE")
    for inst in instruments:
        if inst["tradingsymbol"] == symbol:
            return inst["instrument_token"]
    raise ValueError(f"Instrument token not found for {symbol}")
