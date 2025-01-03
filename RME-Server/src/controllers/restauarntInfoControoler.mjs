import { RestaurantInfo } from "../models/restaurantInfo.mjs";
import { validationResult } from "express-validator";

export const getRestaurantInfo = async (req, res) => {
  try {
    const content = await RestaurantInfo.findById("65dd8f261068774295ad0098");
    return res.status(200).send(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updateRestaurantInfo = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  try {
    const updatedContent = await RestaurantInfo.findByIdAndUpdate("65dd8f261068774295ad0098", req.body, {
      new: true,
    });
    return res.status(200).send(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const createRestaurantInfo = async(req, res) => {
    try {
        const newR = await RestaurantInfo.create(req.body);
        return res.status(201).send(newR);
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "An error occurred" });
    }
}