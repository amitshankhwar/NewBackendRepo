import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
// const express = reqiure("express");

const app = express();

app.use(express.json());

dotenv.config();

dbConnect();

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// module.exports = {
//   app
// };
