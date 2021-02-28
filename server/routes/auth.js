/*
  Routes for Users / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateData } = require('../middlewares/custom-validations');



const router = Router();

router.post(
  '/new',
  [
    // Middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    validateData
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
    validateData,
  ],
  loginUser
);

router.get('/renew', renewToken);

module.exports = router;
