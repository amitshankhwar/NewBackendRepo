import Task from "../models/TaskSchema.js";
import User from "../models/userSchema.js"; // Ensure you have the User model

export const assignTask = async (req, res) => {
  const { title, date, assignedTo, category, description, priority } = req.body;
  console.log(req.body);

  try {
    // Find the user by email
    const user = await User.findOne({ email: assignedTo });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new task with the user's ObjectId
    const task = new Task({
      title,
      date,
      assignedTo: user._id,
      category,
      description,
      priority,
    });

    await task.save();
    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Error assigning task", error });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("assignedTo", "email name");
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const proof = req.file ? req.file.path : null;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    if (proof) task.proof = proof;

    await task.save();
    res.json({ message: "Task status updated", task });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status", error });
  }
};

export const reviewTask = async (req, res) => {
  const { status, feedback } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (status === "Reassigned" && !feedback) {
    return res
      .status(400)
      .json({ message: "Feedback is required for reassignment" });
  }

  task.status = status;
  if (feedback) task.feedback = feedback;

  await task.save();
  res.json({ message: `Task has been ${status}`, task });
};

export const gettasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ assignedTo: userId });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const reassignTask = async (req, res) => {
  try {
    const { feedback } = req.body;
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!feedback) {
      return res
        .status(400)
        .json({ message: "Feedback is required for reassignment" });
    }
    task.status = "Reassigned";
    task.feedback = feedback;
    await task.save();
    res.status(200).json({ message: "Task reassigned successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error reassigning task", error });
  }
};

export const deletetask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

export const markTaskCompleted = async (req, res) => {
  try {
    const result = req.params.id;
    console.log(result);
    const task = await Task.findById(result);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (!task.proof) {
      return res.status(400).json({ error: "Proof not submitted yet" });
    }
    task.status = "Completed";
    await task.save();
    res.json({ message: "Task marked as completed", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskFeedback = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ feedback: task.feedback || "No feedback provided" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback", error });
  }
};
