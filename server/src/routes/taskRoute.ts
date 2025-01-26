import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController";

const taskRouter = Router();

taskRouter.post("/create/:columnId", createTask);

taskRouter.patch("/:taskId", updateTask);

taskRouter.delete("/delete/:taskId", deleteTask);

export default taskRouter;
