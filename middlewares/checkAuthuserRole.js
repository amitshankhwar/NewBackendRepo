import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
import User from "../models/userSchema.js";

async function checkAuthuserRole(req, res, next) {
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

    req.user = user;
    next(); // ✅ Authentication success, move to next middleware
  } catch (error) {
    console.error("JWT Auth Error:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

export default checkAuthuserRole;
