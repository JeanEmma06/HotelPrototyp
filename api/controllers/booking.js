import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import User from "../models/User.js";

export const createBooking = async (req, res, next) => {
  const roomId = req.params.roomid;
  const { userId, checkIn, checkOut, totalPrice, creditCard } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    /*
    const bookedDates = await Booking.find({
      roomId,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });
    if (bookedDates.length > 0) {
      res.status(409).json({ message: "Room is not available for selected dates" });
      return;
    }
    */

    const booking = new Booking({ userId, checkIn, checkOut, totalPrice, creditCard });
    await booking.save();

    await Room.findByIdAndUpdate(roomId, { $push: { bookings: booking._id } });

    await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};


export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const roomId = booking.roomId;
    const userId = booking.userId;

    // Supprimer la référence de la réservation dans la chambre
    await Room.findByIdAndUpdate(roomId, { $pull: { bookings: req.params.id } });

    // Supprimer la référence de la réservation dans l'utilisateur
    await User.findByIdAndUpdate(userId, { $pull: { bookings: req.params.id } });

    // Supprimer la réservation
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json("Booking has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getRoomByBookingId = async (req, res, next) => {
  try {
    const room = await Room.findOne({ bookings: req.params.id });
    if (!room) {
      return res.status(404).json({ message: "Chambre non trouvée" });
    }

    res.status(200).json({ room });
  } catch (err) {
    next(err);
  }
};


export const getBookings = async (req, res, next) => {
 
  try {
    const bookings = await Booking.find()
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};
