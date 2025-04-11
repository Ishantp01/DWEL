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
// utils/askGeminiFromAllTxt.js
import fs from 'fs';
import path from 'path';



export const runGeminiOnAllTxtFiles = async () => {
  try {
    const files = fs.readdirSync('./uploads');
    const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');

    if (txtFiles.length === 0) return "No .txt files found to process.";

    let fullText = '';
    for (const file of txtFiles) {
      const filePath = path.join('./uploads', file);
      const content = fs.readFileSync(filePath, 'utf-8');
      fullText += `\n\n--- ${file} ---\n${content}`;
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(fullText);
    const response = await result.response;
    const text = await response.text();

    return text;
  } catch (error) {
    console.error('Gemini error:', error);
    return 'Failed to get response from Gemini';
  }
};
