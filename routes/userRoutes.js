import express from "express";
import {
  handleGetAllUsersController,
  handleLoginController,
  handleRegisterController,
  handleSingleUserData,
  handleUserDeleteController,
  handleUserLogoutController,
  handleUserUpdateController,
  isAuth,
} from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";
import checkAuthUserRole from "../middlewares/checkAuthuserRole.js";

const router = express.Router(); //CRUD -> CREATE , read, update, delete

router.post("/register", handleRegisterController);

router.post("/login", handleLoginController);

router.get("/getusers", checkAuthUserRole, handleGetAllUsersController);

router.put("/update/:id", auth, handleUserUpdateController);

router.delete("/delete/:id", auth, handleUserDeleteController);

router.get("/single-user", checkAuthUserRole, handleSingleUserData);

router.get("/logout", handleUserLogoutController);

router.get("/verify-token", isAuth);

export default router;
