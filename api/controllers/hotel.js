import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import firebaseAdmin from "firebase-admin";
import { v4 as uuidv4 } from "uuid";

// import serviceAccount from "../onmyway-356ba-firebase-adminsdk-k5cl2-8106d3a9a4.json" assert { type: "json" };

// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   storageBucket: "gs://onmyway-356ba.appspot.com"
// });

// export const createHotel = async (req, res, next) => {
//   const { title, name, type, city, address, distance, photos, desc, price } =
//     req.body;

//   // Create a new hotel instance with the provided data
//   const newHotel = new Hotel({
//     title,
//     name,
//     type,
//     city,
//     address,
//     distance,
//     desc,
//     price,
//     owner: req.user.id, // assuming you're using passport.js for authentication
//   });
//   console.log(req.body);
//   try {
//     const imageUrls = await Promise.all(
//       photos.map(async (photo) => {
//         const bucket = firebaseAdmin.storage().bucket();
//         const uuid = uuidv4();
//         const file = bucket.file(`properties/${uuid}.jpg`);
//         await file.save(photo.buffer, { contentType: "image/jpeg" });
//         return file.getSignedUrl({ action: "read", expires: "03-17-2025" });
//       })
//     );
//     newHotel.photos = imageUrls;
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel);
//   } catch (error) {
//     next(error);
//   }
// };

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  newHotel.owner = req.user.id;
  console.log(newHotel);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted !");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate({
      path: "reviews",
      populate: {
        path: "owner",
      },
    });
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const query = Object.entries(others).reduce((acc, [key, value]) => {
      acc[key] = { $regex: new RegExp(value, "i") };
      return acc;
    }, {});
    const hotels = await Hotel.find({
      ...query,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(req.query.limit);

    setTimeout(() => {
      res.status(200).json(hotels);
    }, 2000);
  } catch (err) {
    next(err);
  }
};

export const getUserHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id }).populate("owner");
    res.json({ hotels });
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  const types = req.query.types.split(",");
  try {
    const list = await Promise.all(
      types.map(async (type) => {
        const count = await Hotel.countDocuments({ type: type });
        return { type, count };
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getHotelRoom = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
