const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

async function init() {
  // Users table with role
  await pool.query(
    'CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL PRIMARY KEY,' +
      'username TEXT UNIQUE NOT NULL,' +
      'password TEXT NOT NULL,' +
      "role TEXT NOT NULL DEFAULT 'user'" +
    ')'
  );

  // Products table
  await pool.query(
    'CREATE TABLE IF NOT EXISTS products (' +
      'id SERIAL PRIMARY KEY,' +
      'name TEXT NOT NULL,' +
      'stock INTEGER NOT NULL DEFAULT 0' +
    ')'
  );

  // Movements table
  await pool.query(
    'CREATE TABLE IF NOT EXISTS movements (' +
      'id SERIAL PRIMARY KEY,' +
      'product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,' +
      "type TEXT NOT NULL CHECK (type IN (\'IN\', \'OUT\'))," +
      'quantity INTEGER NOT NULL CHECK (quantity > 0),' +
      'created_at TIMESTAMP NOT NULL DEFAULT now()' +
    ')'
  );

  // Warehouses and locations
  await pool.query(
    'CREATE TABLE IF NOT EXISTS warehouses (' +
      'id SERIAL PRIMARY KEY,' +
      'name TEXT NOT NULL' +
    ')'
  );
  await pool.query(
    'CREATE TABLE IF NOT EXISTS locations (' +
      'id SERIAL PRIMARY KEY,' +
      'warehouse_id INTEGER NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,' +
      'name TEXT NOT NULL' +
    ')'
  );
}

module.exports = { pool, init };

