const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Importer les routes
const videoController = require('./controllers/videoController');
const authController = require('./controllers/authController');

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.use('/api/videos', videoController);
app.use('/api/auth', authController);

// Route de test API (optionnelle)
app.get('/api', (req, res) => {
  res.json({ message: 'API Gestionnaire de Vidéos - Backend fonctionnel' });
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
