import { Router } from "express";
import { aiReport } from "../controllers/aiController.mjs";

const router = Router()

router.get("/", aiReport);

export default router;