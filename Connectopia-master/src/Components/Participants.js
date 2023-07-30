import React, { useEffect, useMemo, useRef, useState } from "react";
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


function Participants() {
    const { participants, hlsState } = useMeeting();

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
  return (
    <div className="">
      <h6 className='text-light'>Participants</h6>
      {speakers.map((participant) => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
      {viewers.map((participant) => (
        <ParticipantView participantId={participant.id} key={participant.id} />
      ))}
    </div>
  )
}

export default Participants
