import { Router } from "express";
import { createColumn } from "../controllers/columnController";

const columnRouter = Router();

columnRouter.post("/create/:boardId", createColumn);

export default columnRouter;
