import "express-async-errors"; // at the TOP --> avoids use of try catch everywhere in async errors
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// routers
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

//public
import {dirname} from 'path'
import { fileURLToPath } from "url";
import path from 'path'

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname,'./public')))
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  //by default browser performs get request or route
  res.send("Hello World");
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use("/api/v1/jobs", authenticateUser,jobRouter);
app.use("/api/v1/users", authenticateUser,userRouter);
app.use("/api/v1/auth", authRouter);

//NOT FOUND MIDDLEWARE --> HAS TO BE THE LAST ONE
app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(5100, () => {
    console.log(`server is running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
