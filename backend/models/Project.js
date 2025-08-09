const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        }, 
        objective: {
            type: String,
            required: true,
        },
        goals: [
            {
                type: String,
                required: true,
            },
        ],
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
