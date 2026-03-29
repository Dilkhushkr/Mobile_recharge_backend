import dotenv from "dotenv";
dotenv.config();

import app from "./app";

import connectDB from './db/db'
import http from "http";
import { initSocket } from "./socket";


connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})








