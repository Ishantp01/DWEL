// utils/localMulter.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.txt', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .txt and .doc/.docx files are allowed'), false);
  }
};

export const uploadLocal = multer({ storage, fileFilter });
export const uploadLocalSingle = uploadLocal.single('file');
export const uploadLocalMultiple = uploadLocal.array('files', 10); // Limit to 10 files