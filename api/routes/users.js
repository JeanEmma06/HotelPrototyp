import express from "express";
const router = express.Router();

import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserBooking,
  getLastBooking,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";




//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);
router.get("/bookings/:id", verifyUser, getUserBooking);
router.get("/confirm/:id", verifyUser, getLastBooking);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
