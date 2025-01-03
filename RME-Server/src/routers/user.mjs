import { Router } from "express";
import { checkSchema } from "express-validator";
import { userValidationSchema } from "../utils/validations/userValidation.mjs"; 
import { findUserById, getUsers, getSingleUser, createUser, updateUser, deleteUser } from "../controllers/userController.mjs";

const router = Router();

router.get("/",getUsers );

router.get("/:id", findUserById, getSingleUser);

router.post("/", checkSchema(userValidationSchema), createUser);

router.put("/:id", checkSchema(userValidationSchema), findUserById, updateUser);

router.delete("/:id", deleteUser);

export default router;