# Documentation du Gestionnaire de Vidéos - Mise à jour

## Solution actuelle

Nous avons déployé avec succès le gestionnaire de vidéos avec une solution hybride qui permet la persistance des vidéos entre différents navigateurs :

- **Frontend** : Déployé de façon permanente sur Manus à l'adresse https://cttknsft.manus.space
- **Backend** : Exposé temporairement via un port public à l'adresse https://3000-i2uz6zubz0oy7z2e543ri-a3bb682c.manusvm.computer

Cette solution fonctionne parfaitement et offre toutes les fonctionnalités demandées :
- Affichage de 4 vidéos intégrées (iframe/embed)
- Interface publique pour visualiser les vidéos
- Interface d'administration protégée par mot de passe ("admini")
- Persistance des vidéos entre différents navigateurs et appareils
- Design responsive s'adaptant à tous les écrans

## Limitations importantes

Il est essentiel de comprendre que cette solution présente une limitation majeure :

**L'URL du backend est temporaire et expirera après un certain temps d'inactivité.**

Cela signifie que les vidéos ne seront plus accessibles lorsque l'URL du backend expirera, généralement après quelques heures d'inactivité.

## Options pour une solution permanente

Pour obtenir une solution véritablement permanente, nous avons deux options :

### Option 1 : Redémarrer régulièrement le backend

Vous pouvez réactiver le backend en utilisant la commande suivante dans l'environnement Manus :

```bash
cd /home/ubuntu/video_manager_backend && node src/server.js &
```

Puis exposer le port avec :

```
deploy_expose_port 3000
```

Cette opération devra être répétée chaque fois que le backend expire.

### Option 2 : Déployer le backend sur un service d'hébergement externe

Pour une solution véritablement permanente, nous recommandons de déployer le backend sur un service d'hébergement compatible avec Node.js comme Render, Railway ou Heroku.

Nous avons préparé un package complet dans le dossier `/home/ubuntu/video_manager_backend/render_deploy` qui contient tous les fichiers nécessaires pour un déploiement sur Render.

#### Instructions pour le déploiement sur Render :

1. Créer un compte sur [Render](https://render.com)
2. Créer un nouveau Web Service
3. Connecter à un dépôt Git contenant les fichiers du dossier `render_deploy`
4. Configurer les variables d'environnement :
   - `PORT` : 10000
   - `JWT_SECRET` : video_manager_secret_key_production
   - `ADMIN_PASSWORD` : admini
   - `NODE_ENV` : production
5. Déployer le service
6. Une fois déployé, modifier le frontend pour pointer vers la nouvelle URL du backend

## Mode d'emploi

### Mode public (visualisation)
- Accédez à l'URL du frontend : https://cttknsft.manus.space
- Les vidéos sont immédiatement visibles pour tous les utilisateurs

### Mode administrateur (édition)
1. Cliquez sur le bouton "Administration" en bas à droite de l'écran
2. Entrez le mot de passe : `admini`
3. Cliquez sur "Se connecter"

### Ajouter ou modifier une vidéo
1. Connectez-vous en mode administrateur
2. Collez le code d'intégration (iframe) dans le champ texte sous la vidéo
3. Cliquez sur "Valider" pour sauvegarder
4. La vidéo est immédiatement visible pour tous les utilisateurs

### Quitter le mode administrateur
- Appuyez sur la touche "Échap" de votre clavier
- Ou fermez simplement le navigateur

## Support et maintenance

Pour toute question ou assistance supplémentaire concernant cette solution, n'hésitez pas à nous contacter.
