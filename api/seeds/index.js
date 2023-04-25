import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import dotenv from "dotenv";
import express from "express";
import path from "path";
// const cities = require('./cities');
// const { places, descriptors } = require('./names');
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
const port = 8000;

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
    

const titleName = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
        await Hotel.deleteMany({});
}

app.listen(port, async () => {
    await connect();
    console.log("Connected to port number : " + port);
    await seedDB();
    mongoose.connection.close();
  });
