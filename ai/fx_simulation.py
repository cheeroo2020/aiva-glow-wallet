# fx_simulation.py

# Mock balances: how much money we start with
balances = {
    "AUD": 1000.0,   # 1000 Australian dollars
    "USD": 500.0,    # 500 US dollars
    "EUR": 300.0     # 300 Euros
}

# Mock FX rates: conversion rates between currencies
fx_rates = {
    ("AUD", "USD"): 0.66,   # 1 AUD = 0.66 USD
    ("USD", "AUD"): 1.52,   # 1 USD = 1.52 AUD
    ("EUR", "USD"): 1.10,   # 1 EUR = 1.10 USD
    ("USD", "EUR"): 0.91    # 1 USD = 0.91 EUR
}

# Print the balances to check if setup works
print("Initial Balances:", balances)

# Function to convert money between currencies
def convert(amount, from_cur, to_cur):
    pair = (from_cur, to_cur)

    # Check if rate exists
    if pair not in fx_rates:
        print(f"No rate for {from_cur}->{to_cur}")
        return

    rate = fx_rates[pair]
    converted = amount * rate

    # Check if we have enough balance
    if balances[from_cur] >= amount:
        balances[from_cur] -= amount
        balances[to_cur] += converted
        log_transaction(amount, from_cur, to_cur, converted)
        print(f"Converted {amount} {from_cur} → {converted:.2f} {to_cur}")

    else:
        print("Insufficient funds")

    print("Updated Balances:", balances)

convert(100, "AUD", "USD")

# Mock carbon intensity factors (kg CO2 per 1000 units converted)
carbon_factors = {
    ("AUD", "USD"): 0.42,
    ("USD", "AUD"): 0.45,
    ("EUR", "USD"): 0.50,
    ("USD", "EUR"): 0.40
}

# Simple compliance stub
def compliance_check(amount, from_cur, to_cur):
    if amount > 10000:
        return "Review Needed"
    return "Clear"

# Transactions log
transactions = []

def log_transaction(amount, from_cur, to_cur, converted):
    # Estimate carbon
    carbon_factor = carbon_factors.get((from_cur, to_cur), 0.5)
    carbon_estimate = (amount / 1000) * carbon_factor

    # Compliance check
    compliance_status = compliance_check(amount, from_cur, to_cur)

    tx = {
        "from": from_cur,
        "to": to_cur,
        "amount": amount,
        "converted": converted,
        "carbon": f"{carbon_estimate:.2f} kg CO₂",
        "compliance": compliance_status
    }
    transactions.append(tx)
    print("Logged Transaction:", tx)

convert(200, "USD", "EUR")
print("All Transactions:", transactions)


