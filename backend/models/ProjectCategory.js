// models/Category.js
const mongoose = require('mongoose');

const projectCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true
    },
    image: { 
        type: String, 
        required: true 
    },
    category: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('ProjectCategory', projectCategorySchema);
