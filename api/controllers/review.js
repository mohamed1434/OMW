import Hotel from "../models/Hotel.js";
import Review from "../models/Review.js";

//old createReview function
// export const createReview = async (req, res, next) => {
//   const hotel = await Hotel.findById(req.params.id);
//   console.log(hotel);
//   const review = new Review(req.body.review);
//    hotel.reviews.push(review);
//   try {
//     await review.save();
//     await hotel.save() ;
//   } catch (error) {
//     next(error);
//   }
// };

//New createReview function
// export const createReview = async (req, res, next) => {
//   const hotel = await Hotel.findById(req.params.id);
//   if (!hotel) {
//     return res.status(404).json({ message: "Hotel not found" });
//   }
//   const review = new Review(req.body);
//   hotel.reviews.push(review);
//   try {
//     await review.save();
//     await hotel.save();
//     res.status(200).json("Added a review");
//   } catch (error) {
//     next(error);
//   }
// };

export const createReview = async (req, res, next) => {
  const hotelId = req.params.id;
  const userId = req.user.id; // assuming you have access to the current user's id
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
  }
  const review = new Review({
    ...req.body,
    owner: userId,
    hotel: hotelId,
  });
  try {
    await review.save();
    hotel.reviews.push(review);
    await hotel.save();
    res.status(200).json("Added a review");
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (user has already left a review for this hotel)
      res
        .status(400)
        .json({ message: "You have already left a review for this hotel" });
    } else {
      next(error);
    }
  }
};

export const deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  try {
    await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json("Review deleted !");
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const Reviews = await Review.find();
    res.status(200).json(Reviews);
  } catch (error) {
    next(error);
  }
};

export const getPropertyReviews = async (req, res, next) => {
  try {
    const hotelId = req.params.id;
  } catch (error) {
    
  }
};
