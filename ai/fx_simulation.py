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
