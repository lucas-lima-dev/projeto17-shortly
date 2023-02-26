import db from "../configs/database";

export async function usersValidation(req,res,next) {
   

    try {
        

        
        return res.status(200).send()
    } catch (error) {
        res.status(500).send(error.message);
    }
}