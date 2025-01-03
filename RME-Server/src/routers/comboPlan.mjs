import { Router } from "express";
import { checkSchema } from "express-validator";
import { comboPlanValidationSchema } from "../utils/validations/comboPlanValidation.mjs"; 
import { findComboPlanById, getComboPlans, getOneComboPlan, createComboPlan, updateComboPlan, deleteComboPlan } from "../controllers/comboPlanController.mjs";

const router = Router();


  router.get("/", getComboPlans);
  
  router.get("/:id", findComboPlanById, getOneComboPlan );
  
  router.post("/", checkSchema(comboPlanValidationSchema), createComboPlan);
  
  router.put("/:id", checkSchema(comboPlanValidationSchema), findComboPlanById,  updateComboPlan);
  
  router.delete("/:id", findComboPlanById, deleteComboPlan);
  
  export default router;