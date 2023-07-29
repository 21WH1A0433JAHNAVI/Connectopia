import React, { useEffect, useMemo, useRef, useState } from "react";
import {BsFillMicFill,BsFillCameraVideoFill, BsFillMicMuteFill,BsFillCameraVideoOffFill,BsGraphUp,BsFillChatLeftTextFill} from 'react-icons/bs'

import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
  usePubSub
} from "@videosdk.live/react-sdk";

import Controls from "./Controls";
import ParticipantView from "./ParticipantView";
import Hls from "hls.js";
import Whiteboard from "./Whiteboard";
import ExcalidrawBoard from "./Excalidraw";
import Participants from "./Participants";
import Chat from "./Chat";

import io from 'socket.io-client';
import './Chat.css'
import {TiMessages} from 'react-icons/ti'
import {FaUserGroup} from 'react-icons/fa'
import {MdGroup,MdGroupOff} from 'react-icons/md'
import { BsSend } from "react-icons/bs";
const socket = io('http://localhost:4000');
function SpeakerView() {
  //Get the participants and hlsState from useMeeting
  const { participants, hlsState } = useMeeting();
  const [showParticipants, setShowParticipants] = useState(true);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showMessages, setShowMessages] = useState(true)
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


  //Filtering the host/speakers from all the participants
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode === Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);
  
  
  //Filtering the viewers from all the participants
  const viewers = useMemo(() => {
    const viewersParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode === Constants.modes.VIEWER;
      }
    );
    return viewersParticipants;
  }, [participants]);

  const playerRef = useRef(null);
  //Getting the hlsUrls
  const { hlsUrls, leave,toggleMic, toggleWebcam, startHls, stopHls} = useMeeting();
  //Playing the HLS stream when the downstreamUrl is present and it is playable
  
const handleToggleParticipants = () => {
    setShowParticipants((prevShow) => !prevShow);
  };

  const handleToggleMessages = () => {
    setShowMessages((prevShow) => !prevShow);
  };

  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState === "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: "mp4a.40.2",
        });

        let player = document.querySelector("#hlsPlayer");

        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
  }
  }, [hlsUrls, hlsState, playerRef.current]);
  

  return (
    <div className=""> 
    <div className="d-flex flex-row">
      {/* Controls for the meeting */}
      {showParticipants && (
        <Participants/>
      )}
      
      {hlsState !== "HLS_PLAYABLE" ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div className="container mt-4 mb-4 rounded border-none">
            
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay={true}
              controls
              style={{ width: "100%", height: "100%" }}
              playsinline
              playsInline
              muted={true}
              playing
              onError={(err) => {
                console.log(err, "hls video error");
              }}
            ></video>
          </div>
        )
      )}
      {showMessages && (
        //here is the messages div
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
        <div className="card-footer-send text-muted d-flex justify-content-start align-items-center p-3">
          <input className='form-control me-2' placeholder="Type message"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="btn" type="button" id="send-message"  onClick={handleSendMessage}><BsSend/></button>
        </div>
        
        </div>
      </div>)}
      </div>
      <Controls />
      <button onClick={handleToggleParticipants}>
        {showParticipants ? <MdGroup/> : <MdGroupOff/>}
      </button>
      <button onClick={handleToggleMessages}>
        {showMessages ? <TiMessages/> : <TiMessages/>}
      </button>
      

    </div>
  );
}

export default SpeakerView
