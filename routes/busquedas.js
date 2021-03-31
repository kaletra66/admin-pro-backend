/**
 * Ruta; api/todo/:busqueda
 */

 const { Router }  = require('express');
 const {check} = require('express-validator');
 const {validarCampos} = require('../middlewares/validar-campos');
 
 const { 
            busqueda,
            getDocumentosColeccion
        } = require('../controllers/busquedas');
 const { validarJWT } = require('../middlewares/validar-jwk');
 const router = Router();
 
 //Rutas
 router.get( 
    '/:busqueda',
    [
        validarJWT,
    ],
    busqueda);

    
router.get( 
    '/coleccion/:tabla/:busqueda',
    [
        validarJWT,
    ],
    getDocumentosColeccion);
 module.exports = router;