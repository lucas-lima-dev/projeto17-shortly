import { Router } from "express";
import { checkSessionValidation } from "../middlewares/session.middleware.js";
import { showMyUrls } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.get("/users/me",checkSessionValidation,showMyUrls)

export default usersRouter