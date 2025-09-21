// ==================================
// Simple API client for /api/generate
// ==================================


// client/src/api.js
const API_BASE = window.location.origin;

export async function generateFrom({ text, urls, files, order, numWords, sentenceStart, stopAtPunctuation, seed }) {
  const hasFiles = files && files.length > 0;
  if (hasFiles) {
    const fd = new FormData();
    if (text) fd.append('text', text);
    if (urls?.length) urls.forEach(u => fd.append('urls', u));
    fd.append('order', order);
    fd.append('numWords', numWords);
    fd.append('sentenceStart', sentenceStart);
    fd.append('stopAtPunctuation', stopAtPunctuation);
    if (seed) fd.append('seed', seed);
    for (const f of files) fd.append('files', f);

    const res = await fetch(`${API_BASE}/api/generate`, { method: 'POST', body: fd });
    return res.json();
  }

  const res = await fetch(`${API_BASE}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, urls, order, numWords, sentenceStart, stopAtPunctuation, seed })
  });
  return res.json();
}
