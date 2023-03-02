import db from "../configs/database.js";
import { nanoid } from "nanoid";
import { createShortUrlSchema } from "../schemas/urls.schema.js";

export async function createShortUrlValidation(req, res, next) {
  const { url } = req.body;
  const { user_id } = res.locals.session;
  

  if (!url) return res.status(422).send("URL is required");

  const { error } = createShortUrlSchema.validate({url:url});

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(422).send(errorMessages);
  }

  const shortUrl = nanoid(8);

  res.locals.shortUrl = { user_id, url, shortUrl };

  next();
}

export async function showUrlsByIdValidation(req, res, next) {
  const { id } = req.params;

  try {
    const checkShortUrlById = await db.query(
      `
      SELECT id,"shortUrl",url
      FROM urls
      WHERE id=$1
    `,
    [id]
    );

    if (checkShortUrlById.rowCount == 0 )return res.status(404).send("Shorten Url not found");

    const resultUrlObjectFound = checkShortUrlById.rows[0]
    res.locals.resultUrlObjectFound = resultUrlObjectFound;

  } catch (error) {
    res.status(500).send(error.message);
  }

  next();
}

export async function showShortUrlValidation(req,res,next) {
  
    const shortUrl = req.params.shortUrl

    try {
        const data = await db.query(
        `
        SELECT * FROM urls
        WHERE "shortUrl" = $1
        `,
        [shortUrl]);

    if(data.rowCount == 0 ) return res.status(404).send("Url not found")

    await db.query(
    `
    UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE "shortUrl" = $1
    `,
    [shortUrl])
    
    const urlFound = data.rows[0].url

    res.locals.urlFound = urlFound

    } catch (error) {
        res.status(500).send(error.message);
    }
   
    next()
}

export async function deleteUrlsByIdValidation(req, res,next) {
  const { user_id } = res.locals.session;
  const { id } = req.params;
  

  try {
    
    const checkShortUrlById = await db.query(
    `
        SELECT *
        FROM urls
        WHERE id=$1
    `,
      [id]
    );

    console.log(checkShortUrlById.rows[0])
  
    if (checkShortUrlById.rowCount == 0 )return res.status(404).send("Shorten Url not found");

    const urlObjectFound = checkShortUrlById.rows[0]

    const urlFoundBelongsToUser = (user_id == urlObjectFound.user_id)

    if(!urlFoundBelongsToUser) return res.status(401).send("You don't have permission to delete")

    res.locals.UrlId = urlObjectFound.id

    next()
  } catch (error) {
    res.status(500).send(error.message);
  }
}
