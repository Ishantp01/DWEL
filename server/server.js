import dotenv from 'dotenv';
import express from 'express';
import connectDB from "./config/database.js";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import chatRoutes from "./routes/chatRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import fileRoutes from './routes/fileRoutes.js'; 
import path from 'path';



dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder to access uploaded files
const Upload = path.resolve();
app.use('/uploads', express.static(path.join(Upload, 'uploads')));

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/tasks', taskRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/gemini", geminiRoutes);
app.use('/api/files', fileRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
