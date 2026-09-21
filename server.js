'use strict';

require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Fallback classifier (server-side mirror of public/js/fallback.js) ────────
const FALLBACK_DB = {
  organic: {
    keywords: [
      'banana','apple','orange','mango','grape','pear','lemon','lime','peach',
      'vegetable','veggie','tomato','potato','onion','garlic','carrot','spinach',
      'lettuce','cabbage','broccoli','cauliflower','peas','beans','corn','wheat',
      'rice','bread','roti','chapati','food','fruit','peel','skin','seed','pit',
      'leftover','cooked','raw','meat','chicken','fish','egg','dairy','milk',
      'cheese','curd','yogurt','tea','coffee','leaf','leaves','grass','garden',
      'flower','plant','compost','wet','organic','kitchen','scraps'
    ],
    category: 'Organic / Wet Waste',
    disposal: 'Use a home compost bin or green bin collection. Many municipalities offer wet-waste pickup.',
    explanation: 'Organic waste breaks down naturally and can be composted to create nutrient-rich soil amendment.',
    tip: 'Start a simple compost pile at home — even a small balcony bin can turn kitchen scraps into soil conditioner.',
    caution: false
  },
  recyclable: {
    keywords: [
      'paper','newspaper','magazine','book','cardboard','carton','box','envelope',
      'notebook','plastic','bottle','container','jar','cup','bag','wrapper','film',
      'polyester','nylon','can','tin','aluminium','aluminum','steel','metal','glass',
      'window','mirror','bottle glass','jar glass','clean','dry','recycle',
      'recyclable','tetra','tetrapack','milk carton','juice carton','water bottle',
      'shampoo','detergent','soap bottle','spray can'
    ],
    category: 'Recyclable / Dry Waste',
    disposal: 'Clean, dry and deposit in the blue/dry recycling bin or take to a recycling collection point.',
    explanation: 'Clean and dry recyclables can be processed into new materials, reducing the need for virgin resources.',
    tip: 'Rinse containers before recycling — contamination with food residue can cause entire batches to be rejected.',
    caution: false
  },
  nonrecyclable: {
    keywords: [
      'dirty','contaminated','greasy','stained','soiled','wet paper','tissue',
      'napkin','sanitary','nappy','diaper','cotton','bud','swab','bandage',
      'broken','ceramic','pottery','pyrex','cutlery','pen','pencil','rubber',
      'polystyrene','foam','styrofoam','chip packet','crisp','wrapper','foil',
      'multi-layer','composite','sticker','tape','cling','wrap','wax','coated',
      'mirror','window glass','drinking glass','crystal','carpet','curtain',
      'non-recyclable','landfill','general','mixed','cigarette','ash','dust'
    ],
    category: 'Non-Recyclable Waste',
    disposal: 'Dispose in the general/black waste bin for landfill collection.',
    explanation: 'This item cannot currently be recycled through standard kerbside schemes due to contamination, mixed materials or incompatible composition.',
    tip: 'Reduce non-recyclable waste by choosing products with minimal or recyclable packaging when shopping.',
    caution: false
  },
  ewaste: {
    keywords: [
      'phone','mobile','smartphone','tablet','laptop','computer','pc','desktop',
      'monitor','screen','television','tv','keyboard','mouse','printer','scanner',
      'charger','cable','wire','adapter','power bank','camera','camcorder',
      'headphone','earphone','speaker','radio','remote','calculator','clock',
      'watch','smartwatch','router','modem','hard drive','usb','circuit board',
      'motherboard','chip','semiconductor','electronic','electrical','appliance',
      'microwave','refrigerator','fridge','washing machine','air conditioner',
      'fan','iron','toaster','kettle','blender','mixer','vacuum','drill'
    ],
    category: 'E-Waste',
    disposal: 'Take to a certified e-waste collection centre, manufacturer take-back scheme, or authorised recycler.',
    explanation: 'Electronic devices contain valuable metals (gold, copper, rare earths) as well as hazardous materials. Specialised recycling recovers both safely.',
    tip: 'Many electronics brands offer free take-back programmes. Check the manufacturer\'s website before discarding.',
    caution: true
  },
  hazardous: {
    keywords: [
      'battery','batteries','aa','aaa','lithium','lead acid','button cell',
      'paint','varnish','lacquer','solvent','thinner','turpentine','acetone',
      'bleach','acid','alkali','chemical','pesticide','herbicide','insecticide',
      'fertiliser','fertilizer','medicine','medication','drug','tablet','capsule',
      'pill','syringe','needle','injection','pharmaceutical','expired','clinical',
      'medical','toxic','poison','flammable','corrosive','explosive','radioactive',
      'mercury','fluorescent','tube','bulb','cfl','led bulb','lamp','thermometer',
      'motor oil','engine oil','fuel','petrol','diesel','gas cylinder','aerosol',
      'spray paint','fire extinguisher','pool chemical'
    ],
    category: 'Hazardous / Special Waste',
    disposal: 'Do NOT put in regular bins. Contact your local council for hazardous waste collection days or drop-off points.',
    explanation: 'Hazardous items contain substances that can harm human health or the environment if improperly disposed of.',
    tip: 'Never pour chemicals down the drain or flush medicines. Many pharmacies accept expired medications for safe disposal.',
    caution: true
  }
};

function serverFallbackClassify(itemText) {
  const lower = itemText.toLowerCase();
  const scores = {};
  for (const [key, data] of Object.entries(FALLBACK_DB)) {
    scores[key] = data.keywords.filter(k => lower.includes(k)).length;
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const category = best[1] > 0 ? FALLBACK_DB[best[0]] : FALLBACK_DB.nonrecyclable;
  return {
    category: category.category,
    disposal: category.disposal,
    explanation: category.explanation,
    tip: category.tip,
    confidence: best[1] >= 2 ? 'high' : best[1] === 1 ? 'medium' : 'low',
    caution: category.caution,
    localVariance: category.caution ? 'Rules for this waste type vary significantly by location. Please verify with your local municipal authority.' : '',
    source: 'fallback'
  };
}

// ── POST /api/classify ────────────────────────────────────────────────────────
app.post('/api/classify', async (req, res) => {
  const { item, language = 'en' } = req.body || {};

  if (!item || typeof item !== 'string' || item.trim().length === 0) {
    return res.status(400).json({ error: 'item is required', source: 'error' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('[GreenSort] No Gemini API key — using rule-based fallback.');
    return res.json(serverFallbackClassify(item.trim()));
  }

  const langInstruction = language === 'hi'
    ? 'Respond entirely in Hindi (Devanagari script). Use Hindi for all field values.'
    : 'Respond in English.';

  const prompt = `You are an expert waste-management and sustainability assistant.
Classify the following waste item and return ONLY a JSON object (no markdown, no explanation outside JSON).

Waste item: "${item.trim()}"

${langInstruction}

Return this exact JSON schema:
{
  "category": "<one of: Organic / Wet Waste | Recyclable / Dry Waste | Non-Recyclable Waste | E-Waste | Hazardous / Special Waste>",
  "disposal": "<specific, actionable disposal instruction in 1-2 sentences>",
  "explanation": "<why this item belongs to that category, 2-3 sentences>",
  "tip": "<one practical sustainability tip related to this item>",
  "confidence": "<high | medium | low>",
  "caution": <true if item is battery/medicine/chemical/hazardous/requires special handling, else false>,
  "localVariance": "<brief note if disposal rules commonly vary by city/region, or empty string if not applicable>"
}`;

  try {
    const { GoogleGenAI } = require('@google/genai');
    const genai = new GoogleGenAI({ apiKey });
    const result = await genai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const text = result.text.trim();
    // Strip any accidental markdown fences
    const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    const parsed = JSON.parse(clean);

    // Validate required fields
    const required = ['category', 'disposal', 'explanation', 'tip', 'confidence', 'caution'];
    for (const field of required) {
      if (parsed[field] === undefined) throw new Error(`Missing field: ${field}`);
    }

    parsed.source = 'ai';
    return res.json(parsed);
  } catch (err) {
    console.error('[GreenSort] Gemini error, falling back:', err.message);
    return res.json(serverFallbackClassify(item.trim()));
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
  console.log(`\n🌿 GreenSort AI running at http://localhost:${PORT}`);
  console.log(`   Gemini API key: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? 'configured ✓' : 'NOT SET — rule-based fallback active'}\n`);
});
