const axios = require('axios');

// Vercel serverless function to forward contact form to SendGrid
// Requires environment variable: SENDGRID_API_KEY
// Optional: CONTACT_EMAIL (defaults to paulomulato+pl300@gmail.com)

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

    const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'paulomulato+pl300@gmail.com';

    if (!SENDGRID_KEY) return res.status(500).json({ error: 'Missing SendGrid API key (env SENDGRID_API_KEY)' });

    const payload = {
      personalizations: [
        { to: [{ email: CONTACT_EMAIL }] }
      ],
      from: { email: process.env.SEND_FROM || 'no-reply@pl300-portal.example', name: 'PL-300 Portal' },
      subject: 'Contato via PL-300 Portal',
      content: [
        { type: 'text/plain', value: `Nome: ${name}\nEmail: ${email}\nMensagem:\n${message}` }
      ]
    };

    await axios.post('https://api.sendgrid.com/v3/mail/send', payload, {
      headers: {
        Authorization: `Bearer ${SENDGRID_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('sendContact error', err.response?.data || err.message);
    return res.status(500).json({ error: 'send_failed', detail: err.response?.data || err.message });
  }
};
