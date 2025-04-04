const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  fileName: String,
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  phase: { type: String },
  filePath: String,
  fileType: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
