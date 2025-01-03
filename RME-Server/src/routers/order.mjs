import { Router } from "express";
import { checkSchema } from "express-validator";
import { orderValidationSchema } from "../utils/validations/orderValidation.mjs"; 
import { getOrders, createOrder, getOneOrder, findOrderById, updateOrder, deleteOrder} from "../controllers/orderController.mjs";

const router = Router();

router.get("/", getOrders);

router.get("/:id", findOrderById, getOneOrder);

router.post("/", checkSchema(orderValidationSchema), createOrder);

router.put("/:id", checkSchema(orderValidationSchema), findOrderById, updateOrder);

router.delete("/:id", deleteOrder);

export default router;
