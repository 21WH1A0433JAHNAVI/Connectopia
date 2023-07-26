import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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
    <div>
      <h2>Chat</h2>
      <div>
        <ul>
          {messages.map((messageData) => (
            <li key={messageData.id}>{messageData.message}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
