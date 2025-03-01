import jwt from "jsonwebtoken";
export const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: user.id,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.SECRETKEY, 
      { expiresIn: "2h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const validarToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};