import express from 'express';
import { registerUser, loginUser, getProfile } from '../controller/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User registration (Only managers should access this)
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get profile
router.get('/profile', protect, getProfile);

export default router;
