"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boardController_1 = require("../controllers/boardController");
const boardRouter = (0, express_1.Router)();
boardRouter.get("/", boardController_1.getBoards);
boardRouter.get("/:boardId", boardController_1.getBoard);
boardRouter.post("/create", boardController_1.createBoard);
boardRouter.put("/add-members/:boardId", boardController_1.addMembersToBoard);
boardRouter.delete("/:id", boardController_1.deleteBoard);
exports.default = boardRouter;
