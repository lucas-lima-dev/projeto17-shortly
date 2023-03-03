import { Router } from "express";
import { rankingValidation } from "../middlewares/ranking.middleware.js";
import { showRanking } from "../controllers/ranking.controller.js";


const rankingRouter = Router()

rankingRouter.get("/ranking",rankingValidation,showRanking)

export default rankingRouter