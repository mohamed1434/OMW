import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
const port = 8000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDb disconnected");
});

//MiddleWares

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const messageStatus = err.message || "Something went wrong !";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: messageStatus,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log("Connected to port number : " + port);
});