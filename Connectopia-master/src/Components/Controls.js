import { useEffect, useState } from "react";
import { BsFillMicFill, BsFillMicMuteFill, BsFillCameraVideoFill, BsCameraVideoFill } from 'react-icons/bs';
import { TbScreenShare } from 'react-icons/tb';
import { useMeeting } from "@videosdk.live/react-sdk";

function Controls() {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls, end, isMicMuted } = useMeeting();
  
  const [micMuted, setMicMuted] = useState(isMicMuted);

  useEffect(() => {
    setMicMuted(isMicMuted);
  }, [isMicMuted]);

  const micIcon = micMuted ? <BsFillMicMuteFill /> : <BsFillMicFill />;

  const handleMicToggle = () => {
    toggleMic();
    setMicMuted(!micMuted);
  };

  return (
    <div>
      <button className="btn btn-danger me-2" onClick={() => leave()}>Leave</button>
      <button className="btn btn-danger" onClick={() => end()}>end</button>
      &emsp;|&emsp;

      <button className="btn btn-light me-2" onClick={handleMicToggle}>{micIcon}</button>
      <button className="btn btn-light" onClick={() => toggleWebcam()}><BsFillCameraVideoFill /></button>
      &emsp;|&emsp;
      <button className="btn btn-light me-2" onClick={() => toggleScreenShare()}><TbScreenShare /></button>
      <button className="btn btn-light me-2"
        onClick={() => {
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
        }}
      >
        Start HLS
      </button>
      <button className="btn btn-light me-2" onClick={() => stopHls()}>Stop HLS</button>
    </div>
  );
}

export default Controls;


