import { Router } from "express";
import { sign_up,sign_in } from "../controllers/auth.controller.js";
import { signUpValidation,signInValidation } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post("/signup",signUpValidation,sign_up)
authRouter.post("/signin",signInValidation,sign_in)

export default authRouter