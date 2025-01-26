import { Response, Request } from "express";
import { statusCode } from "../types/types";
import Column from "../models/columnModel";
import Board from "../models/boardModel";

const createColumn = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { columnName } = req.body;

  try {
    const createdColumn = await Column.create({
      columnName,
      boardId,
    });

    if (!createdColumn) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Column hasn't been created. Please try again.",
      });
      return;
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { $push: { columns: createdColumn._id } },
      { new: true }
    );

    if (!updatedBoard) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Board not found. Column added, but board update failed.",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Column created and added to the board successfully.",
      column: createdColumn,
      updatedBoard,
    });
  } catch (error) {
    console.error("Error creating column:", error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not create the column. Try again later.",
    });
  }
};

export default createColumn;

const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.params;

    const deleteColumn = await Column.findByIdAndDelete(columnId);

    if (!deleteColumn) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Failed to delete column",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Column deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while deleting column",
    });
    return;
  }
};

const updateColumn = async (req: Request, res: Response) => {
  const { columnId } = req.params;
  const { columnName } = req.body;

  try {
    const updatedColumn = await Column.findByIdAndUpdate(
      columnId,
      { columnName },
      { new: true, runValidators: true }
    );

    if (!updatedColumn) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Column not found. Update failed.",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Column updated successfully.",
      column: updatedColumn,
    });
  } catch (error) {
    console.error("Error updating column:", error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not update the column. Try again later.",
    });
    return;
  }
};

export { createColumn, deleteColumn, updateColumn };
