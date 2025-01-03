import { Design } from "../models/design.mjs";
import { validationResult } from "express-validator";
import cloudinary from "../utils/config/cloudinary.mjs";


export const getDesigns = async (req, res, next) => {
  try {
    const design = await Design.findById("65d4ee4bb3e582b1c98ef387");
    res.status(200).send(design);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error retrieving design" });
  }
};

export const updateDesign = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  try {
    const { logo, restaurantName, color1, color2 } = req.body;
    const imageResult = await cloudinary.uploader.upload(logo, {
      resource_type: "auto",
      public_id: "design_img_" + Date.now(),
    });
    const updatedDesign = await Design.findByIdAndUpdate(
      "65d4ee4bb3e582b1c98ef387",
      {
        logoURL: imageResult.url,
        restaurantName,
        color1,
        color2,
      },
      {
        new: true,
      }
    );
    return res.status(200).send(updatedDesign);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
