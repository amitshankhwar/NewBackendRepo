import User from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

async function handleRegisterController(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "user not registered!!" });
    }

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(200)
        .json({ success: false, message: "password is incorrect!!" });
    }

    //JWT AUTHENTICATION

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "user logged in successfully",
        token,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, messsage: "internal server error", error });
  }
}

async function handleGetAllUsersController(req, res) {
  try {
    const allUsers = await User.find();

    if (!allUsers) {
      return res
        .status(400)
        .json({ success: false, message: "data not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "data found successfully", allUsers });
  } catch (error) {
    return res.status(400).json({ messsage: "internal server error", error });
  }
}

async function handleUserUpdateController(req, res) {
  try {
    const { id } = req.params;

    const { name, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { name, role }
    );

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "user updated successfully" });
  } catch (error) {
    return res.status(400).json({ messsage: "internal server error", error });
  }
}

async function handleUserDeleteController(req, res) {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete({ _id: id });

    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    return res.status(400).json({ messsage: "internal server error", error });
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

async function handleSingleUserData(req, res) {
  const id = req.userId;

  try {
    const userInfo = await User.findOne({ _id: id }).select("-password");

    if (!userInfo) {
      res.status(200).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user found",
      userInfo,
    });
  } catch (error) {
    return res.status(400).json({ messsage: "internal server error", error });
  }
}

export {
  handleRegisterController,
  handleLoginController,
  handleGetAllUsersController,
  handleUserUpdateController,
  handleUserDeleteController,
  handleUserLogoutController,
  handleSingleUserData,
};
