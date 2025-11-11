const { pool } = require('../db/postgres');

async function list() {
  const res = await pool.query(
    'SELECT m.id, m.product_id, p.name as product_name, m.type, m.quantity, m.created_at ' +
    'FROM movements m JOIN products p ON p.id = m.product_id ORDER BY m.id DESC'
  );
  return res.rows;
}

async function create({ productId, type, quantity }) {
  const res = await pool.query(
    'INSERT INTO movements (product_id, type, quantity) VALUES ($1, $2, $3) RETURNING id, product_id, type, quantity, created_at',
    [productId, type, quantity]
  );
  return res.rows[0];
}

module.exports = { list, create };

