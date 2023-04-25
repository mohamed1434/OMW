import express from "express";
import { createReview, deleteReview } from "../controllers/review.js";
import { verifyUser } from "../utils/verifyToken.js";
import { isReviewOwner } from "../utils/middlewares.js";

const router = express.Router({ mergeParams: true });

router.post("/", verifyUser, createReview);
router.delete("/:reviewId", verifyUser, isReviewOwner, deleteReview);

export default router;
