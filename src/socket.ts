import {Server as IOServer} from "socket.io";
import http from "http";


let io : IOServer | null = null;

export function initSocket(server : http.Server){

    io = new IOServer(server,{

        cors:{
            origin:[
                "http://localhost:5173",
                "https://adityacar1.netlify.app"
            ],
            methods:["GET","POST"],
            credentials:true,
        }

    });


    io.on("connection",(Socket)=>{
        console.log("New client connected",Socket.id);

        Socket.on("join : Admin",()=>{
            Socket.join("admins");
            console.log(`Socket ${Socket.id} joined admins room`);
        })



    })

    return io;

}


export function getIO() {
  if (!io) throw new Error("Socket IO not initialized!");
  return io;
}