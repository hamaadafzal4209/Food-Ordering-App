import foodModel from "../models/foodModel.js";
import cloudinary from 'cloudinary';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dq2ljujxe",
  api_key: "815541937132134",
  api_secret: "CNF8qIXnGddpmDVNofnzSA2HRxs",
});

export const addFood = async (req, res, next) => {
  const { name, description, price, category } = req.body;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    // Create new food item with Cloudinary image URL
    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    await food.save();

    // Remove the file from the server after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An Error Occured" });
  }
};

export const listFood = async (req, res) => {
  try {
    const allFoods = await foodModel.find();
    res.json({ success: true, data: allFoods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An Error Occured" });
  }
};

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    // Remove image from Cloudinary
    await cloudinary.v2.uploader.destroy(food.image.public_id);

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Deleted", data: food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An Error Occured" });
  }
};