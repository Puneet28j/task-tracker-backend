import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  priority: "Low" | "Medium" | "High";
  dueDate: Date;
  status: "Pending" | "Completed";
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);
