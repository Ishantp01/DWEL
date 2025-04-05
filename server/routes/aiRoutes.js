import express from 'express';
import { askGeminiAboutTask } from '../controller/aiController.js';
const router = express.Router();

router.get('/ask-gemini/:taskId', askGeminiAboutTask);

export default router;
