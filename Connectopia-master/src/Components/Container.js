import React, { useEffect, useRef, useState } from "react";
import {useMeeting,Constants,} from "@videosdk.live/react-sdk";
import SpeakerView from "./SpeakerView";
import ViewerView from "./ViewerView";
import RealTimeGraphPlotter from "./Graphplotter";
import Whiteboard from "./CollabBoard";
import Chat from "./Chat";
import './Container.css'
import {FiCopy} from 'react-icons/fi'
// this the initial page => where you wait to join the meet

function Container(props) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  const { join } = useMeeting();
  
  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      //we will pin the local participant if he joins in CONFERENCE mode
      if (mMeetingRef.current.localParticipant.mode === "CONFERENCE") {
        mMeetingRef.current.localParticipant.pin();
      }
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
    //callback for when there is error in meeting
    onError: (error) => {
      alert(error.message);
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };
  const copyMeetingId = () => {
    navigator.clipboard.writeText(props.meetingId)
      .then(() => alert("Meeting ID copied to clipboard"))
      .catch(() => alert("Failed to copy meeting ID"));
  };
    const mMeetingRef = useRef(mMeeting);
    useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);
console.log(mMeeting)
  return (
    <div className="">
      <div className="top-bar d-flex justify-content-between px-4 py-2">
        <h6 className="font-weight-bold"><img
        src={require("../assets/connectopia_logo.png")}
        height="20"
        alt="Connectopia"
        loading="lazy"
        className="me-1 text-dark font-weight-bold"
      />
       Connectopia.
      </h6>
      <h6 className="meeting-id">Meeting Id : {props.meetingId} <FiCopy onClick={copyMeetingId} className="copy"/></h6>
      </div>
      
      {joined && joined === "JOINED" ? (
        mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
          <>
            <SpeakerView />
          </>
          
        ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
          <>
            <SpeakerView />
            {/* <RealTimeGraphPlotter/>
            <Whiteboard/>
            <Chat/> */}
            {/* <SpeakerView /> */}
          </>
        ) : null
      ) : joined && joined === "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button className="btn btn-join" onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}
export default Container
