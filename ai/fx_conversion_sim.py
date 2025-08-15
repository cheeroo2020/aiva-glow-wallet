import json
import sys
from collections import OrderedDict
from pathlib import Path

FX_RATES_PATH = Path("fx_data/fxrates.json")
BALANCES_PATH = Path("fx_data/balances.json")

SUPPORTED = {"USD", "EUR", "AUD"}

def load_json_ordered(path: Path):
    with open(path, "r") as f:
        data = json.load(f, object_pairs_hook=OrderedDict)
    return data

def latest_day_rates(fx):
    # fx is a dict of date -> {pair: rate}
    # dates are ISO strings; max() gets the latest
    latest_date = max(fx.keys())
    return latest_date, fx[latest_date]

def get_rate(day_rates: dict, src: str, dst: str):
    """
    We expect fxrates.json to include:
      - USD_AUD
      - EUR_AUD
    We derive missing inverses, e.g., AUD_USD = 1 / USD_AUD
    And cross rates via AUD (pivot), e.g., USD_EUR = USD_AUD / EUR_AUD
    """
    if src == dst:
        return 1.0

    # Helper to read a direct pair if present
    def direct(pair):
        return day_rates.get(pair, None)

    # Try direct
    direct_key = f"{src}_{dst}"
    r = direct(direct_key)
    if r is not None:
        return float(r)

    # Build via AUD pivot if possible
    # Known base pairs in your mock: USD_AUD and EUR_AUD
    # We compute inverses and crosses as needed.
    def inv(x):  # safe inverse
        return 1.0 / float(x)

    USD_AUD = day_rates.get("USD_AUD", None)
    EUR_AUD = day_rates.get("EUR_AUD", None)

    # Precompute a small table of available/derived rates
    derived = {}
    if USD_AUD is not None:
        derived["USD_AUD"] = float(USD_AUD)
        derived["AUD_USD"] = inv(USD_AUD)
    if EUR_AUD is not None:
        derived["EUR_AUD"] = float(EUR_AUD)
        derived["AUD_EUR"] = inv(EUR_AUD)

    # Crosses via AUD if both known
    if ("USD_AUD" in derived) and ("EUR_AUD" in derived):
        # USD_EUR = USD_AUD / EUR_AUD (because both are quoted vs AUD)
        derived["USD_EUR"] = derived["USD_AUD"] / derived["EUR_AUD"]
        derived["EUR_USD"] = 1.0 / derived["USD_EUR"]

    # Try to return from derived
    key = f"{src}_{dst}"
    if key in derived:
        return derived[key]

    raise ValueError(f"No rate available for {src}->{dst}. Check fx_data/fxrates.json pairs.")

def load_balances(path: Path):
    with open(path, "r") as f:
        return json.load(f)

def save_balances(path: Path, balances: dict):
    with open(path, "w") as f:
        json.dump(balances, f, indent=2)

def fmt_money(x):  # simple formatting
    return f"{x:,.2f}"

def simulate(src: str, dst: str, amount: float):
    # Load data
    fx_all = load_json_ordered(FX_RATES_PATH)
    latest_date, day_rates = latest_day_rates(fx_all)
    balances = load_balances(BALANCES_PATH)

    # Basic checks
    src = src.upper(); dst = dst.upper()
    if src not in SUPPORTED or dst not in SUPPORTED:
        raise ValueError(f"Only {SUPPORTED} supported right now.")
    if amount <= 0:
        raise ValueError("Amount must be positive.")
    if balances.get(src, 0.0) < amount:
        raise ValueError(f"Insufficient {src} balance. Have {balances.get(src,0.0)}, need {amount}.")

    # Rate lookup
    rate = get_rate(day_rates, src, dst)
    received = amount * rate

    # Before snapshot
    before = balances.copy()

    # Apply conversion
    balances[src] = round(balances[src] - amount, 2)
    balances[dst] = round(balances.get(dst, 0.0) + received, 2)

    # Output
    print("[FX Conversion Simulation]")
    print(f"Date used: {latest_date}")
    print(f"Rate {src}->{dst}: {rate:.6f}")
    print(f"Amount: {fmt_money(amount)} {src}  →  {fmt_money(received)} {dst}\n")

    print("Before:")
    print(f"  USD {fmt_money(before.get('USD',0))} | EUR {fmt_money(before.get('EUR',0))} | AUD {fmt_money(before.get('AUD',0))}")

    print("\nAfter:")
    print(f"  USD {fmt_money(balances.get('USD',0))} | EUR {fmt_money(balances.get('EUR',0))} | AUD {fmt_money(balances.get('AUD',0))}")

    # Save updated balances
    save_balances(BALANCES_PATH, balances)

def main():
    # CLI usage:
    #   python3 ai/fx_conversion_sim.py USD AUD 200
    if len(sys.argv) != 4:
        print("Usage: python3 ai/fx_conversion_sim.py <SRC> <DST> <AMOUNT>")
        print("Example: python3 ai/fx_conversion_sim.py USD AUD 200")
        sys.exit(1)
    src, dst, amount_str = sys.argv[1], sys.argv[2], sys.argv[3]
    try:
        amount = float(amount_str)
    except ValueError:
        print("AMOUNT must be a number, e.g., 200 or 150.50")
        sys.exit(1)

    simulate(src, dst, amount)

if __name__ == "__main__":
    main()
