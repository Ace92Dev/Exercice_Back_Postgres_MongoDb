const jwt = require('jsonwebtoken');
const Users = require('../models/pgUserModel');

function signToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  return jwt.sign(payload, secret, { expiresIn });
}

async function signup(req, res, next) {
  const { name, email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password required' });
  }
  try {
    const existing = await Users.findByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: 'email already in use' });
    }
    const user = await Users.create({ name, email, password });
    const token = signToken({ userId: user.id, email: user.email });
    return res.status(201).json({ success: true, data: { userId: user.id, email: user.email, token } });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password required' });
  }
  try {
    const user = await Users.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }
    const token = signToken({ userId: user.id, email: user.email });
    return res.status(200).json({ success: true, data: { userId: user.id, email: user.email, token } });
  } catch (err) {
    return next(err);
  }
}

module.exports = { signup, login };

