import { Router } from "express";
import { getCartList, createCartList, deleteCart } from "../controllers/cartController.mjs";

const router = Router();

router.get("/:email", getCartList);

router.post("/", createCartList)

router.delete("/:email", deleteCart)

export default router;