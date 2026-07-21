/* =====================================================
   MAGS MARIETTA — api/check-subscriber.js
   Stores every contact-form email in a single private
   file (subscribers.json) in Vercel Blob storage, and
   tells the caller whether an email is already on it.
   ===================================================== */

const { put, get } = require('@vercel/blob');

const FILE = 'subscribers.json';

// Reads the current list of subscriber emails.
// If the file doesn't exist yet (first-ever signup), returns an empty list.
async function loadSubscribers() {
  try {
    const blob = await get(FILE, { access: 'private' });
    const text = await new Response(blob.stream).text();
    return JSON.parse(text);
  } catch (err) {
    return [];
  }
}

async function saveSubscribers(list) {
  await put(FILE, JSON.stringify(list), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true
  });
}

module.exports = async (req, res) => {
  // Your site is hosted on GitHub Pages, this function on Vercel — different
  // origins, so the browser needs explicit permission (CORS) to call it.
  res.setHeader('Access-Control-Allow-Origin', 'https://magsmarietta.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Browsers send an OPTIONS request first to check permission before the
  // real POST — just approve it and stop, no work to do here.
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const normalized = email.trim().toLowerCase();

  try {
    const subscribers = await loadSubscribers();

    if (subscribers.includes(normalized)) {
      return res.status(200).json({ alreadySubscribed: true });
    }

    subscribers.push(normalized);
    await saveSubscribers(subscribers);

    return res.status(200).json({ alreadySubscribed: false });
  } catch (err) {
    console.error('check-subscriber error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
