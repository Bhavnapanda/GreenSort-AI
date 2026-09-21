/* public/js/ui.js — DOM helpers, state management, result card rendering */

'use strict';

const UI = (() => {
  // ── Element references ────────────────────────────────────────────────────
  const els = {
    wasteInput:       () => document.getElementById('wasteInput'),
    analyseBtn:       () => document.getElementById('analyseBtn'),
    resetBtn:         () => document.getElementById('resetBtn'),
    loadingState:     () => document.getElementById('loadingState'),
    errorState:       () => document.getElementById('errorState'),
    errorMsg:         () => document.getElementById('errorMsg'),
    resultCard:       () => document.getElementById('resultCard'),
    categoryBadge:    () => document.getElementById('categoryBadge'),
    cautionBanner:    () => document.getElementById('cautionBanner'),
    cautionMsg:       () => document.getElementById('cautionMsg'),
    confidenceWarn:   () => document.getElementById('confidenceWarn'),
    localVarianceBox: () => document.getElementById('localVarianceBox'),
    localVarianceText:() => document.getElementById('localVarianceText'),
    disposalText:     () => document.getElementById('disposalText'),
    explanationText:  () => document.getElementById('explanationText'),
    tipText:          () => document.getElementById('tipText'),
    copyBtn:          () => document.getElementById('copyBtn'),
    copiedMsg:        () => document.getElementById('copiedMsg'),
    historySection:   () => document.getElementById('historySection'),
    historyList:      () => document.getElementById('historyList'),
  };

  // ── Category → CSS class mapping ──────────────────────────────────────────
  const CAT_CLASS_MAP = {
    'Organic / Wet Waste':        'cat-organic',
    'Recyclable / Dry Waste':     'cat-recyclable',
    'Non-Recyclable Waste':       'cat-nonrecycle',
    'E-Waste':                    'cat-ewaste',
    'Hazardous / Special Waste':  'cat-hazardous',
    // Hindi category names
    'जैविक / गीला कचरा':           'cat-organic',
    'पुनर्चक्रणीय / सूखा कचरा':     'cat-recyclable',
    'गैर-पुनर्चक्रणीय कचरा':         'cat-nonrecycle',
    'ई-कचरा':                      'cat-ewaste',
    'खतरनाक / विशेष कचरा':         'cat-hazardous',
  };

  function catClass(categoryStr) {
    return CAT_CLASS_MAP[categoryStr] || 'cat-nonrecycle';
  }

  // ── State transitions ─────────────────────────────────────────────────────

  function showLoading() {
    els.loadingState().hidden = false;
    els.errorState().hidden   = true;
    els.resultCard().hidden   = true;
    els.analyseBtn().disabled = true;
    els.analyseBtn().textContent = window.I18N_MODULE.t('loadingText');
  }

  function hideLoading() {
    els.loadingState().hidden = true;
    els.analyseBtn().disabled = false;
    els.analyseBtn().textContent = window.I18N_MODULE.t('analyseBtn');
  }

  function showError(msg) {
    hideLoading();
    els.errorMsg().textContent = msg;
    els.errorState().hidden    = false;
    els.resultCard().hidden    = true;
    els.resetBtn().style.display = '';
  }

  function clearError() {
    els.errorState().hidden = true;
  }

  function resetToEmpty() {
    els.wasteInput().value       = '';
    els.resultCard().hidden      = true;
    els.errorState().hidden      = true;
    els.loadingState().hidden    = true;
    els.resetBtn().style.display = 'none';
    els.analyseBtn().disabled    = false;
    els.analyseBtn().textContent = window.I18N_MODULE.t('analyseBtn');
    els.wasteInput().focus();
  }

  // ── Render result card ────────────────────────────────────────────────────

  function renderResult(result) {
    hideLoading();
    clearError();

    const { t } = window.I18N_MODULE;

    // Category badge
    const badge = els.categoryBadge();
    badge.textContent  = result.category;
    badge.className    = 'category-badge ' + catClass(result.category);

    // Caution banner
    const caution = els.cautionBanner();
    if (result.caution) {
      els.cautionMsg().textContent = t('cautionMsg');
      caution.hidden = false;
    } else {
      caution.hidden = true;
    }

    // Low-confidence warning
    const confWarn = els.confidenceWarn();
    if (result.confidence === 'low') {
      confWarn.hidden = false;
    } else {
      confWarn.hidden = true;
    }

    // Local variance note
    const lvBox = els.localVarianceBox();
    if (result.localVariance && result.localVariance.trim()) {
      els.localVarianceText().textContent = result.localVariance;
      lvBox.hidden = false;
    } else {
      lvBox.hidden = true;
    }

    // Main fields
    els.disposalText().textContent    = result.disposal;
    els.explanationText().textContent = result.explanation;
    els.tipText().textContent         = result.tip;

    // Show card
    els.resultCard().hidden      = false;
    els.resetBtn().style.display = '';

    // Scroll result into view
    els.resultCard().scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // ── Copy result to clipboard ───────────────────────────────────────────────

  function bindCopyBtn(getLastResult) {
    els.copyBtn().addEventListener('click', () => {
      const r = getLastResult();
      if (!r) return;
      const { t } = window.I18N_MODULE;
      const text = [
        `GreenSort AI — ${new Date().toLocaleString()}`,
        `${t('inputLabel')}: ${r.item || ''}`,
        `Category: ${r.category}`,
        `${t('disposalLabel')}: ${r.disposal}`,
        `${t('explanationLabel')}: ${r.explanation}`,
        `Tip: ${r.tip}`,
        `Source: ${r.source === 'ai' ? t('sourcePillAI') : t('sourcePillFB')}`,
        r.caution ? `⚠ ${t('cautionMsg')}` : '',
        r.localVariance ? `📍 ${r.localVariance}` : ''
      ].filter(Boolean).join('\n');

      navigator.clipboard.writeText(text).then(() => {
        const msg = els.copiedMsg();
        msg.hidden = false;
        msg.textContent = t('copiedMsg');
        setTimeout(() => { msg.hidden = true; }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        const msg = els.copiedMsg();
        msg.hidden = false;
        setTimeout(() => { msg.hidden = true; }, 2000);
      });
    });
  }

  // ── History rendering ─────────────────────────────────────────────────────

  function renderHistory(historyItems) {
    const list = els.historyList();
    const section = els.historySection();

    if (!historyItems || historyItems.length === 0) {
      section.hidden = true;
      return;
    }

    section.hidden = false;
    list.innerHTML = '';

    // Render newest first
    const reversed = [...historyItems].reverse();
    reversed.forEach(item => {
      const row = document.createElement('div');
      row.className = 'history-item';
      row.setAttribute('role', 'listitem');

      const catSpan = document.createElement('span');
      catSpan.className = 'history-item-cat ' + catClass(item.category);
      catSpan.textContent = item.category;

      const textSpan = document.createElement('span');
      textSpan.className = 'history-item-text';
      textSpan.title = item.itemText;
      textSpan.textContent = item.itemText;

      const sourceSpan = document.createElement('span');
      sourceSpan.className = 'history-item-source ' + (item.source === 'ai' ? 'source-ai' : 'source-fallback');
      sourceSpan.textContent = item.source === 'ai' ? 'AI' : 'FB';

      const timeSpan = document.createElement('span');
      timeSpan.className = 'history-item-time';
      timeSpan.textContent = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      row.append(catSpan, textSpan, sourceSpan, timeSpan);
      list.appendChild(row);
    });
  }

  return {
    els,
    catClass,
    showLoading,
    hideLoading,
    showError,
    clearError,
    resetToEmpty,
    renderResult,
    bindCopyBtn,
    renderHistory
  };
})();

window.UI = UI;
