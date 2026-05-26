import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export function F({ label, value, onChange, type = 'text', rows, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</label>
      {rows
        ? <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none transition-colors"
            style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff' }} />
        : <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
            style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'#fff' }} />
      }
    </div>
  )
}

export function Card({ title, children }) {
  return (
    <div className="rounded-2xl p-6 mb-5" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)' }}>
      {title && <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color:'#C9A84C' }}>{title}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function SaveBtn({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading}
      className="px-6 py-2.5 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60"
      style={{ background:'#C9A84C' }}>
      {loading ? 'Sauvegarde…' : '💾 Enregistrer'}
    </button>
  )
}

export function SectionTitle({ children }) {
  return <h1 className="text-2xl font-bold mb-6 text-white">{children}</h1>
}

export function ImgUpload({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState(value || '')
  const imgSrc = value ? (value.startsWith('http') ? value : `${API_URL}${value}`) : null

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('tsm_admin_token')}` },
        body: fd,
      })
      const j = await res.json()
      if (j.url) { onChange(j.url); setUrlInput(j.url) }
    } catch (err) { console.error(err) }
    finally { setUploading(false) }
  }

  function handleUrlChange(v) { setUrlInput(v); onChange(v) }

  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest uppercase mb-2" style={{ color:'rgba(255,255,255,0.4)' }}>{label}</label>
      {imgSrc && (
        <div className="mb-3 flex items-center gap-3">
          <img src={imgSrc} alt="" className="h-20 w-20 rounded-xl object-cover" style={{ border:'1px solid rgba(255,255,255,0.1)' }} />
          <button onClick={() => { onChange(''); setUrlInput('') }}
            className="text-xs text-red-400 hover:text-red-300 border border-red-400/30 px-3 py-1.5 rounded-lg">
            ✕ Retirer
          </button>
        </div>
      )}
      <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        style={{ border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C' }}>
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        {uploading ? '⏳ Upload…' : '📎 Choisir une image'}
      </label>
      <div className="mt-3">
        <p className="text-xs mb-1" style={{ color:'rgba(255,255,255,0.3)' }}>Ou coller une URL</p>
        <input type="text" value={urlInput} onChange={e => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2.5 rounded-xl text-xs focus:outline-none"
          style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff' }} />
      </div>
    </div>
  )
}
