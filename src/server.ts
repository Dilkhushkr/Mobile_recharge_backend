import dotenv from "dotenv";
dotenv.config();

import app from "./app";

import connectDB from './db/db'
connectDB();

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})






