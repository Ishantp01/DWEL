import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askGeminiFromAllTxt = async (req, res) => {
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    const txtFiles = fs.readdirSync(uploadsDir).filter(file => path.extname(file) === '.txt');

    if (txtFiles.length === 0) {
      return res.status(404).json({ error: 'No .txt files found in uploads folder.' });
    }

    let combinedText = '';
    for (const file of txtFiles) {
      const filePath = path.join(uploadsDir, file);
      const fileText = fs.readFileSync(filePath, 'utf-8');
      combinedText += `\n--- ${file} ---\n${fileText}\n`;
    }

    const prompt = req.body.prompt;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    const finalPrompt = `${combinedText}\n\nUser question: ${prompt}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash'});

    const response = await model.generateContent({
      contents: [
        {
          parts: [{ text: finalPrompt }]
        }
      ]
    });

    const text = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ answer: text });
  } catch (error) {
    console.error('Gemini error:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to get answer from Gemini' });
  }
};
