import db from "../configs/database.js";

export async function checkSessionValidation(req,res,next) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ","")

    if(!token) return res.status(401).send("Token is required")

    try {
        const checkSession = await db.query(`
        SELECT * FROM sessions
        WHERE token=$1`,
        [token])

        if(checkSession.rowCount == 0 ) return res.status(401).send("You don't have permission") 

        res.locals.session = checkSession.rows[0];
        
    } catch (error) {
        res.status(500).send(error.message);
    }
    next()
}