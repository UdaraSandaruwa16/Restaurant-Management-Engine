import { Router } from "express";
import { createTable, getTables, getTableById, getOneTable, updateTable, deleteTable } from "../controllers/tableController.mjs";

const router = Router();

router.get("/", getTables);

router.get("/:id", getTableById, getOneTable);

router.post("/", createTable);

router.put("/:id", getTableById, updateTable);

router.delete("/:id", deleteTable);

export default router;