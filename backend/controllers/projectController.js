// controllers/categoryController.js
const ProjectCategory = require('../models/ProjectCategory');
const Project = require('../models/Project');

const createProjectCategory = async (req, res) => {
    try {
        const { title, description, image, category } = req.body;

        if (!title || !description || !image || !category) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newProjectCategory = new ProjectCategory({
            title,
            description,
            image, // cloudinary URL
            category,
        });

        // console.log("New Project Category:", newProjectCategory);

        await newProjectCategory.save();
        return res.status(201).json({ success: true, message: 'Project category created successfully' });
    } catch (error) {
        console.error('Error creating project category:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get All Categories
const getAllProjectCategories = async (req, res) => {
    try {
        const categories = await ProjectCategory.find({});
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch categories', error });
    }
};

// Update Category
const updateProjectCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, category } = req.body;

        console.log("Updating Project Category:", { id, title, description, image, category });
        const updatedProjectCategory = await ProjectCategory.findByIdAndUpdate(
            id,
            { title, description, image, category },
            { new: true }
        );

        if (!updatedProjectCategory) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Update failed', error });
        console.error('Error updating project category:', error);
    }
};

// Delete Category
const deleteProjectCategory = async (req, res) => {
    try {
        const { id } = req.params;


        const deleted = await ProjectCategory.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Delete failed', error });
    }
};



// Create Project
const createProject = async (req, res) => {
    const { title, objective, goals, image, category } = req.body;

    if (!title || !objective || !goals || !image || !category) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({ success: true, message: 'Project created successfully'});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Project
const updateProject = async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({ success: true, message: "Project updated successfully", });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch Projects (optional filter by category)
const getProjects = async (req, res) => {
    try {
        const { category } = req.query; // ?category=Data Science & Machine Learning
        const filter = category ? { category } : {};
        // console.log(category)
        const projects = await Project.find(filter).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createProjectCategory,
    getAllProjectCategories,
    updateProjectCategory,
    deleteProjectCategory,
    createProject,
    updateProject,
    deleteProject,
    getProjects
};