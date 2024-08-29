import userModel from "../models/userModel.js";

// add items to user cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this is the correct field name
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    // Log the updated cart data
    console.log('Updated Cart Data:', cartData);

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// fetch user cart data
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID from Token:', userId);

    const userData = await userModel.findById(userId);
    console.log('User Data:', userData);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

