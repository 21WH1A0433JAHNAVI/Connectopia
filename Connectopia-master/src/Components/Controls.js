import { useEffect, useMemo, useRef, useState } from "react"
import {BsFillMicFill,BsFillCameraVideoFill, BsFillMicMuteFill,BsFillCameraVideoOffFill,BsGraphUp,BsFillChatLeftTextFill} from 'react-icons/bs'
import {TbScreenShare} from 'react-icons/tb';
import {FaChalkboardTeacher} from 'react-icons/fa';
import {CiStreamOn,CiStreamOff} from 'react-icons/ci'
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import RealTimeGraphPlotter from "./Graphplotter";
import Whiteboard from "./CollabBoard";
import Chat from "./Chat";
function Controls() {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCamOn, setIsCamOn] = useState(false);
  const [isHlsActive, setIsHlsActive] = useState(false);
  const [isGraphPlotterOpen, setIsGraphPlotterOpen] = useState(false);
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isChatOpen,setIsChatOpen] = useState(false);
  const { leave, toggleMic, toggleWebcam, startHls, stopHls,end,enableScreenShare, disableScreenShare, toggleScreenShare } = useMeeting();
  const handleToggleMic = () => {
    toggleMic();
    setIsMicOn((prevIsMicOn) => !prevIsMicOn);
  };
  const handleToggleCam=()=>{
    toggleWebcam();
    setIsCamOn((prevIsCamOn)=> !prevIsCamOn);
  }
  const handleToggleHls = () => {
    // if (isHlsActive) {
    //   stopHls();
    // } else {
      // We will start the HLS in SPOTLIGHT mode and PIN as
      // priority so only speakers are visible in the HLS stream
      startHls({
        layout: {
          type: "SPOTLIGHT",
          priority: "PIN",
          gridSize: "20",
        },
        theme: "LIGHT",
        mode: "video-and-audio",
        quality: "high",
        orientation: "landscape",
      });
    // }
    setIsHlsActive((prevIsHlsActive) => !prevIsHlsActive);
  };
  const handleToggleGraphPlotter = () => {
    setIsGraphPlotterOpen((prevIsGraphPlotterOpen) => !prevIsGraphPlotterOpen);
  };
  const handleToggleBoard=()=>{
    setIsBoardOpen((prevOpen)=>!prevOpen);
  }
  const handleToggleChat=()=>{
    setIsChatOpen((prevChat)=>!prevChat)
  }
 
  return (
    <div className="d-flex justify-content-center gap-2">
      <button className="btn btn-danger" onClick={() => leave()}>Leave</button>
      <button className="btn btn-danger" onClick={() => end()}>end</button>
      
      <button className="btn btn-light" onClick={handleToggleMic}>{isMicOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}</button>
      <button className="btn btn-light" onClick={handleToggleCam}>{isCamOn?<BsFillCameraVideoFill/>:<BsFillCameraVideoOffFill/>}</button>
      {/* &emsp;|&emsp; */}
      <button className="btn btn-light" onClick={() => toggleScreenShare()}><TbScreenShare/></button>
      {/* <button className="btn btn-light" onClick={handleToggleHls}> */}
        {isHlsActive ? "" :  handleToggleHls()} {/* Conditionally render HLS button */}
      {/* </button>
      &emsp;|&emsp; */}
      
      {/* <button className="btn btn-light me-2" onClick={handleToggleGraphPlotter}>
        <BsGraphUp />
      </button> */}
      {/* {isGraphPlotterOpen && <RealTimeGraphPlotter />}
      <button className="btn btn-light me-2" onClick={handleToggleBoard}>
        <FaChalkboardTeacher/>
      </button>
      {isBoardOpen && <Whiteboard/>} */}
      
    </div>
  );
}

export default Controls;



