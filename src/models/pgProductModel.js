const { pool } = require('../db/postgres');

async function list() {
  const res = await pool.query('SELECT id, name, stock FROM products ORDER BY id');
  return res.rows;
}

async function getById(id) {
  const res = await pool.query('SELECT id, name, stock FROM products WHERE id = $1', [id]);
  return res.rows[0] || null;
}

async function create({ name, stock = 0 }) {
  const res = await pool.query(
    'INSERT INTO products (name, stock) VALUES ($1, $2) RETURNING id, name, stock',
    [name, stock]
  );
  return res.rows[0];
}

async function update(id, { name, stock }) {
  const res = await pool.query(
    'UPDATE products SET name = COALESCE($2, name), stock = COALESCE($3, stock) WHERE id = $1 RETURNING id, name, stock',
    [id, name, stock]
  );
  return res.rows[0] || null;
}

async function remove(id) {
  const res = await pool.query('DELETE FROM products WHERE id = $1', [id]);
  return res.rowCount > 0;
}

async function setStock(id, stock) {
  const res = await pool.query('UPDATE products SET stock = $2 WHERE id = $1 RETURNING id, name, stock', [id, stock]);
  return res.rows[0] || null;
}

module.exports = { list, getById, create, update, remove, setStock };

