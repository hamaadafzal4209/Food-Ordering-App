import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import path from "path";

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

const __dirname = path.resolve();

// routes

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRoute);

app.use(express.static(path.join(__dirname,  "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Working!!");
});

// listen app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
