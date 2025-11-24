import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email:{
        type : String,
        unique : true,
        required : true,
    },
    password:{
        type : String,
        required : true,
    }

}) 

const Signup = mongoose.model("Signup", signupSchema);
export default Signup;