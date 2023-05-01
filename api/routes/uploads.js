import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import { isOwner } from "../utils/middlewares.js";
import { getImages, uploadImages } from "../controllers/uploads.js";

const router = express.Router();
router.post("/upload",verifyUser, uploadImages);
router.get("/assets/img/:file", getImages);

export default router;