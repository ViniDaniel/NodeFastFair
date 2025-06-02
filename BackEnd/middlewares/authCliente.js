const jwt = require("jsonwebtoken");

function authCliente(req, res, next) {
  const authHearder = req.headers.authorization;

  if (!authHearder || !authHearder.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido." });
  }
  
  const token = authHearder.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.cliente = { id: payload.id };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Token inválido ou expirado!" });
  }
}

module.exports = authCliente;

