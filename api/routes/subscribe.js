import express from "express";
const router = express.Router();
import { subscribe, getSubscribe } from "../controllers/subscribe.js";

// Subscribe to mailing list
router.post("/subscribe", subscribe);

// Get all subscribers
router.get("/subscribers", getSubscribe);

export default router;