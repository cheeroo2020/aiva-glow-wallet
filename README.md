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

## 🧱 Folder Structure (as of 06 September 2025)
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

**Status as of 06 September 2025: Sprint 3 Kickoff completed**

| Task ID | Title | Status |
|---------|-------|--------|
| AIVA-46 | Compliance Rule Engine (thresholds) | ⏳ In Progress |
| AIVA-47 | Velocity & Pattern Checks (structuring) | ⏳ In Progress |
| AIVA-48 | Enrich transaction log with compliance metadata | ⏳ In Progress |
| AIVA-49 | Audit Logging framework | ⏳ In Progress |
| AIVA-50 | Privacy & Data Mapping (APP) | ⏳ In Progress |
| AIVA-51 | AI Ethics Safeguards | ⏳ In Progress |
| AIVA-52 | Collapsible Compliance Panel UI | ⏳ In Progress |
| AIVA-53 | Compliance Alerts UI | ⏳ In Progress |

**Highlights Today (06 September 2025):**
- Created new branch `sprint3/compliance` on GitHub.  
- Synced and aligned GitHub Desktop with the website branch.  
- Scaffolded `fx_data/audit_log.json`.  
- Enhanced `ai/fx_conversion_sim.py` with full compliance rules: thresholds, velocity checks, sanctions mock.  
- Added `append_audit` integration for recording audit events.  
- Designed comprehensive Lovable prompt for modern fintech UI (dark mode toggle, collapsible compliance panel, timeline view, AI recommendation card).  

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
   - fx_conversion_sim.py — now upgraded with compliance thresholds, velocity, sanctions, enriched logging.  
   - carbon_estimator.py — CO₂ impact estimates.  

3. **FX Data Store (/fx_data)**  
   - fxrates.json — 7-day FX rates.  
   - balances.json — mock balances.  
   - transactions_sample.json — legacy log.  
   - transactions_log.json — new persistent enriched log with compliance + carbon.  
   - audit_log.json — new audit trail for sensitive actions.  

4. **Screenshots & Logs**  
   - CLI runs confirm enriched compliance + carbon outputs.  
   - Logbook entry created in `main/logbook.md` for 6 Sep 2025.  

5. **Compliance & Risk Engine (Epic)**  
   - Compliance rules (thresholds, velocity, sanctions mock) implemented.  
   - Audit logging integrated.  
   - UI prompts ready for Lovable modernization.  
   - Privacy compliance doc scaffolded (`docs/privacy_compliance.md`).  

---

## 🧭 What’s Next
- Continue Sprint 3 (until 15 Sep):  
  - Extend compliance rules into UI.  
  - Hook Lovable components to JSON compliance outputs.  
  - Test review/blocked transaction flows with audit log capture.  
- Plan Sprint 4: FastAPI + API layer for `/convert`, `/balances`, `/transactions`.  

---

## 👤 Built By
**Chirantan (Chris) Gogoi**  
📍 Based in Australia  
🔭 Exploring the future of money, wallets, AI, and cross-border solutions  
💼 Solo founder in learning & prototyping phase  
