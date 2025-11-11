const { pool } = require('../db/postgres');

async function findByUsername(username) {
  const res = await pool.query('SELECT id, username, password, role FROM users WHERE username = $1', [username]);
  return res.rows[0] || null;
}

async function create({ username, password, role }) {
  const res = await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role',
    [username, password, role || 'user']
  );
  return res.rows[0];
}

module.exports = { findByUsername, create };

