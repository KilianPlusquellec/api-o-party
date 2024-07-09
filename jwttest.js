

// GitHub Copilot: Pour utiliser jsonwebtoken dans votre route, vous devez d'abord installer le package jsonwebtoken. Vous pouvez le faire en exécutant `npm install jsonwebtoken` dans votre terminal.

// Ensuite, vous devez créer un middleware pour vérifier le token. Voici un exemple de comment vous pouvez le faire :

// ```javascript
// import jwt from 'jsonwebtoken';

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401); // si il n'y a pas de token, renvoyer une erreur 401

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403); // si le token est invalide, renvoyer une erreur 403
//     req.user = user;
//     next(); // passer au prochain middleware
//   });
// }
// ```

// Maintenant, vous pouvez utiliser ce middleware dans votre route :

// ```javascript
// import { authenticateToken } from './middleware.js'; // assurez-vous que le chemin est correct

// router.get('/user/me', authenticateToken, userController.getMyUser);
// ```

// Dans ce code, `authenticateToken` est un middleware qui vérifie si le token JWT dans l'en-tête d'autorisation de la requête est valide. Si le token est valide, il ajoute l'utilisateur décodé à l'objet de requête et passe au prochain middleware, qui est `userController.getMyUser` dans ce cas. Si le token n'est pas valide, il renvoie une réponse avec un statut d'erreur.


/* ---AUTRE VERSION : Créer une fonction pour générer un JWT-----------

Voici une fonction pour générer un token :

javascript
Copier le code
const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};
payload : Les données que vous voulez inclure dans le JWT (par exemple, l'ID utilisateur).
expiresIn : La durée de validité du token (ex: '1h', '2d', etc.).
Créer une fonction pour vérifier un JWT

Vous aurez également besoin d'une fonction pour vérifier le token reçu :

javascript
Copier le code
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error('Token invalide');
  }
};
----------------−> Exemple complet
Voici un exemple complet pour créer et vérifier un JWT dans un projet Node.js :

Créer un fichier jwt.js
javascript
Copier le code
const jwt = require('jsonwebtoken');

const secretKey = 'votre_clé_secrète';

const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new Error('Token invalide');
  }
};

module.exports = { generateToken, verifyToken };
Utiliser les fonctions dans votre application
Par exemple, dans un fichier app.js ou votre routeur :

javascript
Copier le code
const express = require('express');
const { generateToken, verifyToken } = require('./jwt');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  const user = { id: 1, username: 'exemple' }; // Exemple d'utilisateur, normalement vous vérifieriez les informations d'identification
  const token = generateToken({ userId: user.id });
  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Token manquant');
  }
  try {
    const decoded = verifyToken(token);
    res.json({ message: 'Accès autorisé', userId: decoded.userId });
  } catch (err) {
    res.status(401).send('Token invalide');
  }
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
Explications
Endpoint /login : Simule une connexion et génère un token pour un utilisateur.
Endpoint /protected : Protégé par un JWT, vérifie la validité du token avant de donner accès.