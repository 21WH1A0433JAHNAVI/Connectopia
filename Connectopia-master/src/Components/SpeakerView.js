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
import Whiteboard from "./CollabBoard";
import ExcalidrawBoard from "./Excalidraw";
import Participants from "./Participants";
import Chat from "./Chat";

import io from 'socket.io-client';
import './Chat.css'
import {TiMessages} from 'react-icons/ti'
import {FaUserGroup} from 'react-icons/fa'
import {MdGroup,MdGroupOff} from 'react-icons/md'
import { BsSend } from "react-icons/bs";
import RealTimeGraphPlotter from "./Graphplotter";
const socket = io('http://localhost:4000');
function SpeakerView() {
  //Get the participants and hlsState from useMeeting
  const { participants, hlsState } = useMeeting();
  const [showParticipants, setShowParticipants] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showMessages, setShowMessages] = useState(false)
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
    <div className="d-flex rounded">
      {/* Controls for the meeting */}
      {showParticipants && (
        <div className="bg-dark overflow-auto p-2 w-25" style={{maxHeight: "700px" }}>
           <Participants/>
        </div>
      )}
      
      {hlsState !== "HLS_PLAYABLE" ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div className="bg-dark p-2">
            
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
      <div className='bg-dark chat-div'>
        <h6 className='text-light text-center mt-2'>Chat</h6>
        <div>
        <ul className="px-3">
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
            <li className='message small py-1 px-2 me-3 mb-3 text-white rounded-3' key={messageData.id}>{messageData.message}</li>
            ))}
            </div>
              {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                alt="avatar 1" style={{width: "45px", height: "100%"}}/> */}
            </div>

          
        </ul>
        </div>
        <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3" >
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
      <div className="d-flex justify-content-center mx-auto py-3 bg-dark border border-light rounded gap-2">
        <Controls />
        <button className = "btn btn-light" onClick={handleToggleParticipants}> 
          {showParticipants ? <MdGroup/> : <MdGroupOff/>}
        </button>
        <button className = "btn btn-light" onClick={handleToggleMessages}>
          {showMessages ? <TiMessages/> : <TiMessages/>}
        </button>
      </div>
      
      
      <div className="d-flex">
        <RealTimeGraphPlotter/>
        <Whiteboard/>
      </div>
      
      

    </div>
  );
}

export default SpeakerView
