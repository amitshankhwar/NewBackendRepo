import express from "express";
import {
  handleGetAllUsersController,
  handleLoginController,
  handleRegisterController,
  handleUserDeleteController,
  handleUserUpdateController,
} from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";

const router = express.Router(); //CRUD -> CREATE , read, update, delete

router.post("/register", handleRegisterController);

router.post("/login", handleLoginController);

router.get("/getusers", auth, handleGetAllUsersController);

router.put("/update/:id", handleUserUpdateController);

router.delete("/delete/:id", handleUserDeleteController);

export default router;
