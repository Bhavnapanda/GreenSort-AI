/* public/js/i18n.js — English / Hindi string map and language switcher */

'use strict';

const I18N = {
  en: {
    brandName:        'GreenSort AI',
    brandTagline:     'AI-Powered Waste Segregation Assistant',
    heroPurpose:      'Unsure where to throw something? Describe any waste item in plain language and get an instant, AI-guided classification with disposal advice — supporting cleaner cities and a healthier planet.',
    inputLabel:       'Describe your waste item',
    inputPlaceholder: 'e.g. old mobile phone, banana peel, empty plastic bottle…',
    inputHint:        'Describe the item as you would to a friend.',
    analyseBtn:       'Analyse Waste',
    newAnalysis:      'New Analysis',
    loadingText:      'Analysing with AI…',
    cautionMsg:       'This item requires special handling. Do not place in regular bins — contact your local hazardous waste facility.',
    lowConfidenceMsg: 'The AI was uncertain about this classification. Please verify before disposal.',
    disposalLabel:    'Disposal Recommendation',
    explanationLabel: 'Why This Category?',
    copyBtn:          'Copy Result',
    copiedMsg:        'Copied!',
    historyTitle:     'This Session',
    downloadCsv:      'Download CSV',
    clearHistory:     'Clear History',
    raiTitle:         'About this tool & Responsible AI',
    raiDisclaimer:    'GreenSort AI provides <strong>guidance only</strong>. Results are AI-generated recommendations and are <strong>not official disposal authority advice</strong>. Waste-management rules vary by municipality, region and country. Always verify requirements for hazardous, medical, battery and special waste with your local authority.',
    raiPoint1:        'This system does not claim perfect accuracy and may occasionally mis-classify unfamiliar items.',
    raiPoint2:        'The system may use AI-assisted classification and can provide fallback guidance when the AI service is unavailable. Results should be treated as guidance rather than official waste-management advice.',
    raiPoint3:        'No personal information is collected. No account is required.',
    raiPoint4:        "Your input is sent to the Google Gemini API for processing. See Google's AI Principles for data policy.",
    raiPoint5:        'SDG alignment: SDG 12 (Responsible Consumption), SDG 11 (Sustainable Cities), SDG 13 (Climate Action).',
    footerText:       'GreenSort AI — Built for the AI for Sustainability internship.',
    footerNote:       'Results are recommendations only. Verify with your local waste authority.',
    sourcePillAI:     'AI-Generated',
    sourcePillFB:     'Rule-based Fallback',
    sourcePillDemo:   'Prototype Demo',
    demoModeBtn:      '🎬 Demo Mode',
    demoBannerTitle:  'Prototype Demo Mode',
    demoBannerNote:   'This is a predefined prototype result, not a live AI-generated classification.',
    langToggleLabel:  'हिंदी',
    // Example chip labels
    bananaPeel:       'Banana peel',
    plasticBottle:    'Plastic bottle',
    oldPhone:         'Old mobile phone',
    aaBattery:        'AA battery',
    cardboard:        'Cardboard box',
    medicine:         'Medicine tablets',
    pizzaBox:         'Greasy pizza box',
    laptopCharger:    'Laptop charger',
    // Category display names
    catOrganic:       'Organic / Wet Waste',
    catRecyclable:    'Recyclable / Dry Waste',
    catNonRecycle:    'Non-Recyclable Waste',
    catEwaste:        'E-Waste',
    catHazardous:     'Hazardous / Special Waste',
    // Error messages
    errEmpty:         'Please describe a waste item first.',
    errNetwork:       'Could not reach the server. Please check your connection.',
    errUnexpected:    'An unexpected error occurred. Please try again.',
    historyEmpty:     'No history yet — analyse some waste items to see them here.',
  },

  hi: {
    brandName:        'GreenSort AI',
    brandTagline:     'AI-संचालित कचरा पृथक्करण सहायक',
    heroPurpose:      'नहीं पता कहाँ फेंकें? किसी भी कचरे की वस्तु को सामान्य भाषा में बताएँ और तुरंत AI-मार्गदर्शित वर्गीकरण पाएँ — साफ शहरों और स्वस्थ पृथ्वी के लिए।',
    inputLabel:       'अपनी कचरे की वस्तु का वर्णन करें',
    inputPlaceholder: 'उदाहरण: पुराना मोबाइल फोन, केले का छिलका, खाली प्लास्टिक बोतल…',
    inputHint:        'वस्तु को ऐसे बताएँ जैसे किसी मित्र को बता रहे हों।',
    analyseBtn:       'कचरा विश्लेषण करें',
    newAnalysis:      'नया विश्लेषण',
    loadingText:      'AI से विश्लेषण हो रहा है…',
    cautionMsg:       'इस वस्तु को विशेष तरीके से निपटाएँ। सामान्य डिब्बे में न डालें — अपने स्थानीय खतरनाक कचरा केंद्र से संपर्क करें।',
    lowConfidenceMsg: 'AI इस वर्गीकरण के बारे में अनिश्चित था। कृपया निपटान से पहले सत्यापित करें।',
    disposalLabel:    'निपटान की सिफारिश',
    explanationLabel: 'यह श्रेणी क्यों?',
    copyBtn:          'परिणाम कॉपी करें',
    copiedMsg:        'कॉपी हो गया!',
    historyTitle:     'इस सत्र का इतिहास',
    downloadCsv:      'CSV डाउनलोड करें',
    clearHistory:     'इतिहास साफ करें',
    raiTitle:         'इस टूल के बारे में और जिम्मेदार AI',
    raiDisclaimer:    'GreenSort AI केवल <strong>मार्गदर्शन</strong> प्रदान करता है। परिणाम AI-जनित सिफारिशें हैं और <strong>आधिकारिक निपटान प्राधिकरण की सलाह नहीं हैं</strong>। कचरा प्रबंधन नियम नगर पालिका, क्षेत्र और देश के अनुसार भिन्न होते हैं।',
    raiPoint1:        'यह प्रणाली पूर्ण सटीकता का दावा नहीं करती और कभी-कभी अपरिचित वस्तुओं को गलत वर्गीकृत कर सकती है।',
    raiPoint2:        'यह सिस्टम AI-सहायता से वर्गीकरण कर सकता है और AI सेवा अनुपलब्ध होने पर फॉलबैक मार्गदर्शन प्रदान कर सकता है। परिणामों को आधिकारिक कचरा प्रबंधन सलाह के बजाय मार्गदर्शन के रूप में माना जाना चाहिए।',
    raiPoint3:        'कोई व्यक्तिगत जानकारी एकत्र नहीं की जाती। कोई खाता आवश्यक नहीं है।',
    raiPoint4:        'आपका इनपुट प्रोसेसिंग के लिए Google Gemini API को भेजा जाता है।',
    raiPoint5:        'SDG संरेखण: SDG 12 (जिम्मेदार उपभोग), SDG 11 (सतत शहर), SDG 13 (जलवायु कार्रवाई)।',
    footerText:       'GreenSort AI — AI फॉर सस्टेनेबिलिटी इंटर्नशिप के लिए निर्मित।',
    footerNote:       'परिणाम केवल सिफारिशें हैं। अपने स्थानीय कचरा प्राधिकरण से सत्यापित करें।',
    sourcePillAI:     'AI-जनित',
    sourcePillFB:     'नियम-आधारित फॉलबैक',
    sourcePillDemo:   'प्रोटोटाइप डेमो',
    demoModeBtn:      '🎬 डेमो मोड',
    demoBannerTitle:  'प्रोटोटाइप डेमो मोड',
    demoBannerNote:   'यह एक पूर्वनिर्धारित प्रोटोटाइप परिणाम है, न कि लाइव AI-जनित वर्गीकरण।',
    langToggleLabel:  'English',
    // Example chip labels
    bananaPeel:       'केले का छिलका',
    plasticBottle:    'प्लास्टिक की बोतल',
    oldPhone:         'पुराना मोबाइल फोन',
    aaBattery:        'AA बैटरी',
    cardboard:        'गत्ते का डिब्बा',
    medicine:         'दवाई की गोलियाँ',
    pizzaBox:         'चिकना पिज़्ज़ा बॉक्स',
    laptopCharger:    'लैपटॉप चार्जर',
    // Category display names
    catOrganic:       'जैविक / गीला कचरा',
    catRecyclable:    'पुनर्चक्रणीय / सूखा कचरा',
    catNonRecycle:    'गैर-पुनर्चक्रणीय कचरा',
    catEwaste:        'ई-कचरा',
    catHazardous:     'खतरनाक / विशेष कचरा',
    // Error messages
    errEmpty:         'कृपया पहले एक कचरे की वस्तु का वर्णन करें।',
    errNetwork:       'सर्वर तक पहुँच नहीं हुई। कृपया अपना कनेक्शन जाँचें।',
    errUnexpected:    'एक अप्रत्याशित त्रुटि हुई। कृपया पुनः प्रयास करें।',
    historyEmpty:     'अभी कोई इतिहास नहीं — कुछ वस्तुओं का विश्लेषण करें।',
  }
};

// Current language state
let currentLanguage = 'en';

function t(key) {
  return I18N[currentLanguage][key] || I18N.en[key] || key;
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLanguage = lang;
  document.documentElement.lang = lang;
  applyI18n();
}

function getLanguage() { return currentLanguage; }

function applyI18n() {
  // data-i18n → textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (key === 'raiDisclaimer') {
      el.innerHTML = val; // allow <strong> tags
    } else {
      el.textContent = val;
    }
  });

  // data-i18n-placeholder → placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Language toggle button label
  const btn = document.getElementById('langToggle');
  if (btn) btn.querySelector('#langLabel').textContent = t('langToggleLabel');

  // Example chip spans
  document.querySelectorAll('[data-i18n-chip]').forEach(el => {
    el.textContent = t(el.dataset.i18nChip);
  });

  // Update page title
  document.title = `${t('brandName')} — ${t('brandTagline')}`;
}

// Expose globally
window.I18N_MODULE = { t, setLanguage, getLanguage, applyI18n };
