"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boardModel_1 = __importDefault(require("../models/boardModel"));
const getBoardDetails = (boardId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardDetails = yield boardModel_1.default.findById(boardId)
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
    }
    catch (error) {
        console.error("Error fetching board details:", error);
        throw error;
    }
});
exports.default = getBoardDetails;
