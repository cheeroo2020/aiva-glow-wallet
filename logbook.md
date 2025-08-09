# 📘 Aiva Glow Wallet – Logbook

---

## 📅 August 1, 2025

### ✅ What I did
- Finalised project name: Aiva Glow Wallet
- Created GitHub repository and committed base folder structure
- Set up Jira project (team-managed) and created Epics and Sprint 1
- Linked each task to relevant epics

### 📘 What I learned
- How Jira epics, sprints, and stories interact
- How to set up a GitHub project repo from scratch
- Importance of naming clarity and structure

### 🤔 Open questions
- What's the best UI flow for a multicurrency wallet?

### ⏭️ Next steps
- Design initial UI in Lovable
- Start breaking down tasks into subtasks

---

## 📅 August 2, 2025

### ✅ What I did
- Built wallet dashboard, currency blocks, and converter UI in Lovable
- Organised files: `lovable_ui/`, `ai/`, `mockdata/` in GitHub
- Added screenshots of design work
- Resolved subtasks and backlog sync in Jira
- Marked completed UI tasks as Done in Jira

### 📘 What I learned
- Using Lovable as a low-fidelity UI tool
- Creating subtasks in Jira using the command palette
- How to properly structure folders in GitHub

### 🤔 Open questions
- How will the Smart FX assistant look and behave?

### ⏭️ Next steps
- Begin AI logic for FX recommendation (AIVA-9)
- Start AIVA-10: build Lovable UI block for GPT output

---

## 📅 August 3, 2025

### ✅ What I did
- Created `/lovable_ui/ai_suggestion_component.md` for AIVA-10
- Added README updates to GitHub with project description
- Set repo metadata: topics, description, cleaned up folders
- Created full logbook file for 6 weeks
- Confirmed sprint board reflects current progress

### 📘 What I learned
- GitHub metadata settings (topics, descriptions)
- Markdown structure for logging daily progress
- Project setup alignment between tools (Jira + GitHub)

### 🤔 Open questions
- How to test Smart FX AI logic locally
- Best practices for frontend-GPT interaction

### ⏭️ Next steps
- Continue with Smart FX AI prompt development (AIVA-9)
- Sketch wireframe of Smart FX suggestion UI

## 📅 5 August 2025 — Compliance Epic Added

**Overview:**  
Today marks the official inclusion of a new core module — **Compliance & Risk Management** — into the Aiva Glow Wallet project. This decision strengthens the product’s alignment with regulatory, ethical, and user protection standards necessary for fintech products operating in global environments.

---

### ✅ Key Activities

- 🧱 **Created new Epic:** `COMPLIANCE & RISK MANAGEMENT`
- 🗂 **Added Jira tasks under new epic:**
  - **AIVA-46**: Design KYC/AML onboarding flow
  - **AIVA-47**: Draft compliance checklist for FX transactions
  - **AIVA-48**: Define how to log sensitive actions (audit trail)
  - **AIVA-49**: Map data handling policy to Australian Privacy Principles (APPs)
  - **AIVA-50**: Create UI mockup for compliance alerts (e.g., conversion blocked)
  - **AIVA-51**: Define AI ethics safeguards for Smart FX suggestions
- 📝 Planned implementation of backend + UI elements for compliance
- 🔍 Reviewed Jira and ensured all prior tasks are mapped correctly

---

### 🚧 Status Summary

| Task ID  | Title                                                 | Epic                         | Status  |
|----------|-------------------------------------------------------|------------------------------|---------|
| AIVA-46  | Design KYC/AML onboarding flow                        | Compliance & Risk Management | ⏳ To Do |
| AIVA-47  | Draft compliance checklist for FX transactions        | Compliance & Risk Management | ⏳ To Do |
| AIVA-48  | Define how to log sensitive actions (audit trail)     | Compliance & Risk Management | ⏳ To Do |
| AIVA-49  | Map data handling to Australian Privacy Principles    | Compliance & Risk Management | ⏳ To Do |
| AIVA-50  | Create UI mockup for compliance alerts                | Compliance & Risk Management | ⏳ To Do |
| AIVA-51  | Define AI ethics safeguards for Smart FX suggestions  | Compliance & Risk Management | ⏳ To Do |

---

### 🧠 Notes
- These tasks are foundational for the legal, ethical, and privacy-aware design of Aiva.
- Implementation begins after current Sprint 1 UI and AI modules reach 100% completion.
- This shift also supports future discussions with investors, regulators, or incubators.

## 📅 6 August 2025 – Compliance Foundation

### ✅ Task Completed
- **AIVA-46:** Drafted KYC/AML Onboarding Flow

### 🛠 Work Summary
- Designed a user journey to collect personal data and verify identity:
  - Collected: Name, DOB, address
  - Uploaded: ID documents (passport, driver’s license)
  - Status: Verified / Pending / Retry

### 📂 Output
- Created `compliance_flows.md` file documenting the onboarding logic
- Committed to GitHub with message: `Added draft KYC/AML onboarding flow (AIVA-46)`


---

### 📅 7 August 2025

**Task ID:** AIVA-11  
**Title:** Test FX trend data with GPT response  
**Epic:** Smart FX AI Engine  
**Status:** ✅ Completed  

---

#### 🧠 Objective  
Implement a Python script that reads mock FX rate data, detects 7-day trends, and outputs Smart FX-style conversion recommendations for selected currency pairs.

---

#### ✅ Steps Completed

1. Opened AIVA-11 task to analyse FX trend using GPT-style logic.
2. Created directory structure:  
   - `fx_data/` for storing JSON rate files  
   - `ai/` for placing Python analysis scripts  
3. Created `fxrates.json` using 7-day sample data manually inside `fx_data/`.
4. Wrote `fx_trend_analysis.py` in `ai/` to:
   - Read `fxrates.json`
   - Extract currency pair values
   - Analyse whether the trend was rising, falling, or stable
   - Generate natural language suggestions
5. Ran into the following **issues** and fixed them step-by-step:

---

#### 🛠️ Troubleshooting and Fixes

| Issue | Root Cause | Fix |
|------|------------|-----|
| `cd path/to/your/aiva-glow-wallet` fails | Placeholder path not replaced | Used actual local repo path (`~/Desktop/aiva-glow-wallet`) |
| `FileNotFoundError` on `fxrates.json` | File didn’t exist yet | Created file using `touch fx_data/fxrates.json` |
| `fxrates.json` not found again | Wrong relative path | Ensured it was located inside `fx_data/` and referenced correctly from `ai/` |
| KeyError: `'USD_AUD'` | Tried to access pair as top-level key | Realised JSON had dates as top-level keys, each containing pairs |
| IndentationError after `for` loop | Block not indented | Properly indented the loop block |
| Confusion on logic order | Was unclear how each part connects | Broke into smaller debug/test steps |
| Added `"AUD_USD"` to pair list | This key doesn’t exist in JSON | Handled missing data gracefully with fallback logic |

---

#### 📸 Output Screenshot  
> 📂 **Stored in:** `screenshots/`  
![FX Suggestion Output](../screenshots/Screenshot%202025-08-07%20at%2010.38.47%E2%80%AFpm.png)

> **Smart FX Suggestions (Auto-generated)**  
> ```
> [Smart FX Suggestion] Based on the past 7 days:
> - USD_AUD: falling trend → Consider converting out of AUD  
> - EUR_AUD: falling trend → Consider converting out of AUD  
> - AUD_USD: N/A (Data missing) trend → Hold position in USD  
> ```

---
### 💻 Post-Trend Output Git & File Handling (Second Half of Day)

| Problem                              | Cause                                        | Resolution                                 |
|-------------------------------------|----------------------------------------------|--------------------------------------------|
| Screenshot file not committing      | File didn’t exist or wrong filename          | Confirmed correct name `screenshot 1.png`, moved to correct folder |
| `mv` command failed (Permission Denied) | Trying to move from restricted folder       | Used `Downloads` as source for `mv` command |
| `mv` filename with spaces broke CLI | Shell doesn’t handle unescaped spaces        | Renamed file to `screenshot 1.png`         |
| `git add` failed to match file      | Incorrect file path                          | Fixed by using exact relative path         |
| `git push` rejected with 403        | HTTPS push via password is deprecated        | Switched to GitHub Desktop (Option 3)      |
| GitHub Desktop repo not showing     | Repo not synced or detected                  | Cloned again into GitHub Desktop app       |

---

### ✍️ Git Commit History

```bash
git add screenshots/fx_suggestion_output.png
git commit -m "AIVA-11: Add output screenshot for Smart FX suggestion"
git push origin main
✅ Final push done using GitHub Desktop after switching from CLI. All files pushed successfully.

---
#### 🔁 Next Steps

- ✅ Create a `screenshots/` folder inside your GitHub repo root to store all future screenshot evidence.
- ✅ Move current screenshot file into that folder.
- ✅ Commit today’s files with message:  
  `"AIVA-11: FX trend analysis script added with sample data, GPT-style recommendations & screenshots"`
- ⏭ Start **AIVA-14**: Add trend logic to determine convert/wait strategy based on threshold settings.

---

## 📅 9 August 2025  
**Task ID:** AIVA-14  
**Title:** Add trend logic to determine convert/wait  
**Epic:** FX Data & API Layer  
**Status:** ✅ Completed  

---

### 🧠 Objective  
Add percentage-based threshold logic to the FX trend analysis so the AI can recommend either "Convert Now" or "Wait" depending on market movement size.

---

### 🗂 Step-by-Step Process  

1. **Reviewed yesterday’s progress** from AIVA-13 & AIVA-11 to ensure base FX analysis logic was ready.  
2. **Created `fx_trend_with_threshold.py`** in `/ai/`.  
3. **Set threshold logic**:  
   - If drop ≥ threshold → **Convert Now**  
   - If small movement → **Wait**  
4. **Initial run failed**:  
   - Reason: Python could not find script (`No such file or directory`)  
   - Cause: Repo had been moved from `Desktop` to `Documents/GitHub/`  
   - Fix: Navigated to correct path in terminal (`cd ~/Documents/GitHub/aiva-glow-wallet`)  
5. **File not found error for script**:  
   - Cause: File still in old Desktop folder  
   - Fix: Moved file into `/ai/` inside repo  
6. **Tested script with mock data** in `/fx_data/fxrates.json`.  
7. **Observed missing AUD_USD data**:  
   - Added graceful handling with `"N/A"` output to avoid crash.  

---

### 🛠️ Troubleshooting Table  

| Issue | Root Cause | Fix |
|-------|------------|-----|
| Script not found | Running in wrong directory | Navigated to repo folder in Documents |
| Python path error | File created outside repo | Moved script into correct `/ai/` directory |
| Missing AUD_USD key | Not present in fxrates.json | Added "N/A" handling logic |

---

### 📸 Output Screenshot  
Stored as `/screenshots/screenshot_aiva14_threshold_output.png`:

USD_AUD: falling (-1.32%) → Convert Now | USD weakening vs AUD | Consider holding AUD

EUR_AUD: falling (-3.01%) → Convert Now | EUR weakening vs AUD | Consider holding AUD

AUD_USD: N/A (data missing) → Hold position



---

### 🔁 Next Steps  
- Integrate threshold logic into Smart FX UI  
- Begin AIVA-15 to simulate FX conversions with mock balances  

---

### 📌 Commit Info  

**Commit Message:**  
`AIVA-14: Added FX threshold logic for convert/wait decisions`  
 
**Commit Description:**  
Implemented fx_trend_with_threshold.py in /ai/

Added % change calculation and threshold-based decision logic

Handles missing pairs gracefully with N/A output

Moved repo to Documents/GitHub/ for consistent pathing

Added output screenshot to /screenshots/
