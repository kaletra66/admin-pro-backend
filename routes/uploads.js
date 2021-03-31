/**
 * Ruta; api/uploads/:tipo/:id
 */

 const { Router }  = require('express');
 const expressFileUpload = require('express-fileupload');
 const {check} = require('express-validator');
 const {validarCampos} = require('../middlewares/validar-campos');
 
 const { 
            fileUpload,
            retornaImagen
        } = require('../controllers/uploads');
        
 const { validarJWT } = require('../middlewares/validar-jwk');
 
 const router = Router();
 router.use(expressFileUpload());

 //Rutas
 router.put( 
    '/:tipo/:id',
    [
        validarJWT,
    ],
    fileUpload);

router.get( 
    '/:tipo/:foto',
    [
    ],
    retornaImagen);

 module.exports = router;