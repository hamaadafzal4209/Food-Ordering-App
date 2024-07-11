import foodModel from "../models/foodModel.js";
import fs from "fs";

export const addFood = async (req, res, next) => {
  const { name, description, price, category } = req.body;

  const image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
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
