const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/pgUserModel');

function signToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
  return jwt.sign(payload, secret, { expiresIn });
}

async function register(req, res, next) {
  const { username, password, role } = req.body || {};
  try {
    const existing = await Users.findByUsername(username);
    if (existing) {
      return res.status(409).json({ success: false, message: 'username already in use' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, password: hashed, role: role || 'user' });
    const token = signToken({ id: user.id, username: user.username, role: user.role });
    return res.status(201).json({ success: true, data: { id: user.id, username: user.username, role: user.role, token } });
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  const { username, password } = req.body || {};
  try {
    const user = await Users.findByUsername(username);
    if (!user) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }
    const token = signToken({ id: user.id, username: user.username, role: user.role });
    return res.status(200).json({ success: true, data: { id: user.id, username: user.username, role: user.role, token } });
  } catch (err) {
    return next(err);
  }
}

module.exports = { register, login };

