import Board from "../models/boardModel";
import Column from "../models/columnModel";
import Task from "../models/taskModel";

const getBoardDetails = async (boardId: string) => {
  try {
    const boardDetails = await Board.findById(boardId)
      .populate({
        path: "columns",
        model: "Column",
        populate: {
          path: "tasks",
          model: "Task",
          populate: {
            path: "assignedUsers",
            select: "userName email profilePic",
          },
        },
      })
      .populate({
        path: "members",
        select: "userName email profilePic",
      })
      .populate({
        path: "createdBy",
        select: "userName email profilePic",
      })
      .lean();

    if (!boardDetails) {
      throw new Error("Board not found");
    }

    return boardDetails;
  } catch (error) {
    console.error("Error fetching board details:", error);
    throw error;
  }
};

export default getBoardDetails;
