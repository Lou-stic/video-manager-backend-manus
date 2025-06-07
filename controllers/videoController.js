const express = require('express');
const router = express.Router();
const db = require('../models/database');

// Récupérer toutes les vidéos
router.get('/', (req, res) => {
  db.all('SELECT * FROM videos ORDER BY position', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération des vidéos' });
    }
    res.json(rows);
  });
});

// Récupérer une vidéo par position
router.get('/:position', (req, res) => {
  const { position } = req.params;

  db.get('SELECT * FROM videos WHERE position = ?', [position], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erreur lors de la récupération de la vidéo' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Vidéo non trouvée' });
    }

    res.json(row);
  });
});

// Ajouter ou mettre à jour une vidéo
router.post('/', (req, res) => {
  const { position, embed_code } = req.body;

  if (!position || !embed_code) {
    return res.status(400).json({ error: 'Position et code d\'intégration requis' });
  }

  if (position < 1 || position > 4) {
    return res.status(400).json({ error: 'La position doit être entre 1 et 4' });
  }

  // Vérifier si la vidéo existe déjà
  db.get('SELECT * FROM videos WHERE position = ?', [position], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erreur lors de la vérification de la vidéo' });
    }

    if (row) {
      // Mettre à jour la vidéo existante
      db.run(
        'UPDATE videos SET embed_code = ?, updated_at = CURRENT_TIMESTAMP WHERE position = ?',
        [embed_code, position],
        function(err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de la vidéo' });
          }

          res.json({
            id: row.id,
            position,
            embed_code,
            message: 'Vidéo mise à jour avec succès'
          });
        }
      );
    } else {
      // Insérer une nouvelle vidéo
      db.run(
        'INSERT INTO videos (position, embed_code) VALUES (?, ?)',
        [position, embed_code],
        function(err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erreur lors de l\'ajout de la vidéo' });
          }

          res.status(201).json({
            id: this.lastID,
            position,
            embed_code,
            message: 'Vidéo ajoutée avec succès'
          });
        }
      );
    }
  });
});

// Supprimer une vidéo
router.delete('/:position', (req, res) => {
  const { position } = req.params;

  db.run('DELETE FROM videos WHERE position = ?', [position], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Erreur lors de la suppression de la vidéo' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Vidéo non trouvée' });
    }

    res.json({ message: 'Vidéo supprimée avec succès' });
  });
});

module.exports = router;
