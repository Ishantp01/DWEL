import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import File from '../models/file_model.js';
import { updateGeminiContext } from '../services/geminiHelper.js';

export const uploadFile = (req, res) => {
  const form = formidable({ multiples: false, uploadDir: './uploads', keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(400).json({ error: 'Error uploading file' });
    }
    console.log('Uploaded file:', files)
    const uploadedFile = files.file || Object.values(files)[0];

if (!uploadedFile || !uploadedFile.originalFilename) {
  return res.status(400).json({ error: 'No valid file uploaded' });
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

      // 💡 Send text to Gemini if it's a .txt file
      if (ext === '.txt') {
        const content = fs.readFileSync(uploadedFile.filepath, 'utf-8');
        const geminiResult = await updateGeminiContext(content);
        console.log('Gemini updated:', geminiResult);
      }

      res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (e) {
      console.error('Error saving file to DB:', e);
      res.status(500).json({ error: 'Server error' });
    }
  });
};
