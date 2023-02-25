import db from "../configs/database.js";
import bcrypt from "bcrypt";
import {v4 as uuidV4} from "uuid";

export async function sign_up(req,res){

    const {name,email,password} = res.locals.new_user

    const hashed_password = bcrypt.hashSync(password,10)

    try {
        
        await db.query(`
        INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3);`,
        [name,email,hashed_password]
        )

        res.status(201).send("New user Created")

    } catch (error) {
        res.status(500).send(error.message)
    }

}

export async function sign_in(req,res) {
    const id = res.locals.userRegistered
    const tokenExists = res.locals.tokenExists
    const token = uuidV4();
    

    try {

        if(tokenExists){
            await db.query(`
            UPDATE sessions 
            SET token=$1 WHERE user_id=$2;`,
            [token,id])

        return res.status(200).send({token})

        }else {
            await db.query(`
            INSERT INTO sessions (user_id,token)
            VALUES ($1,$2)`,
            [id,token])

        return res.status(200).send({token})
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}