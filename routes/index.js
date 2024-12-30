const { Router } = require("express");
const router = Router();

/*
const funcionRutas = require("./funcionRutas");
const sexoRutas = require('./sexoRutas');

// Usa prefijos para organizar las rutas

router.use('/funciones', funcionRutas);
router.use('/sexos', sexoRutas);
*/
const usuariosRouter = require("./usuarioRouter");

router.use('/users', usuariosRouter);


module.exports = router;