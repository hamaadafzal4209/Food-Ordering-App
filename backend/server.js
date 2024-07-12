import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

// config app
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use("/images", express.static("uploads"));
app.use(cors());

// databse connection
connectDB();

// routes

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Working!!");
});

// listen app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
