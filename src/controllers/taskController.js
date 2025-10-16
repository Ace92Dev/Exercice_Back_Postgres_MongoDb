const Task = require('../models/taskModel');

exports.list = (req, res) => {
  const tasks = Task.getAll();
  res.json(tasks);
};

exports.add = (req, res) => {
  const { title } = req.body || {};
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Le champ "title" est requis' });
  }

  const task = Task.addTask(title.trim());
  res.status(201).json(task);
};

exports.remove = (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  const deleted = Task.removeTask(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Tâche introuvable' });
  }

  res.json({ success: true, deleted });
};

