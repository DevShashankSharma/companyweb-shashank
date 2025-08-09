const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    category: { type: String, required: true },
    image: { type: String, default: "" },
    name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Partner", partnerSchema); 
