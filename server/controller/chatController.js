import { askGemini } from "../services/geminiService.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await askGemini(message);
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ error: "Something went wrong with Gemini" });
  }
};
