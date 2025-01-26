"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const types_1 = require("./types/types");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
require("./config/passportConfig");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const boardRoute_1 = __importDefault(require("./routes/boardRoute"));
const verifyToken_1 = __importDefault(require("./middleware/verifyToken"));
const columnRoute_1 = __importDefault(require("./routes/columnRoute"));
const taskRoute_1 = __importDefault(require("./routes/taskRoute"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
app.get("/ping", (_, res) => {
    res.json({
        success: true,
        message: "API up and running",
    });
});
app.use("/api/auth", userRoute_1.default);
app.use("/api/board", verifyToken_1.default, boardRoute_1.default);
app.use("/api/column", verifyToken_1.default, columnRoute_1.default);
app.use("/api/task", verifyToken_1.default, taskRoute_1.default);
app.use("*", (_, res) => {
    res.status(types_1.statusCode.NOT_FOUND).json({
        success: false,
        message: "Endpoint not found",
    });
});
app.use(errorHandler_1.default);
app.listen(PORT, () => (0, connectDb_1.default)());
