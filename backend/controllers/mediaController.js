const Media = require('../models/Media');

// Create Media
const createMedia = async (req, res) => {
    try {
        const { title, desc, image } = req.body;
        if (!title || !desc || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const media = new Media({ title, desc, image });
        await media.save();
        res.status(201).json({ success: true, message: 'Media created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch All Media
const getAllMedia = async (req, res) => {
    try {
        const mediaList = await Media.find();
        res.status(200).json({mediaList});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Media
const updateMedia = async (req, res) => {
    try {
        const { title, desc, image } = req.body;
        if (!title || !desc || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const updatedMedia = await Media.findByIdAndUpdate(req.params.id, { title, desc, image }, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }
        res.status(200).json({ success: true, message: 'Media updated successfully'});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Media
const deleteMedia = async (req, res) => {
    try {
        const deletedMedia = await Media.findByIdAndDelete(req.params.id);
        if (!deletedMedia) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }
        res.status(200).json({ success: true, message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createMedia,
    getAllMedia,
    updateMedia,
    deleteMedia
};
