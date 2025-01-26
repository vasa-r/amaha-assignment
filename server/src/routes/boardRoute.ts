import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import {
  createBoard,
  deleteBoard,
  getBoards,
} from "../controllers/boardController";

const boardRouter = Router();

boardRouter.get("/", verifyToken, getBoards);

boardRouter.post("/create", verifyToken, createBoard);

boardRouter.delete("/:id", verifyToken, deleteBoard);

export default boardRouter;
