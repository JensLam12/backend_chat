const { Router } = require('express');
const { body } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post( '/addUser', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
], createUser);

router.post( '/', [
    body('email', 'Email is required').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post( '/renew', [
    validateJWT,
    validateFields
], renewToken);

module.exports = router;