const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail", // Cambiar si usas otro proveedor
    auth: {
        user: process.env.EMAIL_USER, // Correo electrónico
        pass: process.env.EMAIL_PASSWORD, // Contraseña o clave de aplicación
    },
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Remitente
            to, // Destinatario
            subject, // Asunto del correo
            text, // Contenido del correo
        });
        console.log(`Correo enviado a: ${to}`);
        return info;
    } catch (error) {
        console.error("Error al enviar correo:", error.message);
        throw new Error("No se pudo enviar el correo");
    }
};

module.exports = { sendEmail };
