import React from "react";
import { useState } from "react";
import io from  'socket.io-client';
import Chat from "./Chat";

const socket = io.connect('http://localhost:3001'); // connect to the server's port (
function App(){

    const [username , setusername]= useState("");
    const  [room,setRoom] =useState("");
    const [showChat , setShowChat]= useState(false);

    const joinRoom= ()=>{
        if (username !== "" && room !== ""){
            socket.emit("join_room",room);
            setShowChat(true);

        }
    };

    return(
        <div className="App">
        {!showChat ? (
        <div className="joinChatContainer">
        <div className="app-name">
            <h1>Connectz</h1>
           </div> 
           <div className="join">
            <input type="text" placeholder="username" onChange={(event)=>{
                setusername(event.target.value);
            }}></input>
            <input type="text" placeholder="roomID" onChange={(event)=>{
                 setRoom(event.target.value)
            }}></input>
            <button onClick={joinRoom}>Join Room</button>
        </div>
        </div>
        ) : (
            <Chat username= {username} room={room} socket={socket}/>
            
        )
        }
        </div>
    );
}

export default App; 