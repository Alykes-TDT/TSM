import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContent, t } from '../hooks/useContent'
import GoldDecorations from '../components/GoldDecorations'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function Projects() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content, loading } = useContent()
  const [expanded, setExpanded] = useState({})
  const [lightboxImg, setLightboxImg] = useState(null)

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="w-6 h-6 border border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const projects = content?.projects || []
  const toggleExpand = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="bg-cream text-ink pt-28">
      {/* Header */}
      <section className="relative overflow-hidden py-20 px-6 border-b border-border bg-cream">
        <GoldDecorations variant="page" flip />
        <div className="relative max-w-3xl mx-auto text-center" style={{ zIndex:10 }}>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-5">Projets</p>
          <h1 className="font-serif text-5xl md:text-6xl font-light leading-tight mb-6">{t(content, 'projects_hero_title', lang)}</h1>
          <p className="text-muted text-base leading-relaxed">{t(content, 'projects_hero_sub', lang)}</p>
        </div>
      </section>

      {/* Projects list */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {projects.map((p, i) => {
            const tag      = lang === 'en' ? p.tag_en    : p.tag_fr
            const title    = lang === 'en' ? p.title_en  : p.title_fr
            const desc     = lang === 'en' ? p.desc_en   : p.desc_fr
            const result   = lang === 'en' ? p.result_en : p.result_fr
            const longDesc = lang === 'en' ? p.long_desc_en : p.long_desc_fr
            const ctaLabel = lang === 'en' ? p.cta_label_en : p.cta_label_fr
            const isExp    = !!expanded[i]
            const hasGallery = Array.isArray(p.gallery) && p.gallery.length > 0

            return (
              <div key={i} className="bg-white border border-border hover:border-gold/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm group">
                {p.image && (
                  <img src={p.image.startsWith('http') ? p.image : `${API}${p.image}`}
                    alt={title} className="w-full h-64 object-cover border-b border-border" />
                )}
                <div className="p-10">
                  <div className="flex items-start justify-between flex-wrap gap-6 mb-6">
                    <div>
                      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold border border-gold/40 rounded-full px-4 py-1.5 mb-4">{tag}</span>
                      <h2 className="font-serif text-3xl font-light">{title}</h2>
                    </div>
                    <div className="text-right border-l border-gold pl-6">
                      <p className="text-xs tracking-widest uppercase text-muted mb-1">{lang === 'en' ? 'Result' : 'Résultat'}</p>
                      <p className="font-serif text-xl font-light text-gold">{result}</p>
                    </div>
                  </div>
                  <div className="w-8 h-px bg-border mb-6" />
                  <p className="text-muted text-sm leading-relaxed mb-6">{desc}</p>

                  {/* Expandable details */}
                  <div className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isExp ? '1500px' : '0px', opacity: isExp ? 1 : 0, borderTop: isExp ? '1px solid #F3F4F6' : '0px solid transparent', paddingTop: isExp ? '1.5rem' : '0px', marginTop: isExp ? '1.5rem' : '0px' }}>
                    {(p.client || p.logo) && (
                      <div className="flex items-center gap-4 bg-cream/35 border border-border/60 rounded-xl p-4 w-fit mb-6">
                        {p.logo && <img src={p.logo.startsWith('http') ? p.logo : `${API}${p.logo}`} alt="" className="h-8 object-contain" />}
                        {p.client && (
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-muted">Client</p>
                            <p className="text-xs font-semibold text-ink">{p.client}</p>
                          </div>
                        )}
                      </div>
                    )}
                    {longDesc && (
                      <div className="space-y-4 mb-6">
                        {longDesc.split('\n').filter(Boolean).map((para, idx) => (
                          <p key={idx} className="text-sm text-muted leading-relaxed">{para}</p>
                        ))}
                      </div>
                    )}
                    {hasGallery && (
                      <div className="mb-6">
                        <p className="text-xs font-semibold tracking-wider uppercase text-gold mb-3">
                          {lang === 'en' ? 'Project Gallery' : 'Galerie du projet'}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {p.gallery.map((imgUrl, gIdx) => {
                            const fullUrl = imgUrl.startsWith('http') ? imgUrl : `${API}${imgUrl}`
                            return (
                              <div key={gIdx} onClick={() => setLightboxImg(fullUrl)}
                                className="aspect-[4/3] rounded-lg overflow-hidden border border-border cursor-zoom-in hover:border-gold/60 transition-colors">
                                <img src={fullUrl} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    {p.cta_url && (
                      <div className="pt-4">
                        <a href={p.cta_url} target="_blank" rel="noopener noreferrer"
                          className="inline-block text-xs font-semibold tracking-widest uppercase bg-ink text-cream hover:bg-gold hover:text-ink px-6 py-3 border border-ink transition-all rounded-lg">
                          {ctaLabel || (lang === 'en' ? 'Visit Project' : 'Visiter le projet')}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-start mt-6">
                    <button onClick={() => toggleExpand(i)}
                      className="text-xs font-semibold tracking-wider text-muted hover:text-gold transition-colors flex items-center gap-1.5">
                      <span>{isExp ? (lang === 'en' ? 'Read Less' : 'Voir Moins') : (lang === 'en' ? 'Read More' : 'Voir Plus')}</span>
                      <span className={`text-[9px] transition-transform duration-300 ${isExp ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out p-4 animate-fade-in"
          onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white text-3xl font-light hover:text-gold"
            onClick={() => setLightboxImg(null)}>✕</button>
          <img src={lightboxImg} alt="" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
        </div>
      )}
    </div>
  )
}
