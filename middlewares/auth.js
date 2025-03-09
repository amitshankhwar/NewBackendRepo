import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

async function auth(req, res, next) {
  try {
    // 🔥 Debug

    const token = req.cookies.token;
    // 🔥 Debug

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // 🔥 Debug

    const user = await User.findById(decoded.userId).select("-password");

    // if (!user || user.role !== "admin") {
    //   return res.status(401).json({ message: "Unauthorized: Invalid user" });
    // }

    req.user = user;
    next(); // ✅ Authentication success, move to next middleware
  } catch (error) {
    console.error("JWT Auth Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export default auth;
