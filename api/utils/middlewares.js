import Hotel from "../models/Hotel.js";
import Review
 from "../models/Review.js";
export const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const hotel = await Hotel.findById(id);
  if (!hotel.owner.equals(req.user.id)) {
    return res.status(405).json("You do not have permission to do that");
  }
  next();
};

export const isReviewOwner = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.owner.equals(req.user.id)) {
    return res.status(405).json("You do not have permission to delete the review");
  }
  next();
};
