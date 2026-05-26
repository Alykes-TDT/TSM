require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const path       = require('path')
const contactRoute = require('./routes/contact')
const adminRoute   = require('./routes/admin')

const app  = express()
const PORT = process.env.PORT || 5001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10mb' }))

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// Routes
app.use('/api/contact', contactRoute)
app.use('/api/admin',   adminRoute)

// Health check
app.get('/api/health', (_, res) => res.json({ ok: true, ts: new Date().toISOString() }))

// Serve frontend in production
const distPath = path.join(__dirname, '..', '..', 'frontend', 'dist')
app.use(express.static(distPath))

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) res.status(404).send('Frontend build not found. Run npm run build first.')
    })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 TSM Backend running on port ${PORT}`)
  console.log(`   CORS: ${process.env.FRONTEND_URL || 'http://localhost:3001'}`)
  console.log(`   Contact email: ${process.env.CONTACT_EMAIL}\n`)
})
