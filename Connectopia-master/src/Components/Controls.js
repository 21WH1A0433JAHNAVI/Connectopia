import { useEffect, useMemo, useRef, useState } from "react";
import { MeetingProvider, MeetingConsumer, useMeeting, useParticipant, Constants, } from "@videosdk.live/react-sdk";
import React from "react";
import clipboardCopy from 'clipboard-copy';
import { BsFillMicFill, BsFillMicMuteFill, BsFillCameraVideoFill, BsCameraVideoFill } from 'react-icons/bs';
import { TbScreenShare } from 'react-icons/tb';

function Controls() {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls, end, enableScreenShare, disableScreenShare, toggleScreenShare, isMicMuted } = useMeeting();

  const micIcon = isMicMuted ? <BsFillMicMuteFill /> : <BsFillMicFill />;

  // Function to handle copying the meeting ID to the clipboard
  const handleCopyMeetingId = () => {
    MeetingConsumer({ meetingId: (meetingId) => {
      if (meetingId) {
        clipboardCopy(meetingId)
          .then(() => {
            alert('Meeting ID copied to clipboard!');
          })
          .catch((error) => {
            console.error('Failed to copy Meeting ID:', error);
          });
      }
    }});
  };

  return (
    <div>
      <button className="btn btn-danger me-2" onClick={() => leave()}>Leave</button>
      <button className="btn btn-danger" onClick={() => end()}>end</button>
      &emsp;|&emsp;

      <button className="btn btn-light me-2" onClick={() => toggleMic()}>{micIcon}</button>
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
      <button className="btn btn-light me-2" onClick={() => handleCopyMeetingId()}>
        Copy Meeting ID
      </button>
    </div>
  );
}

export default Controls;

