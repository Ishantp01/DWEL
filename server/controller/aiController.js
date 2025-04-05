            import fs from 'fs';
import path from 'path';
import File from '../models/file_model.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Set up Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper to read .txt file content
const readTxtFileContent = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read file at ${filePath}:`, error);
    return '';
  }
};

// Main controller
export const askGeminiAboutTask = async (req, res) => {
  const { taskId } = req.params;
  const { question } = req.query;

  if (!question) {
    return res.status(400).json({ error: 'Please provide a question in query.' });
  }

  try {
    // Step 1: Get all .txt files for the given taskId
    const files = await File.find({ taskId, fileType: '.txt' });

    if (files.length === 0) {
      return res.status(404).json({ error: 'No .txt files found for this task.' });
    }

    // Step 2: Read content of each file
    const contextData = files.map(file => {
      const content = readTxtFileContent(file.filePath);
      return `File: ${file.fileName}\n\n${content}`;
    }).join('\n\n---\n\n');

    // Step 3: Generate prompt and ask Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Here are multiple .txt files related to a task. Use this information to answer the user's question.

${contextData}

Question: ${question}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    // Step 4: Return Gemini's answer
    res.status(200).json({ answer: response });

  } catch (err) {
    console.error('Gemini AI error:', err);
    res.status(500).json({ error: 'Failed to process the question using Gemini' });
  }
};
