import express from "express";
import { chatWithBot } from "../controller/chatController.js";
const router = express.Router();

router.post("/chat", chatWithBot);

export default router;
