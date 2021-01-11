const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const auth = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    auth.login);

    router.post('/google',
    [
        check('token','El token es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    auth.googleSignIn);

    router.get('/renew',
        validarJWT,
        auth.renewToken
    );

module.exports = router;