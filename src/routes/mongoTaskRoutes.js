const { Router } = require('express');
const controller = require('../controllers/mongoTaskController');

const router = Router();
router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

module.exports = router;

