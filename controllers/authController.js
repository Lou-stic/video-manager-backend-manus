const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Mot de passe admin par défaut (à remplacer par une variable d'environnement en production)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admini';
const JWT_SECRET = process.env.JWT_SECRET || 'video_manager_secret_key';

// Vérifier le mot de passe et générer un token JWT
const login = (req, res) => {
  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'Mot de passe requis' });
  }
  
  if (password === ADMIN_PASSWORD) {
    // Générer un token JWT valide pendant 24 heures
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      success: true,
      message: 'Authentification réussie',
      token
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Mot de passe incorrect'
    });
  }
};

// Vérifier si le token est valide
const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Token non fourni' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      success: true,
      message: 'Token valide',
      user: decoded
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token invalide ou expiré'
    });
  }
};

module.exports = {
  login,
  verifyToken
};
