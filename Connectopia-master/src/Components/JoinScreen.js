import React, { useState } from "react";

function JoinScreen({ getMeetingAndToken, setMode }) {
  const [meetingId, setMeetingId] = useState(null);
  //Set the mode of joining participant and set the meeting id or generate new one
  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
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
      <button className="btn btn-warning" onClick={() => onClick("CONFERENCE")}>Join as Host</button>
       {" | "}
      <button className="btn btn-warning" onClick={() => onClick("VIEWER")}>Join as Viewer</button>
      <br />
      <br />
      <button className="btn btn-light" onClick={() => onClick("CONFERENCE")}>Create Meeting</button>
    </div>
  );
}
export default JoinScreen
