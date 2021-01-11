const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const hospitales = require('../controllers/hopitales')


const router = Router();

router.get('/',validarJWT, hospitales.getHospitales);
router.post('/',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    hospitales.createHospital
);
router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    hospitales.updateHospital);

    
router.delete('/:id',validarJWT,hospitales.deleteHospital);

module.exports = router;