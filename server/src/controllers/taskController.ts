import { Request, Response } from "express";
import { statusCode } from "../types/types";
import Task from "../models/taskModel";
import Column from "../models/columnModel";

const createTask = async (req: Request, res: Response) => {
  const { columnId } = req.params;
  const { taskName, taskDesc, dueDate, priority } = req.body;
  try {
    const createdTask = await Task.create({
      taskName,
      taskDesc,
      dueDate,
      priority,
      columnId,
    });

    if (!createdTask) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Task hasn't created. Please try again.",
      });
      return;
    }

    const updatedColumn = await Column.findByIdAndUpdate(
      columnId,
      { $push: { tasks: createdTask._id } },
      { new: true }
    );

    if (!updatedColumn) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Column not found. Task added, but Column update failed.",
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

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    const deleteTask = await Task.findByIdAndDelete(taskId);

    if (!deleteTask) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Failed to delete task",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while deleting task",
    });
    return;
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    if (!Object.keys(updates).length) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: "No fields provided for update.",
      });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Task not found. Update failed.",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Task updated successfully.",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not update the task. Try again later.",
    });
    return;
  }
};

export { createTask, updateTask, deleteTask };
