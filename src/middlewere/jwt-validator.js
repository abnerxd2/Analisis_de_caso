import jwt from "jsonwebtoken"
import User from "../auth/auth.model.js"
export const validateJWT = async (req, res, next) => {
    try {
        let token = req.body.token || req.query.token || req.headers["authorization"];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No se proporcionó un token en la petición",
            });
        }


        token = token.replace(/^Bearer\s+/, "");


        const decoded = jwt.verify(token, process.env.SECRETKEY);
        const { uid } = decoded;


        const user = await User.findById(uid);

        if (user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no existe en la DB",
            });
        }


        if (!user.status) {
            return res.status(403).json({
                success: false,
                message: "Usuario fue desactivado previamente",
            });
        }


        req.usuario = user;
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Token inválido",
                error: err.message,
            });
        }
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token expirado",
                error: err.message,
            });
        }
        // Si hay otros errores (por ejemplo, problemas con la base de datos)
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message,
        });
    }
};