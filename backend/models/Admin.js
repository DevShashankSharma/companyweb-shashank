const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true, // ensures no duplicate usernames
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8 // minimum length for password
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/, // ensures phone number is 10 digits 
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    secretKey: {
        type: String,
        required: true
    },
    favoriteColor: {
        type: String,
        required: true
    },
    adminPIN: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
