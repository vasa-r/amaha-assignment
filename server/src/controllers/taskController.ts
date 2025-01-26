import { Request, Response } from "express";
import { statusCode } from "../types/types";
import Task from "../models/taskModel";
import Column from "../models/columnModel";
import mongoose from "mongoose";

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

const assignMembersToTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { memberIds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
      return;
    }

    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({
        success: false,
        message: "Task not found",
      });
      return;
    }

    if (
      !Array.isArray(memberIds) ||
      !memberIds.every((id) => mongoose.Types.ObjectId.isValid(id))
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid user IDs",
      });
      return;
    }

    const uniqueUserIds = memberIds.filter(
      (id) => !task.assignedUsers.includes(id)
    );

    task.assignedUsers.push(...uniqueUserIds);

    await task.save();

    res.status(200).json({
      success: true,
      message: "Users assigned to task successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while assigning members to the task. Please try again later.",
    });
  }
};

export { createTask, updateTask, deleteTask, assignMembersToTask };
