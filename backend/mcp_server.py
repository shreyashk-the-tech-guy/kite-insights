"""
MCP Tool Server — acts as a tool registry for the AI Investment Advisor.
Maps tool names to callable functions.
"""
from kite_tools import get_stock_price, get_historical_data

tools = {
    "get_stock_price": get_stock_price,
    "get_historical_data": get_historical_data,
}


def call_tool(tool_name: str, **kwargs):
    """Call a registered MCP tool by name."""
    if tool_name not in tools:
        raise ValueError(f"Unknown tool: {tool_name}. Available: {list(tools.keys())}")
    return tools[tool_name](**kwargs)
