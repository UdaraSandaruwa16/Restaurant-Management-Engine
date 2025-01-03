import { Category } from "../models/category.mjs";
import { validationResult } from "express-validator";

export const findCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category)
    return res
      .status(400)
      .json({ message: `cannot find any category with ID ${id}` });
  req.existCategory = category;
  next();
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving categories" });
  }
};

export const getOneCategory = async (req, res, next) => {
  try {
    const { existCategory } = req;
    return res.status(200).sen(existCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving category" });
  }
};

export const createCategory = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const { body } = req;
  try {
    const newCategory = new Category(body);
    const savedCategory = await newCategory.save();
    return res.status(201).send(savedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating category" });
  }
};

export const updateCategory = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const { id } = req.params;
  try {
    const updatedItem = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
