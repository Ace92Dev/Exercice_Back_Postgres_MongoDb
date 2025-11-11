const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const header = req.headers && req.headers.authorization;
  if (!header || !header.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization header missing' });
  }
  const token = header.split(' ')[1];
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

module.exports = { requireAuth };

