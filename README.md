# 🌐 Aiva Glow Wallet

**A next-gen multi-currency wallet** with AI-powered smart FX recommendations, live trend analysis, environmental impact tracking, and DeFi-friendly architecture — designed and built by a solo founder to explore the future of money, cross-border finance, and digital wallets.

---

## 🚀 Project Vision

Aiva is a build + learn journey to explore how the future of finance is being shaped by:

- Smart FX engines  
- Real-time trend data  
- AI UX logic  
- Environmental impact tracking (**Green FX**)  
- Multicurrency interoperability  
- Blockchain + DeFi infrastructure  
- Compliance & risk intelligence  

---

## 🧱 Folder Structure (as of 23 Aug 2025)

├── ai/ # Smart FX engine & simulations
│ ├── fx_trend_analysis.py
│ ├── fx_trend_with_threshold.py
│ ├── fx_conversion_sim.py # mock balance FX simulation
│ └── carbon_estimator.py
│
├── fx_data/ # Mock FX, balances, transaction, and carbon data
│ ├── fxrates.json
│ ├── balances.json # starting USD/EUR/AUD balances
│ ├── transactions_sample.json
│ └── carbon_factors.json
│
├── lovable_ui/ # UI exported from Lovable (Markdown + assets)
│ ├── ai_suggestion_component.md
│ ├── compliance_collapsible_panel.md
│ └── Smart Fx.png
│
├── designs/ # UI concepts
├── screenshots/ # Output snapshots for tracking
├── logbook.md # Daily build journal
└── README.md # Project overview


---

## 🧑‍💻 Sprint 1 Summary (1 Aug – 18 Aug)

| Task ID  | Title                                               | Status   |
|----------|-----------------------------------------------------|----------|
| AIVA-4   | Design wallet dashboard in Lovable                  | ✅ Done |
| AIVA-5   | Add 3 currency balance blocks                       | ✅ Done |
| AIVA-6   | Create FX converter UI                              | ✅ Done |
| AIVA-7   | Display static transaction log                      | ✅ Done |
| AIVA-9   | Draft Smart FX GPT prompt logic                     | ✅ Done |
| AIVA-10  | Create Lovable UI element for AI suggestion         | ✅ Done |
| AIVA-11  | Test FX trend data with GPT-style response          | ✅ Done |
| AIVA-14  | Add FX threshold logic for convert/wait             | ✅ Done |
| AIVA-15  | Simulate FX conversions with mock balances          | ✅ Done |
| AIVA-52  | Add Green FX carbon badge to Smart FX UI            | ✅ Done |
| AIVA-53  | Add Compliance & Risk collapsible panel to UI       | ✅ Done |

---

## 📊 Sprint 2 Midway (15–29 Aug, status on 23 Aug 2025)

| Task ID  | Title                                      | Status        |
|----------|--------------------------------------------|---------------|
| AIVA-17  | Create GitHub repo aiva-wallet             | 🔄 In Progress |
| AIVA-18  | Write README.md with vision and stack      | 🔄 In Progress |
| AIVA-19  | Add mockdata and ai folders in GitHub      | 🔄 In Progress |

**Health:** Sprint 2 is **on track**. Repo + README nearly ready to close. Simulation (`fx_conversion_sim.py`) tested successfully. All deliverables can be finished by end of August.

---

## 🧠 Module Progress

### 1. Wallet UI (`/lovable_ui`)
- ✅ FX Wallet Dashboard  
- ✅ 3-Currency Balance Blocks  
- ✅ FX Converter UI  
- ✅ Static Transaction Log Display  
- ✅ Smart FX Recommendation Card with **Green FX Carbon Badge**  
- ✅ Compliance & Risk Collapsible Panel (KYC snapshot, risk details, required actions)  

---

### 2. Smart FX AI Engine (`/ai`)
- `fx_trend_analysis.py` — detects rising/falling trends from mock data.  
- `fx_trend_with_threshold.py` — adds % change calculation & threshold-based “Convert Now” / “Wait” decisions.  
- `fx_conversion_sim.py` — simulates currency conversions using latest FX rate, updates mock balances, supports inverse & AUD-cross rates, and prevents insufficient fund transfers.  
- `carbon_estimator.py` — estimates kg CO₂ per transaction using mock factors and assigns Low/Medium/High badge.  

> **Status:** Integrated with UI mockups in Lovable and persistent mock data store.  

---

### 3. FX Data Store (`/fx_data`)
- `fxrates.json` — 7-day FX rates  
- `balances.json` — starting mock balances (USD, EUR, AUD)  
- `transactions_sample.json` — mock transaction history  
- `carbon_factors.json` — mock carbon intensity per currency pair  

---

### 4. Screenshots & Logs
- All outputs now tracked in `/screenshots` and `/logbook.md`  

---

### 5. Compliance & Risk Engine (Epic)
- Collapsible UI panel for compliance/risk checks in Lovable  
- KYC/AML snapshot, transaction risk classification, required actions  
- Placeholder for Australian Privacy Principles (APPs) compliance and AI ethics safeguards  

---

## 🧭 What’s Next
- [ ] Finalize Sprint 2 by committing:  
  - Updated `README.md`  
  - Updated folder structure (`ai/`, `fx_data/`)  
  - Screenshots of CLI runs  
- [ ] Prepare ground for Sprint 3 (Compliance Epic) starting Sep 1  

---

## 👤 Built By
**Chirantan (Chris) Gogoi**  
📍 Based in Australia  
🔭 Exploring the future of money, wallets, AI, and cross-border finance  
💼 Solo founder in learning & prototyping phase  
