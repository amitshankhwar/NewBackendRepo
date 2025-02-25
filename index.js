import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// const express = reqiure("express");

const app = express();

app.use(express.json()); //built-in middlewares

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

dotenv.config();

dbConnect();

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// module.exports = {
//   app
// };
