import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent, t } from '../hooks/useContent'

export default function Navbar() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content } = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const bookingUrl = content?.bookingUrl || '#'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const navLinks = [
    { to: '/',         label: lang === 'en' ? 'Home'     : 'Accueil' },
    { to: '/services', label: lang === 'en' ? 'Services' : 'Services' },
    { to: '/projects', label: lang === 'en' ? 'Projects' : 'Projets' },
    { to: '/contact',  label: lang === 'en' ? 'Contact'  : 'Contact' },
  ]

  const toggleLang = () => i18n.changeLanguage(lang === 'fr' ? 'en' : 'fr')

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between py-4">
        <Link to="/" className="font-serif text-xl font-medium text-ink tracking-tight">
          TSM <span className="text-gold">—</span> Conseil IA
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${isActive ? 'text-gold' : 'text-muted hover:text-ink'}`
              }>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLang} className="text-xs font-semibold tracking-widest uppercase text-muted hover:text-gold transition-colors px-2 py-1">
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 border border-ink text-ink text-sm font-medium tracking-wide hover:bg-ink hover:text-cream transition-all">
            {t(content, 'navbar_cta', lang) || (lang === 'en' ? 'Book an appointment' : 'Prendre rendez-vous')}
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2">
          <span className={`block w-5 h-px bg-ink transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-border px-6 py-6 space-y-4">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="block text-lg font-serif text-ink hover:text-gold transition-colors">{label}</Link>
          ))}
          <div className="pt-4 border-t border-border flex items-center gap-4">
            <button onClick={toggleLang} className="text-xs uppercase tracking-widest text-muted">{lang === 'fr' ? 'EN' : 'FR'}</button>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-cream transition-all">
              {lang === 'en' ? 'Book' : 'Rendez-vous'}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
