import express from "express";
import {
  handleGetAllUsersController,
  handleLoginController,
  handleRegisterController,
  handleUserDeleteController,
  handleUserUpdateController,
} from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";
import checkAuthUserRole from "../middlewares/checkAuthuserRole.js";

const router = express.Router(); //CRUD -> CREATE , read, update, delete

router.post("/register", handleRegisterController);

router.post("/login", handleLoginController);

router.get("/getusers", checkAuthUserRole, handleGetAllUsersController);

router.put("/update/:id", auth, handleUserUpdateController);

router.delete("/delete/:id", auth, handleUserDeleteController);

export default router;
