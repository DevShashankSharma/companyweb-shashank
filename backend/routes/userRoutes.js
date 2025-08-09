const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser, 
  verifyAdminSecurity,
  getUserData,
  checkAdmin
} = require('../controllers/userController');

// Register new user
router.post('/register', registerUser);

// Login user or admin (same endpoint)
router.post('/login', loginUser);

// Get admin secretKey, favoriteColor, and adminPIN
router.post('/admin/security', verifyAdminSecurity);

// Get basic user info
router.get('/:id', getUserData);

// check if user is admin
router.post('/check-admin', checkAdmin);

module.exports = router;
