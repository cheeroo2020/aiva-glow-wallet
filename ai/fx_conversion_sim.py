#!/usr/bin/env python3
"""
FX Conversion Simulator
- Loads latest FX rates (fx_data/fxrates.json)
- Derives inverses and crosses via AUD when needed
- Updates/saves balances (fx_data/balances.json)
- Estimates CO2 (fx_data/carbon_factors.json)
- Runs a simple compliance check
- Appends a transaction record (fx_data/transactions_sample.json)

Usage:
  python3 ai/fx_conversion_sim.py <SRC> <DST> <AMOUNT>
  e.g. python3 ai/fx_conversion_sim.py USD AUD 200
"""

import json
import sys
from collections import OrderedDict
from pathlib import Path
from datetime import datetime

# ---------- Paths ----------
FX_RATES_PATH         = Path("fx_data/fxrates.json")
BALANCES_PATH         = Path("fx_data/balances.json")
CARBON_FACTORS_PATH   = Path("fx_data/carbon_factors.json")
TX_LOG_PATH           = Path("fx_data/transactions_sample.json")

SUPPORTED = {"USD", "EUR", "AUD"}


# ---------- Small JSON helpers ----------
def load_json_ordered(path: Path):
    """Load JSON preserving order (useful for date->rates mapping)."""
    with open(path, "r") as f:
        return json.load(f, object_pairs_hook=OrderedDict)

def load_json(path: Path, default):
    """Load JSON (or return default if file missing/empty)."""
    if not path.exists():
        return default
    try:
        with open(path, "r") as f:
            return json.load(f)
    except json.JSONDecodeError:
        return default

def save_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)


# ---------- FX rate helpers ----------
def latest_day_rates(fx):
    """
    fx is a dict like:
    {
      "2025-08-01": {"USD_AUD": 1.52, "EUR_AUD": 1.66},
      ...
    }
    """
    latest_date = max(fx.keys())
    return latest_date, fx[latest_date]

def _inv(x: float) -> float:
    return 1.0 / float(x)

def get_rate(day_rates: dict, src: str, dst: str) -> float:
    """
    We expect fxrates.json to include base pairs quoted vs AUD:
      - USD_AUD
      - EUR_AUD
    We derive:
      - inverses: AUD_USD, AUD_EUR
      - crosses via AUD: USD_EUR, EUR_USD
    Also returns direct pairs if present (e.g., USD_AUD).
    """
    if src == dst:
        return 1.0

    # 1) direct
    direct_key = f"{src}_{dst}"
    if direct_key in day_rates:
        return float(day_rates[direct_key])

    # 2) build a small derived table from USD_AUD / EUR_AUD if present
    usd_aud = day_rates.get("USD_AUD")
    eur_aud = day_rates.get("EUR_AUD")

    derived = {}
    if usd_aud is not None:
        usd_aud = float(usd_aud)
        derived["USD_AUD"] = usd_aud
        derived["AUD_USD"] = _inv(usd_aud)

    if eur_aud is not None:
        eur_aud = float(eur_aud)
        derived["EUR_AUD"] = eur_aud
        derived["AUD_EUR"] = _inv(eur_aud)

    # crosses if both known
    if ("USD_AUD" in derived) and ("EUR_AUD" in derived):
        derived["USD_EUR"] = derived["USD_AUD"] / derived["EUR_AUD"]
        derived["EUR_USD"] = _inv(derived["USD_EUR"])

    # return from derived if available
    if direct_key in derived:
        return derived[direct_key]

    raise ValueError(f"No rate available for {src}->{dst}. "
                     f"Check fx_data/fxrates.json pairs (need USD_AUD and/or EUR_AUD).")


# ---------- Carbon + Compliance ----------
def load_carbon_factor(pair_key: str) -> float:
    """
    Reads fx_data/carbon_factors.json expecting keys like "USD_AUD": 0.42
    Returns a default if missing.
    """
    factors = load_json(CARBON_FACTORS_PATH, default={})
    return float(factors.get(pair_key, 0.5))  # fallback default

def estimate_carbon_kg(amount_src: float, pair_key: str) -> float:
    """
    Very simple model: linear factor per 1000 units converted.
    E.g., factor=0.42 means 0.42 kg CO2 per 1000 source currency units.
    """
    factor = load_carbon_factor(pair_key)
    return (amount_src / 1000.0) * factor

def carbon_badge(kg: float) -> str:
    if kg < 0.5:
        return "Low"
    if kg < 2.0:
        return "Medium"
    return "High"

def compliance_check(amount_src: float, src: str, dst: str) -> str:
    """
    Minimal stub:
    - amounts > 10,000 require review
    - you can extend with per‑currency rules, velocity checks, etc.
    """
    if amount_src > 10_000:
        return "Review"
    return "Clear"


# ---------- Formatting ----------
def fmt_money(x: float) -> str:
    return f"{x:,.2f}"

def fmt_kg(x: float) -> str:
    return f"{x:.2f} kg CO₂"


# ---------- Core simulation ----------
def simulate(src: str, dst: str, amount: float):
    # Load FX + latest date
    fx_all = load_json_ordered(FX_RATES_PATH)
    latest_date, day_rates = latest_day_rates(fx_all)

    # Load balances
    balances = load_json(BALANCES_PATH, default={"USD": 1000.0, "EUR": 1000.0, "AUD": 1000.0})

    # Basic checks
    src = src.upper().strip()
    dst = dst.upper().strip()

    if src not in SUPPORTED or dst not in SUPPORTED:
        raise ValueError(f"Only {sorted(SUPPORTED)} supported right now.")
    if amount <= 0:
        raise ValueError("Amount must be positive.")
    if balances.get(src, 0.0) < amount:
        raise ValueError(f"Insufficient {src} balance. Have {balances.get(src,0.0)}, need {amount}.")

    # Rate lookup
    rate = get_rate(day_rates, src, dst)
    received = round(amount * rate, 2)

    # Snapshot before
    before = balances.copy()

    # Apply conversion
    balances[src] = round(balances[src] - amount, 2)
    balances[dst] = round(balances.get(dst, 0.0) + received, 2)

    # Carbon + Compliance
    pair_key = f"{src}_{dst}"
    co2_kg = estimate_carbon_kg(amount, pair_key)
    badge = carbon_badge(co2_kg)
    compliance = compliance_check(amount, src, dst)

    # Append transaction
    tx_log = load_json(TX_LOG_PATH, default=[])
    tx_entry = {
        "timestamp": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "fx_date_used": latest_date,
        "pair": pair_key,
        "rate": round(rate, 6),
        "amount_src": round(amount, 2),
        "amount_dst": received,
        "balances_before": {
            "USD": before.get("USD", 0.0),
            "EUR": before.get("EUR", 0.0),
            "AUD": before.get("AUD", 0.0),
        },
        "balances_after": {
            "USD": balances.get("USD", 0.0),
            "EUR": balances.get("EUR", 0.0),
            "AUD": balances.get("AUD", 0.0),
        },
        "carbon": {
            "kg": round(co2_kg, 2),
            "badge": badge
        },
        "compliance": compliance
    }
    tx_log.append(tx_entry)

    # Persist changes
    save_json(BALANCES_PATH, balances)
    save_json(TX_LOG_PATH, tx_log)

    # ---- Output ----
    print("[FX Conversion Simulation]")
    print(f"Date used: {latest_date}")
    print(f"Rate {src}->{dst}: {rate:.6f}")
    print(f"Amount: {fmt_money(amount)} {src}  →  {fmt_money(received)} {dst}\n")

    print("Before:")
    print(f"  USD {fmt_money(before.get('USD',0))} | "
          f"EUR {fmt_money(before.get('EUR',0))} | "
          f"AUD {fmt_money(before.get('AUD',0))}")

    print("\nAfter:")
    print(f"  USD {fmt_money(balances.get('USD',0))} | "
          f"EUR {fmt_money(balances.get('EUR',0))} | "
          f"AUD {fmt_money(balances.get('AUD',0))}")

    print("\nImpact & Controls:")
    print(f"  Carbon: {fmt_kg(co2_kg)}  ({badge})  |  Compliance: {compliance}")

    print("\nOne‑liner:")
    print(f"  {src}->{dst} @ {rate:.4f} | {fmt_money(amount)} {src} → {fmt_money(received)} {dst} "
          f"| CO₂ {fmt_kg(co2_kg)} ({badge}) | {compliance}")


# ---------- CLI ----------
def main():
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
