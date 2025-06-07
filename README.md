# Gestionnaire de Vidéos - Backend

Ce dépôt contient le backend Node.js pour le gestionnaire de vidéos, permettant la persistance des vidéos entre différents navigateurs.

## Structure du projet

- `server.js` : Point d'entrée de l'application
- `controllers/` : Contrôleurs pour la gestion des vidéos et de l'authentification
- `middleware/` : Middleware d'authentification JWT
- `models/` : Modèles de données et connexion à la base de données SQLite
- `routes/` : Routes API pour les vidéos et l'authentification
- `data/` : Dossier contenant la base de données SQLite

## Variables d'environnement

- `PORT` : Port sur lequel le serveur écoute (par défaut: 10000)
- `JWT_SECRET` : Clé secrète pour la génération des tokens JWT
- `ADMIN_PASSWORD` : Mot de passe administrateur (par défaut: "admini")
- `NODE_ENV` : Environnement d'exécution (production/development)

## API Endpoints

### Vidéos
- `GET /api/videos` - Récupérer toutes les vidéos
- `GET /api/videos/:position` - Récupérer une vidéo spécifique
- `POST /api/videos` - Ajouter/mettre à jour une vidéo (authentification requise)
- `DELETE /api/videos/:position` - Supprimer une vidéo (authentification requise)

### Authentification
- `POST /api/auth/login` - Vérifier le mot de passe admin
- `GET /api/auth/verify` - Vérifier si le token est valide

## Déploiement sur Render

Ce projet est configuré pour être déployé sur Render via le fichier `render.yaml`.
