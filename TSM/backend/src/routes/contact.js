const express    = require('express')
const nodemailer = require('nodemailer')
const rateLimit  = require('express-rate-limit')

const router = express.Router()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Trop de requêtes. Réessayez dans 15 minutes.' },
})

router.post('/', limiter, async (req, res) => {
  const { name, company, email, subject, message } = req.body

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ success: false, error: 'Champs requis manquants.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Email invalide.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"TSM — Conseil IA" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `Nouvelle demande — ${subject}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#fff;padding:32px;border-radius:12px">
          <h2 style="color:#C9A84C;margin-bottom:24px">Nouvelle demande de contact</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#ffffff80;font-size:13px;width:120px">Nom</td><td style="padding:8px 0;font-size:14px">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#ffffff80;font-size:13px">Entreprise</td><td style="padding:8px 0;font-size:14px">${company || '—'}</td></tr>
            <tr><td style="padding:8px 0;color:#ffffff80;font-size:13px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#C9A84C">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#ffffff80;font-size:13px">Objet</td><td style="padding:8px 0;font-size:14px">${subject}</td></tr>
          </table>
          <div style="margin-top:24px;padding:20px;background:#1a1a1a;border-radius:8px;border-left:3px solid #C9A84C">
            <p style="color:#ffffff80;font-size:12px;margin-bottom:8px">Message</p>
            <p style="font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</p>
          </div>
          <p style="margin-top:24px;color:#ffffff40;font-size:12px">© 2025 TSM — Conseil IA</p>
        </div>
      `,
    })

    return res.json({ success: true })
  } catch (err) {
    console.error('[CONTACT]', err.message)
    return res.status(500).json({ success: false, error: 'Erreur serveur.' })
  }
})

module.exports = router
