const Products = require('../models/pgProductModel');

async function list(req, res) {
  const items = await Products.list();
  res.json(items);
}

async function create(req, res) {
  const { name, stock } = req.body;
  const product = await Products.create({ name, stock: stock ?? 0 });
  res.status(201).json(product);
}

async function update(req, res) {
  const id = parseInt(req.params.id, 10);
  const updated = await Products.update(id, { name: req.body.name, stock: req.body.stock });
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json(updated);
}

async function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  const ok = await Products.remove(id);
  if (!ok) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
}

module.exports = { list, create, update, remove };

