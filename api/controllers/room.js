import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const getRooms = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const rooms = await Room.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};


export const getRoomBooking = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    const list = await Promise.all(
      room.bookings.map((booking) => {
        return Booking.findById(booking);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
