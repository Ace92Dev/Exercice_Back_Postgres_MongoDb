const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');

// Display tasks
router.get('/', controller.list);

// Add task
router.post('/', controller.add);

// Remove task
router.delete('/:id', controller.remove);

module.exports = router;

