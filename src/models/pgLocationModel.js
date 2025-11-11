const { pool } = require('../db/postgres');

async function listByWarehouse(warehouseId) {
  const res = await pool.query('SELECT id, warehouse_id, name FROM locations WHERE warehouse_id = $1 ORDER BY id', [warehouseId]);
  return res.rows;
}

async function create(warehouseId, { name }) {
  const res = await pool.query('INSERT INTO locations (warehouse_id, name) VALUES ($1, $2) RETURNING id, warehouse_id, name', [warehouseId, name]);
  return res.rows[0];
}

async function update(warehouseId, { id, name }) {
  const res = await pool.query(
    'UPDATE locations SET name = COALESCE($3, name) WHERE id = $1 AND warehouse_id = $2 RETURNING id, warehouse_id, name',
    [id, warehouseId, name]
  );
  return res.rows[0] || null;
}

module.exports = { listByWarehouse, create, update };

