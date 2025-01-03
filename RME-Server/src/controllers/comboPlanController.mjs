import { ComboPlan } from "../models/comboPlan.mjs";
import { validationResult } from "express-validator";
import cloudinary from "../utils/config/cloudinary.mjs";

export const findComboPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comboPlan = await ComboPlan.findById(id);
    if (!comboPlan)
      return res
        .status(400)
        .json({ message: `cannot find any comboPlan with ID ${id}` });
    req.existComboPlan = comboPlan;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving comboPlan" });
  }
};

export const getComboPlans = async (req, res, next) => {
  try {
    const comboPlan = await ComboPlan.find({});
    res.status(200).send(comboPlan);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving comboPlan" });
  }
};

export const getOneComboPlan = async (req, res, next) => {
  try {
    const { existComboPlan } = req;
    return res.status(200).send(existComboPlan);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving comboPlan" });
  }
};

export const createComboPlan = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const { comboPlanName, description, items, price, image } = req.body;
    const imageResult = await cloudinary.uploader.upload(image, {
      resource_type: "auto",
      public_id: "menuitem_img_" + Date.now(),
    });
    const newcomboPlan = new ComboPlan({
      comboPlanName,
      description,
      items,
      price,
      imageURL: imageResult.url,
    });
    const savedcomboPlan = await newcomboPlan.save();
    res.status(201).send(savedcomboPlan);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create comboPlan" });
  }
};

export const updateComboPlan = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send(result.array());
    const { id } = req.params;
    const { comboPlanName, description, items, price, image } = req.body;
    const imageResult = await cloudinary.uploader.upload(image, {
      resource_type: "auto",
      public_id: "menuitem_img_" + Date.now(),
    });
    const updatedItem = await ComboPlan.findByIdAndUpdate(
      id,
      {
        comboPlanName,
        description,
        items,
        price,
        imageURL: imageResult.url,
      },
      {
        new: true,
      }
    );
    return res.status(200).send(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComboPlan = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await ComboPlan.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
