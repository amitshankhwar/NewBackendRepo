import express from "express";
import {
  handleLoginController,
  handleRegisterController,
  handleUserLogoutController,
  isAuth,
  handleGetAllUsersController,
} from "../controllers/userControllers.js";

const router = express.Router(); //CRUD -> CREATE , read, update, delete

router.post("/register", handleRegisterController);

router.post("/login", handleLoginController);

router.get("/logout", handleUserLogoutController);

router.get("/allusers", handleGetAllUsersController);

router.get("/verify-token", isAuth);

export default router;
