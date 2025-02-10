import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import { User } from "../models/userSchema.js";

dotenv.config();

async function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "user not authorized" });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "user not authorized" });
    }

    const { userId } = decoded;

    const userInfo = await User.findOne({ _id: userId });

    console.log(userInfo);

    if (userInfo.role !== "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Permission denied" });
    }

    req.userId = userId;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "token expired" });
    }
    return res
      .status(401)
      .json({ success: false, message: "user not authorized" });
  }
}

export default auth;
