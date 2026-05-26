import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent, t } from '../hooks/useContent'

export default function Footer() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content } = useContent()
  const bookingUrl = content?.bookingUrl || '#'

  const navLinks = [
    { to: '/',         label: lang === 'en' ? 'Home'     : 'Accueil' },
    { to: '/services', label: lang === 'en' ? 'Services' : 'Services' },
    { to: '/projects', label: lang === 'en' ? 'Projects' : 'Projets' },
    { to: '/contact',  label: lang === 'en' ? 'Contact'  : 'Contact' },
  ]

  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(145deg, rgba(245,238,210,0.92) 0%, rgba(232,218,168,0.85) 40%, rgba(215,195,130,0.78) 100%)',
      borderTop: '1px solid rgba(201,168,76,0.35)',
      color: '#1A1A18',
    }}>
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <p className="font-serif text-2xl font-light mb-3">
              TSM <span style={{ color: '#8B6914' }}>—</span> Conseil IA
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,26,24,0.55)' }}>
              {t(content, 'footer_tagline', lang)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: '#8B6914' }}>Navigation</p>
            <ul className="space-y-3">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm transition-colors hover:text-ink" style={{ color: 'rgba(26,26,24,0.55)' }}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: '#8B6914' }}>Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${content?.contactEmail}`} className="text-sm transition-colors hover:text-ink" style={{ color: 'rgba(26,26,24,0.55)' }}>
                  {content?.contactEmail}
                </a>
              </li>
              <li>
                <a href={content?.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-ink" style={{ color: 'rgba(26,26,24,0.55)' }}>
                  LinkedIn
                </a>
              </li>
              <li className="pt-2">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-all"
                  style={{ color: '#6B5010' }}>
                  {lang === 'en' ? 'Book appointment' : 'Prendre rendez-vous'} →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,105,20,0.35), transparent)' }} />
        <p className="text-center text-xs" style={{ color: 'rgba(26,26,24,0.35)' }}>
          {t(content, 'footer_legal', lang)}
        </p>
      </div>
    </footer>
  )
}
