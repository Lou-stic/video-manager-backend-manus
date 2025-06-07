const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'video_manager_secret_key';

// Middleware pour vérifier l'authentification
const authenticateToken = (req, res, next) => {
  // Récupérer le token du header Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Accès refusé. Token non fourni.' 
    });
  }
  
  try {
    // Vérifier le token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false,
      message: 'Token invalide ou expiré' 
    });
  }
};

module.exports = {
  authenticateToken
};
