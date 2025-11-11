const Warehouses = require('../models/pgWarehouseModel');

async function list(req, res) {
  const rows = await Warehouses.list();
  res.json(rows);
}

async function create(req, res) {
  const { name } = req.body;
  const wh = await Warehouses.create({ name });
  res.status(201).json(wh);
}

module.exports = { list, create };

