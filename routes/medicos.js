/**
 * Ruta: /api/Medicos
 */
 const { Router }  = require('express');
 const {check} = require('express-validator');
 const {validarCampos} = require('../middlewares/validar-campos');
 
 const { 
            getMedicos, 
            postMedicos, 
            putMedicos, 
            deleteMedicos 

        } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwk');
const { login } = require('../controllers/auth');
//  const { validarJWT } = require('../middlewares/validar-jwk');
 
 const router = Router();
 
 //Rutas
 router.get( 
    '/', 
    [
        validarJWT,
    ],
    getMedicos);
 
router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'Por favor indica el hospital').not().isEmpty(),
        check('hospital', 'Por favor indica un hospital válido').isMongoId(),
        validarCampos 
    ] , 
    postMedicos);
 
    router.put(
        '/:id', 
        [
           validarJWT,
           check('nombre', 'El nombre del Medico es necesario').not().isEmpty(),
           validarCampos
       ], 
       putMedicos);
 
 router.delete(
         '/:id', 
         [
            validarJWT,
         ] , 
         deleteMedicos);

module.exports = router;