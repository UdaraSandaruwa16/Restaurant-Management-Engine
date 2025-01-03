import { aboutPage } from "../models/aboutPage.mjs";
import { validationResult } from "express-validator";

export const getPageContent = async (req, res) => {
  try {
    const content = await aboutPage.findById("65dc18f2b8de1b1ff34058c4");
    return res.status(200).send(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updatePageContent = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  try {
    const updatedContent = await aboutPage.findByIdAndUpdate(
      "65dc18f2b8de1b1ff34058c4",
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).send(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
