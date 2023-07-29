import React, { useState } from "react";

function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  const [type, setType] = useState(""); // State to store the participant type (host or participant)

  const onClick = async (mode, participantType) => {
    setMode(mode);
    setType(participantType); // Set the participant type (host or participant)
    console.log(participantType)
    await getMeetingAndToken(meetingId, participantType); // Pass the participant type to the function
  };

  return (
    <div className="container text-light col-lg-4">
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
        className="bg-light form-control "
      />
      <br />
      <button className="btn btn-warning" onClick={() => onClick("CONFERENCE", "host")}>
        Join as Host
      </button>{" "}
      |{" "}
      <button className="btn btn-warning" onClick={() => onClick("VIEWER", "participant")}>
        Join as Viewer
      </button>
      <br />
      <br />
      <button className="btn btn-light" onClick={() => onClick("CONFERENCE", "host")}>
        Create Meeting
      </button>
    </div>
  );
}

export default JoinScreen;
