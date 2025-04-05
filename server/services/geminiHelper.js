import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const updateGeminiContext = async (textContent) => {
  try {
    const chat = model.startChat({
      history: [],
      generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessage(`Please remember the following text: \n${textContent}`);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini error:', error);
    return null;
  }
};
