import express from "express";
import {
  assignTask,
  getUserTasks,
  updateTaskStatus,
  reviewTask,
  getAllTasks,
  gettasks,
  reassignTask,
  deletetask,
  markTaskCompleted,
  getTaskFeedback,
} from "../controllers/taskControllers.js";
import auth from "../middlewares/auth.js";
import checkAuthUserRole from "../middlewares/checkAuthuserRole.js";
import upload from "../middlewares/upload.js";
const router = express.Router();

router.post("/assign", assignTask); // Admin assigns task
router.get("/Alltsk", getAllTasks); // Get tasks for admin/employee
router.get("/Usertsk", checkAuthUserRole, getUserTasks); // Get tasks for admin/employee
router.patch("/:id/status", upload.single("proof"), updateTaskStatus); // Employee updates status
router.patch("/:id/complete", checkAuthUserRole, markTaskCompleted);
router.patch("/:id/review", checkAuthUserRole, reviewTask); // Admin reviews task
router.get("/user/:userId", gettasks);
router.patch("/:id/reassign", auth, reassignTask);
router.delete("/:id", deletetask);
router.get("/:id/feedback", getTaskFeedback);
export default router;
