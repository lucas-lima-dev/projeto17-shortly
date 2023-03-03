import { Router } from "express";
import { checkSessionValidation } from "../middlewares/session.middleware.js";
import { usersValidation } from "../middlewares/users.middleware.js";
import { showMyUrls } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/me",checkSessionValidation,usersValidation,showMyUrls)

export default usersRouter