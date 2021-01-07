const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const gsearch = require('../controllers/gsearch')

const router = Router();

router.get('/:busqueda',validarJWT, gsearch.getAllBystr);
router.get('/collection/:tabla/:busqueda',validarJWT, gsearch.getCollectionBystr);

module.exports = router;