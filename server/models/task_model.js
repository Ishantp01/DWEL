const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Todo', 'InProgress', 'Done'], default: 'Todo' },
  currentPhase: { type: String, enum: ['Requirement', 'Design', 'Implementation', 'Validation', 'Deployment'] },
  complexity: Number,
  deadline: Date,
  phases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Phase' }],
  readmeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Readme' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
