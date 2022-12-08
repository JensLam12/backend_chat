const { Router } = require('express');
const { body } = require('express-validator');
const { getUsers } = require('../controllers/usersController');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.get('/', [
    validateJWT
], getUsers);

module.exports = router;
