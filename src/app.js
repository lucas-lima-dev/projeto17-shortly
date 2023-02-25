import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";

dotenv.config();
const app = express()

app.use([
    cors(),
    json(),
    authRouter
])

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Server is running on PORT = ${PORT}`))