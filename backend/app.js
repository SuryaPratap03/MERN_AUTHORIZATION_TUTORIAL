import express from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import UserRouter from "./routes/userRouter.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

configDotenv();
const app = express();

mongoose
  .connect("mongodb://localhost:27017/MERNAUTHUSERS")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials:true,
    }
));


app.use("/api", UserRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server Started at ${process.env.PORT}`);
});
