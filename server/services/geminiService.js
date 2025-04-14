import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askGemini = async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Something went wrong with Gemini" });
  }
};
