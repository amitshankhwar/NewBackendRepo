import express from "express";
import {
  assignTask,
  getTasks,
  updateTaskStatus,
  reviewTask,
} from "../controllers/taskControllers.js";
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/assign", auth, assignTask); // Admin assigns task
router.get("/", auth, getTasks); // Get tasks for admin/employee
router.patch("/:id/status", auth, updateTaskStatus); // Employee updates status
router.patch("/:id/review", auth, reviewTask); // Admin reviews task

module.exports = router;
