import { User } from "../models/user.mjs";
import { validationResult } from "express-validator";

export const findUserById = async (request, response, next) => {
  const { id } = request.params;
  const user = await User.findById(id);
  if (!user)
    return response
      .status(400)
      .json({ message: `cannot find any user with ID ${id}` });
  request.existUser = user;
  next();
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getSingleUser = async (req, res) => {
  const { existUser } = req;
  try {
    return res.status(200).send(existUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error retrieving user by ${id}` });
  }
};

export const createUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const { body } = req;
  try {
    const newUser = new User(body);
    const savedUser = await newUser.save();
    res.status(200).send(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ message: "Failed to create user" });
  }
};

export const updateUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, req.body);
    const updatedUser = await User.findById(id);
    9;
    return res.status(200).send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error updating user by ${id}` });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: `Error retrieving user by ${id}` });
  }
};
