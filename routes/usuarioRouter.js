const { Router } = require('express');
const router = Router();
const{loginHandler,createUserHandler,requestPasswordResetHandler, resetPasswordHandler}= require("../handlers/usuarioHandler")

router.post("/login", loginHandler);
router.post("/register", createUserHandler);
router.post("/password-reset/request", requestPasswordResetHandler);
router.post("/password-reset/reset/:token", resetPasswordHandler);


module.exports = router;