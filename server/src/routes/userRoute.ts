import { Response, Router } from "express";
import passport from "passport";
import { getUsers, createUser, loginUser } from "../controllers/userController";
import { generateToken } from "../lib/utils";

const userRouter = Router();

userRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

userRouter.get(
  "/oauth",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req: any, res: Response) => {
    const { _id, userName } = req.user;

    const token = generateToken(_id, userName);

    const frontendUrl = `${process.env.CLIENT_URL}/auth/oauth?token=${token}`;
    res.redirect(frontendUrl);
  }
);

userRouter.get("/", getUsers);

userRouter.post("/signup", createUser);

userRouter.post("login", loginUser);

export default userRouter;
