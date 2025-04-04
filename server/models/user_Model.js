const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['Client', 'Developer', 'Designer', 'QA', 'Admin'] },
  skills: [String],
  avgCompletionTime: Number,
  rating: Number,
  assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('User', userSchema);
