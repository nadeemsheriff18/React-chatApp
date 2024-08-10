import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import SendIcon from '@mui/icons-material/Send';



function Chat({socket, username, room}){
const [currentMessage, setMessage]=useState("");
const [messages,setMessages] = useState([]); 

const sendMessage= async()=>{
    if (currentMessage !==""){
        const messageData ={
            room:room,
            author : username,
            message : currentMessage,
            dateTime : new Date().toLocaleString()

        };
        
        await socket.emit("send_message",messageData);
        setMessages((messages)=>[...messages, messageData]);
        setMessage("");
    }
};
 useEffect(()=>{
socket.on("receive_message",(data)=>{
    console.log(data);
    setMessages((messages)=>[...messages, data]);
})
},[socket]);

return(
    <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
        <ScrollToBottom className="message-container">
            {messages.map((messageContent)=>{
             return (
                <div className="message" id={username===messageContent.author?"you":"other"}>
                    <div className="message-content">
                        <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                        <p id="author">{messageContent.author}</p>
                        <p id="time">{messageContent.dateTime}</p>
                    </div>

                </div>
             )
            }
            
            )}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
        <input type="text" value={currentMessage} placeholder="Hey...." onChange={(event)=>{
            setMessage(event.target.value);
         
        }}
            onKeyDown={(event)=>{
            event.key ==="Enter" && sendMessage();
        }}  > 
        </input>
            <button onClick={sendMessage}><SendIcon /></button>
        </div>
    </div>
    

        


    
);
}

export default Chat;