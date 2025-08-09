const express = require('express');
const router = express.Router();
const {
    createTestimonial,
    getAllTestimonials,
    updateTestimonial,
    deleteTestimonial
} = require('../controllers/testimonialController');

router.post('/', createTestimonial);       // Create
router.get('/', getAllTestimonials);       // Fetch all
router.put('/:id', updateTestimonial);    // Update
router.delete('/:id', deleteTestimonial); // Delete

module.exports = router;
