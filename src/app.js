import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import urlRouter from "./routes/urls.routes.js";
import usersRouter from "./routes/users.routes.js";
import rankingRouter from "./routes/ranking.routes.js";

dotenv.config();
const app = express()

app.use([
    cors(),
    json(),
    authRouter,
    urlRouter,
    usersRouter,
    rankingRouter
])

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log(`Server is running on PORT = ${PORT}`))