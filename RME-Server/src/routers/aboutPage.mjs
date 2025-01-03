import { Router } from "express";
import { checkSchema } from "express-validator";
import { aboutPageValidationSchema } from "../utils/validations/aboutPageValidation.mjs"; 
import { getPageContent, updatePageContent } from "../controllers/aboutPageController.mjs";

const router = Router()

router.get("/", getPageContent);

router.put("/", checkSchema(aboutPageValidationSchema), updatePageContent);

export default router;