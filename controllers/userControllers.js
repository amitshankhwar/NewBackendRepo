import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import dbConnect from "../db/dbConnect.js";

async function handleRegisterController(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }

  // handle login
}
async function handleLoginController(req, res) {
  const { email, password, role } = req.body; // Removed role from req.body

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not registered!!" });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(200)
        .json({ success: false, message: "Password is incorrect!!" });
    }

    // JWT Authentication
    const token = await jwt.sign(
      { userId: user._id, role: user.role }, // Include role in the token
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      })
      .json({
        success: true,
        message: "User logged in successfully",
        token,
        role: user.role, // Send role in response
      });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Internal server error", error });
  }
}

async function handleUserLogoutController(req, res) {
  try {
    return res.status(200).cookie("token", "").json({
      success: true,
      message: "user logout successfully",
    });
  } catch (error) {
    return res.status(400).json({ messsage: "internal server error", error });
  }
}
async function handleGetAllUsersController(req, res) {
  try {
    const users = await User.find({}, "username email role"); // Include role
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
}

async function isAuth(req, res) {
  const token = req.cookies.token; // Access HttpOnly cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const _id = decoded.userId;

    const userInfo = await User.findOne({ _id });

    return res.status(200).json({ valid: true, userInfo });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export {
  handleRegisterController,
  handleLoginController,
  handleUserLogoutController,
  isAuth,
  handleGetAllUsersController,
};
