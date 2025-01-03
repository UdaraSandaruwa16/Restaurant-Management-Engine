import { landingPage } from "../models/landingPage.mjs";
import { validationResult } from "express-validator";
import cloudinary from "../utils/config/cloudinary.mjs";

export const getPageContent = async (req, res) => {
  try {
    const content = await landingPage.findById("65dc13b02b098a7eca70325a");
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
    const { headerText, paragraph, image } = req.body;
    const imageResult = await cloudinary.uploader.upload(image, {
      resource_type: "auto",
      public_id: "landingPage_img_" + Date.now(),
    });
    const updatedContent = await landingPage.findByIdAndUpdate(
      "65dc13b02b098a7eca70325a",
      {
        headerText,
        paragraph,
        imageURL: imageResult.url,
      },
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
