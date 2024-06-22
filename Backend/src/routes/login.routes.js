const {Router} = require('express');
const {check} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();


const router = Router();
const loginController = require('../controllers/login.controllers');
const loginValidates = require('../middleware/login.validates');

router.post('/' , [
    check('user', 'El user es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    loginValidates
], loginController.login);

module.exports = router;