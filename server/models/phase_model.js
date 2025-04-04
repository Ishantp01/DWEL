const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  phaseName: { type: String, enum: ['Requirement', 'Design', 'Implementation', 'Validation', 'Deployment'] },
  notes: String,
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
  completed: Boolean,
  completedAt: Date
});

module.exports = mongoose.model('Phase', phaseSchema);
