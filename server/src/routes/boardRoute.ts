import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoards,
  getBoard,
  addMembersToBoard,
} from "../controllers/boardController";

const boardRouter = Router();

boardRouter.get("/", getBoards);

boardRouter.get("/:boardId", getBoard);

boardRouter.post("/create", createBoard);

boardRouter.put("/add-members/:boardId", addMembersToBoard);

boardRouter.delete("/:id", deleteBoard);

export default boardRouter;
