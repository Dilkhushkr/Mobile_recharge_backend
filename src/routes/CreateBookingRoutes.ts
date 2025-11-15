import express from "express";
import { createBooking } from "../controllers/bookingController";
import { getBookings } from "../controllers/bookingRoutes";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create-booking", protect, createBooking as any);
router.get("/get-bookings", getBookings );

export default router;