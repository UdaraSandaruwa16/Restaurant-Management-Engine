import { Router } from "express";
import { checkSchema } from "express-validator";
import { reservationValidationSchema } from "../utils/validations/reservationValidation.mjs"; 
import { getAvailableTabels, makeAReservation, updateReservation, cancelReservation} from "../controllers/reservationController.mjs";


const router = Router();

router.post("/availableTables", getAvailableTabels);

router.post("/", checkSchema(reservationValidationSchema), makeAReservation);

router.put("/:id", checkSchema(reservationValidationSchema), updateReservation);

router.delete("/:id", cancelReservation)

export default router;
