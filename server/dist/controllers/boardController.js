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
exports.addMembersToBoard = exports.deleteBoard = exports.createBoard = exports.getBoard = exports.getBoards = void 0;
const types_1 = require("../types/types");
const boardModel_1 = __importDefault(require("../models/boardModel"));
const getBoardDetails_1 = __importDefault(require("../lib/getBoardDetails"));
const mongoose_1 = __importDefault(require("mongoose"));
const getBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    try {
        const boards = yield boardModel_1.default.find({ createdBy: userId }).lean();
        if (!boards || boards.length === 0) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No Boards available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Boards fetched successfully",
            boards,
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "An error occurred during fetching. Try later",
        });
    }
});
exports.getBoards = getBoards;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    try {
        if (!boardId || boardId.trim() === "") {
            res.status(types_1.statusCode.NO_CONTENT).json({
                success: false,
                message: "Please provide valid ID",
            });
            return;
        }
        const boardDetails = yield (0, getBoardDetails_1.default)(boardId);
        if (!boardDetails || boardDetails.length === 0) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No Boards available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Board fetched successfully",
            boardDetails,
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could get board. Try again later ",
        });
    }
});
exports.getBoard = getBoard;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    const { boardName } = req.body;
    try {
        const createBoard = yield boardModel_1.default.create({
            boardName,
            createdBy: userId,
        });
        if (!createBoard) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Board doesn't created. Please try again.",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Board created successfully.",
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not create. Try again later ",
        });
    }
});
exports.createBoard = createBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteBoard = yield boardModel_1.default.findByIdAndDelete(id);
        if (!deleteBoard) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Failed to delete board",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Board deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while deleting board",
        });
        return;
    }
});
exports.deleteBoard = deleteBoard;
const addMembersToBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = req.params;
        const { memberIds } = req.body;
        const board = yield boardModel_1.default.findById(boardId);
        if (!board) {
            res.status(404).json({
                success: false,
                message: "Board not found",
            });
            return;
        }
        if (!Array.isArray(memberIds) ||
            !memberIds.every((id) => mongoose_1.default.Types.ObjectId.isValid(id))) {
            res.status(400).json({
                success: false,
                message: "Invalid member IDs",
            });
            return;
        }
        const uniqueMemberIds = memberIds.filter((id) => !board.members.includes(id));
        board.members.push(...uniqueMemberIds);
        yield board.save();
        res.status(200).json({
            success: true,
            message: "Members added successfully",
            data: board,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Could not add members. Please try again later.",
        });
        return;
    }
});
exports.addMembersToBoard = addMembersToBoard;
