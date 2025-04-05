import express from 'express';
import { uploadFile,} from '../controller/fileController.js';
const router = express.Router();

router.post('/upload', uploadFile); // No multer needed


export default router;
