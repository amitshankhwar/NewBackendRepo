import express from "express";
import { handleRegisterController } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", handleRegisterController);

export default router;
