import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent, t } from '../hooks/useContent'
import GoldDecorations from '../components/GoldDecorations'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Services() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content, loading } = useContent()
  const bookingUrl = content?.bookingUrl || '#'
  const [expanded, setExpanded] = useState({})

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const packages = content?.packages || []
  const steps = content?.method_steps || []
  const toggleExpand = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="bg-cream text-ink pt-28">
      {/* Header */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-border bg-cream">
        <GoldDecorations variant="page" />
        <div className="relative max-w-3xl mx-auto text-center" style={{ zIndex:10 }}>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-5">Services</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight mb-6">{t(content, 'services_hero_title', lang)}</h1>
          <p className="text-muted text-base leading-relaxed">{t(content, 'services_hero_sub', lang)}</p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-px bg-border">
          {packages.map((pkg, i) => {
            const name     = lang === 'en' ? pkg.name_en     : pkg.name_fr
            const tag      = lang === 'en' ? pkg.tag_en      : pkg.tag_fr
            const desc     = lang === 'en' ? pkg.desc_en     : pkg.desc_fr
            const longDesc = lang === 'en' ? pkg.long_desc_en : pkg.long_desc_fr
            const dels     = lang === 'en' ? (pkg.deliverables_en || []) : (pkg.deliverables_fr || [])
            const isExp    = !!expanded[i]
            const ctaLabel = lang === 'en' ? (pkg.cta_label_en || 'Book') : (pkg.cta_label_fr || 'Réserver')
            const finalCta = pkg.cta_url || bookingUrl

            return (
              <div key={i} className={`p-10 flex flex-col transition-all duration-500 ${pkg.highlighted ? 'bg-ink text-cream' : 'bg-cream'}`}>
                <div className="flex justify-between items-start gap-4 mb-6">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">{tag}</p>
                  {pkg.icon && (
                    <img src={pkg.icon.startsWith('http') ? pkg.icon : `${API}${pkg.icon}`} alt="" className="w-8 h-8 object-contain" />
                  )}
                </div>
                <h2 className="font-serif text-2xl font-light mb-4">{name}</h2>
                <div className={`w-8 h-px mb-6 ${pkg.highlighted ? 'bg-gold' : 'bg-border'}`} />
                <p className={`text-sm leading-relaxed mb-6 ${pkg.highlighted ? 'text-cream/70' : 'text-muted'}`}>{desc}</p>

                <div className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: isExp ? '1000px' : '0px', opacity: isExp ? 1 : 0, marginBottom: isExp ? '1.5rem' : '0px' }}>
                  {longDesc && (
                    <div className="space-y-3 mb-6">
                      {longDesc.split('\n').filter(Boolean).map((p, k) => (
                        <p key={k} className={`text-sm leading-relaxed ${pkg.highlighted ? 'text-cream/80' : 'text-muted'}`}>{p}</p>
                      ))}
                    </div>
                  )}
                  {dels.length > 0 && (
                    <ul className="space-y-2.5 mb-4">
                      {dels.map((d, j) => (
                        <li key={j} className={`flex items-start gap-3 text-sm ${pkg.highlighted ? 'text-cream/80' : 'text-muted'}`}>
                          <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex-1" />
                <div className={`pt-6 border-t flex items-center justify-between mt-6 ${pkg.highlighted ? 'border-cream/10' : 'border-border'}`}>
                  <button onClick={() => toggleExpand(i)}
                    className={`text-xs font-semibold tracking-wider hover:text-gold transition-colors flex items-center gap-1.5 ${pkg.highlighted ? 'text-cream/60' : 'text-muted'}`}>
                    <span>{isExp ? (lang === 'en' ? 'Read Less' : 'Voir Moins') : (lang === 'en' ? 'Read More' : 'Voir Plus')}</span>
                    <span className={`text-[9px] transition-transform duration-300 ${isExp ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  <a href={finalCta} target="_blank" rel="noopener noreferrer"
                    className={`text-xs font-semibold tracking-widest uppercase px-4 py-2 border transition-all ${pkg.highlighted ? 'border-gold text-gold hover:bg-gold hover:text-ink' : 'border-ink text-ink hover:bg-ink hover:text-cream'}`}>
                    {ctaLabel}
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Method */}
      <section className="py-24 px-6 bg-white border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-4">Méthode</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light">{t(content, 'method_title', lang)}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {steps.map((s, i) => (
              <div key={i} className="bg-white p-8">
                <p className="font-serif text-5xl font-light text-gold opacity-30 mb-4">{s.n}</p>
                <h3 className="font-serif text-lg font-light mb-3">{lang === 'en' ? s.title_en : s.title_fr}</h3>
                <p className="text-muted text-sm leading-relaxed">{lang === 'en' ? s.desc_en : s.desc_fr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RGPD */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto flex items-start gap-6">
          <span className="text-gold text-2xl flex-shrink-0">🔒</span>
          <div>
            <h3 className="font-serif text-xl font-light mb-2">{t(content, 'rgpd_title', lang)}</h3>
            <p className="text-muted text-sm leading-relaxed">{t(content, 'rgpd_desc', lang)}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
