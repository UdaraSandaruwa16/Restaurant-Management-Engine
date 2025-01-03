import { Router } from "express";
import { checkSchema } from "express-validator"; 
import { designvalidationSchema } from "../utils/validations/designValidation.mjs";
import { getDesigns, updateDesign } from "../controllers/designContrller.mjs"; 

const router = Router();

  router.get("/", getDesigns);
    
  router.put("/", checkSchema(designvalidationSchema), updateDesign);
  
  export default router;