// import mongoose from "mongoose";
// const taskSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   status: {
//     type: String,
//     enum: ["pending", "accepted", "completed", "reviewed"],
//     default: "pending",
//   },
//   proof: String,
// });
// const Task = mongoose.model("Task", taskSchema);
// export default Task;
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "Accepted", "Completed", "Failed", "Reassigned"],
      default: "New",
    },
    proof: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
