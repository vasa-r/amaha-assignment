import mongoose, { Document, Schema } from "mongoose";

interface IColumn extends Document {
  columnName: string;
  boardId: mongoose.Schema.Types.ObjectId;
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
  },
  { timestamps: true }
);

const Column =
  mongoose.models.columns || mongoose.model<IColumn>("Column", columnSchema);

export default Column;
