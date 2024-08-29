import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // Validate incoming request
    const { userId, items, amount, address } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field: userId" });
    }
    
    if (!items) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field: items" });
    }
    
    if (!amount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field: amount" });
    }
    
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field: address" });
    }    

    // Create a new order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Clear the user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create a Stripe checkout session
    const line_items = items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 280, // Adjust multiplier as needed
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Delivery Fee",
        },
        unit_amount: 2 * 100 * 280, // Adjust the multiplier as needed
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};