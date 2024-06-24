const {Router} = require('express');
const {check} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const router = Router();
const adminController = require('../controllers/admin.controllers');
const validateAtributes = require('../middleware/validate.Atributes');

router.get('/' , (req , res)=>{
    res.json(
    {
        status:true,
        message:"Welcome to the API of admin"
    });
});

router.post('/registro/usuario', [
    check('nombre', 'El id es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('foto', 'La foto es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('conf_password', 'La confirmacion de la contraseña es obligatoria').not().isEmpty(),
    validateAtributes
], adminController.registro);

router.post('/registro/viaje', [
    check('nombreAgencia', 'El id es obligatorio').not().isEmpty(),
    check('ciudadOrigen', 'El usuario es obligatorio').not().isEmpty(),
    check('ciudadDestino', 'La foto es obligatoria').not().isEmpty(),
    check('diasDeVuelo', 'El correo es obligatorio').not().isEmpty(),
    check('precioDeVuelo', 'La contraseña es obligatoria').not().isEmpty(),
    validateAtributes
], adminController.registroViaje);

module.exports = router;