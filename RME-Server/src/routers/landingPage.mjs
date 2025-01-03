import { Router } from "express";
import { checkSchema } from "express-validator";
import { landingPageValidationSchema } from "../utils/validations/landingPageValidation.mjs"; 
import { getPageContent, updatePageContent } from "../controllers/landingPageController.mjs";

const router = Router()

router.get("/", getPageContent);

router.put("/", checkSchema(landingPageValidationSchema), updatePageContent);

export default router;