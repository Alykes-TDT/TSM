# TSM — AI Consulting & Integration (Bilingual Full-Stack)

Full-stack monorepo for the **TSM — Conseil IA** website and admin console.
Built with **React (Vite)** + **Express.js** + **lowdb JSON persistence**.

---

## ⚡ Key Features

- **Bilingual (EN/FR):** Full translation system, admin-editable
- **Services Page:** Accordion panels with deliverables and custom CTAs
- **Projects Gallery:** Client logos, lightbox image galleries, custom CTAs
- **Bilingual SEO:** Admin-controlled page titles and meta descriptions
- **Single-Host Production:** Express serves the built React SPA on one port

---

## 📂 Structure

```
TSM/
├── package.json          # Monorepo root scripts
├── backend/
│   ├── src/
│   │   ├── index.js      # Express server
│   │   ├── content.json  # Database
│   │   ├── routes/
│   │   │   ├── admin.js
│   │   │   └── contact.js
│   │   └── middleware/
│   │       └── auth.js
│   └── uploads/
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── i18n.js
    │   ├── hooks/useContent.js
    │   ├── components/
    │   └── pages/
    └── ...
```

---

## 🚀 Commands

```bash
# Install all dependencies
npm run install:all

# Development (backend :5001, frontend :3001)
npm run dev

# Production build + start
npm run build
npm start
```

---

## 🔑 Admin Access

- URL: `/admin/login`
- Username: `Timothe`
- Password: `Timothe@123`

---

## 🌍 Backend .env (create at backend/.env)

```env
PORT=5001
ADMIN_USER=Timothe
ADMIN_PASS=Timothe@123
JWT_SECRET=your-32-char-secret-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@tsm-conseil.com
FRONTEND_URL=http://localhost:3001
```
