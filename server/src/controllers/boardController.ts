import { Request, Response } from "express";
import { CustomUserReq, statusCode } from "../types/types";
import Board from "../models/boardModel";
import getBoardDetails from "../lib/getBoardDetails";

const getBoards = async (req: CustomUserReq, res: Response) => {
  const { userId } = req;
  try {
    const boards = await Board.find({ createdBy: userId }).lean();

    if (!boards || boards.length === 0) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No Boards available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Boards fetched successfully",
      boards,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "An error occurred during fetching. Try later",
    });
  }
};

const getBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;

  try {
    if (!boardId || boardId.trim() === "") {
      res.status(statusCode.NO_CONTENT).json({
        success: false,
        message: "Please provide valid ID",
      });
      return;
    }

    const boardDetails = await getBoardDetails(boardId);

    if (!boardDetails || boardDetails.length === 0) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No Boards available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Board fetched successfully",
      boardDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could get board. Try again later ",
    });
  }
};

const createBoard = async (req: CustomUserReq, res: Response) => {
  const { userId } = req;
  const { boardName } = req.body;
  try {
    const createBoard = await Board.create({
      boardName,
      createdBy: userId,
    });

    if (!createBoard) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Board doesn't created. Please try again.",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Board created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not create. Try again later ",
    });
  }
};

const deleteBoard = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteBoard = await Board.findByIdAndDelete(id);

    if (!deleteBoard) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Failed to delete board",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Board deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while deleting board",
    });
    return;
  }
};

export { getBoards, getBoard, createBoard, deleteBoard };
