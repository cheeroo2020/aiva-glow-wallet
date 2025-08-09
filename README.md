# 🌐 Aiva Glow Wallet

**A next-gen multi-currency wallet** with AI-powered smart FX recommendations, live trend analysis, and DeFi-friendly architecture — designed and built by a solo founder to explore the future of money, cross-border finance, and digital wallets.

---

## 🚀 Project Vision

Aiva is a build + learn journey to explore how the future of finance is being shaped by:

- Smart FX engines
- Real-time trend data
- AI UX logic
- Multicurrency interoperability
- Blockchain + DeFi infrastructure
- Compliance & risk intelligence

---

## 🧱 Folder Structure

├── ai/ # Smart FX engine scripts  
│   ├── fx_trend_analysis.py  
│   └── fx_trend_with_threshold.py  
├── fx_data/ # Mock FX rate data (7-day JSON)  
│   └── fxrates.json  
├── lovable-ui/ # UI exported from Lovable  
├── designs/ # UI concepts  
├── screenshots/ # Output snapshots for tracking  
├── logbook.md # Daily build journal  
└── README.md # Project overview  

---

## 🧑‍💻 Sprint 1 Summary (1 Aug – 15 Aug)

| Task ID  | Title                                               | Status      |
|----------|-----------------------------------------------------|-------------|
| AIVA-4   | Design wallet dashboard in Lovable                  | ✅ Done     |
| AIVA-5   | Add 3 currency balance blocks                       | ✅ Done     |
| AIVA-6   | Create FX converter UI                              | ✅ Done     |
| AIVA-7   | Display static transaction log                      | ✅ Done     |
| AIVA-9   | Draft Smart FX GPT prompt logic                     | 🔄 In Progress |
| AIVA-10  | Create Lovable UI element for AI suggestion         | 🔄 In Progress |
| AIVA-11  | Test FX trend data with GPT-style response          | ✅ Done     |
| AIVA-14  | Add FX threshold logic for convert/wait             | ✅ Done     |

---

## 🧠 Module Progress

### 1. Wallet UI (`/lovable-ui`)
✅ FX Wallet Dashboard  
✅ 3-Currency Balance Blocks  
✅ FX Converter UI  
✅ Static Transaction Log Display  

---

### 2. Smart FX AI Engine (`/ai`)

- `fx_trend_analysis.py` — detects rising/falling trends from mock data.  
- `fx_trend_with_threshold.py` — **NEW**: adds % change calculation & threshold-based “Convert Now” / “Wait” decisions.  
- Handles missing currency pairs gracefully.

> **Status:** In Progress

---

### 3. FX Data Store (`/fx_data`)
Mock JSON with 7-day history, used for AI logic testing.

---

### 4. Screenshots & Logs
All outputs now tracked in `/screenshots` and `/logbook.md`.

---

### 5. Compliance & Risk Engine (Epic)
Added 5 Aug — will begin after Sprint 1 UI & AI tasks.

---

## 🧭 What’s Next
- [ ] AIVA-15: Simulate FX conversions with mock balances  
- [ ] Connect threshold logic to UI  
- [ ] Start basic FX API integration (mock or open source)  
- [ ] Begin compliance rule prototypes  

---

## 👤 Built By

**Chirantan (Chris) Gogoi**  
📍 Based in Australia  
🔭 Exploring the future of money, wallets, AI, and cross-border finance  
💼 Solo founder in learning & prototyping phase  

---

## 📌 Commit Info (9 Aug)

**Commit Message:**  
`AIVA-14: Added FX threshold logic for convert/wait decisions`  

**Commit Description:**  
- Implemented `fx_trend_with_threshold.py` in `/ai/`  
- Added % change calculation & threshold-based recommendations  
- Handled missing pairs gracefully with N/A output  
- Moved repo to `Documents/GitHub/` for consistent pathing  
- Added output screenshot to `/screenshots/`  
