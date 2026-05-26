import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'

export function useContent() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`${API}/api/admin/public-content`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(j => {
        if (!cancelled && j.success) setContent(j.data)
      })
      .catch(err => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading, error }
}

// Pick FR or EN value from content object
export function t(content, key, lang = 'fr') {
  if (!content) return ''
  return content[`${key}_${lang}`] ?? content[key] ?? ''
}
