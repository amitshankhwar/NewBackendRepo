import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function checkAuthUserRole(req, res, next) {
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

    req.userId = decoded.userId;

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

export default checkAuthUserRole;
