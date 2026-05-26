import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent, t } from '../hooks/useContent'
import GoldDecorations from '../components/GoldDecorations'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function useReveal(loading) {
  useEffect(() => {
    if (loading) return
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
    }, 80)
    return () => clearTimeout(timer)
  }, [loading])
}

export default function Home() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content, loading } = useContent()
  const bookingUrl = content?.bookingUrl || '#'
  useReveal(loading)

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const cards = content?.problem_cards || []
  const testimonials = content?.testimonials || []
  const logos = content?.logos || []
  const tools = content?.about_tools || []

  return (
    <div className="bg-cream text-ink">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(139,105,20,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(139,105,20,0.12) 1px, transparent 1px)', backgroundSize:'64px 64px' }} />
        <div style={{ position:'absolute', width:700, height:700, top:-200, left:-200, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,145,55,0.32) 0%, rgba(180,145,55,0.1) 45%, transparent 70%)', pointerEvents:'none', zIndex:1 }} />
        <div style={{ position:'absolute', width:500, height:500, bottom:-120, right:-120, borderRadius:'50%', background:'radial-gradient(circle, rgba(180,145,55,0.28) 0%, rgba(180,145,55,0.08) 45%, transparent 70%)', pointerEvents:'none', zIndex:1 }} className="animate-glow-pulse" />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:128, background:'linear-gradient(to bottom, rgba(250,250,247,0.95), transparent)', zIndex:3 }} />
        <div style={{ position:'absolute', bottom:80, left:0, right:0, height:160, background:'linear-gradient(to top, rgba(250,250,247,1), transparent)', zIndex:3 }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-44 text-center" style={{ zIndex:10 }}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-gold mb-8 animate-fade-in">
            {t(content, 'hero_badge', lang)}
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8 animate-fade-up text-ink">
            {t(content, 'hero_h1', lang)}
          </h1>
          <p className="text-ink/60 text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light animate-fade-up delay-200">
            {t(content, 'hero_sub', lang)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 bg-ink text-cream text-sm font-medium tracking-wide hover:bg-gold hover:text-ink transition-all duration-300">
              {t(content, 'hero_cta1', lang)}
            </a>
            <a href="/services"
              className="px-8 py-3.5 border border-ink/40 text-ink text-sm font-medium tracking-wide hover:border-gold hover:text-gold transition-all duration-300">
              {t(content, 'hero_cta2', lang)}
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gold/30 bg-white/90 backdrop-blur-sm" style={{ zIndex:10 }}>
          <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { num: '12', sup: '+', label: lang === 'en' ? 'Sectors covered' : "Domaines d'application" },
              { num: '40', sup: '%', label: lang === 'en' ? 'Avg. time saved' : 'Gain de temps moyen' },
              { num: '3',  sup: 'x', label: lang === 'en' ? 'Return on investment' : 'Retour sur investissement' },
              { num: '100',sup: '%', label: lang === 'en' ? 'Tailored, no jargon' : 'Sur-mesure, sans jargon' },
            ].map((s, i) => (
              <div key={i} className="py-6 px-4 text-center">
                <p className="font-serif text-4xl font-light text-ink leading-none mb-1">
                  {s.num}<sup className="text-gold text-lg">{s.sup}</sup>
                </p>
                <p className="text-xs text-muted mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative overflow-hidden py-28 px-6"
        style={{ background:'linear-gradient(160deg, rgba(245,238,210,0.6) 0%, rgba(250,250,247,0.9) 60%, rgba(232,218,168,0.4) 100%)' }}>
        <GoldDecorations variant="page" />
        <div className="relative max-w-6xl mx-auto" style={{ zIndex:10 }}>
          <div className="text-center mb-16 reveal">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">{t(content, 'problem_label', lang)}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">{t(content, 'problem_title', lang)}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background:'rgba(201,168,76,0.18)' }}>
            {cards.map((card, i) => (
              <div key={i} className="reveal p-10" style={{ background:'rgba(252,250,244,0.9)' }}>
                <p className="font-serif text-6xl font-light mb-6" style={{ background:'linear-gradient(135deg, #8B6914, #C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', opacity:0.55 }}>
                  {card.num}
                </p>
                <h3 className="font-serif text-xl font-light mb-4 text-ink">{lang === 'en' ? card.title_en : card.title_fr}</h3>
                <p className="text-muted text-sm leading-relaxed">{lang === 'en' ? card.desc_en : card.desc_fr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative overflow-hidden py-28 px-6 bg-white">
        <GoldDecorations variant="page" flip />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center" style={{ zIndex:10 }}>
          <div className="reveal">
            {content?.about_photo
              ? <img src={content.about_photo.startsWith('http') ? content.about_photo : `${API}${content.about_photo}`}
                  alt={content.about_name} className="w-full max-w-sm aspect-[3/4] object-cover border border-border" />
              : <div className="w-full max-w-sm aspect-[3/4] flex items-center justify-center"
                  style={{ background:'linear-gradient(145deg, rgba(245,238,210,0.5), rgba(232,218,168,0.3))', border:'1px solid rgba(201,168,76,0.2)' }}>
                  <span className="font-serif text-4xl font-light" style={{ color:'#A8893A' }}>T</span>
                </div>
            }
          </div>
          <div className="reveal">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-5">{t(content, 'about_label', lang)}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-2 leading-tight">{content?.about_name}</h2>
            <p className="text-sm font-medium tracking-wide mb-8" style={{ color:'#A8893A' }}>{t(content, 'about_role', lang)}</p>
            <div className="w-12 h-px mb-8" style={{ background:'linear-gradient(90deg, #C9A84C, #A8893A)' }} />
            <p className="text-muted leading-relaxed text-[0.95rem] mb-8">{t(content, 'about_bio', lang)}</p>
            <div className="flex flex-wrap gap-2">
              {tools.map(tool => (
                <span key={tool} className="px-3 py-1 text-xs tracking-wide text-muted" style={{ border:'1px solid rgba(201,168,76,0.3)' }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      {(logos.length > 0 || testimonials.length > 0) && (
        <section className="relative overflow-hidden py-28 px-6"
          style={{ background:'linear-gradient(160deg, rgba(232,218,168,0.35) 0%, rgba(250,250,247,0.95) 50%, rgba(245,238,210,0.5) 100%)' }}>
          <GoldDecorations variant="page" />
          <div className="relative max-w-5xl mx-auto" style={{ zIndex:10 }}>
            <div className="text-center mb-16 reveal">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">{t(content, 'proof_label', lang)}</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light">{t(content, 'proof_title', lang)}</h2>
            </div>
            {logos.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 mb-16 reveal">
                {logos.map((url, i) => (
                  <div key={i} className="h-12 w-28 flex items-center justify-center p-2" style={{ border:'1px solid rgba(201,168,76,0.25)', background:'rgba(255,255,255,0.7)' }}>
                    <img src={url.startsWith('http') ? url : `${API}${url}`} alt="" className="max-h-full object-contain opacity-60" />
                  </div>
                ))}
              </div>
            )}
            <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
              {testimonials.map((item, i) => (
                <div key={i} className="reveal p-10 relative overflow-hidden"
                  style={{ background:'linear-gradient(145deg, #ffffff 0%, #fdfcf5 100%)', boxShadow:'inset 0 0 0 1px rgba(201,168,76,0.22)' }}>
                  <p className="font-serif text-2xl font-light text-ink leading-relaxed mb-8 italic">
                    « {lang === 'en' ? item.text_en : item.text_fr} »
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-px h-8 flex-shrink-0" style={{ background:'linear-gradient(to bottom, #C9A84C, #A8893A)' }} />
                    <div>
                      <p className="text-sm font-medium text-ink">{item.author}</p>
                      {item.role && <p className="text-xs text-muted">{item.role}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background:'#0F0F0D' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />
        <div className="max-w-3xl mx-auto text-center reveal relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-5" style={{ color:'#FAFAF7' }}>
            {t(content, 'cta_title', lang)}
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color:'rgba(250,250,247,0.45)' }}>
            {t(content, 'cta_sub', lang)}
          </p>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-9 py-4 text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-90"
            style={{ background:'linear-gradient(135deg, #B8943A 0%, #D4AA4C 50%, #9A7A2E 100%)', color:'#1A1A18' }}>
            {t(content, 'cta_btn', lang)} →
          </a>
        </div>
      </section>
    </div>
  )
}
