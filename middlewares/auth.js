import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/userSchema.js";

dotenv.config();

async function auth(req, res, next) {
  try {
    console.log("Cookies received in request:", req.cookies); // 🔥 Debug

    const token = req.cookies.token;
    console.log("Token:", token); // 🔥 Debug

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded JWT:", decoded); // 🔥 Debug

    const user = await User.findById(decoded.userId).select("-password");
    console.log("Authenticated User:", user); // 🔥 Debug

    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    req.user = user;
    next(); // ✅ Authentication success, move to next middleware
  } catch (error) {
    console.error("JWT Auth Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export default auth;
