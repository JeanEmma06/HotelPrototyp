import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export const getUserBooking = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.bookings.map((booking) => {
        return Booking.findById(booking);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

export const getLastBooking = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const list = await Promise.all(
      user.bookings.map((booking) => {
        return Booking.findById(booking);
      })
    );
    const sortedList = list.sort((a, b) => b._id - a._id);
    const mostRecentBooking = sortedList[0];
    res.status(200).json(mostRecentBooking);
  } catch (err) {
    next(err);
  }
};