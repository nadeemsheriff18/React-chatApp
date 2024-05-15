import Express from "express";
import http from  "http";
import cors from  'cors';
import {Server} from  "socket.io"

const app= Express();
const port = 3001;
app.use(cors());

const server=http.createServer(app);

const io= new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET","POST"],
    }
});

io.on("connection", socket =>{
     console.log(`A user connected on the socket id ${socket.id}`);
     
     //When a client send a message event we listen to it and print the data in the console
     socket.on("join_room", (data)=>{
        socket.join(data);
        console.log(`user with userID ${socket.id} joined the room ${data}`);
     })
    
    

     socket.on("send_message", (data)=>{
         //console.log(data)
         socket.to(data.room).emit("receive_message", data);//Send back

     });

     socket.on("disconnect", () =>{
        console.log(`user with id ${socket.id} disconnected`);
     })
    });

server.listen(port, () =>{
    console.log(`Server is running on ${port}`);
});