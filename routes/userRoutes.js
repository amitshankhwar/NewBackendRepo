import express from "express";
import {
  handleGetAllUsersController,
  handleLoginController,
  handleRegisterController,
  handleUserDeleteController,
  handleUserUpdateController,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", handleRegisterController);

router.post("/login", handleLoginController);

router.get("/getusers", handleGetAllUsersController);

router.put("/update/:id", handleUserUpdateController);

router.delete("/delete/:id", handleUserDeleteController);

export default router;
