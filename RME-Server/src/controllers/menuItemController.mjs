import { MenuItems } from "../models/menuItem.mjs";
import { validationResult } from "express-validator";
import cloudinary from "../utils/config/cloudinary.mjs";

export const findItemById = async (req, res, next) => {
  const { id } = req.params;
  const item = await MenuItems.findById(id);
  if (!item)
    return res
      .status(400)
      .json({ message: `cannot find any item with ID ${id}` });
  req.existItem = item;
  next();
};

export const getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItems.find({});
    return res.status(200).send(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving menu items" });
  }
};

export const getMenuItemById = (req, res, next) => {
  const { existItem } = req;
  try {
    return res.status(200).send(existItem);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving menu item" });
  }
};

export const createMenuItem = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const {
    itemName,
    description,
    image,
    category,
    basePrice,
    sizes,
    extraIngredients,
  } = req.body;
  try {
    const imageResult = await cloudinary.uploader.upload(image, {
      resource_type: "auto",
      public_id: "menuitem_img_" + Date.now(),
    });
    const newItem = await MenuItems.create({
      itemName,
      description,
      imgURL: imageResult.url,
      category,
      basePrice,
      sizes,
      extraIngredients,
    });
    res.status(201).send(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create menu item" });
  }
};

export const updateMenuItem = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return response.status(400).send(result.array());
  const { id } = req.params;
  const {
    itemName,
    description,
    image,
    category,
    basePrice,
    sizes,
    extraIngredients,
  } = req.body;
  try {
    const imageResult = await cloudinary.uploader.upload(image, {
      resource_type: "auto",
      public_id: "menuitem_img_" + Date.now(),
    });
    const updateditem = await MenuItems.findByIdAndUpdate(
      id,
      {
        $set: {
          itemName,
          description,
          imgURL: imageResult.url,
          category,
          basePrice,
          sizes,
          extraIngredients,
        },
      },
      { new: true }
    );
    return res.status(200).send(updateditem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item = await MenuItems.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
