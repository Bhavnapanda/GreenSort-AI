/* public/js/ai-service.js — Fetches /api/classify; falls back to client classifier on network failure */

'use strict';

const AI_SERVICE = (() => {
  const ENDPOINT    = '/api/classify';
  const TIMEOUT_MS  = 12000; // 12 s before aborting and falling back

  /**
   * Classify itemText.
   * - Calls POST /api/classify (server handles Gemini + server-side fallback)
   * - If the network call itself fails (server unreachable), runs the
   *   client-side keyword classifier as a last resort.
   *
   * @param {string} itemText
   * @returns {Promise<Object>} result object matching schema
   */
  async function classify(itemText) {
    const lang = window.I18N_MODULE.getLanguage();

    // AbortController for request timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(ENDPOINT, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ item: itemText, language: lang }),
        signal:  controller.signal
      });

      clearTimeout(timer);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${response.status}`);
      }

      const data = await response.json();

      // Sanity-check required fields
      if (!data.category || !data.disposal || !data.source) {
        throw new Error('Incomplete response from server');
      }

      return data;

    } catch (err) {
      clearTimeout(timer);

      // Distinguish between user-visible errors and silent fallback cases
      if (err.name === 'AbortError') {
        console.warn('[AI_SERVICE] Request timed out — using client fallback');
      } else if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        console.warn('[AI_SERVICE] Network error — using client fallback');
      } else {
        // Server returned an error code (400, 500, etc.) — still use client fallback
        console.warn('[AI_SERVICE] Server error:', err.message, '— using client fallback');
      }

      // Client-side keyword fallback (last resort — server completely unreachable)
      return window.CLIENT_FALLBACK.clientFallbackClassify(itemText);
    }
  }

  return { classify };
})();

window.AI_SERVICE = AI_SERVICE;
