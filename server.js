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
  origin: '*', // Permettre toutes les origines pour le développement
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// AJOUT : Servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.use('/api/videos', videoController);
app.use('/api/auth', authController);

// Route de test pour vérifier que le serveur fonctionne
// (Cette route ne gêne pas le fonctionnement du front)
app.get('/', (req, res) => {
  res.json({ message: 'API Gestionnaire de Vidéos - Backend fonctionnel' });
});

// BONUS : Pour que n'importe quelle route (hors /api/...) serve index.html (utile pour le SPA/refresh)
// Décommente si tu veux que toutes les routes renvoient index.html (optionnel)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
