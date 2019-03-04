const jwt = require("jsonwebtoken");

let verificarToken = (req, res, next) => {
  let token = req.get("Authorization");

  jwt.verify(token, "secret", (err, decoded) => {

    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }
    req.usuariobd = decoded.usuariobd;//guardo el usuario en req.usuario, decoded.usuariobd viene desde el token

    next();
  });
};

module.exports = {
  verificarToken
};
