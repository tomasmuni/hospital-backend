const { Router } = require('express');
const upload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const uploads = require('../controllers/uploads');


const router = Router();
router.use(upload());

router.put('/:tipo/:id',validarJWT, uploads.fileUpload);
router.get('/:tipo/:id', uploads.getImagen);


module.exports = router;