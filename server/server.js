import dotenv from 'dotenv';
import express from 'express';
import connectDB from "./config/database.js";
import cors from 'cors';
const app = express();

dotenv.config();
connectDB();

// Middlewares



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));