import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";

import connectDB from './src/db/db'
connectDB();

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})






