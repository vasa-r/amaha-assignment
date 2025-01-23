import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password?: string;
  profilePic?: string;
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model<IUser>("User", userSchema);

export default User;
