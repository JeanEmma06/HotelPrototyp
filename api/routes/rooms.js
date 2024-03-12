import express from "express";
const router = express.Router();
import {
  createRoom,
  getRoomBooking,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";


//CREATE
router.post("/", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id", verifyAdmin, deleteRoom);
//GET ROOM BOOKING
router.get("/bookings", getRoomBooking);
//GET
router.get("/find/:id", getRoom);
//GET ALL
router.get("/", getRooms);
 
export default router;
