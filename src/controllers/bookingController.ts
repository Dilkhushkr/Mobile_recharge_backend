import { Request, Response } from 'express';
import Booking from "../model/bookingModel";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { name, phone, startingLocation, endLocation, date } = req.body;

    // Validate input fields
    if (!name || !phone || !startingLocation || !endLocation || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create and save new booking
    const savedBooking = await Booking.create({
      name,
      phone,
      startingLocation,
      endLocation,
      date,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
