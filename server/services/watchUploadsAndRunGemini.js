// utils/watchUploadsAndRunGemini.js
/*import fs from 'fs';
import path from 'path';
import {askGeminiFromAllTxt}  from '../controller/askGeminiFromAllTxt.js';

const UPLOAD_DIR = './uploads';

export const watchUploads = () => {
  console.log(`📂 Watching directory: ${UPLOAD_DIR}`);

  fs.watch(UPLOAD_DIR, async (eventType, filename) => {
    if (eventType === 'rename' && filename.endsWith('.txt')) {
      const filePath = path.join(UPLOAD_DIR, filename);

      // Wait briefly to ensure file is fully written
      setTimeout(async () => {
        if (fs.existsSync(filePath)) {
          console.log(`📄 Detected new .txt file: ${filename}`);
          const response = await askGeminiFromAllTxt
          console.log('🤖 Gemini Output:', response);
        }
      }, 500); // 0.5s delay
    }
  });
};
*/