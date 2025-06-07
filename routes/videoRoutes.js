const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Routes publiques
router.get('/', videoController.getAllVideos);
router.get('/:position', videoController.getVideoByPosition);

// Routes protégées (nécessitent authentification)
router.post('/', authenticateToken, videoController.saveVideo);
router.delete('/:position', authenticateToken, videoController.deleteVideo);

module.exports = router;
