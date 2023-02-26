import db from "../configs/database.js";
import { nanoid } from "nanoid";
import { createShortUrlSchema } from "../schemas/urls.schema.js";

export async function createShortUrlValidation(req, res, next) {
  const { url } = req.body;
  const { user_id } = res.locals.session;

  if (!url) return res.status(422).send("URL is required");

  const { error } = createShortUrlSchema.validate(url);

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
    const checkShortUrlById = db.query(
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

export async function showShortUrlValidation() {}

export async function deleteUrlsByIdValidation(req, res) {
  const { userId } = res.locals.session;
  const { id } = req.params;
}
