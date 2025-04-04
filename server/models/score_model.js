const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: Number,
  reason: String
});

module.exports = mongoose.model('Score', scoreSchema);
