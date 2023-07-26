import React from 'react'
import { useEffect, useMemo, useRef, useState } from "react";
import {MeetingProvider,MeetingConsumer,useMeeting,useParticipant,Constants} from "@videosdk.live/react-sdk";
// import MeetingView from './Meetingview';
import ReactPlayer from 'react-player';

function ParticipantView(props) {
  
  //handling media
  function onStreamEnabled(stream) {
    if(stream.kind === 'audio'){
      console.log("Audio Stream On: onStreamEnabled", stream);
    }
  }
  //Callback for when the participant stops a stream
  function onStreamDisabled(stream) {
    if(stream.kind === 'audio'){
      console.log("Audio Stream Off: onStreamDisabled", stream);
    }
  }
  //Callback for when participants media gets changed
  function onMediaStatusChanged(data) {
    const { kind, newStatus} = data;
    console.log("Participant Media Kind: ", kind, " newStatus: ", newStatus);
  }

  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId,{onStreamDisabled,onStreamEnabled,onMediaStatusChanged});
  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  //Playing the audio in the <audio>
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);
  console.log(props)
   
  return (
    <div>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={true}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
      
    </div>
  );
}

export default ParticipantView
