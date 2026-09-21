/* public/js/fallback.js — Client-side rule-based waste classifier (fallback only) */

'use strict';

/**
 * This module is the client-side fallback classifier.
 * It is ONLY invoked when the /api/classify endpoint itself fails at the
 * network level (e.g. server not reachable). Under normal operation the
 * server handles classification (AI-first, server-side fallback second).
 *
 * It mirrors the keyword database in server.js.
 */

const FALLBACK_DB = [
  {
    id: 'hazardous',
    keywords: [
      'battery','batteries','aa ','aaa ','lithium','lead acid','button cell',
      'paint','varnish','lacquer','solvent','thinner','turpentine','acetone',
      'bleach','acid','alkali','chemical','pesticide','herbicide','insecticide',
      'fertiliser','fertilizer','medicine','medication','drug','tablet','capsule',
      'pill','syringe','needle','injection','pharmaceutical','expired','clinical',
      'medical','toxic','poison','flammable','corrosive','radioactive',
      'mercury','fluorescent','tube light','cfl','thermometer',
      'motor oil','engine oil','fuel','petrol','diesel','gas cylinder',
      'aerosol','spray paint','fire extinguisher','pool chemical'
    ],
    catKey: 'catHazardous',
    disposal: 'Do NOT put in regular bins. Contact your local council for hazardous waste collection days or drop-off points.',
    disposalHi: 'सामान्य डिब्बे में न डालें। खतरनाक कचरे के लिए अपने स्थानीय निकाय से संपर्क करें।',
    explanation: 'Hazardous items contain substances that can harm human health or the environment if improperly disposed of.',
    explanationHi: 'खतरनाक वस्तुओं में ऐसे पदार्थ होते हैं जो अनुचित तरीके से निपटाने पर मानव स्वास्थ्य या पर्यावरण को नुकसान पहुँचा सकते हैं।',
    tip: 'Never pour chemicals down the drain or flush medicines. Many pharmacies accept expired medications for safe disposal.',
    tipHi: 'रसायनों को नाले में न डालें। कई फार्मेसी समाप्त दवाओं को सुरक्षित निपटान के लिए स्वीकार करती हैं।',
    caution: true,
    localVariance: 'Rules for hazardous waste vary significantly by location. Please verify with your local municipal authority.'
  },
  {
    id: 'ewaste',
    keywords: [
      'phone','mobile','smartphone','tablet','laptop','computer','pc','desktop',
      'monitor','screen','television','tv','keyboard','mouse','printer','scanner',
      'charger','cable','wire','adapter','power bank','camera','camcorder',
      'headphone','earphone','speaker','radio','remote control','calculator','clock',
      'watch','smartwatch','router','modem','hard drive','usb','circuit board',
      'motherboard','chip','semiconductor','electronic','microwave','refrigerator',
      'fridge','washing machine','air conditioner','air con','fan','iron','toaster',
      'kettle','blender','mixer','vacuum','drill'
    ],
    catKey: 'catEwaste',
    disposal: 'Take to a certified e-waste collection centre, manufacturer take-back scheme, or authorised recycler.',
    disposalHi: 'प्रमाणित ई-कचरा संग्रह केंद्र, निर्माता वापसी योजना या अधिकृत पुनर्चक्रणकर्ता के पास ले जाएँ।',
    explanation: 'Electronic devices contain valuable metals and hazardous materials. Specialised recycling recovers both safely.',
    explanationHi: 'इलेक्ट्रॉनिक उपकरणों में मूल्यवान धातुएँ और खतरनाक पदार्थ होते हैं। विशेष पुनर्चक्रण दोनों को सुरक्षित रूप से पुनः प्राप्त करता है।',
    tip: "Many electronics brands offer free take-back programmes. Check the manufacturer's website before discarding.",
    tipHi: 'कई इलेक्ट्रॉनिक्स ब्रांड मुफ्त वापसी कार्यक्रम प्रदान करते हैं। फेंकने से पहले निर्माता की वेबसाइट देखें।',
    caution: true,
    localVariance: 'E-waste collection infrastructure varies significantly by city and region.'
  },
  {
    id: 'organic',
    keywords: [
      'banana','apple','orange','mango','grape','pear','lemon','lime','peach',
      'vegetable','veggie','tomato','potato','onion','garlic','carrot','spinach',
      'lettuce','cabbage','broccoli','cauliflower','peas','beans','corn','wheat',
      'rice','bread','roti','chapati','food','fruit','peel','skin','seed','pit',
      'leftover','cooked','raw','meat','chicken','fish','egg','dairy','milk',
      'cheese','curd','yogurt','tea leaves','coffee grounds','leaf','leaves','grass',
      'garden','flower','plant','compost','wet','organic','kitchen','scraps',
      'sabzi','atta','dal','chawal'
    ],
    catKey: 'catOrganic',
    disposal: 'Use a home compost bin or green bin collection. Many municipalities offer wet-waste pickup.',
    disposalHi: 'घरेलू कम्पोस्ट बिन या हरे बिन संग्रह का उपयोग करें। कई नगर पालिकाएँ गीला कचरा उठाती हैं।',
    explanation: 'Organic waste breaks down naturally and can be composted to create nutrient-rich soil amendment.',
    explanationHi: 'जैविक कचरा प्राकृतिक रूप से टूट जाता है और खाद बनाने में उपयोगी है।',
    tip: 'Start a simple compost pile at home — even a small balcony bin can turn kitchen scraps into soil conditioner.',
    tipHi: 'घर पर एक साधारण खाद का ढेर शुरू करें — एक छोटी बालकनी बिन भी रसोई के कचरे को मिट्टी कंडीशनर बना सकती है।',
    caution: false,
    localVariance: ''
  },
  {
    id: 'recyclable',
    keywords: [
      'paper','newspaper','magazine','book','cardboard','carton','box','envelope',
      'notebook','plastic','bottle','container','jar','cup','bag','polyester',
      'nylon','can','tin','aluminium','aluminum','steel','metal','glass',
      'clean','dry','recycle','recyclable','tetra','tetrapack','milk carton',
      'juice carton','water bottle','shampoo','detergent','soap bottle','spray can',
      'foam cup','paper bag','corrugated'
    ],
    catKey: 'catRecyclable',
    disposal: 'Clean, dry and deposit in the blue/dry recycling bin or take to a recycling collection point.',
    disposalHi: 'साफ और सूखे करके नीले/सूखे पुनर्चक्रण बिन में डालें या पुनर्चक्रण केंद्र पर ले जाएँ।',
    explanation: 'Clean and dry recyclables can be processed into new materials, reducing the need for virgin resources.',
    explanationHi: 'साफ और सूखी पुनर्चक्रणीय वस्तुओं को नई सामग्री में संसाधित किया जा सकता है।',
    tip: 'Rinse containers before recycling — contamination with food residue can cause entire batches to be rejected.',
    tipHi: 'पुनर्चक्रण से पहले कंटेनरों को धोएँ — खाद्य अवशेषों से संदूषण पूरे बैच को अस्वीकार करवा सकता है।',
    caution: false,
    localVariance: ''
  },
  {
    id: 'nonrecyclable',
    keywords: [
      'dirty','contaminated','greasy','stained','soiled','wet paper','tissue',
      'napkin','sanitary','nappy','diaper','cotton','bud','swab','bandage',
      'broken','ceramic','pottery','pyrex','cutlery','pen','pencil','rubber',
      'polystyrene','styrofoam','chip packet','crisp','multi-layer','composite',
      'sticker','tape','cling wrap','wax coated','mirror','drinking glass',
      'crystal','carpet','curtain','cigarette','ash','dust','used','soiled'
    ],
    catKey: 'catNonRecycle',
    disposal: 'Dispose in the general/black waste bin for landfill collection.',
    disposalHi: 'लैंडफिल संग्रह के लिए सामान्य/काले कचरे के डिब्बे में डालें।',
    explanation: 'This item cannot currently be recycled through standard kerbside schemes due to contamination, mixed materials or incompatible composition.',
    explanationHi: 'इस वस्तु को संदूषण, मिश्रित सामग्री या असंगत संरचना के कारण मानक पुनर्चक्रण योजनाओं के माध्यम से पुनर्चक्रित नहीं किया जा सकता।',
    tip: 'Reduce non-recyclable waste by choosing products with minimal or recyclable packaging when shopping.',
    tipHi: 'खरीदारी करते समय न्यूनतम या पुनर्चक्रणीय पैकेजिंग वाले उत्पाद चुनकर गैर-पुनर्चक्रणीय कचरा कम करें।',
    caution: false,
    localVariance: ''
  }
];

/**
 * Classify itemText using keyword matching.
 * Returns a result object matching the /api/classify response schema.
 */
function clientFallbackClassify(itemText) {
  const lower = itemText.toLowerCase();
  const lang = window.I18N_MODULE ? window.I18N_MODULE.getLanguage() : 'en';

  const scores = FALLBACK_DB.map(entry => ({
    entry,
    score: entry.keywords.filter(k => lower.includes(k)).length
  }));
  scores.sort((a, b) => b.score - a.score);

  const best = scores[0];
  const entry = best.score > 0 ? best.entry : FALLBACK_DB.find(e => e.id === 'nonrecyclable');

  const { t } = window.I18N_MODULE || { t: k => k };

  return {
    category:      t(entry.catKey),
    disposal:      lang === 'hi' ? entry.disposalHi : entry.disposal,
    explanation:   lang === 'hi' ? entry.explanationHi : entry.explanation,
    tip:           lang === 'hi' ? entry.tipHi : entry.tip,
    confidence:    best.score >= 2 ? 'high' : best.score === 1 ? 'medium' : 'low',
    caution:       entry.caution,
    localVariance: entry.localVariance,
    source:        'fallback'
  };
}

window.CLIENT_FALLBACK = { clientFallbackClassify };
