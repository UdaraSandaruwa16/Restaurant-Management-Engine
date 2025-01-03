import { Router } from "express";
import { checkSchema } from "express-validator"; 
import { categoryValidationSchema } from "../utils/validations/categoryValidation.mjs"; 
import { findCategoryById, getCategories, getOneCategory, createCategory, updateCategory, deleteCategory } from "../controllers/categoryController.mjs";

const router = Router();

router.get("/", getCategories);

router.get("/:id", findCategoryById, getOneCategory);

router.post("/", checkSchema(categoryValidationSchema), createCategory);

router.put("/:id", findCategoryById, checkSchema(categoryValidationSchema), updateCategory);

router.delete("/:id", findCategoryById, deleteCategory);

export default router;
