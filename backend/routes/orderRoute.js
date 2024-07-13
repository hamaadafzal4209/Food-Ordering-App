import express from "express";
import authMiddleware from "../middleware/verifyUser.js";
import { placeOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/place", authMiddleware, placeOrder);

export default orderRoute;
