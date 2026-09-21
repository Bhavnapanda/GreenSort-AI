/* public/js/app.js — Entry point: event wiring, application state */

'use strict';

(function () {
  // ── Application state ─────────────────────────────────────────────────────
  const state = {
    lastResult: null, // most recent classification result (with .item attached)
    isLoading:  false
  };

  // ── DOM ready ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // Apply initial i18n (English default)
    window.I18N_MODULE.applyI18n();

    // Wire up all interactions
    bindLanguageToggle();
    bindExampleChips();
    bindAnalyseButton();
    bindResetButton();
    bindHistoryActions();
    UI.bindCopyBtn(() => state.lastResult);
  });

  // ── Language toggle ───────────────────────────────────────────────────────
  function bindLanguageToggle() {
    const btn = document.getElementById('langToggle');
    btn.addEventListener('click', () => {
      const current = window.I18N_MODULE.getLanguage();
      const next    = current === 'en' ? 'hi' : 'en';
      window.I18N_MODULE.setLanguage(next);

      // Re-render history badges in new language
      UI.renderHistory(window.HISTORY.getAll());
    });
  }

  // ── Example chip clicks ───────────────────────────────────────────────────
  function bindExampleChips() {
    document.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const lang  = window.I18N_MODULE.getLanguage();
        const value = lang === 'hi' ? chip.dataset.hi : chip.dataset.en;
        const input = document.getElementById('wasteInput');
        input.value = value;
        input.focus();
        // Clear any existing result/error when user picks a new chip
        UI.clearError();
      });
    });
  }

  // ── Analyse button ────────────────────────────────────────────────────────
  function bindAnalyseButton() {
    document.getElementById('analyseBtn').addEventListener('click', runAnalysis);
    document.getElementById('wasteInput').addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runAnalysis();
      }
    });
  }

  async function runAnalysis() {
    if (state.isLoading) return;

    const { t } = window.I18N_MODULE;
    const itemText = document.getElementById('wasteInput').value.trim();

    if (!itemText) {
      UI.showError(t('errEmpty'));
      return;
    }

    state.isLoading = true;
    UI.showLoading();

    try {
      const result = await window.AI_SERVICE.classify(itemText);

      // Attach the original input to the result for copy/history use
      result.item = itemText;
      state.lastResult = result;

      // Render result card
      UI.renderResult(result);

      // Add to session history
      window.HISTORY.add(itemText, result);
      UI.renderHistory(window.HISTORY.getAll());

    } catch (err) {
      // This path is only hit if CLIENT_FALLBACK itself throws (should not happen)
      console.error('[App] Unexpected error:', err);
      UI.showError(window.I18N_MODULE.t('errUnexpected'));
    } finally {
      state.isLoading = false;
    }
  }

  // ── Reset button ──────────────────────────────────────────────────────────
  function bindResetButton() {
    document.getElementById('resetBtn').addEventListener('click', () => {
      state.lastResult = null;
      UI.resetToEmpty();
    });
  }

  // ── History actions ───────────────────────────────────────────────────────
  function bindHistoryActions() {
    document.getElementById('downloadCsvBtn').addEventListener('click', () => {
      window.HISTORY.downloadCSV();
    });

    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
      window.HISTORY.clear();
      UI.renderHistory([]);
    });
  }

})();
