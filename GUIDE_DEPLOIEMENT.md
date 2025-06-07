# Guide de déploiement permanent du Gestionnaire de Vidéos

Ce guide vous explique pas à pas comment déployer de façon permanente votre gestionnaire de vidéos sur Render, un service d'hébergement gratuit compatible avec Node.js.

## Prérequis

- Un compte GitHub (gratuit) : [Créer un compte](https://github.com/signup)
- Un compte Render (gratuit) : [Créer un compte](https://render.com/register)
- Les fichiers du package fourni

## Étape 1 : Créer un dépôt GitHub

1. Connectez-vous à votre compte GitHub
2. Cliquez sur le bouton "+" en haut à droite, puis "New repository"
3. Nommez votre dépôt (par exemple "video-manager-backend")
4. Choisissez "Public" ou "Private" selon votre préférence
5. Cliquez sur "Create repository"

## Étape 2 : Téléverser les fichiers sur GitHub

### Option 1 : Via l'interface web (la plus simple)

1. Dans votre nouveau dépôt, cliquez sur "uploading an existing file"
2. Sélectionnez tous les fichiers du package fourni et déposez-les
3. Cliquez sur "Commit changes"

### Option 2 : Via Git en ligne de commande (pour utilisateurs avancés)

```bash
git clone https://github.com/VOTRE_NOM/video-manager-backend.git
cd video-manager-backend
# Copiez tous les fichiers du package dans ce dossier
git add .
git commit -m "Initial commit"
git push origin main
```

## Étape 3 : Déployer sur Render

1. Connectez-vous à votre compte Render
2. Cliquez sur "New +" puis sélectionnez "Web Service"
3. Connectez votre compte GitHub si ce n'est pas déjà fait
4. Sélectionnez le dépôt que vous venez de créer
5. Configurez le service :
   - **Nom** : video-manager-backend (ou un nom de votre choix)
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `node server.js`
6. Dans la section "Environment", ajoutez ces variables :
   - `PORT` : 10000
   - `JWT_SECRET` : video_manager_secret_key_production
   - `ADMIN_PASSWORD` : admin
   - `NODE_ENV` : production
7. Cliquez sur "Create Web Service"

## Étape 4 : Mettre à jour le frontend

Une fois le déploiement terminé, Render vous fournira une URL pour votre service (par exemple https://video-manager-backend.onrender.com).

Pour mettre à jour le frontend afin qu'il utilise ce backend permanent :

1. Ouvrez le fichier `index.html` du frontend
2. Remplacez toutes les occurrences de l'URL temporaire par votre nouvelle URL Render
3. Redéployez le frontend sur Manus ou utilisez directement l'URL Render

## Étape 5 : Vérifier le fonctionnement

1. Accédez à votre frontend
2. Vérifiez que vous pouvez voir les vidéos existantes
3. Testez l'authentification admin avec le mot de passe "admin"
4. Testez l'ajout et la modification de vidéos

## Remarques importantes

- Le plan gratuit de Render offre 750 heures d'exécution par mois
- Les services gratuits peuvent être mis en veille après 15 minutes d'inactivité, mais se réveillent automatiquement lors d'une nouvelle requête
- La base de données SQLite est stockée dans le système de fichiers de Render

## Support

Si vous rencontrez des difficultés lors du déploiement, n'hésitez pas à consulter :
- [Documentation Render](https://render.com/docs)
- [Documentation GitHub](https://docs.github.com/en)

Ou à me contacter pour obtenir de l'aide supplémentaire.
