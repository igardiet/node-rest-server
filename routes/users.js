const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { validateFields } = require('../middlewares/validateFields');
const {
  isValidRole,
  isEmailExistent,
  userExistsById,
} = require('../helpers/db-validators');
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/users');

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({
      min: 6,
    }),
    check('email', 'Email syntax is not valid!').isEmail(),
    check('email').custom(isEmailExistent),
    // check('role', 'This role is not valid!').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUsers
);

router.put(
  '/:id',
  [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  putUsers
);

router.delete(
  '/:id',
  [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(userExistsById),
    validateFields,
  ],
  deleteUsers
);

router.patch('/', patchUsers);

module.exports = router;
