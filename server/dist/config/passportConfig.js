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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const userModel_1 = __importDefault(require("../models/userModel"));
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
// console.log("Client ID:", GOOGLE_CLIENT_ID);
// console.log("Client Secret:", GOOGLE_CLIENT_SECRET);
// console.log("Callback URL:", CALLBACK_URL);
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = profile.emails && ((_a = profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value);
        const photo = profile.photos && ((_b = profile.photos[0]) === null || _b === void 0 ? void 0 : _b.value);
        if (!email) {
            return done(null, false, {
                message: "Google account does not provide email",
            });
        }
        let user = yield userModel_1.default.findOne({ email });
        if (!user) {
            user = new userModel_1.default({
                email: email,
                userName: profile.displayName,
                profilePic: photo,
            });
            yield user.save();
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
})));
