import express from 'express';
import {
  createTask,
  assignTask,
  updateCurrentHolder,
  getMyTasks,
  getAllTasks,
  updateTaskStatus,
} from '../controller/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isManager } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Create a task (Any authenticated user)
router.post('/create', protect, createTask);

// Assign task (Manager only)
router.put('/assign', protect, isManager, assignTask);

// Update current holder of a task (Manager or owner — role logic can be extended)
router.put('/holder', protect, isManager, updateCurrentHolder);

// Get tasks assigned to the current user
router.get('/my-tasks', protect, getMyTasks);

// Manager gets all tasks
router.get('/all', protect, isManager, getAllTasks);

router.patch('/:taskId/status', protect, updateTaskStatus);

export default router;
