import { Router } from "express";
import { showRanking } from "../controllers/ranking.controller.js";


const rankingRouter = Router()

rankingRouter.get("/ranking",showRanking)

export default rankingRouter