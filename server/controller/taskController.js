import Task from '../models/task_model.js';
import User from '../models/user_Model.js';

// Create a new task (accessible by any user)
export const createTask = async (req, res) => {
  try {
    const { title, description ,deadline} = req.body;

    const task = await Task.create({
      title,
      description,
      deadline,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: 'Task created', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Assign a task to a user (Manager only)
export const assignTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    task.assignedTo = userId;
    task.currentHolder = userId;
    await task.save();

    res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (error) {
    console.error('Error assigning task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update current holder of task (Manager or original assignee)
export const updateCurrentHolder = async (req, res) => {
  try {
    const { taskId, newHolderId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const newHolder = await User.findById(newHolderId);
    if (!newHolder) return res.status(404).json({ error: 'User not found' });

    task.currentHolder = newHolderId;
    await task.save();

    res.status(200).json({ message: 'Current holder updated', task });
  } catch (error) {
    console.error('Error updating holder:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get tasks for the logged-in user
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Manager: Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('createdBy assignedTo currentHolder', 'name email role');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

<<<<<<< HEAD
export const uploadTaskFile = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No files uploaded' });

    const uploadedFiles = req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
    }));

    task.files.push(...uploadedFiles);
    await task.save();

    res.status(200).json({
      message: 'Files uploaded successfully',
      files: task.files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTaskFiles = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({
      files: task.files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTaskFile = async (req, res) => {
  try {
    const { taskId, fileId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const fileIndex = task.files.findIndex(file => file.public_id === fileId);
    if (fileIndex === -1) return res.status(404).json({ message: 'File not found' });

    // Delete old file from cloudinary
    await cloudinary.uploader.destroy(task.files[fileIndex].public_id);

    // Upload new file
    const newFile = req.file;
    if (!newFile) return res.status(400).json({ message: 'No new file uploaded' });

    task.files[fileIndex] = {
      url: newFile.path,
      public_id: newFile.filename,
    };

    await task.save();

    res.status(200).json({
      message: 'File updated successfully',
      files: task.files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTaskFile = async (req, res) => {
  try {
    const { taskId, fileId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const fileIndex = task.files.findIndex(file => file.public_id === fileId);
    if (fileIndex === -1) return res.status(404).json({ message: 'File not found' });

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(task.files[fileIndex].public_id);

    // Remove file from task.files array
    task.files.splice(fileIndex, 1);
    await task.save();

    res.status(200).json({
      message: 'File deleted successfully',
      files: task.files,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
=======
export const updateTaskStatus = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
  
      if (!['pending', 'in-progress', 'completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
      }
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found.' });
      }
  
      // Only the assigned user can update status
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not allowed to update this task.' });
      }
  
      task.status = status;
      await task.save();
  
      res.status(200).json({ message: 'Task status updated.', task });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error.' });
    }
  };
>>>>>>> 92b5f8c084e372250438c44cc22b49363cb4cb05
