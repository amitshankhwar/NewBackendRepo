import Task from "../models/Task.js";

export const assignTask = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  const { title, description, assignedTo } = req.body;
  const task = new Task({ title, description, assignedTo });

  await task.save();
  res.status(201).json({ message: "Task assigned successfully" });
};

export const getTasks = async (req, res) => {
  const tasks =
    req.user.role === "admin"
      ? await Task.find().populate("assignedTo", "name email")
      : await Task.find({ assignedTo: req.user._id });

  res.json(tasks);
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
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  const { status } = req.body; // 'approved' or 'rejected'
  const task = await Task.findById(req.params.id);

  task.status = status;
  await task.save();

  res.json({ message: `Task has been ${status}` });
};
