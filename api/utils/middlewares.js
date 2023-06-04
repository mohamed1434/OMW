import Hotel from "../models/Hotel.js";
import Review from "../models/Review.js";
export const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const hotel = await Hotel.findById(id);
  if (!hotel.owner.equals(req.user.id) && !req.user.isAdmin) {
    return res.status(405).json("You do not have permission to do that");
  }
  next();
};

export const isOwnerOfAllHotels = async (req, res, next) => {
  const hotelIds = req.body.hotelIds; // assuming the hotel ids are sent in the request body
  const hotels = await Hotel.find({ _id: { $in: hotelIds } });

  for (const hotel of hotels) {
    if (!hotel.owner.equals(req.user.id)) {
      return res.status(405).json("You do not have permission to do that");
    }
  }
  next();
};

export const isReviewOwner = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.owner.equals(req.user.id)) {
    return res
      .status(405)
      .json("You do not have permission to delete the review");
  }
  next();
};
