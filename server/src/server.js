import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/user.routes.js"
import dbConnection from './database/db.js';
import eventRouter from "./routes/event.routes.js"
const app=express();
dotenv.config();

 app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))

app.use("/api/auth",authRouter)
app.use("/api/event",eventRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnection();
});