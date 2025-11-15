import express, { Request, Response } from "express";
import Booking from "../model/bookingModel";


export const getBookings = async (req : Request , res : Response)=>{
    try{
        const booking = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({
            success : true,
            data : booking,
        })

    }catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }

}
