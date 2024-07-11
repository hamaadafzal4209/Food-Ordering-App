import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { connectDB } from "./config/database.js";

// config app
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// databse connection
connectDB();

// routes
app.get("/", (req, res) => {
  res.send("Working!!");
});

// listen app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
