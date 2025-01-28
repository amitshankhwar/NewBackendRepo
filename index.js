import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
// const express = reqiure("express");

const app = express();

app.use(express.json()); //built-in middlewares

app.use(cookieParser());

dotenv.config();

dbConnect();

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// module.exports = {
//   app
// };
