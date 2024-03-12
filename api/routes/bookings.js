import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js"
import { createBooking, 
    updateBooking, 
    deleteBooking,
    getRoomByBookingId,
    getBookings,
 } from "../controllers/booking.js";

const router = express.Router();

router.post("/:roomid", createBooking);

router.get("/", getBookings);
router.get("/room/:id", getRoomByBookingId);
router.put("/:id", verifyAdmin, updateBooking);
router.delete("/:id", verifyAdmin, deleteBooking);

export default router;