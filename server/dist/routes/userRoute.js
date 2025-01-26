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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const userController_1 = require("../controllers/userController");
const utils_1 = require("../lib/utils");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const userRouter = (0, express_1.Router)();
userRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}));
userRouter.get("/oauth", passport_1.default.authenticate("google", { failureRedirect: "/", session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, userName } = req.user;
    const token = (0, utils_1.generateToken)(_id, userName);
    const frontendUrl = `${process.env.CLIENT_URL}/auth/oauth?token=${token}`;
    res.redirect(frontendUrl);
}));
userRouter.get("/", verifyToken_1.default, userController_1.getUsers);
userRouter.post("/signup", userController_1.createUser);
userRouter.post("/login", userController_1.loginUser);
exports.default = userRouter;
