/* public/js/demo-mode.js — Predefined Prototype Demo Mode results */

'use strict';

/**
 * Six predefined results for the six named example chips.
 * Keys match the English chip data-en values exactly (lower-cased for lookup).
 * Each result matches the full /api/classify response schema.
 * source is always 'demo' so the UI can label them unambiguously.
 */
const DEMO_RESULTS = {
  'banana peel': {
    category:      'Organic / Wet Waste',
    disposal:      'Place in your green / wet-waste bin or home compost bin. Many municipalities collect organic waste separately.',
    explanation:   'Banana peels are biodegradable organic matter. They break down naturally and can be composted to produce nutrient-rich soil conditioner.',
    tip:           'Banana peels can be composted in as little as 3–4 weeks in a hot compost pile. Add them with dry browns like cardboard to balance moisture.',
    confidence:    'high',
    caution:       false,
    localVariance: '',
    source:        'demo'
  },
  'plastic bottle': {
    category:      'Recyclable / Dry Waste',
    disposal:      'Rinse clean, remove the cap, and place in the blue / dry recycling bin or take to a plastic recycling drop-off point.',
    explanation:   'Empty, clean plastic bottles (typically PET or HDPE) are widely accepted by kerbside recycling programmes. Contamination with liquids or food can cause rejection.',
    tip:           'Crush the bottle before recycling to save space in your bin and in the recycling truck.',
    confidence:    'high',
    caution:       false,
    localVariance: 'Some municipalities accept caps separately or ask you to leave them on. Check your local council guidance.',
    source:        'demo'
  },
  'old mobile phone': {
    category:      'E-Waste',
    disposal:      'Take to a certified e-waste collection centre, a manufacturer take-back scheme, or an authorised electronics recycler. Do not place in regular bins.',
    explanation:   'Mobile phones contain circuit boards, lithium batteries, precious metals (gold, silver, copper) and hazardous materials. Specialist recycling safely recovers valuable materials and prevents toxic leaching.',
    tip:           "Many smartphone brands (Apple, Samsung, etc.) offer free take-back or trade-in programmes. Factory-reset the device and remove your SIM card before handing it in.",
    confidence:    'high',
    caution:       true,
    localVariance: 'E-waste collection infrastructure varies significantly by city and region. Search for certified e-waste recyclers in your area.',
    source:        'demo'
  },
  'aa battery': {
    category:      'Hazardous / Special Waste',
    disposal:      'Do NOT put in regular bins. Deposit in a battery recycling point — these are commonly found at supermarkets, electronics retailers, and council recycling centres.',
    explanation:   'AA batteries contain chemicals such as zinc, manganese dioxide and alkaline electrolytes. Landfilling batteries risks heavy-metal leaching into soil and groundwater.',
    tip:           'Switch to rechargeable AA batteries to reduce hazardous waste significantly. A quality rechargeable set can be recharged 500–1000 times.',
    confidence:    'high',
    caution:       true,
    localVariance: 'Battery drop-off locations vary by country and municipality. Many large supermarkets and electronics shops provide free collection boxes.',
    source:        'demo'
  },
  'cardboard box': {
    category:      'Recyclable / Dry Waste',
    disposal:      'Flatten the box, remove any tape or polystyrene inserts, and place in the blue / dry recycling bin or a cardboard collection point.',
    explanation:   'Clean, dry cardboard is one of the most recyclable materials. It is reprocessed into new cardboard products. Tape and foam packaging are not recyclable and must be removed.',
    tip:           'Wet or heavily soiled cardboard (e.g. greasy pizza boxes) cannot be recycled — tear off and compost the clean portion, and bin the soiled part.',
    confidence:    'high',
    caution:       false,
    localVariance: '',
    source:        'demo'
  },
  'medicine tablets': {
    category:      'Hazardous / Special Waste',
    disposal:      'Return unused or expired medicines to a pharmacy. Do NOT flush down the toilet or put in household bins — this contaminates water systems.',
    explanation:   'Pharmaceutical waste contains active chemical compounds that persist in the environment. Improper disposal can contaminate water supplies and harm aquatic life.',
    tip:           'Keep a small bag or box at home to collect expired medicines and drop them at your nearest pharmacy for safe disposal.',
    confidence:    'high',
    caution:       true,
    localVariance: 'Many countries have national medicine take-back schemes. In India, check with your local pharmacy or municipal health authority.',
    source:        'demo'
  }
};

/**
 * Look up a predefined demo result by item text.
 * Returns the result object if found, or null if this item has no predefined result.
 * @param {string} itemText
 * @returns {Object|null}
 */
function getDemoResult(itemText) {
  const key = itemText.trim().toLowerCase();
  return DEMO_RESULTS[key] || null;
}

window.DEMO_MODE = { getDemoResult, DEMO_RESULTS };
