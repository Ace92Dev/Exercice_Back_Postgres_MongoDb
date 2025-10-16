let tasks = [];
let nextId = 1;

function getAll() {
  return tasks;
}

function addTask(title) {
  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function removeTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const [deleted] = tasks.splice(idx, 1);
  return deleted;
}

module.exports = {
  getAll,
  addTask,
  removeTask,
};

