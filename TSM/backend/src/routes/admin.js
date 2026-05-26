const express  = require('express')
const jwt      = require('jsonwebtoken')
const multer   = require('multer')
const path     = require('path')
const low      = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const auth     = require('../middleware/auth')

const router = express.Router()

// ── DB ──────────────────────────────────────────────────────
const adapter = new FileSync(path.join(__dirname, '..', 'content.json'))
const db = low(adapter)

const DEFAULTS = {
  navbar_logo: 'TSM — Conseil IA',
  navbar_cta_fr: 'Prendre rendez-vous',
  navbar_cta_en: 'Book an appointment',

  hero_h1_fr: "Votre entreprise, propulsée par l'IA.",
  hero_h1_en: 'Your business, powered by AI.',
  hero_sub_fr: "J'accompagne les dirigeants et leurs équipes à intégrer les bons outils d'intelligence artificielle — pour gagner du temps, structurer leur croissance, et prendre une longueur d'avance.",
  hero_sub_en: "I help executives and their teams integrate the right AI tools — to save time, structure growth, and stay ahead of the competition.",
  hero_badge_fr: 'Conseil en Intégration IA',
  hero_badge_en: 'AI Integration Consulting',
  hero_cta1_fr: 'Prendre rendez-vous',
  hero_cta1_en: 'Book an appointment',
  hero_cta2_fr: "Voir l'offre",
  hero_cta2_en: 'See our services',

  problem_label_fr: 'Le contexte',
  problem_label_en: 'Context',
  problem_title_fr: 'Pourquoi agir maintenant ?',
  problem_title_en: 'Why act now?',
  problem_cards: [
    { num: '01', title_fr: 'Vous perdez du temps', title_en: "You're losing time", desc_fr: "Des heures chaque semaine engloutie dans des tâches répétitives que l'IA pourrait automatiser en quelques jours.", desc_en: 'Hours every week lost to repetitive tasks that AI could automate in days.' },
    { num: '02', title_fr: "Les outils existent, mais personne ne les intègre", title_en: "The tools exist, but no one integrates them", desc_fr: "ChatGPT, Make, Notion AI, HubSpot… La plupart des entreprises utilisent 10% du potentiel de ces outils.", desc_en: "ChatGPT, Make, Notion AI, HubSpot… Most businesses use only 10% of these tools' potential." },
    { num: '03', title_fr: 'Vos concurrents avancent', title_en: 'Your competitors are moving fast', desc_fr: "L'adoption de l'IA dans les PME croît de 40% par an. Chaque mois compte.", desc_en: 'AI adoption in SMEs is growing 40% per year. Every month matters.' },
  ],

  about_label_fr: 'À propos',
  about_label_en: 'About',
  about_photo: '',
  about_name: 'Timothé Seguin-Médrinal',
  about_role_fr: 'Consultant en intégration IA',
  about_role_en: 'AI Integration Consultant',
  about_bio_fr: "Entrepreneur dans les secteurs du vin, de l'hôtellerie et de la restauration depuis plus de 10 ans, j'ai intégré l'IA dans mes propres opérations avant d'accompagner d'autres dirigeants. Mon approche est terrain, concrète, et orientée résultats — pas de jargon, pas de théorie.",
  about_bio_en: 'An entrepreneur in wine, hospitality and restaurants for over 10 years, I integrated AI into my own operations before helping other executives do the same. My approach is practical, concrete, and results-driven — no jargon, no theory.',
  about_tools: ['ChatGPT', 'Make', 'Notion AI', 'HubSpot', 'Zapier', 'Midjourney'],

  proof_label_fr: 'Références',
  proof_label_en: 'References',
  proof_title_fr: 'Ils nous font confiance',
  proof_title_en: 'They trust us',
  logos: [],
  testimonials: [
    { text_fr: "Grâce à l'accompagnement de Timothé, nous avons automatisé notre gestion des réservations et économisé plus de 8 heures par semaine dès le premier mois.", text_en: "Thanks to Timothé's support, we automated our reservation management and saved over 8 hours per week from the very first month.", author: 'Marie L.', role: 'Directrice, Hôtel Boutique Bordeaux', photo: '' },
  ],

  cta_title_fr: "Prêt à passer à l'action ?",
  cta_title_en: 'Ready to take action?',
  cta_sub_fr: "Réservez un appel découverte gratuit de 30 minutes.",
  cta_sub_en: '30-minute free discovery call.',
  cta_btn_fr: 'Prendre rendez-vous',
  cta_btn_en: 'Book an appointment',

  services_hero_title_fr: "Une offre claire, adaptée à votre niveau de maturité.",
  services_hero_title_en: 'A clear offer, tailored to your level of maturity.',
  services_hero_sub_fr: "Que vous partiez de zéro ou que vous souhaitiez aller plus loin, il existe un accompagnement fait pour vous.",
  services_hero_sub_en: "Whether you're starting from scratch or looking to go further, there's a package designed for you.",
  packages: [
    { name_fr: 'Audit & Diagnostic', name_en: 'Audit & Assessment', tag_fr: 'Pour démarrer', tag_en: 'To get started', desc_fr: "Un état des lieux complet de vos process, outils actuels et opportunités d'automatisation.", desc_en: 'A complete review of your processes, current tools and automation opportunities.', long_desc_fr: '', long_desc_en: '', volume: '2 à 4 jours', deliverables_fr: ['Analyse des process', 'Cartographie des outils IA', 'Roadmap priorisée', 'Restitution orale'], deliverables_en: ['Process analysis', 'AI tool mapping', 'Prioritised roadmap', 'Oral presentation'], highlighted: false, icon: '', cta_url: '', cta_label_fr: 'Réserver', cta_label_en: 'Book' },
    { name_fr: 'Intégration & Mise en place', name_en: 'Integration & Deployment', tag_fr: 'Le plus choisi', tag_en: 'Most popular', desc_fr: "On passe à l'action. J'intègre les outils sélectionnés dans vos process existants, avec formation incluse.", desc_en: 'Time to act. I integrate the selected tools into your existing processes, with team training included.', long_desc_fr: '', long_desc_en: '', volume: '2 à 6 semaines', deliverables_fr: ['Déploiement des outils', 'Automatisations sur mesure', 'Formation équipe', 'Documentation complète'], deliverables_en: ['Tool deployment', 'Custom automations', 'Team training', 'Full documentation'], highlighted: true, icon: '', cta_url: '', cta_label_fr: 'Réserver', cta_label_en: 'Book' },
    { name_fr: 'Suivi & Optimisation', name_en: 'Monitoring & Optimisation', tag_fr: 'Pour aller plus loin', tag_en: 'To go further', desc_fr: "Un accompagnement continu pour suivre les performances, ajuster les outils et former les nouveaux collaborateurs.", desc_en: 'Ongoing support to track performance, adjust tools, and onboard new team members.', long_desc_fr: '', long_desc_en: '', volume: 'Engagement mensuel', deliverables_fr: ['Points réguliers', 'Optimisation continue', 'Support réactif', 'Montée en compétence'], deliverables_en: ['Regular check-ins', 'Continuous optimisation', 'Responsive support', 'Skills development'], highlighted: false, icon: '', cta_url: '', cta_label_fr: 'Réserver', cta_label_en: 'Book' },
  ],
  method_title_fr: 'Comment ça se passe ?',
  method_title_en: 'How does it work?',
  method_steps: [
    { n: '01', title_fr: 'Diagnostic', title_en: 'Assessment', desc_fr: 'On identifie vos besoins réels et vos points de friction.', desc_en: 'We identify your real needs and friction points.' },
    { n: '02', title_fr: 'Stratégie', title_en: 'Strategy', desc_fr: 'On définit ensemble les outils et les priorités.', desc_en: 'We define the tools and priorities together.' },
    { n: '03', title_fr: 'Intégration', title_en: 'Integration', desc_fr: "On déploie, on automatise, on forme vos équipes.", desc_en: 'We deploy, automate, and train your teams.' },
    { n: '04', title_fr: 'Suivi', title_en: 'Follow-up', desc_fr: 'On mesure les résultats et on optimise en continu.', desc_en: 'We measure results and continuously optimise.' },
  ],
  rgpd_title_fr: 'Vos données, protégées.',
  rgpd_title_en: 'Your data, protected.',
  rgpd_desc_fr: "Toutes les missions sont réalisées dans le strict respect du RGPD. Les données de votre entreprise ne sont jamais partagées avec des tiers.",
  rgpd_desc_en: "All engagements are carried out in strict compliance with GDPR. Your company's data is never shared with third parties.",

  projects_hero_title_fr: 'Cas concrets, résultats mesurables.',
  projects_hero_title_en: 'Real cases, measurable results.',
  projects_hero_sub_fr: 'Des exemples tirés du terrain, dans des secteurs variés.',
  projects_hero_sub_en: 'Examples drawn from the field, across various sectors.',
  projects: [
    { tag_fr: 'Hôtellerie', tag_en: 'Hospitality', title_fr: 'Automatisation de la gestion des réservations', title_en: 'Reservation management automation', desc_fr: "Un hôtel boutique bordelais faisait face à une gestion chronophage des réservations multi-canaux.", desc_en: 'A Bordeaux boutique hotel was struggling with time-consuming multi-channel reservation management.', long_desc_fr: '', long_desc_en: '', result_fr: '8h/semaine économisées dès le 1er mois', result_en: '8hrs/week saved from the very first month', image: '', client: '', logo: '', gallery: [], cta_url: '', cta_label_fr: '', cta_label_en: '', tags: [] },
    { tag_fr: 'Restauration', tag_en: 'Restaurant', title_fr: 'Optimisation des plannings et communication interne', title_en: 'Schedule optimisation and internal communication', desc_fr: "Un groupe de restaurants bordelais perdait un temps considérable dans la gestion des plannings.", desc_en: 'A Bordeaux restaurant group was losing significant time managing schedules.', long_desc_fr: '', long_desc_en: '', result_fr: '60% de réduction du temps de gestion RH', result_en: '60% reduction in weekly HR management time', image: '', client: '', logo: '', gallery: [], cta_url: '', cta_label_fr: '', cta_label_en: '', tags: [] },
    { tag_fr: 'Commerce & Distribution', tag_en: 'Commerce & Distribution', title_fr: 'Assistant IA pour le service client', title_en: 'AI assistant for customer service', desc_fr: "Une PME du secteur distribution recevait plus de 200 demandes clients par semaine.", desc_en: 'An SME in distribution was receiving over 200 customer requests per week.', long_desc_fr: '', long_desc_en: '', result_fr: 'Temps de réponse réduit de 48h à 2h', result_en: 'Response time reduced from 48h to 2h', image: '', client: '', logo: '', gallery: [], cta_url: '', cta_label_fr: '', cta_label_en: '', tags: [] },
  ],

  contact_title_fr: 'Parlons de votre projet.',
  contact_title_en: "Let's talk about your project.",
  contact_sub_fr: 'Décrivez votre situation en quelques mots. Nous vous répondons sous 24h.',
  contact_sub_en: "Describe your situation in a few words. We'll get back to you within 24 hours.",
  contact_booking_title_fr: 'Ou réservez directement un créneau',
  contact_booking_title_en: 'Or book a slot directly',

  footer_tagline_fr: "L'IA au service de votre croissance.",
  footer_tagline_en: 'AI at the service of your growth.',
  footer_legal_fr: '© 2025 TSM — Conseil IA | Mentions légales | Politique de confidentialité RGPD',
  footer_legal_en: '© 2025 TSM — Conseil IA | Legal Notice | GDPR Privacy Policy',

  seo_title_fr: 'TSM — Conseil IA | Intégration Intelligence Artificielle',
  seo_title_en: 'TSM — AI Consulting | AI Integration',
  seo_desc_fr: "Timothé Seguin-Médrinal — Consultant en intégration IA pour dirigeants et PME. Audit, déploiement, formation. Résultats concrets.",
  seo_desc_en: 'Timothé Seguin-Médrinal — AI Integration Consultant for executives and SMEs. Audit, deployment, training. Concrete results.',

  bookingUrl: 'https://booking.lodgify.com/PLACEHOLDER',
  contactEmail: 'contact@tsm-conseil.com',
  linkedinUrl: 'https://linkedin.com/in/timothesm',
  phone: '',
  address: '',
}

db.defaults(DEFAULTS).write()

// ── Upload config ───────────────────────────────────────────
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads'),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`),
})
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } })

// ── PUBLIC: GET /api/admin/public-content ───────────────────
router.get('/public-content', (req, res) => {
  res.json({ success: true, data: db.getState() })
})

// ── POST /api/admin/login ───────────────────────────────────
router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
    return res.status(401).json({ success: false, error: 'Identifiants incorrects.' })
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' })
  return res.json({ success: true, token })
})

// ── GET /api/admin/content (auth) ──────────────────────────
router.get('/content', auth, (req, res) => {
  res.json({ success: true, data: db.getState() })
})

// ── PUT /api/admin/content (auth) ──────────────────────────
router.put('/content', auth, (req, res) => {
  try {
    const updated = { ...db.getState(), ...req.body }
    db.setState(updated).write()
    res.json({ success: true, data: db.getState() })
  } catch (err) {
    console.error('[CONTENT/PUT]', err)
    res.status(500).json({ success: false, error: 'Erreur serveur.' })
  }
})

// ── POST /api/admin/upload (auth) ──────────────────────────
router.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier.' })
  const url = `/uploads/${req.file.filename}`
  res.json({ success: true, url, filename: req.file.filename })
})

module.exports = router
