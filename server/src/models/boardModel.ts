import mongoose, { Document, Schema } from "mongoose";

interface IBoard extends Document {
  boardName: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  columns: mongoose.Schema.Types.ObjectId[];
  members: mongoose.Schema.Types.ObjectId[];
}

const boardSchema = new Schema<IBoard>(
  {
    boardName: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Board =
  mongoose.models.boards || mongoose.model<IBoard>("Board", boardSchema);

export default Board;
