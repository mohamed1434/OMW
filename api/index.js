import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reviewRoute from "./routes/reviews.js";
import uploadsRoute from "./routes/uploads.js"
import cookieParser from "cookie-parser";
import cors from "cors";

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

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/hotels/:id/reviews", reviewRoute);
app.use("/rooms", roomsRoute);
app.use("/uploads", uploadsRoute);

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
