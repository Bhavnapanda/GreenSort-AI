# GreenSort AI — Demo Script (Short Video Walkthrough)

Estimated duration: **3–4 minutes**

---

## Setup (off-camera)
- `npm install` done
- `.env` has a valid Gemini API key
- `node server.js` is running
- Browser open at `http://localhost:3000`
- Screen resolution set to 1280×800 or similar

---

## Scene 1 — Intro (0:00–0:20)

> *Show the landing page without scrolling.*

**Say:** "This is GreenSort AI — a waste segregation assistant powered by Google's Gemini AI. I built it for the AI for Sustainability internship to help people correctly classify everyday waste and get clear disposal advice."

**Point out:**
- GreenSort AI branding and tagline
- SDG 12, SDG 11, SDG 13 badges
- The purpose sentence

---

## Scene 2 — Hindi Language Toggle (0:20–0:40)

> *Click the हिंदी button in the top-right.*

**Say:** "The app supports both English and Hindi. Watch how the entire interface switches instantly."

**Show:** All labels, buttons, placeholder text switch to Hindi.

> *Click English again to return for the rest of the demo.*

---

## Scene 3 — Example Chip + AI Result (0:40–1:20)

> *Click the "Plastic bottle" chip.*

**Say:** "I'll use one of the example chips to fill in the input."

> *Click "Analyse Waste".*

**Show while talking:**
- Loading spinner appears briefly
- Result card fades in with a green **"Recyclable / Dry Waste"** badge
- The **"AI-Generated"** green pill confirms this came from Gemini
- Disposal recommendation, explanation paragraph, sustainability tip

**Say:** "The AI returns a structured response: the category, exactly what to do with it, why it's classified this way, and a practical sustainability tip."

---

## Scene 4 — Hazardous Item with Caution Banner (1:20–1:50)

> *Click "New Analysis". Click the "AA battery" chip. Click "Analyse Waste".*

**Say:** "Now let's try a hazardous item — an AA battery."

**Show:**
- Red caution banner: "This item requires special handling…"
- Orange **"Hazardous / Special Waste"** badge
- Local-variance note about rules differing by location
- Caution in disposal recommendation

**Say:** "The app flags batteries with a caution banner and reminds you that rules vary by city — this is part of our responsible-AI design."

---

## Scene 5 — Uncertain / Ambiguous Item (1:50–2:15)

> *Click "New Analysis". Type `greasy pizza box`. Click "Analyse Waste".*

**Say:** "A greasy pizza box is a tricky case — it looks recyclable but contamination makes it non-recyclable. Let's see what the AI says."

**Show:**
- Non-Recyclable badge
- Possibly a low-confidence warning if the AI flagged uncertainty
- Local-variance note about cardboard contamination rules

---

## Scene 6 — Hindi Classification (2:15–2:40)

> *Switch to Hindi. Click "New Analysis". Click the "केले का छिलका" (banana peel) chip. Analyse.*

**Say:** "In Hindi mode, the AI responds entirely in Hindi — the category, disposal advice, explanation and tip are all in Devanagari script."

**Show:** Full result card in Hindi. Point to the AI-generated pill still showing.

> *Switch back to English.*

---

## Scene 7 — Session History (2:40–3:00)

**Say:** "Every classification is added to the session history automatically."

**Show:**
- History panel with 3–4 rows
- Each row shows the item, colour-coded category badge, AI/FB label, time

---

## Scene 8 — CSV Download (3:00–3:15)

> *Click "Download CSV".*

**Say:** "You can download the full session history as a CSV."

> *Open the file in Excel or Notepad if possible.*

**Show:** Columns: Timestamp, Item, Category, Confidence, Disposal, Explanation, Tip, Caution, Source.

---

## Scene 9 — Fallback Demo (3:15–3:35)

> *(Optional — pre-recorded with API key removed or server restarted without .env)*

**Say:** "If the Gemini API is unavailable — for example, no API key is set — the app switches silently to the rule-based fallback. The amber 'Rule-based Fallback' pill is always shown so the user knows exactly which path produced the result."

**Show:** Same result card, amber fallback pill instead of green AI pill.

---

## Scene 10 — Responsible AI Panel (3:35–3:50)

> *Scroll down. Click "About this tool & Responsible AI" to expand it.*

**Say:** "The app is built with responsible AI in mind. It's transparent about its limitations, never claims perfect accuracy, doesn't collect personal data, and always defers to local authorities for official guidance."

---

## Scene 11 — Mobile Responsive (3:50–4:00)

> *Open DevTools → toggle device toolbar → select iPhone 12 or 375px width.*

**Say:** "The layout is fully responsive and works on mobile."

**Show:** Single-column layout, readable on small screen.

---

## Wrap-up

**Say:** "GreenSort AI demonstrates that a student prototype can incorporate real AI inference — Google Gemini via the free-tier API — to solve a genuine sustainability problem. The fallback guarantees it always works, the responsible-AI features make it trustworthy, and the bilingual support makes it accessible. Thank you."

---

*This demo script is a guide — feel free to adapt the commentary to your own words.*
