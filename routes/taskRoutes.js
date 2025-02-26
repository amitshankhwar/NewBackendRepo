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
} from "../controllers/taskControllers.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/assign", assignTask); // Admin assigns task
router.get("/Alltsk", getAllTasks); // Get tasks for admin/employee
router.get("/Usertsk", auth, getUserTasks); // Get tasks for admin/employee
router.patch("/:id/status", auth, updateTaskStatus); // Employee updates status
router.patch("/:id/review", auth, reviewTask); // Admin reviews task
router.get("/user/:userId", gettasks);
router.patch("/:id/reassign", auth, reassignTask);
router.delete("/:id", deletetask);

export default router;
