import { usePubSub } from "@videosdk.live/react-sdk";
import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";

function Messages() {
  // destructure publish method from usePubSub hook
  const meeting  = useMeeting();
  const [message, setMessage] = useState([]);
  const isSubscribed = useRef(false);
  const { publish,messages } = usePubSub("CHAT",meeting)
//   , {
//     onMessageReceived: (message) => {
//       console.log("New Message Recieved", message);
//     },
//     onOldMessagesReceived: (messages) => {
//       console.log("Old Message publsihed with persist:true Recieved", messages);
//     },
//   });

  // State to store the user typed message
  

  const handleSendMessage = () => {
    // Sending the Message using the publish method
    publish(message, { persist: true });
    // Clearing the message input
    setMessage("");
  };

  return (
    <>
    <div>
      <p>Messages: </p>
      {messages.map((message) => {
        return (
          <p>
            {message.senderName} says {message.message}
          </p>
        );
      })}
      </div>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={handleSendMessage}>Send Message</button>
    </>
  );
}

export default Messages