import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const j = await res.json()
      if (j.success) {
        localStorage.setItem('tsm_admin_token', j.token)
        navigate('/admin/dashboard')
      } else {
        setError(j.error || 'Identifiants incorrects.')
      }
    } catch {
      setError('Erreur de connexion.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-3xl font-light text-ink mb-1">TSM <span className="text-gold">—</span> Admin</p>
          <p className="text-xs tracking-[0.2em] uppercase text-muted">Espace d'administration</p>
        </div>
        <div className="border border-border bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">Identifiant</label>
              <input value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                className="w-full px-0 py-3 bg-transparent border-b border-border text-ink text-sm focus:outline-none focus:border-gold transition-colors"
                autoComplete="username" required />
            </div>
            <div>
              <label className="block text-xs tracking-[0.15em] uppercase text-muted mb-2">Mot de passe</label>
              <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full px-0 py-3 bg-transparent border-b border-border text-ink text-sm focus:outline-none focus:border-gold transition-colors"
                autoComplete="current-password" required />
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-ink text-cream text-xs font-semibold tracking-widest uppercase hover:bg-ink-light transition-all disabled:opacity-60 mt-2">
              {loading ? '…' : 'Se connecter'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-muted mt-6">
          <a href="/" className="hover:text-gold transition-colors">← Retour au site</a>
        </p>
      </div>
    </div>
  )
}
