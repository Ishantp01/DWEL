import express from 'express';
import { registerUser, loginUser, getProfile, updateUserRole } from '../controller/userController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// User registration (Only managers should access this)
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get profile
router.get('/profile', protect, getProfile);

// Update user role (Only managers should access this)
router.put('/update/:id', protect, isAdmin, updateUserRole);



export default router;
