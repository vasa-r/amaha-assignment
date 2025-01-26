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
exports.updateColumn = exports.deleteColumn = exports.createColumn = void 0;
const types_1 = require("../types/types");
const columnModel_1 = __importDefault(require("../models/columnModel"));
const boardModel_1 = __importDefault(require("../models/boardModel"));
const createColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId } = req.params;
    const { columnName } = req.body;
    try {
        const createdColumn = yield columnModel_1.default.create({
            columnName,
            boardId,
        });
        if (!createdColumn) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Column hasn't been created. Please try again.",
            });
            return;
        }
        const updatedBoard = yield boardModel_1.default.findByIdAndUpdate(boardId, { $push: { columns: createdColumn._id } }, { new: true });
        if (!updatedBoard) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Board not found. Column added, but board update failed.",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Column created and added to the board successfully.",
            column: createdColumn,
            updatedBoard,
        });
    }
    catch (error) {
        console.error("Error creating column:", error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not create the column. Try again later.",
        });
    }
});
exports.createColumn = createColumn;
exports.default = createColumn;
const deleteColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { columnId } = req.params;
        const deleteColumn = yield columnModel_1.default.findByIdAndDelete(columnId);
        if (!deleteColumn) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Failed to delete column",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Column deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while deleting column",
        });
        return;
    }
});
exports.deleteColumn = deleteColumn;
const updateColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { columnId } = req.params;
    const { columnName } = req.body;
    try {
        const updatedColumn = yield columnModel_1.default.findByIdAndUpdate(columnId, { columnName }, { new: true, runValidators: true });
        if (!updatedColumn) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Column not found. Update failed.",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Column updated successfully.",
            column: updatedColumn,
        });
    }
    catch (error) {
        console.error("Error updating column:", error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not update the column. Try again later.",
        });
        return;
    }
});
exports.updateColumn = updateColumn;
