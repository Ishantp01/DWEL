import express from "express";
import { askGemini } from "../controller/geminiController.js";

const router = express.Router();

// POST /api/gemini
router.post("/", askGemini);

export default router;
