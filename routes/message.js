const { Router } = require('express');
const { body } = require('express-validator');
const { obtainChat } = require('../controllers/messageController');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.get('/:from', [
    validateJWT
], obtainChat);

module.exports = router;
