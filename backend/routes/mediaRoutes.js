const express = require('express');
const router = express.Router();
const {
    createMedia,
    getAllMedia,
    updateMedia,
    deleteMedia
} = require('../controllers/mediaController');

// Routes
router.post('/', createMedia);
router.get('/', getAllMedia);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
