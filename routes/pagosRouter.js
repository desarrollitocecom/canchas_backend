const { Router } = require('express');
const router = Router();

const { traerToken } = require('../handlers/pagoHandler');


router.get('/obtenerToken', traerToken);


module.exports = router;