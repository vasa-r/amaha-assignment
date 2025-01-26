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
exports.assignMembersToTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const types_1 = require("../types/types");
const taskModel_1 = __importDefault(require("../models/taskModel"));
const columnModel_1 = __importDefault(require("../models/columnModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { columnId } = req.params;
    const { taskName, taskDesc, dueDate, priority } = req.body;
    try {
        const createdTask = yield taskModel_1.default.create({
            taskName,
            taskDesc,
            dueDate,
            priority,
            columnId,
        });
        if (!createdTask) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Task hasn't created. Please try again.",
            });
            return;
        }
        const updatedColumn = yield columnModel_1.default.findByIdAndUpdate(columnId, { $push: { tasks: createdTask._id } }, { new: true });
        if (!updatedColumn) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Column not found. Task added, but Column update failed.",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Task created successfully.",
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
exports.createTask = createTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const deleteTask = yield taskModel_1.default.findByIdAndDelete(taskId);
        if (!deleteTask) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Failed to delete task",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while deleting task",
        });
        return;
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const updates = req.body;
    try {
        if (!Object.keys(updates).length) {
            res.status(types_1.statusCode.BAD_REQUEST).json({
                success: false,
                message: "No fields provided for update.",
            });
            return;
        }
        const updatedTask = yield taskModel_1.default.findByIdAndUpdate(taskId, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Task not found. Update failed.",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Task updated successfully.",
            task: updatedTask,
        });
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not update the task. Try again later.",
        });
        return;
    }
});
exports.updateTask = updateTask;
const assignMembersToTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { memberIds } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(taskId)) {
            res.status(400).json({
                success: false,
                message: "Invalid task ID",
            });
            return;
        }
        const task = yield taskModel_1.default.findById(taskId);
        if (!task) {
            res.status(404).json({
                success: false,
                message: "Task not found",
            });
            return;
        }
        if (!Array.isArray(memberIds) ||
            !memberIds.every((id) => mongoose_1.default.Types.ObjectId.isValid(id))) {
            res.status(400).json({
                success: false,
                message: "Invalid user IDs",
            });
            return;
        }
        const uniqueUserIds = memberIds.filter((id) => !task.assignedUsers.includes(id));
        task.assignedUsers.push(...uniqueUserIds);
        yield task.save();
        res.status(200).json({
            success: true,
            message: "Users assigned to task successfully",
            data: task,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while assigning members to the task. Please try again later.",
        });
    }
});
exports.assignMembersToTask = assignMembersToTask;
