import { Router } from "express";
import {
  createTask,
  deleteTask,
  updateTask,
  assignMembersToTask,
} from "../controllers/taskController";

const taskRouter = Router();

taskRouter.post("/create/:columnId", createTask);

taskRouter.patch("/:taskId", updateTask);

taskRouter.put("/add-members/:taskId", assignMembersToTask);

taskRouter.delete("/delete/:taskId", deleteTask);

export default taskRouter;
