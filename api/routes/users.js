import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { getUserHotels } from "../controllers/hotel.js";
import { isOwner, isOwnerOfAllHotels } from "../utils/middlewares.js";
const router = express.Router();

// router.get("/checkAuth", verifyToken, (req, res, next) => {
//   res.send("Hello user you are auth");
// });

// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user you can delete your account !");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
// router.get("/:id", verifyUser, getUser);

//GET ALL
// router.get("/", verifyAdmin, getUsers);

//GET HOTELS
router.get("/properties", verifyUser, isOwnerOfAllHotels, getUserHotels);

export default router;
