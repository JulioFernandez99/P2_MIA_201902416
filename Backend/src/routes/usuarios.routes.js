const {Router} = require('express');
const {check} = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

const router = Router();
const usuarisController = require('../controllers/usuarios.controllers');
const validateAtributes = require('../middleware/validate.Atributes');

router.get('/' , (req , res)=>{
    res.json(
    {
        status:true,
        message:"Welcome to the API of usuarios"
    });
});

router.get('/registroUser', [
    check('nombre', 'El id es obligatorio').not().isEmpty(),
    check('apellido', 'El id es obligatorio').not().isEmpty(),
    check('email', 'El id es obligatorio').not().isEmpty(),
    check('password', 'El id es obligatorio').not().isEmpty(),
    validateAtributes
], usuarisController.registroUser);

module.exports = router;