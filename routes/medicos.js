const { Router } = require('express');
const medicos = require('../controllers/medicos');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT, medicos.getMedicos);
router.post('/',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('hospitalId','El id del hospital tiene que ser valido').isMongoId(),
    ],
    validarCampos,
    medicos.createMedico
);
router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('hospital','El role es obligatorio').not().isEmpty(),
    ],
    validarCampos,
    medicos.updateMedico);
    
router.delete('/:id',validarJWT,medicos.deleteMedico);

module.exports = router;