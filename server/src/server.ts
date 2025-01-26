import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb";
import { statusCode } from "./types/types";
import errorHandler from "./middleware/errorHandler";
import passport from "passport";

dotenv.config();
import "./config/passportConfig";
import userRouter from "./routes/userRoute";
import boardRouter from "./routes/boardRoute";
import verifyToken from "./middleware/verifyToken";
import columnRouter from "./routes/columnRoute";
import taskRouter from "./routes/taskRoute";

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get("/ping", (_, res) => {
  res.json({
    success: true,
    message: "API up and running",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/board", verifyToken, boardRouter);
app.use("/api/column", verifyToken, columnRouter);
app.use("/api/task", verifyToken, taskRouter);

app.use("*", (_, res) => {
  res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use(errorHandler);

app.listen(PORT, () => connectDb());
