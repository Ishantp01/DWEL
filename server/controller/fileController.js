import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import File from '../models/file_model.js';

export const uploadFile = (req, res) => {
  const form = formidable({ multiples: false, uploadDir: './uploads', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(400).json({ error: 'Error uploading file' });
    }

    const uploadedFile = files.file;

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = path.extname(uploadedFile.originalFilename).toLowerCase();
    const allowedTypes = ['.txt', '.doc', '.docx'];

    if (!allowedTypes.includes(ext)) {
      fs.unlinkSync(uploadedFile.filepath); // delete unwanted file
      return res.status(400).json({ error: 'Only .txt, .doc, and .docx files are allowed' });
    }

    try {
      const { taskId, phase } = fields;

      const newFile = await File.create({
        fileName: uploadedFile.originalFilename,
        uploader: req.user._id,
        taskId,
        phase,
        filePath: uploadedFile.filepath,
        fileType: ext,
      });

      res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (e) {
      console.error('Error saving file to DB:', e);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
