import db from "../configs/database.js";
import { nanoid } from "nanoid";
import { createShortUrlSchema } from "../schemas/urls.schema.js";

export async function createShortUrlValidation(req,res,next) {
    const {url} = req.body
    const { user_id } = res.locals.session;

    if(!url) return res.status(422).send("URL is required")
   
    const {error} = createShortUrlSchema.validate(url)

    if (error) {
        const erroMessages = error.details.map((detail) => detail.message);
        return res.status(422).send(erroMessages);
      }

    const shortUrl = nanoid(8)

     res.locals.shortUrl = {user_id,url,shortUrl}
   
    next()
}

export async function showUrlsByIdValidation(req,res) {
    const {id} = req.params

}

export async function showShortUrlValidation() {

}

export async function deleteUrlsByIdValidation(req,res) {
    const { userId } = res.locals.session;
    const {id} = req.params

}