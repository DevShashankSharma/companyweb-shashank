// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { createProjectCategory, getAllProjectCategories, updateProjectCategory, deleteProjectCategory, createProject, updateProject, deleteProject, getProjects, } = require('../controllers/projectController');

// POST - Create category
router.post('/category', createProjectCategory);
// GET - Fetch all categories
router.get('/categories', getAllProjectCategories);
// PUT - Update category by ID
router.put('/category/:id', updateProjectCategory);
// DELETE - Delete category by ID
router.delete('/category/:id', deleteProjectCategory);


router.post("/", createProject);
router.get("/", getProjects); // ?category=SomeCategory
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;
