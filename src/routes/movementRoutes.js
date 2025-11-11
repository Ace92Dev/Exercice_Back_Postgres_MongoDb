const { Router } = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/movementController');
const { requireAuth } = require('../middleware/authMiddleware');
const { handleValidation } = require('../validation/handleValidation');

const router = Router();

router.get('/', controller.list); // public

router.post(
  '/',
  requireAuth,
  [
    body('productId').isInt({ min: 1 }),
    body('type').isIn(['IN', 'OUT']),
    body('quantity').isInt({ min: 1 }),
  ],
  handleValidation,
  controller.create
);

module.exports = router;

