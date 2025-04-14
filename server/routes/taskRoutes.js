import express from 'express';
import {
  createTask,
  assignTask,
  updateCurrentHolder,
  getMyTasks,
  getAllTasks,
  uploadTaskFile,
  getTaskFiles,
  updateTaskFile,
  deleteTaskFile,
} from '../controller/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isManager } from '../middlewares/roleMiddleware.js';
import { upload } from '../config/cloudinaryConfig.js';

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

// Upload task files (Any authenticated user)
router.post('/:taskId/upload', protect, upload.array('files', 5), uploadTaskFile);

// Get task by ID (Any authenticated user)
router.get('/:taskId/files', protect, getTaskFiles);

// Get task by ID (Any authenticated user)
router.put('/:taskId/files/:fileId', protect, upload.single('file'), updateTaskFile);

// Delete task file (Any authenticated user)
router.delete('/:taskId/files/:fileId', protect, deleteTaskFile);


export default router;
