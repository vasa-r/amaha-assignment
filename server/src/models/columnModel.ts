import mongoose, { Document, Schema } from "mongoose";

interface IColumn extends Document {
  columnName: string;
  boardId: mongoose.Schema.Types.ObjectId;
  tasks: mongoose.Schema.Types.ObjectId[];
}

const columnSchema = new Schema<IColumn>(
  {
    columnName: {
      type: String,
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Column =
  mongoose.models.columns || mongoose.model<IColumn>("Column", columnSchema);

export default Column;
