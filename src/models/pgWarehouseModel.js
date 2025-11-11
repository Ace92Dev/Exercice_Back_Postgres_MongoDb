const { pool } = require('../db/postgres');

async function list() {
  const res = await pool.query('SELECT id, name FROM warehouses ORDER BY id');
  return res.rows;
}

async function create({ name }) {
  const res = await pool.query('INSERT INTO warehouses (name) VALUES ($1) RETURNING id, name', [name]);
  return res.rows[0];
}

module.exports = { list, create };

