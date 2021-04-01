/**
 * Ruta: '/api/login'
 */

 const { Router }  = require('express');
 const { login, googleSign } = require('../controllers/auth');
 const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/',
    [
        check('email', "El correo es obligatorio").not().isEmpty(),
        check('password', "La contraseña es obligatoria").not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        check('token', "Token de Google es obligatorio").not().isEmpty(),
        validarCampos
    ],
    googleSign
)


module.exports = router;
