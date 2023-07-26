import { useEffect, useMemo, useRef, useState } from "react"
import {BsFillMicFill,BsFillCameraVideoFill, BsCameraVideoFill} from 'react-icons/bs'
import {TbScreenShare} from 'react-icons/tb'
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";

function ViewerControls() {
  const { leave, toggleMic, toggleScreenShare} = useMeeting();

  return (
    <div>
      <h1>Participant</h1>
      <button className="btn btn-danger me-2" onClick={() => leave()}>Leave</button>
      &emsp;|&emsp;
      <button className="btn btn-light me-2" onClick={() => toggleScreenShare()}><TbScreenShare/></button>
      <button className="btn btn-light me-2" onClick={() => toggleMic()}><BsFillMicFill/></button>
    </div>
  );
}

export default ViewerControls
