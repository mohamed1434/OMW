import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRoom,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { isOwner } from "../utils/middlewares.js";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createHotel);

//UPDATE
router.put("/:id", verifyUser, isOwner, updateHotel);

//DELETE
router.delete("/:id", verifyUser, isOwner, deleteHotel);

//GET
router.get("/show/:id", getHotel);

//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRoom);

//Testing get properties of the owner
// router.get()

export default router;
