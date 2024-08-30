import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Pc6H6JvBGOIHYX6E7TrQBZahracgr1gvrexjDJDJBqxy6pnqvI0W0szJIYgga0qCnbRuSDily0ZTtZeQ3XhT2nS00wThAKXSS");

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
    res.status(500).json({ success: false, message: error.message });
  }
};

// verify order
export const verifyOrder = async (req,res) => {
  const {orderId,success} = req.body;
  try {
      if (success=="true") {
          await orderModel.findByIdAndUpdate(orderId,{payment:true});
          res.json({success:true,message:"Paid"})
      }
      else{
          await orderModel.findByIdAndDelete(orderId);
          res.json({success:false,message:"Not Paid"})
      }
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}

// user orders for frontend
export const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;  // Access userId from req.user
    console.log("User ID:", userId);
    const orders = await orderModel.find({ userId: userId });
    console.log("Orders Found:", orders);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Listing orders for admin panel
export const listOrders = async (req,res) => {
  try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}

// api for updating order status
export const updateStatus = async (req,res) => {
  try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({success:true,message:"Status Updated"})
  } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
  }
}