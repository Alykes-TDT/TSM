import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent, t } from '../hooks/useContent'
import GoldDecorations from '../components/GoldDecorations'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Contact() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content, loading } = useContent()
  const bookingUrl = content?.bookingUrl || '#'
  const [form, setForm] = useState({ name: '', company: '', email: '', subject: '', message: '', rgpd: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = lang === 'en' ? 'Required' : 'Obligatoire'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = lang === 'en' ? 'Invalid email' : 'Email invalide'
    if (!form.subject.trim()) e.subject = lang === 'en' ? 'Required' : 'Obligatoire'
    if (!form.message.trim()) e.message = lang === 'en' ? 'Required' : 'Obligatoire'
    if (!form.rgpd) e.rgpd = lang === 'en' ? 'Please accept' : 'Veuillez accepter'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const j = await res.json()
      setStatus(j.success ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  const inp = (key, label, type = 'text') => (
    <div key={key}>
      <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">{label}</label>
      <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        className={`w-full px-0 py-3 bg-transparent border-b text-ink text-sm placeholder-muted/40 focus:outline-none transition-colors ${errors[key] ? 'border-red-400' : 'border-border focus:border-gold'}`} />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="bg-cream text-ink pt-28 pb-20">
      {/* Header */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-border bg-cream">
        <GoldDecorations variant="page" />
        <div className="relative max-w-3xl mx-auto text-center" style={{ zIndex:10 }}>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-5">Contact</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight mb-6">{t(content, 'contact_title', lang)}</h1>
          <p className="text-muted text-base leading-relaxed">{t(content, 'contact_sub', lang)}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {status === 'success' ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 border border-gold flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold text-xl">✓</span>
                </div>
                <p className="font-serif text-xl font-light mb-3">{lang === 'en' ? 'Message sent.' : 'Message envoyé.'}</p>
                <p className="text-muted text-sm">{lang === 'en' ? "We'll get back to you within 24 hours." : 'Nous vous répondrons sous 24h.'}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  {inp('name', lang === 'en' ? 'Full Name' : 'Prénom & Nom')}
                  {inp('company', lang === 'en' ? 'Company' : 'Entreprise')}
                </div>
                {inp('email', lang === 'en' ? 'Business email' : 'Email professionnel', 'email')}
                {inp('subject', lang === 'en' ? 'Subject' : 'Objet')}
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">Message</label>
                  <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={5} className={`w-full px-0 py-3 bg-transparent border-b text-ink text-sm focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-400' : 'border-border focus:border-gold'}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.rgpd} onChange={e => setForm(p => ({ ...p, rgpd: e.target.checked }))} className="mt-1 accent-gold flex-shrink-0" />
                    <span className="text-xs text-muted leading-relaxed">
                      {lang === 'en' ? "I agree that my data may be used to process my request." : "J'accepte que mes données soient utilisées pour traiter ma demande."}
                    </span>
                  </label>
                  {errors.rgpd && <p className="text-red-500 text-xs mt-1">{errors.rgpd}</p>}
                </div>
                {status === 'error' && (
                  <p className="text-red-500 text-sm">{lang === 'en' ? 'An error occurred. Please try again.' : 'Une erreur est survenue.'}</p>
                )}
                <button type="submit" disabled={status === 'loading'}
                  className="w-full py-4 bg-ink text-cream text-sm font-medium tracking-widest uppercase hover:bg-ink-light transition-all disabled:opacity-60">
                  {status === 'loading' ? '…' : (lang === 'en' ? 'Send my request' : 'Envoyer ma demande')}
                </button>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <div className="space-y-8">
            <div className="border border-border p-8">
              <h2 className="font-serif text-xl font-light mb-6">{t(content, 'contact_booking_title', lang)}</h2>
              <div className="h-32 border border-dashed border-border flex items-center justify-center mb-6 bg-cream-dark">
                <p className="text-xs text-muted tracking-widest uppercase">Booking widget</p>
              </div>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center py-3.5 border border-gold text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold hover:text-ink transition-all">
                {lang === 'en' ? 'Book appointment' : 'Prendre rendez-vous'} →
              </a>
            </div>
            <div className="space-y-4 border-l border-gold pl-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-1">Email</p>
                <a href={`mailto:${content?.contactEmail}`} className="text-sm text-ink hover:text-gold transition-colors">{content?.contactEmail}</a>
              </div>
              {content?.phone && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-1">{lang === 'en' ? 'Phone' : 'Téléphone'}</p>
                  <a href={`tel:${content.phone}`} className="text-sm text-ink hover:text-gold transition-colors">{content.phone}</a>
                </div>
              )}
              {content?.address && (
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted mb-1">{lang === 'en' ? 'Address' : 'Adresse'}</p>
                  <p className="text-sm text-ink">{content.address}</p>
                </div>
              )}
              <div>
                <p className="text-xs tracking-widest uppercase text-muted mb-1">LinkedIn</p>
                <a href={content?.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-ink hover:text-gold transition-colors">
                  Timothé Seguin-Médrinal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
