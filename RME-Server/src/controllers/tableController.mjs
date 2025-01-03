import { Table } from "../models/table.mjs";

export const getTableById = async (req, res, next) => {
  const { id } = req.params;
  const table = await Table.findById(id);
  if (!table)
    return res
      .status(400)
      .json({ message: `cannot find any table with ID ${id}` });
  req.existTable = table;
  next();
};

export const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find();
    return res.status(200).send(tables);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving tables" });
  }
};

export const getOneTable = async (req, res, next) => {
  try {
    const { existTable } = req;
    return res.status(200).send(existTable);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving table" });
  }
};

export const createTable = async (req, res, next) => {
  try {
    const newTable = await Table.create(req.body);
    return res.status(201).send(newTable);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error creating table" });
  }
};

export const updateTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTable = await Table.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send(updatedTable);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error updating table" });
  }
};

export const deleteTable = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndDelete(id);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error deleting table" });
  }
};
