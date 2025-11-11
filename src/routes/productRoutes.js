const { Router } = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/productController');
const { requireAuth, isAdmin } = require('../middleware/authMiddleware');
const { handleValidation } = require('../validation/handleValidation');

const router = Router();

router.get('/', controller.list); // public

router.post(
  '/',
  requireAuth,
  [body('name').isString().trim().notEmpty(), body('stock').optional().isInt({ min: 0 })],
  handleValidation,
  controller.create
);

router.put(
  '/:id',
  requireAuth,
  [
    body('name').optional().isString().trim().notEmpty(),
    body('stock').optional().isInt({ min: 0 }),
  ],
  handleValidation,
  controller.update
);

router.delete('/:id', requireAuth, isAdmin, controller.remove);

module.exports = router;

