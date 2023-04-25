import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  body: String,
  rating: Number,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
});

ReviewSchema.index({ owner: 1, hotel: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
