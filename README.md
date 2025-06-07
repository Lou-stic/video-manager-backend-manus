Guide de déploiement permanent du
Gestionnaire de Vidéos
Ce guide vous explique pas à pas comment déployer de façon permanente votre
gestionnaire de vidéos sur Render, un service d'hébergement gratuit compatible avec
Node.js.
Prérequis
• Un compte GitHub (gratuit) : Créer un compte
• Un compte Render (gratuit) : Créer un compte
• Les fichiers du package fourni
Étape 1 : Créer un dépôt GitHub
1. Connectez-vous à votre compte GitHub
2. Cliquez sur le bouton "+" en haut à droite, puis "New repository"
3. Nommez votre dépôt (par exemple "video-manager-backend")
4. Choisissez "Public" ou "Private" selon votre préférence
5. Cliquez sur "Create repository"
Étape 2 : Téléverser les fichiers sur GitHub
Option 1 : Via l'interface web (la plus simple)
1. Dans votre nouveau dépôt, cliquez sur "uploading an existing file"
2. Sélectionnez tous les fichiers du package fourni et déposez-les
3. Cliquez sur "Commit changes"
Option 2 : Via Git en ligne de commande (pour utilisateurs avancés)
git clone https://github.com/VOTRE_NOM/video-manager-backend.git
cd video-manager-backend
# Copiez tous les fichiers du package dans ce dossier
git add .
git commit -m "Initial commit"
git push origin mainÉtape 3 : Déployer sur Render
1. Connectez-vous à votre compte Render
2. Cliquez sur "New +" puis sélectionnez "Web Service"
3. Connectez votre compte GitHub si ce n'est pas déjà fait
4. Sélectionnez le dépôt que vous venez de créer
5. Configurez le service :
6. Nom : video-manager-backend (ou un nom de votre choix)
7. Runtime : Node
8. Build Command : npm install
9. Start Command : node server.js
10. Dans la section "Environment", ajoutez ces variables :
11. PORT : 10000
12. JWT_SECRET : video_manager_secret_key_production
13. ADMIN_PASSWORD : admin
14. NODE_ENV : production
15. Cliquez sur "Create Web Service"
Étape 4 : Mettre à jour le frontend
Une fois le déploiement terminé, Render vous fournira une URL pour votre service (par
exemple https://video-manager-backend.onrender.com).
Pour mettre à jour le frontend afin qu'il utilise ce backend permanent :
1. Ouvrez le fichier index.html du frontend
2. Remplacez toutes les occurrences de l'URL temporaire par votre nouvelle URL
Render
3. Redéployez le frontend sur Manus ou utilisez directement l'URL Render
Étape 5 : Vérifier le fonctionnement
1. Accédez à votre frontend
2. Vérifiez que vous pouvez voir les vidéos existantes
3. Testez l'authentification admin avec le mot de passe "admini"
4. Testez l'ajout et la modification de vidéos
Remarques importantes
• Le plan gratuit de Render offre 750 heures d'exécution par mois• Les services gratuits peuvent être mis en veille après 15 minutes d'inactivité, mais
se réveillent automatiquement lors d'une nouvelle requête
• La base de données SQLite est stockée dans le système de fichiers de Render
Support
Si vous rencontrez des difficultés lors du déploiement, n'hésitez pas à consulter :
- Documentation Render
- Documentation GitHub
Ou à me contacter pour obtenir de l'aide supplémentaire.
