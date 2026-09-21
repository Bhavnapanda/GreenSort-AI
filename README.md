# GreenSort AI 🌿

**An AI-Powered Waste Segregation Assistant**

GreenSort AI helps users correctly classify everyday waste items using natural language input. It calls the Google Gemini API to generate structured, actionable disposal guidance — and falls back to a rule-based classifier if the AI service is unavailable.

Built for the *AI for Sustainability* internship. Supports SDG 12, SDG 11 and SDG 13.

---

## Features

| Feature | Detail |
|---|---|
| AI Classification | Google Gemini API |
| 5 Waste Categories | Organic, Recyclable, Non-Recyclable, E-Waste, Hazardous |
| Fallback Classifier | Rule-based keyword system — always available |
| Languages | English and Hindi (toggle in header) |
| Result Card | Category, disposal advice, explanation, sustainability tip |
| Responsible AI | Caution guidance, confidence warnings, local-variance notes|
| Session History | In-memory history with CSV export |
| Copy Result | One-click clipboard copy |
| Responsive | Works on mobile, tablet and desktop |

---

## Tech Stack

- **Backend:** Node.js + Express (~150 lines) — secure proxy, never exposes API key to browser
- **AI:** Google Gemini API via `@google/genai` npm package
- **Frontend:** Vanilla HTML5 / CSS3 / ES6 JavaScript — no build step
- **Fallback:** Pure JS keyword classifier (client + server side)
- **Environment:** `dotenv` for secret management

---

## Quick Start

### 1. Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- A free Gemini API key from [aistudio.google.com/apikey](https://aistudio.google.com/apikey) *(no credit card required)*

### 2. Install

```bash
cd GreenSort-AI
npm install
```

### 3. Configure API Key

```bash
copy .env.example .env
```

Open `.env` and replace the placeholder with your actual key:

```
GEMINI_API_KEY=AIzaSy...your_real_key_here
```

> **No key?** The app can still provide guidance using the rule-based fallback classifier.

### 4. Run

```bash
node server.js
```

Open **http://localhost:3000** in your browser.

The terminal will confirm whether the Gemini API key is configured:

```
🌿 GreenSort AI running at http://localhost:3000
   Gemini API key: configured ✓
```

---

## Project Structure

```
GreenSort-AI/
├── .env.example
├── package.json
├── package-lock.json
├── server.js
├── index.html
├── styles.css
├── app.js
├── ai-service.js
├── fallback.js
├── history.js
├── i18n.js
└── ui.js
```

---

## API

**`POST /api/classify`**

```json
// Request
{ "item": "old mobile phone", "language": "en" }

// Response (AI)
{
  "category":      "E-Waste",
  "disposal":      "Take to a certified e-waste collection centre…",
  "explanation":   "Mobile phones contain circuit boards…",
  "tip":           "Many brands offer free take-back schemes…",
  "confidence":    "high",
  "caution":       true,
  "localVariance": "E-waste rules vary significantly by city…",
  "source":        "ai"
}

// Response (fallback — AI unavailable)
{ ...same fields..., "source": "fallback" }
```

---

## Manual Smoke Tests

Run these after `node server.js` to verify all major paths:

| # | Test | Expected |
|---|---|---|
| 1 | Type `banana peel` → Analyse | Category: Organic/Wet Waste; source: AI (or fallback if no key) |
| 2 | Type `old laptop` → Analyse | Category: E-Waste; caution banner shown |
| 3 | Type `medicine tablets` → Analyse | Caution + local-variance note |
| 4 | Type `AA battery` → Analyse | Hazardous; caution banner red |
| 5 | Type `greasy pizza box` → Analyse | Recyclable/Dry Waste; possible low-confidence |
| 6 | Type `xyzgarbage123` (nonsense) → Analyse | Low confidence warning shown |
| 7 | Click any example chip | Input field fills with chip value |
| 8 | Switch to Hindi → Analyse `केले का छिलका` | UI in Hindi; result in Hindi |
| 9 | Analyse 3 items → Download CSV | File downloads; open in Excel/Sheets, 3 data rows |
| 10 | Analyse 3 items → Clear History | History panel disappears |
| 11 | Copy result | Clipboard text contains all result fields |
| 12 | No API key (`.env` unset) → Analyse | App still provide guidance using the fallback classifier |
| 13 | Resize browser to 375px | Layout remains usable; no overflow |
| 14 | Press Ctrl+Enter in textarea | Triggers analysis |
| 15 | Click Analyse with empty input | Error message shown; no spinner |

---

## Responsible AI

- Results are recommendations only — not official advice from any waste authority
- Hazardous items trigger a red caution banner with explicit handling instructions
- Low-confidence results show an amber uncertainty warning
- Local-variance notes appear when disposal rules commonly differ by region
- No personal data is collected; no user account is required
- API credentials live only in `.env` and are never sent to the browser

---

## SDG Alignment

| SDG | Connection |
|---|---|
| **SDG 12** — Responsible Consumption & Production | Helps users divert recyclable and compostable waste from landfill |
| **SDG 11** — Sustainable Cities & Communities | Supports municipal waste-segregation infrastructure |
| **SDG 13** — Climate Action | Correct organic waste handling reduces methane emissions from landfill |

---

## Notes for Assessors

- No accuracy percentages or training claims are made anywhere in the application.
- The API key is loaded from `process.env.GEMINI_API_KEY` only; it is never logged or returned to the client.
- Results are presented as guidance rather than official waste-management authority.
