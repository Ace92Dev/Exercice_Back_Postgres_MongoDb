const { Router } = require('express');
const { body } = require('express-validator');
const warehouseController = require('../controllers/warehouseController');
const locationController = require('../controllers/locationController');
const { requireAuth } = require('../middleware/authMiddleware');
const { handleValidation } = require('../validation/handleValidation');

const router = Router();

router.get('/', warehouseController.list); // public
router.post('/', requireAuth, [body('name').isString().trim().notEmpty()], handleValidation, warehouseController.create);

router.get('/:id/locations', locationController.listByWarehouse); // public
router.post(
  '/:id/locations',
  requireAuth,
  [body('name').isString().trim().notEmpty()],
  handleValidation,
  locationController.create
);
router.put(
  '/:id/locations',
  requireAuth,
  [body('id').isInt({ min: 1 }), body('name').optional().isString().trim().notEmpty()],
  handleValidation,
  locationController.update
);

module.exports = router;

