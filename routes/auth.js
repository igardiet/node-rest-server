const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { login } = require('../controllers/auth');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email address is mandatory').isEmail(),
    check('password', 'The password is mandatory').not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
