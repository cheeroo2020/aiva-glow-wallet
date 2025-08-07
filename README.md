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
│ └── fx_trend_analysis.py
├── fx_data/ # Mock FX rate data (7-day JSON)
│ └── fxrates.json
├── lovable-ui/ # UI exported from Lovable
│ └── ...
├── designs/ # UI screen concepts (structure only)
│ └── ...
├── screenshots/ # Output snapshots for tracking
│ └── fx_suggestion_output.png
├── logbook.md # Daily build journal
├── README.md # Project overview (you’re here!)


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

---

## 🧠 Module Progress

### 1. Wallet UI (`/lovable-ui`)
Interactive mockups built in [Lovable.dev](https://lovable.dev), then exported to GitHub.

- ✅ FX Wallet Dashboard  
- ✅ 3-Currency Balance Blocks (USD, EUR, AUD)  
- ✅ FX Converter UI  
- ✅ Static Transaction Log Display  

> **Status:** Complete ✅

---

### 2. Smart FX AI Engine (`/ai`)

- ✅ `fx_trend_analysis.py`: Reads 7-day JSON data and outputs FX conversion suggestions.  
- ✅ Suggestions generated using basic trend detection logic.  
- 🔄 Upcoming: Enhance logic with thresholds (e.g., "Wait" vs "Convert Now").

> **Status:** In Progress

---

### 3. FX Data Store (`/fx_data`)

- ✅ `fxrates.json`: Mock historical FX data over 7 days.  
- Used to simulate real-world market scenarios for AI suggestion testing.

---

### 4. Screenshots & Logs (`/screenshots`, `/logbook.md`)

- ✅ Screenshots stored in `screenshots/` for traceability.  
- ✅ Daily progress logged in `logbook.md`.

---

### 5. Compliance & Risk Engine (New Epic)

> **Added on 5 August 2025**

- 📌 Jira Epic created to cover regulatory logic, AML checks, ethical AI behaviour, and privacy-friendly UX.
- Integration plan underway across `/ai`, `/wallet`, and `/backend` modules.

---

## 🛠 Tech Stack

- 🎨 [Lovable.dev](https://lovable.dev) – UI design
- 🧠 GPT prompt logic – Smart FX suggestions (manual for now)
- 🐍 Python – Backend data handling & trend simulation
- 🗂 GitHub – Version control & commits
- 📋 Jira – Task and sprint tracking
- 📁 VS Code – Local development
- 🔄 GitHub Desktop – Commit/push automation

---

## 🧭 What’s Next

- [ ] AIVA-14: Add threshold logic for “Convert Now” vs “Wait”
- [ ] Start integrating basic FX API (mock or open-source)
- [ ] Move toward frontend interactivity (React or Vite-based)
- [ ] Start Compliance epic with dummy KYC rules and logic

---

## 👤 Built By

**Chirantan (Chris) Gogoi**  
📍 Based in Australia  
🔭 Exploring the future of money, wallets, AI, and cross-border finance  
💼 Solo founder in learning & prototyping phase

---

## 📌 Note

This project is a **solo founder prototype** in active build mode — equal parts experimentation, learning, and inspiration.
