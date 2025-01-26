"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const columnController_1 = require("../controllers/columnController");
const columnRouter = (0, express_1.Router)();
columnRouter.post("/create/:boardId", columnController_1.createColumn);
columnRouter.delete("/delete/:columnId", columnController_1.deleteColumn);
columnRouter.patch("/:columnId", columnController_1.updateColumn);
exports.default = columnRouter;
