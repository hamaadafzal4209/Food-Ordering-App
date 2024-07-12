import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { verifyUser } from "../middleware/verifyUser.js";
const cartRouter = express.Router();

cartRouter.post("/add", verifyUser, addToCart);
cartRouter.post("/remove", verifyUser, removeFromCart);
cartRouter.post("/get", verifyUser, getCart);

export default cartRouter;
