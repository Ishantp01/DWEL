// models/phaseModel.js
import mongoose from 'mongoose';

const phaseSchema = new mongoose.Schema({
  phaseName: {
    type: String,
    enum: ['Requirement', 'Design', 'Implementation', 'Validation', 'Deployment'],
    required: true
  },
  notes: String,
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // All tasks under this phase
}, { timestamps: true });

const Phase = mongoose.model('Phase', phaseSchema);