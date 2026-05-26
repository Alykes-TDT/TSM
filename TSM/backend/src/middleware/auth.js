const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Non autorisé.' })
  }
  const token = header.split(' ')[1]
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ success: false, error: 'Token invalide ou expiré.' })
  }
}
