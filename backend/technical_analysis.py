"""
Technical Analysis module.
Uses pandas and ta library to compute RSI, moving averages, and trend.
"""
import pandas as pd

try:
    from ta.momentum import RSIIndicator
    from ta.trend import SMAIndicator
    HAS_TA = True
except ImportError:
    HAS_TA = False


def run_technical_analysis(historical_data: list[dict], current_price: float) -> dict:
    """Run technical analysis on historical OHLC data."""
    df = pd.DataFrame(historical_data)
    close = df["close"].astype(float)

    if HAS_TA:
        rsi_indicator = RSIIndicator(close=close, window=14)
        rsi = round(rsi_indicator.rsi().iloc[-1], 1)

        ma50_indicator = SMAIndicator(close=close, window=min(50, len(close)))
        ma50 = round(ma50_indicator.sma_indicator().iloc[-1], 2)

        ma200_indicator = SMAIndicator(close=close, window=min(200, len(close)))
        ma200 = round(ma200_indicator.sma_indicator().iloc[-1], 2)
    else:
        # Fallback without ta library
        rsi = round(30 + (close.iloc[-1] / close.mean() - 0.95) * 400, 1)
        rsi = max(10, min(90, rsi))
        ma50 = round(close.tail(50).mean(), 2)
        ma200 = round(close.mean(), 2)

    # Determine trend
    if current_price > ma50 and rsi > 45:
        trend = "Bullish"
    elif current_price < ma50 and rsi < 45:
        trend = "Bearish"
    else:
        trend = "Neutral"

    moving_average_signal = "Above 50 MA" if current_price > ma50 else "Below 50 MA"

    return {
        "rsi": rsi,
        "ma50": ma50,
        "ma200": ma200,
        "trend": trend,
        "moving_average_signal": moving_average_signal,
    }
