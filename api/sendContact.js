const axios = require('axios');

// Vercel serverless function to forward contact form using Resend (https://resend.com)
// Uses Resend free tier structure (no custom domain required)
// Requires environment variable: RESEND_API_KEY

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing required fields' });

    const RESEND_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_KEY) return res.status(500).json({ error: 'Missing Resend API key (env RESEND_API_KEY)' });

    // Resend free tier structure (no custom domain):
    // from: onboarding@resend.dev (required, fixed)
    // to: paulomulato+pl300@gmail.com (your email with +label for filtering)
    // reply_to: email from user (so replies go to their email)
    const payload = {
      from: 'onboarding@resend.dev',
      to: 'paulomulato+pl300@gmail.com',
      reply_to: email,
      subject: `📩 Nova mensagem de contato: ${name}`,
      html: `
        <h2>Você recebeu uma nova mensagem pelo PL-300 Portal</h2>
        <p><strong>Nome do visitante:</strong> ${name}</p>
        <p><strong>E-mail de contato:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <blockquote style="border-left: 4px solid #8b5cf6; padding: 12px; background: #f5f5f5; margin: 16px 0;">
          ${message.replace(/\n/g, '<br />')}
        </blockquote>
        <p style="color: #999; font-size: 0.9em; margin-top: 20px;">--- Enviado pelo Portal PL-300</p>
      `
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
    console.error('sendContact error:', {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message
    });
    return res.status(500).json({ 
      error: 'send_failed', 
      detail: err.response?.data || err.message,
      status: err.response?.status 
    });
  }
};
