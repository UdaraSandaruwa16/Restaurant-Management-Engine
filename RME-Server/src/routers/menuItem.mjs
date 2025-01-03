import { Router } from "express";
import { getMenuItems, findItemById, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem} from "../controllers/menuItemController.mjs"
import { checkSchema } from "express-validator";
import { menuItemValidationSchema } from "../utils/validations/menuItemValidation.mjs"; 

const router = Router();

router.get("/", getMenuItems);

router.get("/:id", findItemById, getMenuItemById);

router.post("/", checkSchema(menuItemValidationSchema), createMenuItem);

router.put("/:id", findItemById, checkSchema(menuItemValidationSchema), updateMenuItem);

router.delete("/:id", findItemById, deleteMenuItem);

export default router;
