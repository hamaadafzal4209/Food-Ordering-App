import userModel from "../models/userModel.js";

// Add items to user cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Remove items from user cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// Fetch user cart data
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};