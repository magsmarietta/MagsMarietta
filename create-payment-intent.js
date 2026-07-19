/* =====================================================
   MAGS MARIETTA — api/create-payment-intent.js
   Vercel serverless function.

   Deploy this on Vercel (not GitHub Pages — GH Pages can't run
   server code). Your GitHub Pages site calls this URL over
   fetch() to get a Stripe "client secret" for the Payment
   Element to use.

   SECURITY NOTE: prices are looked up here from products.js —
   never trust a price sent from the browser. This is what stops
   someone from editing devtools to buy a $30 ring for $0.01.
   ===================================================== */

const Stripe = require('stripe');
const PRODUCTS = require('../products.js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // set this in Vercel → Project → Settings → Environment Variables

// Keep these in sync with the constants in checkout.html
const TAX_RATE          = 0.0925;
const SHIPPING_FLAT_FEE = 9.00;

module.exports = async (req, res) => {
  // Allow your GitHub Pages domain to call this. Replace '*' with your real
  // domain (e.g. 'https://www.magsmarietta.com') once everything works.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { cart } = req.body || {};
    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    let subtotal = 0;
    for (const line of cart) {
      const product = PRODUCTS.find(p => p.id === (line.productId || line.id));
      if (!product) return res.status(400).json({ error: `Unknown product: ${line.id}` });
      const qty = Math.max(1, parseInt(line.qty, 10) || 1);
      subtotal += product.price * qty;
    }

    const shipping = SHIPPING_FLAT_FEE;
    const tax      = subtotal * TAX_RATE;
    const total    = subtotal + shipping + tax;
    const amount   = Math.round(total * 100); // Stripe wants cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      total
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not start payment. Please try again.' });
  }
};
