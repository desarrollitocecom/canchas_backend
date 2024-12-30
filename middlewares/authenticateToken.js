const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

// Define las rutas públicas que no requieren autenticación
const publicRoutes = [
    { method: "POST", path: "/users/login" },
    { method: "POST", path: "/users/register" },
    { method: "POST", path: "/users/password-reset/request" },
    { method: "POST", path: "/users/password-reset/reset" },
];

const authenticateToken = (req, res, next) => {
    // Verifica si la ruta actual es pública
    const isPublicRoute = publicRoutes.some(
        (route) => route.method === req.method && req.path.startsWith(route.path)
    );

    if (isPublicRoute) {
        return next(); // Permitir el acceso sin autenticación
    }

    // Validación del token para rutas protegidas
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }

        req.user = user; // Adjunta la información del usuario al objeto `req`
        next();
    });
};

module.exports = { authenticateToken };
