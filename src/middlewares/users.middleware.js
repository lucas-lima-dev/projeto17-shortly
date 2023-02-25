import db from "../configs/database";

export async function usersValidation(req,res,next) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ","")

    try {
        const checkSession = await db.query(`
        SELECT * FROM sessions WHERE token=$1`,[token])

        if(checkSession.rowCount == 0 ) return res.status(401).send("You don't have permission") 

        
        return res.status(200).send()
    } catch (error) {
        res.status(500).send(error.message);
    }
}