import { Request, Response } from "express";
import { statusCode } from "../types/types";
import User from "../models/userModel";
import {
  comparePassword,
  generateHashedPassword,
  generateToken,
} from "../lib/utils";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).lean();

    if (!users || users.length === 0) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No users available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not fetch users. Try again later ",
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  try {
    const isUserExists = await User.find({ email: email });

    if (isUserExists) {
      res.status(statusCode.CONFLICT).json({
        success: false,
        message: "User already exists. Please login.",
      });
      return;
    }

    const hashedPassword = await generateHashedPassword(password);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "User doesnt created. Please try again.",
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not Signup. Try again later ",
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(statusCode.CONFLICT).json({
        success: false,
        message: "No user found. Please Sign Up",
      });
      return;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(statusCode.NOT_ACCEPTABLE).json({
        success: false,
        message: "Incorrect Password. Please enter correct password",
      });
      return;
    }

    const token = generateToken(user._id, user.userName);

    res.status(statusCode.ACCEPTED).json({
      success: true,
      message: `Hey ${user.userName.slice(0, 2).toUpperCase()}, Welcome back`,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Could not Login. Try again later ",
    });
  }
};

export { getUsers, createUser, loginUser };
