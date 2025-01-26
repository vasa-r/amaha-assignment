import { Response, Request } from "express";
import { CustomUserReq, statusCode } from "../types/types";
import Column from "../models/columnModel";

const createColumn = async (req: CustomUserReq, res: Response) => {
  const { boardId } = req.params;
  const { columnName } = req.body;
  try {
    const createColumn = await Column.create({
      columnName,
      boardId,
    });

    if (!createColumn) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Column hasn't created. Please try again.",
      });
      return;
    }

    res.status(statusCode.CREATED).json({
      success: true,
      message: "Column created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not create. Try again later ",
    });
  }
};

export { createColumn };
