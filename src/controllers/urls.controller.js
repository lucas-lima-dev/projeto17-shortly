import db from "../configs/database.js";

export async function createShortUrl(req, res) {
  const { user_id, url, shortUrl } = res.locals.shortUrl;

  try {
    await db.query(
      `
        INSERT INTO urls (user_id,url,"shortUrl")
        VALUES ($1,$2,$3);
        `,
      [user_id, url, shortUrl]
    );

    const data = await db.query(
      `
        SELECT id,"shortUrl" 
        FROM urls
        WHERE url=$1
        `,
      [url]
    );

    const shortenUrlObject = data.rows[0];

    return res.status(201).send(shortenUrlObject);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function showUrlsById(req, res) {
  const resultUrlObjectFound = res.locals.resultUrlObjectFound;

  return res.status(200).send(resultUrlObjectFound);
}

export async function showShortUrl(req, res) {}

export async function deleteUrlsById(req, res) {}
