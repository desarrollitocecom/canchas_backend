const { loginController, createUser, requestPasswordReset, resetPassword } = require("../controllers/usuarioController");
const { sendEmail } = require("../utils/emailSender");

const loginHandler = async (req, res) => {
    const errores = [];
    const { correo, contraseña } = req.body;

    if (!correo) errores.push("El correo es requerido.");
    if (!contraseña) errores.push("La contraseña es requerida.");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const response = await loginController(correo, contraseña);
        if (!response.success) {
            if (response.message === "Usuario no encontrado") {
                return res.status(404).json({ errores: ["El usuario no existe."] });
            }
            if (response.message === "Credenciales incorrectas") {
                return res.status(401).json({ errores: ["Correo o contraseña incorrectos."] });
            }
            return res.status(400).json({ errores: [response.message] });
        }
        return res.status(200).json({ message: "Inicio de sesión exitoso", token: response.token });
    } catch (error) {
        console.error("Error en loginHandler:", error);
        return res.status(500).json({ errores: ["Error interno del servidor al iniciar sesión."] });
    }
};

const createUserHandler = async (req, res) => {
    const errores = [];
    const { dni, correo, contraseña, nombres, apellidos, telefono } = req.body;

    if (!dni) errores.push("El DNI es requerido.");
    if (!correo) errores.push("El correo es requerido.");
    if (!contraseña) errores.push("La contraseña es requerida.");
    if (!nombres) errores.push("El nombre es requerido.");
    if (!apellidos) errores.push("El apellido es requerido.");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const ip = req.headers["x-forwarded-for"] || req.ip;
        const response = await createUser({ dni, correo, contraseña, nombres, apellidos, telefono, ip });

        if (!response.success) {
            return res.status(400).json({ errores: [response.message] });
        }

        return res.status(201).json({ message: "Usuario creado exitosamente.", data: response.usuario });
    } catch (error) {
        console.error("Error en createUserHandler:", error);
        return res.status(500).json({ errores: ["Error interno del servidor al crear usuario."] });
    }
};


const requestPasswordResetHandler = async (req, res) => {
    const errores = [];
    const { correo } = req.body;

    if (!correo) errores.push("El correo es requerido.");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const response = await requestPasswordReset(correo);

        if (!response.success) {
            return res.status(404).json({ errores: [response.message] });
        }

        const resetLink = `http://localhost:3004/users/password-reset/reset/${response.resetToken}`;
        await sendEmail(correo, "Restablecimiento de Contraseña", `Hola, para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`);

        return res.status(200).json({ message: "Si el correo está registrado, recibirás un enlace de recuperación." });
    } catch (error) {
        console.error("Error en requestPasswordResetHandler:", error);
        return res.status(500).json({ errores: ["Error interno del servidor al solicitar restablecimiento de contraseña."] });
    }
};

const resetPasswordHandler = async (req, res) => {
    const errores = [];
    const { token } = req.params;
    const { nuevaContraseña } = req.body;

    if (!token) errores.push("El token es requerido.");
    if (!nuevaContraseña) errores.push("La nueva contraseña es requerida.");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const response = await resetPassword(token, nuevaContraseña);

        if (!response.success) {
            return res.status(400).json({ errores: [response.message] });
        }

        return res.status(200).json({ message: response.message });
    } catch (error) {
        console.error("Error en resetPasswordHandler:", error);
        return res.status(500).json({ errores: ["Error interno del servidor al restablecer la contraseña."] });
    }
};

module.exports = {
    loginHandler,
    createUserHandler,
    requestPasswordResetHandler,
    resetPasswordHandler,
};
