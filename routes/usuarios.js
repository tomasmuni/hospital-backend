const { Router } = require('express');
const usuarios = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',validarJWT, usuarios.getUsuarios);
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
    ],
    validarCampos,
    usuarios.setUsuarios
);
router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('role','El role es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
    ],
    validarCampos,
    usuarios.updateUsuarios);
router.delete('/:id',validarJWT, ,usuarios.deleteUsuario);

module.exports = router;