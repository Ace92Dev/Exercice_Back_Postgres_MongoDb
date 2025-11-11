const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

async function init() {
  await pool.query('CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title TEXT NOT NULL)');
  // Basic users table for JWT demos
  await pool.query(
    'CREATE TABLE IF NOT EXISTS users (' +
      'id SERIAL PRIMARY KEY,' +
      'name TEXT,' +
      'email TEXT UNIQUE NOT NULL,' +
      'password TEXT NOT NULL' +
    ')'
  );
}

module.exports = { pool, init };

