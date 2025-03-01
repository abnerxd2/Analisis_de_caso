import argon2 from "argon2";
import { generateJWT } from "../helpers/generate-jwt.js";
import User from "../auth/auth.model.js";
import { hash } from "argon2";

const createAdmin = async () => {
    try {
  
      const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
  
      if (adminExists) {
        console.log("El superadmin ya existe, no es necesario crearlo.");
        return;
      }
  
      const hashedPassword = await hash("ADMIN@123");
  
      const superAdmin = new User({
        name: "Super Admin",
        email: "superadmin@correo.com",
        surname: "superadmin",
        password: hashedPassword,
        role: "ADMIN_ROLE"
      });
  
      await superAdmin.save();
      console.log("Superadmin creado correctamente.");
    } catch (error) {
      console.error("Error al verificar o crear el superadmin:", error.message);
    }
  };
  
  export default createAdmin;


export const login = async (req, res) => {
    const { email, username, password } = req.body;     

    try {
        console.log("Buscando usuario...");
        const user = await User.findOne({ 
            $or: [{ email: email }, { username: username }] 
        });

        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "No existe el usuario o correo ingresado"
            });
        }

        console.log("Usuario encontrado:", user);

        console.log("Verificando contraseña...");
        const validPassword = await argon2.verify(user.password, password);
        console.log("Contraseña válida:", validPassword);

        if (!validPassword) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        console.log("Generando token...");
        const token = await generateJWT(user);
        console.log("Token generado:", token);

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        });

    } catch (err) {
        console.error("Error en login:", err);
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};





