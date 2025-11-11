const { pool } = require('../db/postgres');

async function findByEmail(email) {
  const res = await pool.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
  return res.rows[0] || null;
}

async function create({ name, email, password }) {
  const res = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name || null, email, password]
  );
  return res.rows[0];
}

module.exports = { findByEmail, create };

