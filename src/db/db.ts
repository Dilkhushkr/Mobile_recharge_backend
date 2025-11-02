import mongoose from "mongoose";

const connectDB =  async ()=> {

   await mongoose.connect(process.env.MONGODB_URI || "")
    .then(()=>{
        console.log("Connected with database")
    })
    .catch((err)=>{
        console.log("Database connection failed", err)
    })

}
export default connectDB;
