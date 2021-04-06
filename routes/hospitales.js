/**
 * Ruta: /api/hospitales
 */
 const { Router }  = require('express');
 const {check} = require('express-validator');
 const {validarCampos} = require('../middlewares/validar-campos');
 
 const { 
            getHospitales, 
            postHospitales, 
            putHospitales, 
            deleteHospitales 

        } = require('../controllers/hospitales');
 const { validarJWT } = require('../middlewares/validar-jwk');
 
 const router = Router();
 
 //Rutas
 router.get( 
    '/',
    [
        validarJWT,
    ],
    getHospitales);
 
 router.post(
     '/', 
     [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
     ] , 
     postHospitales);
 
 router.put(
     '/:id', 
     [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], 
     putHospitales);
 
 router.delete(
         '/:id', 
         [
            validarJWT,
         ], 
         deleteHospitales);
 
 
 module.exports = router;