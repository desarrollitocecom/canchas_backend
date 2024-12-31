const { Router } = require('express');
const router = Router();

const { traerToken,respuestadeNuibiz } = require('../handlers/pagoHandler');


router.get('/obtenerToken', traerToken);
router.post('/paginaRespuesta',respuestadeNuibiz)

module.exports = router;