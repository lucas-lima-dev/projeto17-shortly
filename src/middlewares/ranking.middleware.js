import db from "../configs/database.js";

export async function rankingValidation(req,res,next) {

    try {
        const ranking = await db.query
        (
        `
       SELECT 
         users.id,
         users.name,
         COUNT(urls.id) AS "linksCount",
         SUM(urls."visitCount") AS "visitCount"
        FROM urls
         LEFT JOIN users 
          ON users.id = urls.user_id
        GROUP BY users.id
        ORDER BY "visitCount" DESC, id ASC
        LIMIT 10
       `);
            
       res.locals.ranking = ranking.rows;
    } catch (error) {
        res.status(500).send(error.message);
    }
    next()
}