import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    phone :{
        type : String,
        required : true
    },
    startingLocation :{
        type : String,
        required : true 
    },
    endLocation: {
        type: String,
       required: true,
    },
    date: {
        type: Date,
        required: true,
    }
},{ timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;