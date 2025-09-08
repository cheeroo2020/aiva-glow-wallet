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

## 🧱 Folder Structure (as of 08 September 2025)
```
├── ai/ # Smart FX engine & simulations
│   ├── fx_trend_analysis.py
│   ├── fx_trend_with_threshold.py
│   ├── fx_conversion_sim.py   # mock balance FX simulation with carbon & compliance
│   └── carbon_estimator.py
│
├── fx_data/ # Mock FX, balances, transaction, and carbon data
│   ├── fxrates.json
│   ├── balances.json          # starting USD/EUR/AUD balances
│   ├── transactions_sample.json
│   ├── transactions_log.json  # persistent enriched transaction log
│   ├── audit_log.json         # structured audit log
│   └── carbon_factors.json
│
├── lovable_ui/ # UI exported from Lovable (Markdown + assets)
│   ├── ai_suggestion_component.md
│   ├── compliance_collapsible_panel.md
│   └── Smart Fx.png
│
├── designs/ # UI concepts
├── screenshots/ # Output snapshots for tracking
├── logbook.md   # Daily build journal
└── README.md    # Project overview
```

---

## 🧑‍💻 Sprint 1 Summary (1 Aug – 18 Aug)
| Task ID | Title | Status |
|---------|-------|--------|
| AIVA-4 | Design wallet dashboard in Lovable | ✅ Done |
| AIVA-5 | Add 3 currency balance blocks | ✅ Done |
| AIVA-6 | Create FX converter UI | ✅ Done |
| AIVA-7 | Display static transaction log | ✅ Done |
| AIVA-9 | Draft Smart FX GPT prompt logic | ✅ Done |
| AIVA-10 | Create Lovable UI element for AI suggestion | ✅ Done |
| AIVA-11 | Test FX trend data with GPT-style response | ✅ Done |
| AIVA-14 | Add FX threshold logic for convert/wait | ✅ Done |
| AIVA-15 | Simulate FX conversions with mock balances | ✅ Done |
| AIVA-52 | Add Green FX carbon badge to Smart FX UI | ✅ Done |
| AIVA-53 | Add Compliance & Risk collapsible panel to UI | ✅ Done |

---

## 📊 Sprint 2 Summary (15–31 Aug 2025)
| Task ID | Title | Status |
|---------|-------|--------|
| AIVA-17 | Create GitHub repo aiva-wallet | ✅ Done |
| AIVA-18 | Write README.md with vision and stack | ✅ Done |
| AIVA-19 | Add mockdata and ai folders in GitHub | ✅ Done |

**Health:** Sprint 2 completed successfully.

- Repo + README finalized.  
- fx_conversion_sim.py enhanced with:  
  ✅ Carbon footprint estimation  
  ✅ Compliance stub  
  ✅ Transaction logging  
- CLI runs tested with both small and large trades.  
- All deliverables closed on 31 Aug 2025.  

---

## 📊 Sprint 3 Progress (1–15 Sep 2025)

**Status as of 08 September 2025: Compliance enrichment in progress**

| Task ID | Title | Status |
|---------|-------|--------|
| AIVA-46 | Compliance Rule Engine (thresholds) | ✅ Done |
| AIVA-47 | Velocity & Pattern Checks (structuring) | ⏳ In Progress |
| AIVA-48 | Enrich transaction log with compliance metadata | ⏳ In Progress |
| AIVA-49 | Audit Logging framework | ⏳ In Progress |
| AIVA-50 | Privacy & Data Mapping (APP) | ⏳ In Progress |
| AIVA-51 | AI Ethics Safeguards | ⏳ In Progress |
| AIVA-52 | Collapsible Compliance Panel UI | ⏳ In Progress |
| AIVA-53 | Compliance Alerts UI | ⏳ In Progress |

**Highlights Today (08 September 2025):**
- Enriched `fx_data/transactions_log.json` with compliance and carbon objects.  
- Added structured `fx_data/audit_log.json` with conversion_attempt and conversion_settled events.  
- Implemented compliance thresholds, velocity detection, and sanctions mock in `fx_conversion_sim.py`.  
- Verified test runs: Clear (small trades), Review (>10k), Blocked (>50k), and velocity (≥3 trades in 60s).  
- Jira updated: **AIVA-106 marked Done**, **AIVA-48 moved to In Progress**.  

---

## 🧠 Module Progress

1. **Wallet UI (/lovable_ui)**  
   - ✅ Dashboard, balances, FX converter, static transaction log.  
   - ✅ Smart FX Recommendation Card with Green FX badge.  
   - ✅ Collapsible compliance panel.  
   - ⏳ Sprint 3: compliance alerts, timeline transaction view, dark mode toggle (planned).  

2. **Smart FX AI Engine (/ai)**  
   - fx_trend_analysis.py — trend detection.  
   - fx_trend_with_threshold.py — thresholds and convert/wait.  
   - fx_conversion_sim.py — enriched with compliance thresholds, velocity checks, sanctions mock, and structured logging.  
   - carbon_estimator.py — CO₂ impact estimates.  

3. **FX Data Store (/fx_data)**  
   - fxrates.json — 7-day FX rates.  
   - balances.json — mock balances.  
   - transactions_sample.json — legacy log.  
   - transactions_log.json — enriched log with compliance + carbon.  
   - audit_log.json — new audit trail for sensitive events.  
   - carbon_factors.json — mock carbon intensity data.  

4. **Screenshots & Logs**  
   - CLI runs confirm enriched compliance + carbon outputs.  
   - Logbook entry created for 8 Sep 2025.  

5. **Compliance & Risk Engine (Epic)**  
   - Compliance rules (thresholds, velocity, sanctions mock) implemented.  
   - Audit logging integrated.  
   - UI prompts ready for Lovable modernization.  
   - Privacy compliance doc scaffolded (`docs/privacy_compliance.md`).  

---

## 🧭 What’s Next
- Continue Sprint 3 (until 15 Sep):  
  - Integrate enriched JSON into Lovable UI.  
  - Export timeline + compliance panel screenshots.  
  - Test blocked/review flows against audit log.  
- Prepare Sprint 4: FastAPI endpoints (`/convert`, `/balances`, `/transactions`).  

---

## 👤 Built By
**Chirantan (Chris) Gogoi**  
📍 Based in Australia  
🔭 Exploring the future of money, wallets, AI, and cross-border solutions  
💼 Solo founder in learning & prototyping phase  
