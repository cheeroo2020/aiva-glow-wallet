# 🌐 Aiva Glow Wallet
A next-gen multi-currency wallet with AI-powered smart FX recommendations, live trend analysis, environmental impact tracking, and DeFi-friendly architecture — designed and built by a solo founder to explore the future of money, cross-border finance, and digital wallets.

---

## 🚀 Project Vision
Aiva is a build + learn journey to explore how the future of money is being shaped by:

- Smart FX engines
- Real-time trend data
- AI UX logic
- Environmental impact tracking (Green FX)
- Multicurrency interoperability
- Blockchain + DeFi infrastructure
- Compliance & risk intelligence

---

## 🧱 Folder Structure (as of 22 September 2025)
```
├── ai/ # Smart FX engine & simulations
│   ├── fx_trend_analysis.py
│   ├── fx_trend_with_threshold.py
│   ├── fx_conversion_sim.py   # FX simulation with compliance + audit logging
│   └── carbon_estimator.py
│
├── fx_data/ # Mock FX, balances, transaction, and carbon data
│   ├── fxrates.json
│   ├── balances.json
│   ├── transactions_sample.json
│   ├── transactions_log.json  # enriched with compliance + carbon
│   ├── audit_log.json         # structured audit log
│   └── carbon_factors.json
│
├── lovable_ui/ # UI exported from Lovable
├── designs/ # UI concepts
├── screenshots/ # Output snapshots for tracking
├── logbook.md   # Daily build journal
└── README.md    # Project overview
```

---

## 🧑‍💻 Sprint 1 Summary (1 Aug – 18 Aug)
*(No changes – completed successfully)*

---

## 📊 Sprint 2 Summary (15–31 Aug 2025)
*(No changes – completed successfully)*

---

## 📊 Sprint 3 Progress (1–29 Sep 2025)

**Status as of 22 September 2025: Compliance enrichment nearing completion**

| Task ID | Title | Status |
|---------|-------|--------|
| AIVA-46 | Compliance Rule Engine (thresholds) | ✅ Done |
| AIVA-47 | Velocity & Pattern Checks (structuring) | ✅ Done |
| AIVA-48 | Enrich transaction log with compliance metadata | ⏳ In Progress |
| AIVA-49 | Audit Logging framework | ✅ Done |
| AIVA-50 | Privacy & Data Mapping (APP) | ⏳ In Progress |
| AIVA-51 | AI Ethics Safeguards | ⏳ In Progress |
| AIVA-52 | Collapsible Compliance Panel UI | ⏳ In Progress |
| AIVA-53 | Compliance Alerts UI | ⏳ In Progress |
| AIVA-106 | Implement compliance rule engine (thresholds, velocity, sanctions) | ✅ Done |

**Highlights Today (22 September 2025):**
- Refined **fx_conversion_sim.py** with full compliance logic:  
  ✅ Threshold checks  
  ✅ Velocity detection  
  ✅ Sanctions mock  
- Integrated **audit logging** (`fx_data/audit_log.json`) for both conversion_attempt and conversion_settled.  
- CLI test runs performed:  
  - ✅ Clear (small trades)  
  - ✅ Review (>10k USD)  
  - ✅ Blocked (>50k USD)  
  - ✅ Velocity checks (≥3 trades in 60s)  
- Encountered insufficient balance errors during large test runs — confirmed logic prevents overdrafts.  
- Logbook.md updated with detailed entry for 22 Sep 2025.  

---

## 🧠 Module Progress

1. **Wallet UI (/lovable_ui)**  
   - ✅ Dashboard, balances, FX converter, static log.  
   - ✅ Smart FX Recommendation with Green FX badge.  
   - ✅ Collapsible compliance panel.  
   - ⏳ Pending: compliance alerts, timeline transaction view, dark mode toggle.  

2. **Smart FX AI Engine (/ai)**  
   - Fully enriched **fx_conversion_sim.py** with compliance + audit logging.  
   - Threshold, velocity, sanctions, and carbon estimation integrated.  

3. **FX Data Store (/fx_data)**  
   - **transactions_log.json** → enriched with compliance & carbon.  
   - **audit_log.json** → structured audit events (conversion_attempt, conversion_settled).  

4. **Screenshots & Logs**  
   - CLI run logs captured.  
   - Issues with insufficient balances documented in logbook.md.  

5. **Compliance & Risk Engine (Epic)**  
   - Threshold, velocity, sanctions rules ✅.  
   - Audit trail ✅.  
   - Integration with UI planned next.  

---

## 🧭 What’s Next
- Finish **AIVA-48** by finalizing compliance metadata enrichment.  
- Integrate compliance results into Lovable UI (collapsible alerts, timeline).  
- Test blocked/review flows with full audit logging.  
- Sprint 4 prep: FastAPI endpoints (`/convert`, `/balances`, `/transactions`).  

---

## 👤 Built By
**Chirantan (Chris) Gogoi**  
📍 Based in Australia  
🔭 Exploring the future of money, wallets, AI, and cross-border solutions  
💼 Solo founder in learning & prototyping phase  
