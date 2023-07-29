import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'
import ParticipantView from './ParticipantView';
import {BsSend} from 'react-icons/bs'
const socket = io('http://localhost:4000'); // Replace with your server address

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
      socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
        const messageData = {
        id: Date.now(),
        message: inputMessage.trim(),
      };
      socket.emit('sendMessage', messageData);
      setInputMessage('');
    }
  };

  return (
    <div className='bg-light border rounded p-3'>
      <h2 className='text-dark'>Chat</h2>
      <div>
        <ul>
          <div class="d-flex justify-content-between">
              {/* <p class="small mb-1 text-muted">23 Jan 6:10 pm</p>
              <p class="small mb-1">Johny Bullock</p> */}
            </div>
            <div class="d-flex flex-row justify-content-start mb-4 pt-1">
              <div>
                {/* <p class="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">Dolorum quasi voluptates quas
                  amet in
                  repellendus perspiciatis fugiat</p> */}
              
              
              {messages.map((messageData) => (
            <li className='message small p-2 me-3 mb-3 text-white rounded-3' key={messageData.id}>{messageData.message}</li>
            ))}
            </div>
              {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1" style={{width: "45px", height: "100%"}}/> */}
            </div>

          
        </ul>
      </div>
      <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
          <input className='form-control me-2' placeholder="Type message"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="btn" type="button" id="send-message"  onClick={handleSendMessage}><BsSend/></button>
        </div>
        
      </div>
    </div>
  );
};

export default Chat;
