import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContent } from './hooks/useContent'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('tsm_admin_token')
  return token ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'fr'
  const { content } = useContent()
  const location = useLocation()

  useEffect(() => {
    if (!content) return
    const baseTitle = lang === 'en'
      ? (content.seo_title_en || 'TSM — AI Consulting')
      : (content.seo_title_fr || 'TSM — Conseil IA')
    const baseDesc = lang === 'en'
      ? (content.seo_desc_en || 'AI integration consulting.')
      : (content.seo_desc_fr || "Conseil en intégration IA.")

    let pageTitle = baseTitle
    const path = location.pathname
    if (path === '/services') pageTitle = `Services | ${baseTitle}`
    else if (path === '/projects') pageTitle = lang === 'en' ? `Projects | ${baseTitle}` : `Projets | ${baseTitle}`
    else if (path === '/contact') pageTitle = `Contact | ${baseTitle}`
    else if (path.startsWith('/admin')) pageTitle = `Admin | TSM`

    document.title = pageTitle
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) descMeta.setAttribute('content', baseDesc)
  }, [location.pathname, lang, content])

  return (
    <Routes>
      <Route path="/" element={<><Navbar /><main><Home /></main><Footer /></>} />
      <Route path="/services" element={<><Navbar /><main><Services /></main><Footer /></>} />
      <Route path="/projects" element={<><Navbar /><main><Projects /></main><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><main><Contact /></main><Footer /></>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
