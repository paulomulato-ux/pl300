const axios = require('axios');

// Vercel serverless function to forward contact form using Resend (https://resend.com)
// Requires environment variable: RESEND_API_KEY
// Optional: CONTACT_EMAIL (defaults to paulomulato+pl300@gmail.com)
// Optional: SEND_FROM (defaults to no-reply@pl300.app)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

    const RESEND_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'paulomulato+pl300@gmail.com';
    const SEND_FROM = process.env.SEND_FROM || 'no-reply@pl300.app';

    if (!RESEND_KEY) return res.status(500).json({ error: 'Missing Resend API key (env RESEND_API_KEY)' });

    const text = `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}`;

    const payload = {
      from: SEND_FROM,
      to: CONTACT_EMAIL,
      subject: 'Contato via PL-300 Portal',
      text
    };

    const resp = await axios.post('https://api.resend.com/emails', payload, {
      headers: {
        Authorization: `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (resp.status >= 200 && resp.status < 300) {
      return res.status(200).json({ ok: true });
    }

    console.error('resend unexpected response', resp.status, resp.data);
    return res.status(500).json({ error: 'send_failed', detail: resp.data || 'unexpected_response' });
  } catch (err) {
    console.error('sendContact error', err.response?.data || err.message);
    return res.status(500).json({ error: 'send_failed', detail: err.response?.data || err.message });
  }
};
