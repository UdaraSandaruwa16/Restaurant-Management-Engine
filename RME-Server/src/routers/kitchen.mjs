import { Router } from "express";
import { getPendingOrders, updateOrderStatus, updateItemStatus, getOderById } from "../controllers/kitchenController.mjs";

const router = Router();

//order
router.put("/:id", updateOrderStatus);

router.get("/", getPendingOrders);

router.get("/:id", getOderById);

//item
router.put("/item/:id", updateItemStatus);

export default router;