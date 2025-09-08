#!/usr/bin/env python3
"""
FX Conversion Simulator (Sprint 3 – Compliance & Risk)
- Loads latest FX rates (fx_data/fxrates.json)
- Derives inverses and crosses via AUD when needed
- Updates/saves balances (fx_data/balances.json)
- Estimates CO2 (fx_data/carbon_factors.json)
- Runs compliance checks (thresholds, velocity, sanctions mock)
- Appends enriched transaction record (fx_data/transactions_log.json)
- Writes audit events (fx_data/audit_log.json)

Usage:
  python3 ai/fx_conversion_sim.py <SRC> <DST> <AMOUNT>
  e.g. python3 ai/fx_conversion_sim.py USD AUD 200
"""

import json
import sys
import uuid
from collections import OrderedDict
from pathlib import Path
from datetime import datetime, timedelta

# ---------- Paths ----------
FX_RATES_PATH       = Path("fx_data/fxrates.json")
BALANCES_PATH       = Path("fx_data/balances.json")
CARBON_FACTORS_PATH = Path("fx_data/carbon_factors.json")
TX_LOG_PATH         = Path("fx_data/transactions_log.json")
AUDIT_LOG_PATH      = Path("fx_data/audit_log.json")

SUPPORTED = {"USD", "EUR", "AUD"}

# ---------- Compliance Config ----------
COMPLIANCE_CONFIG = {
    "amount_thresholds": {"review": 10_000.0, "blocked": 50_000.0},
    "velocity": {"window_seconds": 60, "min_count": 3, "scope": "by_src"},
    "sanctions": {"blocked_pairs": []}  # e.g. ["USD_RUS", "ANY_IRR"]
}

# ---------- JSON helpers ----------
def load_json_ordered(path: Path):
    with open(path, "r") as f:
        return json.load(f, object_pairs_hook=OrderedDict)

def load_json(path: Path, default):
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

def append_tx_log(entry: dict):
    log = load_json(TX_LOG_PATH, default=[])
    log.append(entry)
    save_json(TX_LOG_PATH, log)

def append_audit(event: dict):
    audit = load_json(AUDIT_LOG_PATH, default=[])
    audit.append(event)
    save_json(AUDIT_LOG_PATH, audit)

# ---------- FX rate helpers ----------
def latest_day_rates(fx):
    latest_date = max(fx.keys())
    return latest_date, fx[latest_date]

def _inv(x: float) -> float:
    return 1.0 / float(x)

def get_rate(day_rates: dict, src: str, dst: str) -> float:
    if src == dst:
        return 1.0
    direct_key = f"{src}_{dst}"
    if direct_key in day_rates:
        return float(day_rates[direct_key])

    usd_aud = day_rates.get("USD_AUD")
    eur_aud = day_rates.get("EUR_AUD")

    derived = {}
    if usd_aud:
        usd_aud = float(usd_aud)
        derived["USD_AUD"] = usd_aud
        derived["AUD_USD"] = _inv(usd_aud)
    if eur_aud:
        eur_aud = float(eur_aud)
        derived["EUR_AUD"] = eur_aud
        derived["AUD_EUR"] = _inv(eur_aud)
    if "USD_AUD" in derived and "EUR_AUD" in derived:
        derived["USD_EUR"] = derived["USD_AUD"] / derived["EUR_AUD"]
        derived["EUR_USD"] = _inv(derived["USD_EUR"])

    if direct_key in derived:
        return derived[direct_key]
    raise ValueError(f"No rate available for {src}->{dst}. Check fx_data/fxrates.json.")

# ---------- Carbon ----------
def load_carbon_factor(pair_key: str) -> float:
    factors = load_json(CARBON_FACTORS_PATH, default={})
    return float(factors.get(pair_key, 0.5))

def estimate_carbon_kg(amount_src: float, pair_key: str) -> float:
    factor = load_carbon_factor(pair_key)
    return (amount_src / 1000.0) * factor

def carbon_badge(kg: float) -> str:
    if kg < 0.5:
        return "Low"
    if kg < 2.0:
        return "Medium"
    return "High"

# ---------- Compliance ----------
def _now() -> datetime:
    return datetime.utcnow()

def _parse_iso(ts: str):
    if ts.endswith("Z"):
        ts = ts[:-1]
    return datetime.fromisoformat(ts)

def recent_tx_count(window_seconds: int, scope: str, src: str, dst: str) -> int:
    log = load_json(TX_LOG_PATH, default=[])
    cutoff = _now() - timedelta(seconds=window_seconds)
    n = 0
    for t in reversed(log[-200:]):  # check last 200
        try:
            ts = _parse_iso(t.get("timestamp", ""))
        except Exception:
            continue
        if ts < cutoff:
            continue
        if scope == "any":
            n += 1
        elif scope == "by_src" and t.get("pair", "").startswith(f"{src}_"):
            n += 1
        elif scope == "by_pair" and t.get("pair") == f"{src}_{dst}":
            n += 1
    return n

def sanctions_hit(src: str, dst: str) -> bool:
    blocked = set(COMPLIANCE_CONFIG["sanctions"]["blocked_pairs"])
    return f"{src}_{dst}" in blocked or f"ANY_{dst}" in blocked or f"{src}_ANY" in blocked

def compliance_check(amount_src: float, src: str, dst: str) -> dict:
    status, reason, rules = "clear", "within limits", []
    if sanctions_hit(src, dst):
        return {"status": "blocked", "reason": "sanctions pair blacklist", "rules_triggered": ["sanctions_block"]}

    if amount_src > COMPLIANCE_CONFIG["amount_thresholds"]["blocked"]:
        return {"status": "blocked", "reason": "amount > blocked threshold", "rules_triggered": ["threshold_blocked"]}
    if amount_src > COMPLIANCE_CONFIG["amount_thresholds"]["review"]:
        status, reason = "review", "amount > review threshold"
        rules.append("threshold_review")

    count = recent_tx_count(COMPLIANCE_CONFIG["velocity"]["window_seconds"],
                            COMPLIANCE_CONFIG["velocity"]["scope"], src, dst)
    if count >= COMPLIANCE_CONFIG["velocity"]["min_count"]:
        if status == "review":
            status, reason = "blocked", f"{reason} + velocity"
            rules.append("velocity")
        else:
            status, reason = "review", f"velocity >= {COMPLIANCE_CONFIG['velocity']['min_count']} in window"
            rules.append("velocity")

    return {"status": status, "reason": reason, "rules_triggered": rules}

# ---------- Formatting ----------
def fmt_money(x: float) -> str:
    return f"{x:,.2f}"

def fmt_kg(x: float) -> str:
    return f"{x:.2f} kg CO₂"

# ---------- Core simulation ----------
def simulate(src: str, dst: str, amount: float):
    fx_all = load_json_ordered(FX_RATES_PATH)
    latest_date, day_rates = latest_day_rates(fx_all)
    balances = load_json(BALANCES_PATH, default={"USD": 1000.0, "EUR": 1000.0, "AUD": 1000.0})

    src, dst = src.upper().strip(), dst.upper().strip()
    if src not in SUPPORTED or dst not in SUPPORTED:
        raise ValueError(f"Only {sorted(SUPPORTED)} supported right now.")
    if amount <= 0:
        raise ValueError("Amount must be positive.")
    if balances.get(src, 0.0) < amount:
        raise ValueError(f"Insufficient {src} balance. Have {balances.get(src,0.0)}, need {amount}.")

    rate = get_rate(day_rates, src, dst)
    received = round(amount * rate, 2)
    before = balances.copy()

    # Compliance + carbon
    pair_key = f"{src}_{dst}"
    co2_kg = estimate_carbon_kg(amount, pair_key)
    badge = carbon_badge(co2_kg)
    comp = compliance_check(amount, src, dst)

    if comp["status"] == "blocked":
        tx_entry = {
            "tx_id": uuid.uuid4().hex,
            "timestamp": datetime.utcnow().isoformat(timespec="seconds") + "Z",
            "fx_date_used": latest_date,
            "pair": pair_key,
            "rate": round(rate, 6),
            "amount_src": round(amount, 2),
            "amount_dst": 0.0,
            "balances_before": before,
            "balances_after": before,
            "carbon": {"kg": round(co2_kg, 2), "badge": badge},
            "compliance": comp
        }
        append_tx_log(tx_entry)
        append_audit({"event_id": uuid.uuid4().hex, "timestamp": datetime.utcnow().isoformat(timespec="seconds")+"Z",
                      "event": "conversion_attempt", "pair": pair_key, "amount_src": round(amount, 2),
                      "status": "blocked", "reason": comp["reason"], "rules": comp["rules_triggered"]})
        print(f"[BLOCKED] {src}->{dst} {fmt_money(amount)} | Reason: {comp['reason']}")
        return

    # Apply conversion
    balances[src] = round(balances[src] - amount, 2)
    balances[dst] = round(balances.get(dst, 0.0) + received, 2)

    tx_entry = {
        "tx_id": uuid.uuid4().hex,
        "timestamp": datetime.utcnow().isoformat(timespec="seconds") + "Z",
        "fx_date_used": latest_date,
        "pair": pair_key,
        "rate": round(rate, 6),
        "amount_src": round(amount, 2),
        "amount_dst": received,
        "balances_before": before,
        "balances_after": balances,
        "carbon": {"kg": round(co2_kg, 2), "badge": badge},
        "compliance": comp
    }
    save_json(BALANCES_PATH, balances)
    append_tx_log(tx_entry)
    append_audit({"event_id": uuid.uuid4().hex, "timestamp": datetime.utcnow().isoformat(timespec="seconds")+"Z",
                  "event": "conversion_settled", "pair": pair_key, "amount_src": round(amount, 2),
                  "status": comp["status"], "reason": comp["reason"], "rules": comp["rules_triggered"]})

    print("[FX Conversion Simulation]")
    print(f"Date used: {latest_date}")
    print(f"Rate {src}->{dst}: {rate:.6f}")
    print(f"Amount: {fmt_money(amount)} {src} → {fmt_money(received)} {dst}")
    print(f"Carbon: {fmt_kg(co2_kg)} ({badge}) | Compliance: {comp['status'].upper()} ({comp['reason']})")

# ---------- CLI ----------
def main():
    if len(sys.argv) != 4:
        print("Usage: python3 ai/fx_conversion_sim.py <SRC> <DST> <AMOUNT>")
        sys.exit(1)
    src, dst, amount_str = sys.argv[1], sys.argv[2], sys.argv[3]
    try:
        amount = float(amount_str)
    except ValueError:
        print("AMOUNT must be a number")
        sys.exit(1)
    simulate(src, dst, amount)

if __name__ == "__main__":
    main()
