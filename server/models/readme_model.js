const mongoose = require('mongoose');

const readmeSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Readme', readmeSchema);
