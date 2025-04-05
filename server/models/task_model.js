// models/taskModel.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  files: [
    {
      url: { type: String },
      public_id: { type: String },
    }
  ],
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
