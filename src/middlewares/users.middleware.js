import db from "../configs/database.js";

export async function usersValidation(req,res,next) {
    const {user_id} = res.locals.session


    try {
        const currentUserUrls = await db.query(
            `
            SELECT 
             users.id, 
             users.name as name, 
             SUM(urls."visitCount") AS "visitCount",
              JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id',urls.id,
                    'shortUrl',urls."shortUrl",
                    'url',urls.url,
                    'visitCount',urls."visitCount"
                )
              ) AS "shortenedUrls"
            FROM users
             JOIN urls ON users.id = urls.user_id
            WHERE users.id = $1
            GROUP BY users.id;
            `,[user_id]);

        const existsUrls = currentUserUrls.rowCount
        if(existsUrls == 0 ) return res.status(404).send("No urls found")

        res.locals.userUrls = currentUserUrls.rows[0]
        
    } catch (error) {
        res.status(500).send(error.message);
    }
    next()
}