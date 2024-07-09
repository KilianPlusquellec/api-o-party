import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // si il n'y a pas de token, renvoyer une erreur 401

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // si le token est invalide, renvoyer une erreur 403
    req.user = user;
    next(); // passer au prochain middleware
  });
}

export { authenticateToken };
