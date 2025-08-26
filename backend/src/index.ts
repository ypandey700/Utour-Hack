import express from "express";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config({ path: ".env" })


const BACKEND_PORT = process.env.PORT


const app = express();

ap.use(cookieParser()); 
app.use(express.json()); 


app.use("/api/users", userRouter);

app.listen(BACKEND_PORT, () => {
  console.log(`Server running on http://localhost:${BACKEND_PORT}`);
});
