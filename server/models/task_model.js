// models/taskModel.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
<<<<<<< HEAD
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
=======
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  deadline: Number,
  currentPhase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phase'
  },  
  currentHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
>>>>>>> 92b5f8c084e372250438c44cc22b49363cb4cb05
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
