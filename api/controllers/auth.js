import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const TOKEN = "access_token";
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      phone: req.body.phone,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin
    });
    await newUser.save();
    // res.status(200).send("Successfully created a user");
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = newUser._doc;
    res
      .cookie(TOKEN, token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(404, "Username or Password is not correct !"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Username or Password is not correct !"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc; //return img alone
    res
      .cookie(TOKEN, token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details:{...otherDetails}, isAdmin }); //if something goes wrong remove isAdmin and details
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  // Set token to none and expire after 5 seconds
  res
    .status(200)
    .cookie(TOKEN, "none", {
      httpOnly: true,
    })
    .json({ success: true, message: "User logged out successfully" });
};
