import express from 'express';
import { uploadFile,} from '../controller/fileController.js';
const router = express.Router();

router.post('/upload', uploadFile); // No multer needed
import { askGeminiFromAllTxt } from '../controller/askGeminiFromAllTxt.js';

router.post('/ask-gemini', askGeminiFromAllTxt);



export default router;
