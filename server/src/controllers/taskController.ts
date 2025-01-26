import { Request, Response } from "express";
import { statusCode } from "../types/types";
import Task from "../models/taskModel";

const createTask = async (req: Request, res: Response) => {
  const { columnId } = req.params;
  const { taskName, taskDesc, dueDate, priority } = req.body;
  try {
    const createTask = await Task.create({
      taskName,
      taskDesc,
      dueDate,
      priority,
      columnId,
    });

    if (!createTask) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Task hasn't created. Please try again.",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Task created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not create. Try again later ",
    });
  }
};

export { createTask };
