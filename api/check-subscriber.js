/* =====================================================
   MAGS MARIETTA — api/check-subscriber.js
   Stores every contact-form email in a single private
   file (subscribers.json) in Vercel Blob storage, and
   tells the caller whether an email is already on it.

   Two modes (POST body):
     { email }                → check only, nothing is saved
     { email, save: true }    → adds the email to the list
   The site checks first, sends the welcome email, and only
   then saves — so a failed send never locks someone out.
   ===================================================== */

const { put, get } = require('@vercel/blob');

const FILE = 'subscribers.json';

// Origins allowed to call this function (CORS).
const ALLOWED_ORIGINS = [
  'https://magsmarietta.com',
  'https://www.magsmarietta.com',
  'https://magsmarietta.github.io'
];

// True only when the error means "this file doesn't exist yet".
function isNotFound(err) {
  return !!err && (
    err.name === 'BlobNotFoundError' ||
    /does not exist|not found/i.test(err.message || '')
  );
}

// Reads the current list of subscriber emails.
// Returns an empty list ONLY if the file doesn't exist yet (first-ever signup).
// Any other failure is thrown, so a temporary storage error can never be
// mistaken for "no subscribers" and cause the saved list to be overwritten.
async function loadSubscribers() {
  let blob;
  try {
    blob = await get(FILE, { access: 'private' });
  } catch (err) {
    if (isNotFound(err)) return [];
    throw err;
  }
  if (!blob) return []; // some versions return null for a missing file
  const text = await new Response(blob.stream).text();
  return JSON.parse(text);
}

async function saveSubscribers(list) {
  await put(FILE, JSON.stringify(list), {
    access: 'private',
    contentType: 'application/json',
    allowOverwrite: true
  });
}

module.exports = async (req, res) => {
  // The browser needs explicit permission (CORS) to call this function from
  // the site's domain. Only approved origins get it.
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Browsers send an OPTIONS request first to check permission before the
  // real POST — just approve it and stop, no work to do here.
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') return res.status(405).end();

  const { email, save } = req.body || {};
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const normalized = email.trim().toLowerCase();

  try {
    const subscribers = await loadSubscribers();

    if (subscribers.includes(normalized)) {
      return res.status(200).json({ alreadySubscribed: true });
    }

    // Check-only mode: report that they're new, but don't save yet.
    if (save !== true) {
      return res.status(200).json({ alreadySubscribed: false });
    }

    subscribers.push(normalized);
    await saveSubscribers(subscribers);

    return res.status(200).json({ alreadySubscribed: false, saved: true });
  } catch (err) {
    console.error('check-subscriber error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
