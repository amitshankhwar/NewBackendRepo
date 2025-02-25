import Task from "../models/TaskSchema.js";
import User from "../models/userSchema.js"; // Ensure you have the User model

export const assignTask = async (req, res) => {
  const { title, date, assignedTo, category, description } = req.body;
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
    });

    await task.save();
    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};
export const getUserTasks = async (req, res) => {
  try {
    // 🛑 Check if `req.user` is defined
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // ✅ Fetch tasks for logged-in user
    const tasks = await Task.find({ assignedTo: req.user._id });
    res.json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error); // 🛑 Log error
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const updateTaskStatus = async (req, res) => {
  const { status, proof } = req.body;
  const task = await Task.findById(req.params.id);

  // if (task.assignedTo.toString() !== req.user.id) {
  //   return res
  //     .status(403)
  //     .json({ message: "Not authorized to update this task" });
  // }

  task.status = status;
  if (proof) task.proof = proof;

  await task.save();
  res.json({ message: "Task status updated" });
};

export const reviewTask = async (req, res) => {
  // if (req.user.role !== "admin")
  //   return res.status(403).json({ message: "Access denied" });

  const { status } = req.body;
  console.log(req.body);
  const task = await Task.findById(req.params.id);

  task.status = status;
  await task.save();

  res.json({ message: `Task has been ${status}` });
};

export const gettasks = async (req, res) => {
  try {
    const { userId } = req.params; // URL se userId lega
    const tasks = await Task.find({ assignedTo: userId });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};
export const reassignTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "Reassigned";
    await task.save();

    res.status(200).json({ message: "Task reassigned successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error reassigning task", error });
  }
};
