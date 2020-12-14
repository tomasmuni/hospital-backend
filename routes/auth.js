const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const auth = require('../controllers/auth');


const router = Router();

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    auth.login);

module.exports = router;