/* public/js/history.js — In-memory session history and CSV export */

'use strict';

const HISTORY = (() => {
  let items = []; // [{ id, itemText, category, disposal, source, confidence, caution, timestamp }]

  function add(itemText, result) {
    const entry = {
      id:         Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      itemText:   itemText.trim(),
      category:   result.category,
      disposal:   result.disposal,
      explanation:result.explanation,
      tip:        result.tip,
      confidence: result.confidence,
      caution:    result.caution,
      localVariance: result.localVariance || '',
      source:     result.source,
      timestamp:  new Date().toISOString()
    };
    items.push(entry);
    return entry;
  }

  function getAll() { return [...items]; }

  function clear() { items = []; }

  function count() { return items.length; }

  /**
   * Download session history as a UTF-8 CSV file.
   * Opens a temporary <a> link and triggers a download.
   */
  function downloadCSV() {
    if (items.length === 0) return;

    const headers = [
      'Timestamp', 'Item Described', 'Category', 'Confidence',
      'Disposal Recommendation', 'Explanation', 'Sustainability Tip',
      'Caution Required', 'Local Variance Note', 'Source'
    ];

    function csvEscape(val) {
      const str = String(val == null ? '' : val);
      // If the value contains commas, quotes or newlines, wrap in double quotes
      if (str.includes('"') || str.includes(',') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }

    const rows = items.map(item => [
      new Date(item.timestamp).toLocaleString(),
      item.itemText,
      item.category,
      item.confidence,
      item.disposal,
      item.explanation,
      item.tip,
      item.caution ? 'Yes' : 'No',
      item.localVariance,
      item.source === 'ai' ? 'AI (Gemini)' : 'Rule-based Fallback'
    ].map(csvEscape).join(','));

    const csv = [headers.map(csvEscape).join(','), ...rows].join('\r\n');

    // Add BOM so Excel opens UTF-8 correctly
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href  = url;
    link.download = `ecosort-session-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return { add, getAll, clear, count, downloadCSV };
})();

window.HISTORY = HISTORY;
