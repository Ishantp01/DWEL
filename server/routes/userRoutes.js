const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/user.controller');
const { protect } = require('../middlewares/authMiddleware');

// User registration (Only managers should access this)
router.post('/register', protect, registerUser);

// User login
router.post('/login', loginUser);

// Get profile
router.get('/profile', protect, getProfile);

module.exports = router;
