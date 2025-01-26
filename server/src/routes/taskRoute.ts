import { Router } from "express";
import { createTask } from "../controllers/taskController";

const taskRouter = Router();

taskRouter.post("/create/:columnId", createTask);

export default taskRouter;
