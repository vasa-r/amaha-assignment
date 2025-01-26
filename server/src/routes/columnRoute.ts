import { Router } from "express";
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from "../controllers/columnController";

const columnRouter = Router();

columnRouter.post("/create/:boardId", createColumn);

columnRouter.delete("/delete/:columnId", deleteColumn);

columnRouter.patch("/:columnId", updateColumn);

export default columnRouter;
