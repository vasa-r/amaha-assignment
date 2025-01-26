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
exports.loginUser = exports.createUser = exports.getUsers = void 0;
const types_1 = require("../types/types");
const userModel_1 = __importDefault(require("../models/userModel"));
const utils_1 = require("../lib/utils");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const searchCondition = query
            ? { userName: { $regex: query, $options: "i" } }
            : {};
        const users = yield userModel_1.default.find(searchCondition).lean();
        if (!users || users.length === 0) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No users found",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not fetch users. Try again later.",
        });
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const isUserExists = yield userModel_1.default.findOne({ email });
        if (isUserExists) {
            res.status(types_1.statusCode.CONFLICT).json({
                success: false,
                message: "User already exists. Please login.",
            });
            return;
        }
        const hashedPassword = yield (0, utils_1.generateHashedPassword)(password);
        const user = yield userModel_1.default.create({
            userName,
            email,
            password: hashedPassword,
        });
        if (!user) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "User doesnt created. Please try again.",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Account created successfully. Please Login",
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not Signup. Try again later ",
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            res.status(types_1.statusCode.CONFLICT).json({
                success: false,
                message: "No user found. Please Sign Up",
            });
            return;
        }
        const isMatch = yield (0, utils_1.comparePassword)(password, user.password);
        if (!isMatch) {
            res.status(types_1.statusCode.NOT_ACCEPTABLE).json({
                success: false,
                message: "Incorrect Password. Please enter correct password",
            });
            return;
        }
        const token = (0, utils_1.generateToken)(user._id, user.userName);
        res.status(types_1.statusCode.ACCEPTED).json({
            success: true,
            message: `Hey ${user.userName.slice(0, 2).toUpperCase()}, Welcome back`,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Could not Login. Try again later ",
        });
    }
});
exports.loginUser = loginUser;
