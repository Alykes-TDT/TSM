import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { F, Card, SaveBtn, SectionTitle, ImgUpload } from '../../components/AdminUI'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001'
const hdrs = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('tsm_admin_token')}` })

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 2500); return () => clearTimeout(t) }, [onClose])
  return (
    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 text-white text-sm font-semibold rounded-xl shadow-xl animate-fade-in"
      style={{ background:'#C9A84C' }}>
      {msg}
    </div>
  )
}

const NAV = [
  { id: 'hero',      label: '🏠 Héro' },
  { id: 'problem',   label: '⚠️ Problèmes' },
  { id: 'about',     label: '👤 À propos' },
  { id: 'proof',     label: '⭐ Preuves sociales' },
  { id: 'cta',       label: '📣 Bannière CTA' },
  { id: 'services',  label: '📦 Services' },
  { id: 'projects',  label: '🗂 Projets' },
  { id: 'contact',   label: '✉️ Contact' },
  { id: 'footer',    label: '🔻 Pied de page' },
  { id: 'seo',       label: '🔍 SEO' },
  { id: 'settings',  label: '⚙️ Paramètres' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [section, setSection] = useState('hero')
  const [data, setData] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch(`${API}/api/admin/content`, { headers: hdrs() })
      .then(r => { if (r.status === 401) navigate('/admin/login'); return r.json() })
      .then(j => j?.data && setData(j.data))
  }, [])

  async function save(patch) {
    const res = await fetch(`${API}/api/admin/content`, { method: 'PUT', headers: hdrs(), body: JSON.stringify(patch) })
    const j = await res.json()
    if (j.success) { setData(j.data); setToast('✓ Enregistré') }
  }

  const upd = (k, v) => setData(p => ({ ...p, [k]: v }))

  function logout() {
    localStorage.removeItem('tsm_admin_token')
    navigate('/admin/login')
  }

  return (
    <div className="admin-dark flex min-h-screen text-white">
      {toast && <Toast msg={toast} onClose={() => setToast('')} />}

      {/* Sidebar */}
      <aside className="flex flex-col flex-shrink-0" style={{ width:220, background:'#1A1A18', borderRight:'1px solid rgba(255,255,255,0.05)' }}>
        <div className="px-5 py-5" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
          <p className="font-serif text-sm font-medium">TSM <span style={{ color:'#C9A84C' }}>—</span> Admin</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setSection(n.id)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{ background: section === n.id ? 'rgba(201,168,76,0.15)' : 'transparent', color: section === n.id ? '#C9A84C' : 'rgba(255,255,255,0.5)' }}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="px-3 py-4" style={{ borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <a href="/" target="_blank" className="block w-full text-left px-3 py-2.5 rounded-lg text-sm mb-1" style={{ color:'rgba(255,255,255,0.4)' }}>
            ↗ Voir le site
          </a>
          <button onClick={logout} className="w-full text-left px-3 py-2.5 rounded-lg text-sm" style={{ color:'#f87171' }}>
            ← Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8" style={{ background:'#0F0F0D' }}>
        <div className="max-w-4xl mx-auto">
          {!data ? (
            <div className="flex items-center justify-center h-64" style={{ color:'rgba(255,255,255,0.3)' }}>Chargement…</div>
          ) : (
            <Section id={section} data={data} upd={upd} save={save} />
          )}
        </div>
      </main>
    </div>
  )
}

function Section({ id, data, upd, save }) {
  const s = (fields) => save(Object.fromEntries(fields.map(k => [k, data[k]])))

  switch (id) {
    case 'hero': return (
      <div>
        <SectionTitle>🏠 Héro</SectionTitle>
        <Card title="Badge & Titre">
          <F label="Badge FR" value={data.hero_badge_fr} onChange={v => upd('hero_badge_fr', v)} />
          <F label="Badge EN" value={data.hero_badge_en} onChange={v => upd('hero_badge_en', v)} />
          <F label="H1 FR" value={data.hero_h1_fr} onChange={v => upd('hero_h1_fr', v)} />
          <F label="H1 EN" value={data.hero_h1_en} onChange={v => upd('hero_h1_en', v)} />
          <F label="Sous-titre FR" value={data.hero_sub_fr} onChange={v => upd('hero_sub_fr', v)} rows={3} />
          <F label="Sous-titre EN" value={data.hero_sub_en} onChange={v => upd('hero_sub_en', v)} rows={3} />
        </Card>
        <Card title="Boutons CTA">
          <F label="CTA 1 FR" value={data.hero_cta1_fr} onChange={v => upd('hero_cta1_fr', v)} />
          <F label="CTA 1 EN" value={data.hero_cta1_en} onChange={v => upd('hero_cta1_en', v)} />
          <F label="CTA 2 FR" value={data.hero_cta2_fr} onChange={v => upd('hero_cta2_fr', v)} />
          <F label="CTA 2 EN" value={data.hero_cta2_en} onChange={v => upd('hero_cta2_en', v)} />
        </Card>
        <SaveBtn onClick={() => s(['hero_badge_fr','hero_badge_en','hero_h1_fr','hero_h1_en','hero_sub_fr','hero_sub_en','hero_cta1_fr','hero_cta1_en','hero_cta2_fr','hero_cta2_en'])} />
      </div>
    )

    case 'problem': return (
      <div>
        <SectionTitle>⚠️ Section Problèmes</SectionTitle>
        <Card title="Titre de section">
          <F label="Label FR" value={data.problem_label_fr} onChange={v => upd('problem_label_fr', v)} />
          <F label="Label EN" value={data.problem_label_en} onChange={v => upd('problem_label_en', v)} />
          <F label="Titre FR" value={data.problem_title_fr} onChange={v => upd('problem_title_fr', v)} />
          <F label="Titre EN" value={data.problem_title_en} onChange={v => upd('problem_title_en', v)} />
        </Card>
        {(data.problem_cards || []).map((card, i) => (
          <Card key={i} title={`Carte ${card.num}`}>
            <F label="Titre FR" value={card.title_fr} onChange={v => { const c=[...data.problem_cards]; c[i]={...c[i],title_fr:v}; upd('problem_cards',c) }} />
            <F label="Titre EN" value={card.title_en} onChange={v => { const c=[...data.problem_cards]; c[i]={...c[i],title_en:v}; upd('problem_cards',c) }} />
            <F label="Desc FR" value={card.desc_fr} onChange={v => { const c=[...data.problem_cards]; c[i]={...c[i],desc_fr:v}; upd('problem_cards',c) }} rows={2} />
            <F label="Desc EN" value={card.desc_en} onChange={v => { const c=[...data.problem_cards]; c[i]={...c[i],desc_en:v}; upd('problem_cards',c) }} rows={2} />
          </Card>
        ))}
        <SaveBtn onClick={() => s(['problem_label_fr','problem_label_en','problem_title_fr','problem_title_en','problem_cards'])} />
      </div>
    )

    case 'about': return (
      <div>
        <SectionTitle>👤 À propos</SectionTitle>
        <Card title="Photo & Identité">
          <ImgUpload label="Photo de profil" value={data.about_photo} onChange={v => upd('about_photo', v)} />
          <F label="Nom complet" value={data.about_name} onChange={v => upd('about_name', v)} />
          <F label="Rôle FR" value={data.about_role_fr} onChange={v => upd('about_role_fr', v)} />
          <F label="Rôle EN" value={data.about_role_en} onChange={v => upd('about_role_en', v)} />
        </Card>
        <Card title="Biographie">
          <F label="Bio FR" value={data.about_bio_fr} onChange={v => upd('about_bio_fr', v)} rows={5} />
          <F label="Bio EN" value={data.about_bio_en} onChange={v => upd('about_bio_en', v)} rows={5} />
        </Card>
        <Card title="Outils (séparés par virgule)">
          <F label="Outils" value={(data.about_tools||[]).join(', ')} onChange={v => upd('about_tools', v.split(',').map(x=>x.trim()).filter(Boolean))} />
        </Card>
        <SaveBtn onClick={() => s(['about_photo','about_name','about_role_fr','about_role_en','about_bio_fr','about_bio_en','about_tools','about_label_fr','about_label_en'])} />
      </div>
    )

    case 'proof': return (
      <div>
        <SectionTitle>⭐ Preuves sociales</SectionTitle>
        <Card title="Titre de section">
          <F label="Label FR" value={data.proof_label_fr} onChange={v => upd('proof_label_fr', v)} />
          <F label="Label EN" value={data.proof_label_en} onChange={v => upd('proof_label_en', v)} />
          <F label="Titre FR" value={data.proof_title_fr} onChange={v => upd('proof_title_fr', v)} />
          <F label="Titre EN" value={data.proof_title_en} onChange={v => upd('proof_title_en', v)} />
        </Card>
        <Card title="Logos clients">
          <div className="flex flex-wrap gap-3 mb-4">
            {(data.logos||[]).map((url,i) => (
              <div key={i} className="relative group">
                <img src={url.startsWith('http') ? url : `${API}${url}`} alt="" className="h-14 w-28 object-contain rounded-lg p-1" style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)' }} />
                <button onClick={() => { const l=[...data.logos]; l.splice(i,1); upd('logos',l); save({logos:l}) }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100">✕</button>
              </div>
            ))}
          </div>
          <ImgUpload label="Ajouter un logo" value="" onChange={url => { if (url) { const l=[...(data.logos||[]),url]; upd('logos',l); save({logos:l}) } }} />
        </Card>
        {(data.testimonials||[]).map((item,i) => (
          <Card key={i} title={`Témoignage ${i+1}`}>
            <ImgUpload label="Photo" value={item.photo||''} onChange={v=>{const t=[...data.testimonials];t[i]={...t[i],photo:v};upd('testimonials',t)}} />
            <F label="Texte FR" value={item.text_fr} onChange={v=>{const t=[...data.testimonials];t[i]={...t[i],text_fr:v};upd('testimonials',t)}} rows={3} />
            <F label="Texte EN" value={item.text_en} onChange={v=>{const t=[...data.testimonials];t[i]={...t[i],text_en:v};upd('testimonials',t)}} rows={3} />
            <F label="Auteur" value={item.author} onChange={v=>{const t=[...data.testimonials];t[i]={...t[i],author:v};upd('testimonials',t)}} />
            <F label="Rôle / Entreprise" value={item.role} onChange={v=>{const t=[...data.testimonials];t[i]={...t[i],role:v};upd('testimonials',t)}} />
            <button onClick={()=>{const t=[...data.testimonials];t.splice(i,1);upd('testimonials',t)}} className="text-red-400 text-xs hover:text-red-300">✕ Supprimer</button>
          </Card>
        ))}
        <div className="flex gap-3 mt-2">
          <button onClick={()=>upd('testimonials',[...(data.testimonials||[]),{text_fr:'',text_en:'',author:'',role:'',photo:''}])}
            className="px-4 py-2 text-sm rounded-lg border transition-all" style={{ borderColor:'rgba(201,168,76,0.4)', color:'#C9A84C' }}>
            + Ajouter témoignage
          </button>
          <SaveBtn onClick={()=>s(['proof_label_fr','proof_label_en','proof_title_fr','proof_title_en','testimonials','logos'])} />
        </div>
      </div>
    )

    case 'cta': return (
      <div>
        <SectionTitle>📣 Bannière CTA</SectionTitle>
        <Card>
          <F label="Titre FR" value={data.cta_title_fr} onChange={v=>upd('cta_title_fr',v)} />
          <F label="Titre EN" value={data.cta_title_en} onChange={v=>upd('cta_title_en',v)} />
          <F label="Sous-titre FR" value={data.cta_sub_fr} onChange={v=>upd('cta_sub_fr',v)} />
          <F label="Sous-titre EN" value={data.cta_sub_en} onChange={v=>upd('cta_sub_en',v)} />
          <F label="Bouton FR" value={data.cta_btn_fr} onChange={v=>upd('cta_btn_fr',v)} />
          <F label="Bouton EN" value={data.cta_btn_en} onChange={v=>upd('cta_btn_en',v)} />
        </Card>
        <SaveBtn onClick={()=>s(['cta_title_fr','cta_title_en','cta_sub_fr','cta_sub_en','cta_btn_fr','cta_btn_en'])} />
      </div>
    )

    case 'services': return (
      <div>
        <SectionTitle>📦 Services</SectionTitle>
        <Card title="En-tête de page">
          <F label="Titre FR" value={data.services_hero_title_fr} onChange={v=>upd('services_hero_title_fr',v)} />
          <F label="Titre EN" value={data.services_hero_title_en} onChange={v=>upd('services_hero_title_en',v)} />
          <F label="Sous-titre FR" value={data.services_hero_sub_fr} onChange={v=>upd('services_hero_sub_fr',v)} rows={2} />
          <F label="Sous-titre EN" value={data.services_hero_sub_en} onChange={v=>upd('services_hero_sub_en',v)} rows={2} />
        </Card>
        {(data.packages||[]).map((pkg,i)=>(
          <Card key={i} title={`Package ${i+1} : ${pkg.name_fr||'Sans nom'}`}>
            <ImgUpload label="Icône" value={pkg.icon||''} onChange={v=>{const p=[...data.packages];p[i]={...p[i],icon:v};upd('packages',p)}} />
            <F label="Nom FR" value={pkg.name_fr} onChange={v=>{const p=[...data.packages];p[i]={...p[i],name_fr:v};upd('packages',p)}} />
            <F label="Nom EN" value={pkg.name_en} onChange={v=>{const p=[...data.packages];p[i]={...p[i],name_en:v};upd('packages',p)}} />
            <F label="Tag FR" value={pkg.tag_fr} onChange={v=>{const p=[...data.packages];p[i]={...p[i],tag_fr:v};upd('packages',p)}} />
            <F label="Tag EN" value={pkg.tag_en} onChange={v=>{const p=[...data.packages];p[i]={...p[i],tag_en:v};upd('packages',p)}} />
            <F label="Description courte FR" value={pkg.desc_fr} onChange={v=>{const p=[...data.packages];p[i]={...p[i],desc_fr:v};upd('packages',p)}} rows={2} />
            <F label="Description courte EN" value={pkg.desc_en} onChange={v=>{const p=[...data.packages];p[i]={...p[i],desc_en:v};upd('packages',p)}} rows={2} />
            <F label="Description longue FR (accordéon)" value={pkg.long_desc_fr||''} onChange={v=>{const p=[...data.packages];p[i]={...p[i],long_desc_fr:v};upd('packages',p)}} rows={4} />
            <F label="Description longue EN" value={pkg.long_desc_en||''} onChange={v=>{const p=[...data.packages];p[i]={...p[i],long_desc_en:v};upd('packages',p)}} rows={4} />
            <F label="Livrables FR (séparés par |)" value={(pkg.deliverables_fr||[]).join(' | ')} onChange={v=>{const p=[...data.packages];p[i]={...p[i],deliverables_fr:v.split('|').map(x=>x.trim()).filter(Boolean)};upd('packages',p)}} />
            <F label="Livrables EN" value={(pkg.deliverables_en||[]).join(' | ')} onChange={v=>{const p=[...data.packages];p[i]={...p[i],deliverables_en:v.split('|').map(x=>x.trim()).filter(Boolean)};upd('packages',p)}} />
            <F label="CTA URL" value={pkg.cta_url||''} onChange={v=>{const p=[...data.packages];p[i]={...p[i],cta_url:v};upd('packages',p)}} />
            <F label="CTA Label FR" value={pkg.cta_label_fr||''} onChange={v=>{const p=[...data.packages];p[i]={...p[i],cta_label_fr:v};upd('packages',p)}} />
            <F label="CTA Label EN" value={pkg.cta_label_en||''} onChange={v=>{const p=[...data.packages];p[i]={...p[i],cta_label_en:v};upd('packages',p)}} />
            <label className="flex items-center gap-2 text-xs cursor-pointer mt-2" style={{ color:'rgba(255,255,255,0.6)' }}>
              <input type="checkbox" checked={!!pkg.highlighted} onChange={e=>{const p=[...data.packages];p[i]={...p[i],highlighted:e.target.checked};upd('packages',p)}} />
              Mettre en avant
            </label>
            <button onClick={()=>{const p=[...data.packages];p.splice(i,1);upd('packages',p)}} className="text-red-400 text-xs hover:text-red-300 mt-2">✕ Supprimer</button>
          </Card>
        ))}
        <div className="flex gap-3 my-4">
          <button onClick={()=>upd('packages',[...(data.packages||[]),{name_fr:'',name_en:'',tag_fr:'',tag_en:'',desc_fr:'',desc_en:'',long_desc_fr:'',long_desc_en:'',icon:'',cta_url:'',cta_label_fr:'Réserver',cta_label_en:'Book',deliverables_fr:[],deliverables_en:[],highlighted:false}])}
            className="px-4 py-2 text-sm rounded-lg border" style={{ borderColor:'rgba(201,168,76,0.4)', color:'#C9A84C' }}>
            + Ajouter un service
          </button>
        </div>
        <Card title="Méthode">
          <F label="Titre FR" value={data.method_title_fr} onChange={v=>upd('method_title_fr',v)} />
          <F label="Titre EN" value={data.method_title_en} onChange={v=>upd('method_title_en',v)} />
          {(data.method_steps||[]).map((step,i)=>(
            <div key={i} className="pl-4 space-y-2 mt-4" style={{ borderLeft:'2px solid rgba(201,168,76,0.3)' }}>
              <p className="text-xs font-semibold" style={{ color:'#C9A84C' }}>Étape {step.n}</p>
              <F label="Titre FR" value={step.title_fr} onChange={v=>{const st=[...data.method_steps];st[i]={...st[i],title_fr:v};upd('method_steps',st)}} />
              <F label="Titre EN" value={step.title_en} onChange={v=>{const st=[...data.method_steps];st[i]={...st[i],title_en:v};upd('method_steps',st)}} />
              <F label="Desc FR" value={step.desc_fr} onChange={v=>{const st=[...data.method_steps];st[i]={...st[i],desc_fr:v};upd('method_steps',st)}} />
              <F label="Desc EN" value={step.desc_en} onChange={v=>{const st=[...data.method_steps];st[i]={...st[i],desc_en:v};upd('method_steps',st)}} />
            </div>
          ))}
        </Card>
        <Card title="RGPD">
          <F label="Titre FR" value={data.rgpd_title_fr} onChange={v=>upd('rgpd_title_fr',v)} />
          <F label="Titre EN" value={data.rgpd_title_en} onChange={v=>upd('rgpd_title_en',v)} />
          <F label="Texte FR" value={data.rgpd_desc_fr} onChange={v=>upd('rgpd_desc_fr',v)} rows={3} />
          <F label="Texte EN" value={data.rgpd_desc_en} onChange={v=>upd('rgpd_desc_en',v)} rows={3} />
        </Card>
        <SaveBtn onClick={()=>s(['services_hero_title_fr','services_hero_title_en','services_hero_sub_fr','services_hero_sub_en','packages','method_title_fr','method_title_en','method_steps','rgpd_title_fr','rgpd_title_en','rgpd_desc_fr','rgpd_desc_en'])} />
      </div>
    )

    case 'projects': return (
      <div>
        <SectionTitle>🗂 Projets</SectionTitle>
        <Card title="En-tête de page">
          <F label="Titre FR" value={data.projects_hero_title_fr} onChange={v=>upd('projects_hero_title_fr',v)} />
          <F label="Titre EN" value={data.projects_hero_title_en} onChange={v=>upd('projects_hero_title_en',v)} />
          <F label="Sous-titre FR" value={data.projects_hero_sub_fr} onChange={v=>upd('projects_hero_sub_fr',v)} />
          <F label="Sous-titre EN" value={data.projects_hero_sub_en} onChange={v=>upd('projects_hero_sub_en',v)} />
        </Card>
        {(data.projects||[]).map((p,i)=>(
          <Card key={i} title={`Projet ${i+1} : ${p.title_fr||'Sans titre'}`}>
            <ImgUpload label="Image principale" value={p.image} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],image:v};upd('projects',pr)}} />
            <F label="Client" value={p.client||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],client:v};upd('projects',pr)}} />
            <ImgUpload label="Logo du client" value={p.logo||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],logo:v};upd('projects',pr)}} />
            <F label="Tag FR" value={p.tag_fr} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],tag_fr:v};upd('projects',pr)}} />
            <F label="Tag EN" value={p.tag_en} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],tag_en:v};upd('projects',pr)}} />
            <F label="Titre FR" value={p.title_fr} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],title_fr:v};upd('projects',pr)}} />
            <F label="Titre EN" value={p.title_en} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],title_en:v};upd('projects',pr)}} />
            <F label="Description courte FR" value={p.desc_fr} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],desc_fr:v};upd('projects',pr)}} rows={2} />
            <F label="Description courte EN" value={p.desc_en} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],desc_en:v};upd('projects',pr)}} rows={2} />
            <F label="Description longue FR" value={p.long_desc_fr||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],long_desc_fr:v};upd('projects',pr)}} rows={5} />
            <F label="Description longue EN" value={p.long_desc_en||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],long_desc_en:v};upd('projects',pr)}} rows={5} />
            <F label="Résultat FR" value={p.result_fr} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],result_fr:v};upd('projects',pr)}} />
            <F label="Résultat EN" value={p.result_en} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],result_en:v};upd('projects',pr)}} />
            <F label="CTA URL" value={p.cta_url||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],cta_url:v};upd('projects',pr)}} />
            <F label="CTA Label FR" value={p.cta_label_fr||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],cta_label_fr:v};upd('projects',pr)}} />
            <F label="CTA Label EN" value={p.cta_label_en||''} onChange={v=>{const pr=[...data.projects];pr[i]={...pr[i],cta_label_en:v};upd('projects',pr)}} />
            <div className="mt-2 space-y-2">
              <p className="text-xs font-semibold" style={{ color:'rgba(255,255,255,0.4)' }}>Galerie</p>
              <div className="flex flex-wrap gap-2">
                {(p.gallery||[]).map((url,gIdx)=>(
                  <div key={gIdx} className="relative group">
                    <img src={url.startsWith('http') ? url : `${API}${url}`} alt="" className="h-16 w-20 object-cover rounded" style={{ border:'1px solid rgba(255,255,255,0.1)' }} />
                    <button onClick={()=>{const pr=[...data.projects];const g=[...p.gallery];g.splice(gIdx,1);pr[i]={...pr[i],gallery:g};upd('projects',pr)}}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">✕</button>
                  </div>
                ))}
              </div>
              <ImgUpload label="Ajouter à la galerie" value="" onChange={url=>{if(url){const pr=[...data.projects];const g=[...(p.gallery||[]),url];pr[i]={...pr[i],gallery:g};upd('projects',pr)}}} />
            </div>
            <button onClick={()=>{const pr=[...data.projects];pr.splice(i,1);upd('projects',pr)}} className="text-red-400 text-xs hover:text-red-300 mt-2">✕ Supprimer ce projet</button>
          </Card>
        ))}
        <div className="flex gap-3 my-4">
          <button onClick={()=>upd('projects',[...(data.projects||[]),{tag_fr:'',tag_en:'',title_fr:'',title_en:'',desc_fr:'',desc_en:'',long_desc_fr:'',long_desc_en:'',result_fr:'',result_en:'',image:'',client:'',logo:'',gallery:[],cta_url:'',cta_label_fr:'',cta_label_en:'',tags:[]}])}
            className="px-4 py-2 text-sm rounded-lg border" style={{ borderColor:'rgba(201,168,76,0.4)', color:'#C9A84C' }}>
            + Ajouter un projet
          </button>
        </div>
        <SaveBtn onClick={()=>s(['projects_hero_title_fr','projects_hero_title_en','projects_hero_sub_fr','projects_hero_sub_en','projects'])} />
      </div>
    )

    case 'contact': return (
      <div>
        <SectionTitle>✉️ Page Contact</SectionTitle>
        <Card>
          <F label="Titre FR" value={data.contact_title_fr} onChange={v=>upd('contact_title_fr',v)} />
          <F label="Titre EN" value={data.contact_title_en} onChange={v=>upd('contact_title_en',v)} />
          <F label="Sous-titre FR" value={data.contact_sub_fr} onChange={v=>upd('contact_sub_fr',v)} rows={2} />
          <F label="Sous-titre EN" value={data.contact_sub_en} onChange={v=>upd('contact_sub_en',v)} rows={2} />
          <F label="Titre réservation FR" value={data.contact_booking_title_fr} onChange={v=>upd('contact_booking_title_fr',v)} />
          <F label="Titre réservation EN" value={data.contact_booking_title_en} onChange={v=>upd('contact_booking_title_en',v)} />
        </Card>
        <SaveBtn onClick={()=>s(['contact_title_fr','contact_title_en','contact_sub_fr','contact_sub_en','contact_booking_title_fr','contact_booking_title_en'])} />
      </div>
    )

    case 'footer': return (
      <div>
        <SectionTitle>🔻 Pied de page</SectionTitle>
        <Card>
          <F label="CTA navbar FR" value={data.navbar_cta_fr} onChange={v=>upd('navbar_cta_fr',v)} />
          <F label="CTA navbar EN" value={data.navbar_cta_en} onChange={v=>upd('navbar_cta_en',v)} />
          <F label="Tagline FR" value={data.footer_tagline_fr} onChange={v=>upd('footer_tagline_fr',v)} />
          <F label="Tagline EN" value={data.footer_tagline_en} onChange={v=>upd('footer_tagline_en',v)} />
          <F label="Mentions légales FR" value={data.footer_legal_fr} onChange={v=>upd('footer_legal_fr',v)} />
          <F label="Mentions légales EN" value={data.footer_legal_en} onChange={v=>upd('footer_legal_en',v)} />
        </Card>
        <SaveBtn onClick={()=>s(['navbar_cta_fr','navbar_cta_en','footer_tagline_fr','footer_tagline_en','footer_legal_fr','footer_legal_en'])} />
      </div>
    )

    case 'seo': return (
      <div>
        <SectionTitle>🔍 SEO</SectionTitle>
        <Card>
          <F label="Titre SEO FR" value={data.seo_title_fr||''} onChange={v=>upd('seo_title_fr',v)} />
          <F label="Titre SEO EN" value={data.seo_title_en||''} onChange={v=>upd('seo_title_en',v)} />
          <F label="Description SEO FR" value={data.seo_desc_fr||''} onChange={v=>upd('seo_desc_fr',v)} rows={3} />
          <F label="Description SEO EN" value={data.seo_desc_en||''} onChange={v=>upd('seo_desc_en',v)} rows={3} />
        </Card>
        <SaveBtn onClick={()=>s(['seo_title_fr','seo_title_en','seo_desc_fr','seo_desc_en'])} />
      </div>
    )

    case 'settings': return (
      <div>
        <SectionTitle>⚙️ Paramètres</SectionTitle>
        <Card title="Liens & Contact">
          <F label="URL Réservation" value={data.bookingUrl} onChange={v=>upd('bookingUrl',v)} placeholder="https://..." />
          <F label="Email de contact" value={data.contactEmail} onChange={v=>upd('contactEmail',v)} type="email" />
          <F label="Téléphone" value={data.phone||''} onChange={v=>upd('phone',v)} />
          <F label="Adresse" value={data.address||''} onChange={v=>upd('address',v)} />
          <F label="URL LinkedIn" value={data.linkedinUrl} onChange={v=>upd('linkedinUrl',v)} />
        </Card>
        <SaveBtn onClick={()=>s(['bookingUrl','contactEmail','phone','address','linkedinUrl'])} />
      </div>
    )

    default: return null
  }
}
