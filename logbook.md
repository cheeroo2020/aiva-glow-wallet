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

### 📌 Notes
- Flow designed to support integration with providers (e.g., SumSub, Veriff)
- Lays the foundation for UI mockups and backend validation rules


