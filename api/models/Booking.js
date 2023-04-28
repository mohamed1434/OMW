import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
});

export default mongoose.model("Booking", BookingSchema);
