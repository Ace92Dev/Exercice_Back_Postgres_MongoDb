const Locations = require('../models/pgLocationModel');

async function listByWarehouse(req, res) {
  const warehouseId = parseInt(req.params.id, 10);
  const rows = await Locations.listByWarehouse(warehouseId);
  res.json(rows);
}

async function create(req, res) {
  const warehouseId = parseInt(req.params.id, 10);
  const loc = await Locations.create(warehouseId, { name: req.body.name });
  res.status(201).json(loc);
}

async function update(req, res) {
  const warehouseId = parseInt(req.params.id, 10);
  const updated = await Locations.update(warehouseId, { id: req.body.id, name: req.body.name });
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json(updated);
}

module.exports = { listByWarehouse, create, update };

