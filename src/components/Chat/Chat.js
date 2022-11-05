import React, { Fragment, useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import { user } from '../Join/Join'; 
import './chat.css';
import Message from '../Message/Message.js'
import crossIcon from '../../images/cross.png'
import sendIcon from '../../images/send.png'
import chatLogo from '../../images/logo.jfif'
import ReactScrollToBottom from 'react-scroll-to-bottom'
// import {  useNavigate } from 'react-router-dom';
const ENDPOINT = "https://ravi-ichatapp.herokuapp.com/";

let socket;
const Chat = () => {

  const [message, setMessage] = useState("");
  const [id, setid] = useState("");
  const [messages, setmessages] = useState([]);
  // const Navigate = useNavigate();



  const sendMessage = ()=>{
    socket.emit('message', {message, id})
    setMessage("")
    // console.log("fine")
  }
  
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket']});

    
    
    socket.on('connect',  ()=>{
        // alert("Continue...");
        // console.log(socket.id)
        setid(socket.id)
      })
      socket.emit('joined', {user});
      
      // socket.emit('cheack',{id})
  
   
  }, []);

  // console.log(messages)
  useEffect(() => {

    socket.on('sendMessage', (data)=>{
      setmessages([...messages,data])
      // console.log(data.user,data.message,data.id)
    })

    socket.on('welcome' , (data)=>{
      // console.log(data.user, data.message);
      setmessages([...messages,data])
    })
    
    socket.on('userJoined' , (data)=>{
      // console.log(data.user, data.message);
      setmessages([...messages,data])

    })

    socket.on('leave', (data)=>{
      // console.log(data.user, data.message);
      setmessages([...messages,data])
    })
    
    return () =>{
      socket.on('disconnect');
      socket.off();
    }

  }, [messages]);

 
  return (

    <Fragment>
      <div className='chatPage'>
  {/* {console.log("hi")} */}
      <div className='chatContainer' >
        <div className='header'>
          <p> <img src={chatLogo} alt="" width={45} /> RG CHAT</p>
          <a href="/"><img src={crossIcon} alt="cross" width={20} /></a>
        </div>

        <ReactScrollToBottom className='chatBox'>
          {messages && messages.map((item)=>(
          <Message user={item.id===id?'': item.user}  message={item.message} classs={ 
            item.id===id?`right`: item.user==="Admin" ?  `center` :`left`}  />
          ))}

        </ReactScrollToBottom>

        <div className='inputBox'>
          <input type="text" onKeyPress={(e)=>e.key === 'Enter' && message!==""?sendMessage():null } id='chatInput' value={message} placeholder="Typing" onChange={(e)=>setMessage(e.target.value)} />
          <button onClick={sendMessage} disabled={message===""? true : false} className='sendBtn'><img src={sendIcon} alt="send" width={23} /></button>
        </div>

      </div>

    </div>
    </Fragment>
  )
}

export default Chat