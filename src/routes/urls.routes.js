import { Router } from "express";
import { checkSessionValidation } from "../middlewares/session.middleware.js";
import { 
    createShortUrlValidation,
    showUrlsByIdValidation,
    showShortUrlValidation,
    deleteUrlsByIdValidation
 } from "../middlewares/urls.middleware.js";

 import { 
    createShortUrl,
    showUrlsById,
    showShortUrl,
    deleteUrlsById 
} from "../controllers/urls.controller.js";


const urlRouter = Router()

urlRouter.post("/urls/shorten",checkSessionValidation,createShortUrlValidation,createShortUrl)
urlRouter.get("/urls/:id",showUrlsByIdValidation,showUrlsById)
urlRouter.get("/urls/open/:shortUrl",showShortUrlValidation,showShortUrl)
urlRouter.delete("/urls/:id",checkSessionValidation,deleteUrlsByIdValidation,deleteUrlsById)

export default urlRouter