import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    phone : {
        type : String,
        required : true,
        unique : true
    },
    otp : {
        type : String,
    },
    isVerified : {
        type : Boolean,
        default : false
    }

})

const User = mongoose.model("User", userSchema);

export default User