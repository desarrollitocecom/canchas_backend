const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const crypto = require("crypto");
const { Usuario } = require("../db_connection");
const { Op } = require("sequelize");

const argon2Options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 4,
};

// Controlador para iniciar sesión
const loginController = async (correo, contraseña) => {
    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) throw new Error("Usuario no encontrado");
        if (!usuario.contraseña) throw new Error("El usuario no tiene contraseña configurada");

        const validPassword = await argon2.verify(usuario.contraseña, contraseña);
        if (!validPassword) throw new Error("Credenciales incorrectas");

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { success: true, token };
    } catch (error) {
        console.error("Error en loginController:", error.message);
        return { success: false, message: error.message };
    }
};

// Controlador para registrar un usuario
const createUser = async ({ dni, correo, contraseña, nombres, apellidos, telefono, ip }) => {
    try {
        const hashedPassword = await argon2.hash(contraseña, argon2Options);
        const usuario = await Usuario.create({
            dni,
            correo,
            contraseña: hashedPassword,
            nombres,
            apellidos,
            telefono,
            ip,
        });
        return { success: true, usuario };
    } catch (error) {
        console.error("Error en createUser:", error.message);
        return { success: false, message: "Error al registrar el usuario." };
    }
};

// Controlador para solicitar restablecimiento de contraseña
const requestPasswordReset = async (correo) => {
    try {
        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) throw new Error("Usuario no encontrado para restablecimiento de contraseña.");

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await argon2.hash(resetToken, argon2Options);

        usuario.resetToken = hashedToken;
        usuario.resetTokenExpires = new Date(Date.now() + 3600000);
        await usuario.save();

        return { success: true, resetToken };
    } catch (error) {
        console.error("Error en requestPasswordReset:", error.message);
        return { success: false, message: error.message };
    }
};

// Controlador para restablecer la contraseña
const resetPassword = async (token, nuevaContraseña) => {
    try {
        const usuario = await Usuario.findOne({
            where: { resetTokenExpires: { [Op.gt]: new Date() } },
        });

        if (!usuario || !(await argon2.verify(usuario.resetToken, token))) {
            throw new Error("Token inválido o expirado");
        }

        const hashedPassword = await argon2.hash(nuevaContraseña, argon2Options);
        usuario.contraseña = hashedPassword;
        usuario.resetToken = null;
        usuario.resetTokenExpires = null;

        await usuario.save();
        return { success: true, message: "Contraseña actualizada correctamente" };
    } catch (error) {
        console.error("Error en resetPassword:", error.message);
        return { success: false, message: error.message };
    }
};

module.exports = {
    loginController,
    createUser,
    requestPasswordReset,
    resetPassword,
};
