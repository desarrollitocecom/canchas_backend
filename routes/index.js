const { Router } = require("express");
const router = Router();


const pagoRutas = require("./pagosRouter");


// Usa prefijos para organizar las rutas

router.use('/pagos', pagoRutas);



module.exports = router;