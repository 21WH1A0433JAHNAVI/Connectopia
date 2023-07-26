import { ReactSketchCanvas } from "@shawngoh87/react-sketch-canvas";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
  usePubSub
} from "@videosdk.live/react-sdk";
const Whiteboard = () => {
  const { localParticipant } = useMeeting();
  //We will define a refernce for our canvas
  const canvasRef = useRef();
   const { publish } = usePubSub("WHITEBOARD", {
    onMessageReceived: (message) => {
      //Check if the stroke is from remote participant only
      if (message.senderId !== localParticipant.id) {
        canvasRef.current.loadPaths(JSON.parse(message.message));
      }
    },
    onOldMessagesReceived: (messages) => {
      messages.map((message) => {
        canvasRef.current.loadPaths(JSON.parse(message.message));
      });
    },
  });
  //We will define the props required by the canvas element that we are using
  const canvasProps = {
    width: "100%",
    height: "500px",
    backgroundImage:
      "https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg",
    preserveBackgroundImageAspectRatio: "none",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#000000",
    canvasColor: "#FFFFFF",
    allowOnlyPointerType: "all",
    withViewBox: false,
  };
  const onStroke = (stroke, isEraser) => {
    
    publish(JSON.stringify(stroke), { persist: true });
     };
  return (
    <div>
      
      <ReactSketchCanvas ref={canvasRef}  onStroke={onStroke} {...canvasProps} />
    </div>
  );
};
export default Whiteboard