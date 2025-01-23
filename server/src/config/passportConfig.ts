import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Profile, VerifyCallback } from "passport-google-oauth20";
import User from "../models/userModel";

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET as string;
const CALLBACK_URL = process.env.CALLBACK_URL as string;

// console.log("Client ID:", GOOGLE_CLIENT_ID);
// console.log("Client Secret:", GOOGLE_CLIENT_SECRET);
// console.log("Callback URL:", CALLBACK_URL);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails && profile.emails[0]?.value;

        const photo = profile.photos && profile.photos[0]?.value;

        if (!email) {
          return done(null, false, {
            message: "Google account does not provide email",
          });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = new User({
            email: email,
            userName: profile.displayName,
            profilePic: photo,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
