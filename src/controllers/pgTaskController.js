const model = require('../models/pgTaskModel');

async function list(req, res) {
  const rows = await model.getAll();
  res.json(rows);
}

async function create(req, res) {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'title required' });
  }
  const task = await model.add(title.trim());
  res.status(201).json(task);
}

async function remove(req, res) {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid id' });
  }
  const ok = await model.remove(id);
  if (!ok) {
    return res.status(404).json({ error: 'not found' });
  }
  res.status(204).end();
}

module.exports = { list, create, remove };

