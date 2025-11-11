const { Router } = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');
const { handleValidation } = require('../validation/handleValidation');

const router = Router();

router.post(
  '/register',
  [
    body('username').isString().trim().isLength({ min: 3 }),
    body('password').isString().isLength({ min: 6 }),
    body('role').optional().isIn(['user', 'admin']),
  ],
  handleValidation,
  register
);

router.post(
  '/login',
  [
    body('username').isString().trim().notEmpty(),
    body('password').isString().notEmpty(),
  ],
  handleValidation,
  login
);

module.exports = router;

