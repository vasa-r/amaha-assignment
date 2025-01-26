import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  taskName: string;
  taskDesc: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  columnId: mongoose.Schema.Types.ObjectId;
  assignedUsers: mongoose.Schema.Types.ObjectId[];
}

const taskSchema = new Schema<ITask>(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDesc: {
      type: String,
      required: false,
    },
    dueDate: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
      required: true,
    },
    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.models.tasks || mongoose.model<ITask>("Task", taskSchema);

export default Task;
