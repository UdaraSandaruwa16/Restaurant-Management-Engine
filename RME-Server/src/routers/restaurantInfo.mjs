import { Router } from "express";
import { checkSchema } from "express-validator";
import { restaurantInfoValidationSchema } from "../utils/validations/restaurantInfoValidation.mjs"; 
import { createRestaurantInfo, updateRestaurantInfo, getRestaurantInfo } from "../controllers/restauarntInfoControoler.mjs";

const router = Router()

router.get("/", getRestaurantInfo);

router.put("/:id", checkSchema(restaurantInfoValidationSchema),  updateRestaurantInfo);

router.post("/", checkSchema(restaurantInfoValidationSchema), createRestaurantInfo)

export default router;