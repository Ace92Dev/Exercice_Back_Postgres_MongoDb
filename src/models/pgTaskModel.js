const { pool } = require('../db/postgres');

async function getAll() {
  const res = await pool.query('SELECT id, title FROM tasks ORDER BY id');
  return res.rows;
}

async function add(title) {
  const res = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING id, title', [title]);
  return res.rows[0];
}

async function remove(id) {
  const res = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return res.rowCount > 0;
}

module.exports = { getAll, add, remove };

